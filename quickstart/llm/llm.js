import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "langchain/llms/openai";

const llm = new OpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.9,
});

async function main() {
  const result = await llm.predict(
    "カラフルな靴下を作る会社の社名として、何がいいだろうか？"
  );
  console.log(result);
}

main();
