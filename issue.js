import { OpenAI } from "langchain/llms/openai";
import { pinecone } from "/Users/kazusoga/node_work/langchain_typescript/utils/pinecone-client.js";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  ConversationalRetrievalQAChain,
  VectorDBQAChain,
} from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

async function initChain() {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });
  const pineconeIndex = pinecone.Index("canada2");
  const qa_template = `Use the following pieces of context to answer the question at the end.

{context}

Question: {question}
Helpful Answer:`;

  const sys_template = `I want you to act as a document that I am having a conversation with. Your name is XX. You will provide me with answers from the given info. If the answer is not included, search for an answer and return it, and make a note that you searched outside of the given info. If they ask you 2023 informations retrieve it from the content you had. Never break character.`;

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(), // documents に使用する Embeddings? OpenAIEmbeddings.embedQuery(query)
    {
      pineconeIndex: pineconeIndex, // Retriever を経由して、この index で query をかけている？その仕組みを調べる
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
      // 以下追加？
      memory: new BufferMemory({
        memoryKey: "chat_history", // Must be set to "chat_history"
      }),
    }
  );
}

const chain = await initChain();

const res = await chain.call({
  question: "2023年、五等分の花嫁の映画の公開日はいつですか？",
});
