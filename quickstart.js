require('dotenv').config();

const { OpenAI } = require("langchain/llms/openai");

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});



llm.predict("カラフルな靴下を作る会社の社名として、何がいいだろうか？")
    .then((result) => {
        console.log(result);
    }
);
