import { OpenAI } from "langchain/llms/openai";
import { pinecone } from "@/utils/pinecone-client";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

async function initChain() {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });
  const pineconeIndex = pinecone.Index("canada");
  const qa_template = `Use the following pieces of context to answer the question at the end.

{context}

Question: {question}
Helpful Answer:`;

  const sys_template = `I want you to act as a document that I am having a conversation with. Your name is XX. You will provide me with answers from the given info. If the answer is not included, search for an answer and return it, and make a note that you searched outside of the given info. If they ask you 2023 informations retrieve it from the content you had. Never break character.`;

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({}),
    {
      pineconeIndex: pineconeIndex,
      textKey: "text",
    }
  );
  return ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      returnSourceDocuments: true,
      qaChainOptions: {
        type: "stuff",
        prompt: PromptTemplate.fromTemplate(`${sys_template}\n${qa_template}`),
      },
    }
  );
}

const chain = await initChain();

await chain.call({
    
