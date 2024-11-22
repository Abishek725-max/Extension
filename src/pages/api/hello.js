// File: pages/api/fetchHtmlToJson.js

import { JSDOM } from "jsdom";
import TurndownService from "turndown";

export default async function handler(req, res) {
  console.log("🚀 ~ handler ~ res:", res);
  console.log("🚀 ~ handler ~ req:", req);
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ success: false, error: "URL is required" });
  }

  try {
    const response = await fetch(url);
    console.log("🚀 ~ handler ~ response:", response);
    const htmlText = await response.text();
    console.log("🚀 ~ handler ~ htmlText:", htmlText);

    const dom = new JSDOM(htmlText);
    const doc = dom.window.document;

    const base = new URL(url);
    doc.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("http")) {
        img.setAttribute("src", new URL(src, base).href);
      }
    });

    doc.querySelectorAll("[style]").forEach((element) => {
      element.removeAttribute("style");
    });

    doc
      .querySelectorAll("script, style, iframe, noscript, meta, head, footer")
      .forEach((element) => {
        element.remove();
      });

    const cleanedHtml = doc.body.innerHTML;

    const turndownService = new TurndownService();
    const jsonResult = {
      success: true,
      data: {
        markdown: turndownService.turndown(cleanedHtml),
        metadata: {
          title: doc.querySelector("title")?.innerText || "",
          language: doc.documentElement.lang || "en",
          robots:
            doc.querySelector('meta[name="robots"]')?.getAttribute("content") ||
            "",
          ogTitle:
            doc
              .querySelector('meta[property="og:title"]')
              ?.getAttribute("content") || "",
          ogDescription:
            doc
              .querySelector('meta[property="og:description"]')
              ?.getAttribute("content") || "",
          ogImage:
            doc
              .querySelector('meta[property="og:image"]')
              ?.getAttribute("content") || "",
          ogLocaleAlternate:
            Array.from(
              doc.querySelectorAll('meta[property="og:locale:alternate"]')
            ).map((el) => el.getAttribute("content")) || [],
          sourceURL: url,
          statusCode: response.status,
        },
      },
    };

    res.status(200).json(jsonResult);
  } catch (error) {
    console.error("Error fetching or parsing HTML:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
