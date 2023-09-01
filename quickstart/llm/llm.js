require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");

const llm = new OpenAI({
  temperature: 0.9,
});

async function main() {
  const result = await llm.predict(
    "カラフルな靴下を作る会社の社名として、何がいいだろうか？"
  );
  console.log(result);
}

main();
