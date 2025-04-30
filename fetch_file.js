import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "./S3Client.js";
import dotenv from "dotenv";
dotenv.config();

const generatePresignedUrl = async (objectKey, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectKey,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });
    console.log("Presigned URL:", url);
    return url;
  } catch (err) {
    console.error("Error generating presigned URL:", err);
  }
};

const objectKey = "test.txt";
generatePresignedUrl(objectKey);
