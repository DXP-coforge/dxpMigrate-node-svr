import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../infrastructure/s3Client.js";

export class S3MappingProvider {
  async getMapping(id: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: `mappings/${id}.json`
    });

    const response = await s3Client.send(command);

    const body = await response.Body?.transformToString();
    return JSON.parse(body || "{}");
  }
}
