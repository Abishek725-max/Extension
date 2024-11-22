import { PutObjectCommand, S3Client, s3Client } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

import SHA256 from "crypto-js/sha256";
import { ethersConnect } from "./ethersConnect";

export const uploadMinio = async (
  bucketName,
  objectKey,
  data,
  jobData,
  privateKey,
  contentType = "text/markdown"
) => {
  const s3Client = new S3Client({
    endpoint: "https://minioapi.openledger.dev",
    region: "us-east-1",
    credentials: {
      accessKeyId: "FWF2K7x5zHGDHRRXvRkX",
      secretAccessKey: "SD39rzABNmiLlHH6CoLBXv3H836JQyFPKhnz0vqB",
    },
    forcePathStyle: true,
    tls: true,
    maxAttempts: 3,
    requestHandlerOptions: {
      timeout: 30000,
    },
  });
  const bodyBuffer = Buffer.from(data, "utf-8");
  const checksum = SHA256(bodyBuffer).toString();
  const checksumCreateTime = new Date().getTime();
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: bodyBuffer,
    ContentType: contentType,
  };
  console.log("🚀 ~ params:", params);

  try {
    const commend = new PutObjectCommand(params);
    const response = await s3Client.send(commend);
    console.log("Successfully uploaded to MinIO:", response);
    console.log("🚀 ~ checksum:", checksum);
    ethersConnect(jobData, checksum, checksumCreateTime, privateKey);
  } catch (error) {
    console.error("Error uploading to MinIO:", error);
  }
  return { checksum, checksumCreateTime };
};
