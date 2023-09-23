import dotenv from "dotenv";
import { OpenAI } from "openai";
dotenv.config();

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    messages: [
      {
        role: "user", // system, user, assistant
        content: "カラフルな靴下を作る会社の社名として、何がいいだろうか？",
      },
    ],
  });
  console.log(completion.choices[0].message);

  const result = completion.choices[0].message.content;
  console.log(result);
}

main();
