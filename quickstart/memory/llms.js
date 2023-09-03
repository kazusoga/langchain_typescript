require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");
const { BufferMemory } = require("langchain/memory");
const { ConversationChain } = require("langchain/chains");

async function main() {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
  });
  const memory = new BufferMemory();
  const chain = new ConversationChain({
    llm: model,
    memory, // default is new BufferMemory()
    verbose: true,
  });
  const res1 = await chain.call({ input: "Hi! I'm Jim." });
  console.log(res1);
  /*
        {
            response: "Hello Jim! It's great to meet you. How can I assist you today?"
        }
   */
  const res2 = await chain.call({ input: "What's my name?" });
  console.log(res2);
  /*
    {
        response: "Your name is Jim. You mentioned it when you introduced yourself at the beginning of our conversation."
    }
  */
}

main();
