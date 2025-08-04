const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/render-endpoint", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ response: "No message received." });
  }

  let responseText = "🤖 Backend received your message: " + message;

  if (message.startsWith("bday:")) {
    const bdayMsg = message.replace("bday:", "").trim();
    responseText = `🎂 Happy Birthday! ${bdayMsg || "Wishing you an amazing year ahead!"}`;
  } else if (message.startsWith("hack:")) {
    const hackMsg = message.replace("hack:", "").trim();
    responseText = `💻 Hacker Vibes Activated: ${hackMsg || "Stay stealthy, stay curious!"}`;
  } else if (message.startsWith("love:")) {
    const loveMsg = message.replace("love:", "").trim();
    responseText = `❤️ Love Note: ${loveMsg || "You're the spark in my circuits."}`;
  }

  res.json({ response: responseText });
});

app.get("/", (req, res) => {
  res.send("Backend is running and ready 🚀");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
