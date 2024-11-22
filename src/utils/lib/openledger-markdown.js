import { NodeHtmlMarkdown } from "node-html-markdown";

export async function fetchHtmlToJson(url) {
  try {
    const response = await fetch(url);
    const htmlText = await response.text();

    // Step 1: Remove unwanted tags and inline styles using regex
    const cleanedHtmlText = htmlText
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
      .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, "")
      .replace(/<meta[^>]*>/gi, "")
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
      .replace(/\sstyle="[^"]*"/gi, ""); // Remove inline styles
    console.log("====== 1. before markdown conversion =====");

    // Step 2: Convert the cleaned HTML to Markdown using node-html-markdown
    const markdown = NodeHtmlMarkdown.translate(cleanedHtmlText);
    // console.log('🚀 ~ fetchHtmlToJson ~ markdown:', markdown);

    console.log("====== 3. before extracting metadata =====");
    // Step 3: Extract metadata manually using regex
    const titleMatch = htmlText.match(/<title>([^<]*)<\/title>/i);
    const langMatch = htmlText.match(/<html[^>]*lang="([^"]*)"[^>]*>/i);
    console.log("====== 4. before constructing JSON result =====");

    const jsonResult = {
      success: true,
      data: {
        markdown,
        metadata: {
          title: titleMatch ? titleMatch[1] : "",
          language: langMatch ? langMatch[1] : "en",
          sourceURL: url,
          statusCode: response.status,
        },
      },
    };
    console.log("====== 5. returning JSON result =====");
    return jsonResult;
  } catch (error) {
    console.error("Error fetching or parsing HTML:", error.stack);
    return { success: false, error: error.message };
  }
}
