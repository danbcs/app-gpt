const express = require("express");
const openai = require("./config");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());

app.get("/generate", async (req, res) => {
  const { prompt } = req.query;

  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1024,
      n: 1,
    });

    const { choices } = result.data;
    const text = choices[0].text.trim();

    res.json({ text });
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    } else {
      console.log(error.message);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
