require("dotenv").config();
const { ChatOpenAI } = require("langchain/chat_models/openai");
const {
  HumanMessage,
  ChatMessage,
  SystemMessage,
} = require("langchain/schema");

const chat = new ChatOpenAI({
  temperature: 0,
});

async function main() {
  const result = await chat.predictMessages([
    new HumanMessage("Say this is a test"),
  ]);
  console.log(result);
}

/*
  AIMessage {
    content: "J'adore la programmation."
  }
*/

main();
