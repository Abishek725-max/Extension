import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

import { ethers } from "ethers";

import { uploadMinio } from "./uploadMinio.js";

const getMarkdown = async (
  value,
  privateKey = "5f9b0c9ee1eba7149d5855dbfb9d51b489e652f8a4bc2bd66b1ee31244457e11"
) => {
  chrome.storage.local.set({ markdownPrivateKey: privateKey }, () => {
    console.log("Private key stored in Chrome storage.");
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("markdownPrivateKey", privateKey);
  } else {
    console.log("Local storage is not available in this environment.");
  }
  console.log("jobData", value?.data);
  const JobData = value?.data;

  console.log("🚀 ~ getMarkdown ~ JobData:", JobData);

  // Ensure the Dataset is valid before parsing
  let parsedData;

  if (JobData?.Dataset) {
    try {
      // Try to parse the Dataset if it exists
      parsedData = JSON.parse(JobData?.Dataset);

      // Optionally log the parsed data for debugging
      console.log("Parsed Dataset:", parsedData);
    } catch (err) {
      console.error("Error parsing Dataset:", err);
      console.error("Invalid Dataset data:", JobData.Dataset);
      return; // Exit the function if Dataset is invalid
    }
  } else {
    console.log("Dataset is missing or invalid.");
  }

  const bucketName = parsedData?.name;
  if (!bucketName) {
    console.error("No bucket name found in parsed dataset.");
    return;
  }

  // Ensure the Payload is valid before parsing
  let payload;
  try {
    payload = JobData?.Payload ? JSON.parse(JobData?.Payload) : null;
  } catch (err) {
    console.error("Error parsing Payload:", err);
    return; // Exit the function if Payload is invalid
  }

  const urls = payload?.urls || [];
  if (urls.length === 0) {
    console.error("No URLs found in Payload.");
    return;
  }

  const wallet = new ethers.Wallet(privateKey); // Using dynamic private key
  console.log("🚀 ~ fetchData ~ wallet:", wallet);

  // Loop through URLs and fetch data
  for (let i = 0; i < urls.length; i++) {
    console.log("response2", urls[i]);
    try {
      const response = await fetch(
        `http://localhost:8100/api/hello?url=${urls[i]}`
      );
      console.log("response", response);

      if (response.ok) {
        const data = await response.json();
        console.log("🚀 ~ fetchData ~ data:", data?.data?.markdown);

        const markdownData = JSON.stringify(data?.data?.markdown, null, 2);
        console.log("🚀 ~ fetchData ~ markdownData:", markdownData);

        const sequenceNumber = (i + 1).toString().padStart(4, "0");
        // const objectKey = `${wallet?.address}/${JobData?.Type}/${JobData?.UUID}/${sequenceNumber}.md`;
        const objectKey = `${wallet.address}/${JobData.Type}/${JobData.UUID}_${sequenceNumber}.md`;

        // Assuming uploadToMinIO is defined elsewhere
        await uploadMinio(
          bucketName,
          objectKey,
          markdownData,
          JobData,
          privateKey
        );
      } else {
        console.error("Failed to fetch data for URL:", urls[i]);
      }
    } catch (err) {
      console.error("Error fetching or uploading data:", err);
    }
  }
};

export default getMarkdown;
