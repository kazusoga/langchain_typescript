require('dotenv').config();
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { HumanMessage, ChatMessage, SystemMessage } = require("langchain/schema");

const chat = new ChatOpenAI({
  temperature: 0
});

chat.predictMessages([
  new HumanMessage("Translate this sentence from English to French. I love programming.")
])
.then((messages) => {
  console.log(messages);
});

/*
  AIMessage {
    content: "J'adore la programmation."
  }
*/