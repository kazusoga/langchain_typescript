require("dotenv").config();
const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { SerpAPI } = require("langchain/tools");
const { Calculator } = require("langchain/tools/calculator");

async function main() {
  const executor = await initializeAgentExecutorWithOptions(
    [new Calculator(), new SerpAPI()],
    new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 }),
    {
      agentType: "openai-functions",
      verbose: true,
    }
  );

  const result = await executor.run("What is the temperature in New York?");
  console.log(result);
  // The current temperature in New York is 74°F (23°C). It is mostly cloudy.
}

main();
