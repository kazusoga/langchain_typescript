require("dotenv").config();
const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { OpenAI } = require("langchain/llms/openai");
const { SerpAPI } = require("langchain/tools");
const { Calculator } = require("langchain/tools/calculator");

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];

async function main() {
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
    verbose: true,
  });

  const input =
    "What was the high temperature in SF yesterday in Fahrenheit? What is that number raised to the .023 power?";

  const result = await executor.call({
    input,
  });
  console.log(result);
  /*
    {
        output: 'The high temperature in SF yesterday in Fahrenheit raised to the .023 power is approximately 1.1023.'
    }
  */
}

main();
