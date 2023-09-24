import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";
import * as fs from "fs";

export const run = async () => {
  /* Initialize the LLM to use to answer the question */
  const model = new ChatOpenAI({});
  /* Load in the file we want to do question answering over */
  const text = fs.readFileSync(
    "modules/chains/popular/state_of_the_union.txt",
    "utf8"
  );
  /* Split the text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  /* Create the chain */
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      memory: new BufferMemory({
        memoryKey: "chat_history", // Must be set to "chat_history"
      }),
    }
  );
  /* Ask it a question */
  const question = "大統領はブレイヤー判事についてどう語ったか？";
  const res = await chain.call({ question });
  console.log(res);
  /* Ask it a follow up question */
  const followUpRes = await chain.call({
    question: "それは良かったですか？",
  });
  console.log(followUpRes);
};

run();
