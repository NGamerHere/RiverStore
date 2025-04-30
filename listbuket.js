import { ListBucketsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
import s3Client from "./S3Client.js";
const command = new ListBucketsCommand({});
s3Client.send(command)
    .then(data => {
        console.log("Buckets:", data.Buckets);
    })
    .catch(err => {
        console.error("Error listing buckets:", err);
    });