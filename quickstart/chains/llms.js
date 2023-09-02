require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");
const { LLMChain } = require("langchain/chains");
const { PromptTemplate } = require("langchain/prompts");

const llm = new OpenAI({});
const prompt = PromptTemplate.fromTemplate(
  "What is a good name for a company that makes {product}?"
);

const chain = new LLMChain({
  llm,
  prompt,
});

// Run is a convenience method for chains with prompts that require one input and one output.
async function runChain() {
  const result = await chain.run("colorful socks");
  console.log(result);
}

runChain();
