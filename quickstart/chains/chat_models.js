require("dotenv").config();

const { ChatOpenAI } = require("langchain/chat_models/openai");
const { LLMChain } = require("langchain/chains");
const {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} = require("langchain/prompts");

const template =
  "あなたは{input_language}を{output_language}に翻訳する親切なアシスタントです。";
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
const humanTemplate = "{text}";
const humanMessagePrompt =
  HumanMessagePromptTemplate.fromTemplate(humanTemplate);

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  systemMessagePrompt,
  humanMessagePrompt,
]);

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});

async function runChain() {
  const chain = new LLMChain({
    llm: chat,
    prompt: chatPrompt,
  });

  const result = await chain.call({
    input_language: "日本語",
    output_language: "英語",
    text: "私はプログラミングが大好きです。",
  });
  console.log(result);
}

runChain();

// 以下と同じ
// async function main() {
//   const formattedPrompt = await chatPrompt.formatMessages({
//     input_language: "日本語",
//     output_language: "英語",
//     text: "私はプログラミングが大好きです。",
//   });
//   const result = await chat.predict(formattedPrompt);
//   console.log(result);
// }

// main();
