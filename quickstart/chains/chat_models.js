require("dotenv").config();

const { ChatOpenAI } = require("langchain/chat_models/openai");
const { LLMChain } = require("langchain/chains");
const {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} = require("langchain/prompts");

const template =
  "You are a helpful assistant that translates {input_language} to {output_language}.";
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
const humanTemplate = "{text}";
const humanMessagePrompt =
  HumanMessagePromptTemplate.fromTemplate(humanTemplate);

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  systemMessagePrompt,
  humanMessagePrompt,
]);

const chat = new ChatOpenAI({
  temperature: 0,
});

const chain = new LLMChain({
  llm: chat,
  prompt: chatPrompt,
});

async function main() {
  const result = await chain.call({
    input_language: "English",
    output_language: "French",
    text: "I love programming",
  });
  console.log(result);
}

main();
