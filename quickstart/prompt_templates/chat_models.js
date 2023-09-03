const {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} = require("langchain/prompts");

const template =
  "あなたは{input_language}を{output_language}に翻訳する親切なアシスタントです。";
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
const humanTemplate = "{text}";
const humanMessagePrompt =
  HumanMessagePromptTemplate.fromTemplate(humanTemplate);

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  systemMessagePrompt,
  humanMessagePrompt,
]);

async function main() {
  const formattedPrompt = await chatPrompt.formatMessages({
    input_language: "日本語",
    output_language: "英語",
    text: "私はプログラミングが大好きです。",
  });
  console.log(formattedPrompt);
  /*
    [
        SystemMessage {
            lc_serializable: true,
            lc_kwargs: { content: 'あなたは日本語を英語に翻訳する親切なアシスタントです。', additional_kwargs: {} },
            lc_namespace: [ 'langchain', 'schema' ],
            content: 'あなたは日本語を英語に翻訳する親切なアシスタントです。',
            name: undefined,
            additional_kwargs: {}
        },
        HumanMessage {
            lc_serializable: true,
            lc_kwargs: { content: '私はプログラミングが大好きです。', additional_kwargs: {} },
            lc_namespace: [ 'langchain', 'schema' ],
            content: '私はプログラミングが大好きです。',
            name: undefined,
            additional_kwargs: {}
        }
    ]
  */
}

main();
