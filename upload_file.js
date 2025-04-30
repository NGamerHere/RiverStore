import dotenv from "dotenv";
dotenv.config();
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import s3Client from "./S3Client.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = async (filePath, bucketName, key) => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
    };

    const command = new PutObjectCommand(uploadParams);
    const data = await s3Client.send(command);
    console.log("File uploaded successfully:", data);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
};


const filePath = path.join(__dirname, "test.txt");
const bucketName = "riverstorestg";
const key = "test.txt";

uploadFile(filePath, bucketName, key);
