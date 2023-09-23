import dotenv from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

dotenv.config();

const llm = new OpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.9,
});
const prompt = PromptTemplate.fromTemplate(
  "{product}を作る会社名として、何がいいだろうか？"
);

// Run is a convenience method for chains with prompts that require one input and one output.
async function runChain() {
  const chain = new LLMChain({
    llm,
    prompt,
  });
  const result = await chain.run("カラフルな靴下");
  console.log(result);
}

runChain();

// 以下と同じ
// async function main() {
//   const formattedPrompt = await prompt.format({
//     product: "カラフルな靴下",
//   });
//   const result = await llm.predict(formattedPrompt);
//   console.log(result);
// }

// main();
