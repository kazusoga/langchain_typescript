const {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} = require("langchain/prompts");

const template =
  "You are a helpful assistant that translates {input_language} to {output_language}.";
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
    input_language: "English",
    output_language: "French",
    text: "I love programming.",
  });
  console.log(formattedPrompt);
}

main();
