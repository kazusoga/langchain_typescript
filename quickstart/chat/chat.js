require("dotenv").config();
const { ChatOpenAI } = require("langchain/chat_models/openai");
const {
  HumanMessage,
  ChatMessage,
  SystemMessage,
} = require("langchain/schema");

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});

async function main() {
  const messages = [
    new HumanMessage(
      "この文章を日本語から英語に翻訳しなさい。「私はプログラミングが大好きです。」"
    ),
  ];
  const aiMessage = await chat.predictMessages(messages);
  console.log(aiMessage);
  /*
    AIMessage {
      lc_serializable: true,
      lc_kwargs: {
        content: 'I love programming.',
        additional_kwargs: { function_call: undefined }
      },
      lc_namespace: [ 'langchain', 'schema' ],
      content: 'I love programming.',
      name: undefined,
      additional_kwargs: { function_call: undefined }
    }
  */

  messages.push(aiMessage);
  messages.push(new HumanMessage("ありがとう。"));
  console.log(messages);
  /*
    [
      HumanMessage {
        lc_serializable: true,
        lc_kwargs: {
          content: 'この文章を日本語から英語に翻訳しなさい。「私はプログラミングが大好きです。」',
          additional_kwargs: {}
        },
        lc_namespace: [ 'langchain', 'schema' ],
        content: 'この文章を日本語から英語に翻訳しなさい。「私はプログラミングが大好きです。」',
        name: undefined,
        additional_kwargs: {}
      },
      AIMessage {
        lc_serializable: true,
        lc_kwargs: { content: 'I love programming.', additional_kwargs: [Object] },
        lc_namespace: [ 'langchain', 'schema' ],
        content: 'I love programming.',
        name: undefined,
        additional_kwargs: { function_call: undefined }
      },
      HumanMessage {
        lc_serializable: true,
        lc_kwargs: { content: 'ありがとう。', additional_kwargs: {} },
        lc_namespace: [ 'langchain', 'schema' ],
        content: 'ありがとう。',
        name: undefined,
        additional_kwargs: {}
      }
    ]
  */

  const finalResult = await chat.predictMessages(messages);
  console.log(finalResult);
  /*
    AIMessage {
      lc_serializable: true,
      lc_kwargs: {
        content: "You're welcome.",
        additional_kwargs: { function_call: undefined }
      },
      lc_namespace: [ 'langchain', 'schema' ],
      content: "You're welcome.",
      name: undefined,
      additional_kwargs: { function_call: undefined }
    }
  */

  // ワンラリーのやり取りで良い場合は、以下のように書けます。
  // 直接返答のテキストを取得できる。
  const result = await chat.predict(
    "この文章を日本語から英語に翻訳しなさい。「私はプログラミングが大好きです。」"
  );
  console.log(result); // "I love programming."
}

main();
