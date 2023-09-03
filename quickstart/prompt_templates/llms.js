require("dotenv").config();
const { PromptTemplate } = require("langchain/prompts");

const prompt = PromptTemplate.fromTemplate(
  "{product}を作る会社の社名として、何がいいだろうか？"
);

async function main() {
  const formattedPrompt = await prompt.format({
    product: "カラフルな靴下",
  });
  console.log(formattedPrompt); // "カラフルな靴下を作る会社の社名として、何がいいだろうか？"
}

main();
