require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    messages: [
      {
        role: "user",
        content: "カラフルな靴下を作る会社の社名として、何がいいだろうか？",
      },
    ],
  });

  const result = completion.choices[0].message.content;
  console.log(result);
}

main();
