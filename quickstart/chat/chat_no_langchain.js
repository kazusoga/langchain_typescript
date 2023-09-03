require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI();

async function main() {
  const messages = [
    {
      role: "user",
      content:
        "この文章を日本語から英語に翻訳しなさい。「私はプログラミングが大好きです。」",
    },
  ];
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });
  const aiMessage = completion.choices[0].message;
  console.log(aiMessage);
  /*
    { role: 'assistant', content: 'I love programming.' }
  */

  messages.push(aiMessage);
  messages.push({
    role: "user",
    content: "ありがとう。",
  });

  console.log(messages);
  /*
    [
      { role: 'user', content: 'この文章を日本語から英語に翻訳しなさい。「私はプログラミングが大好きです。」' },
      { role: 'assistant', content: 'I love programming.' },
      { role: 'user', content: 'ありがとう。' }
    ]
  */

  const completion2 = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });
  const aiMessage2 = completion2.choices[0].message;
  console.log(aiMessage2);
  /*
    { role: 'assistant', content: 'You are welcome.' }
  */
}

main();
