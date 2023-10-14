import dotenv from "dotenv";
dotenv.config();
import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();

await pinecone.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
  projectName: "test project",
});

export { pinecone };
