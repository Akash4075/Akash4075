const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY_HERE`
        }
      }
    );
    res.send({ reply: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).send({ error: err.toString() });
  }
});

app.listen(3001, () => console.log("AI backend on http://localhost:3001"));
