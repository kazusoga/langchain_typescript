require("dotenv").config();
const { PromptTemplate } = require("langchain/prompts");

const prompt = PromptTemplate.fromTemplate(
  "What is a good name for a company that makes {product}?"
);

async function main() {
  const formattedPrompt = await prompt.format({
    product: "colorful socks",
  });
  console.log(formattedPrompt);
}

main();
