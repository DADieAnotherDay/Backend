const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the 'images' folder
app.use('/images', express.static(path.join(__dirname, 'images')));

app.post("/render-endpoint", (req, res) => {
  const { message, name, age, relation } = req.body;

  if (!message && (!name || !age || !relation)) {
    return res.status(400).json({ response: "No message or details received." });
  }

  let responseText = "🤖 Backend received your message: " + (message || "");
  let imageUrl = "";

  // Handle Birthday Messages
  if (message?.startsWith("bday:") || (name && age && relation)) {
    if (name && age && relation) {
      responseText = `🎂 Happy ${age}th Birthday to my wonderful ${relation}, ${name}! 🎉 Wishing you love, laughter, and endless joy ahead.`;
    } else {
      const bdayMsg = message.replace("bday:", "").trim();
      responseText = `🎂 Happy Birthday! ${bdayMsg || "Wishing you an amazing year ahead!"}`;
    }
    imageUrl = `${req.protocol}://${req.get("host")}/images/bday.png`;
  }

  // Handle Hacker Mode
  else if (message?.startsWith("hack:")) {
    const hackMsg = message.replace("hack:", "").trim();
    responseText = `💻 Hacker Vibes Activated: ${hackMsg || "Stay stealthy, stay curious!"}`;
    imageUrl = `${req.protocol}://${req.get("host")}/images/hacker.png`;
  }

  // Handle Love Mode
  else if (message?.startsWith("love:")) {
    const loveMsg = message.replace("love:", "").trim();
    responseText = `❤️ Love Note: ${loveMsg || "You're the spark in my circuits."}`;
    imageUrl = `${req.protocol}://${req.get("host")}/images/love.png`;
  }

  res.json({ response: responseText, image: imageUrl });
});

app.get("/", (req, res) => {
  res.send("Backend is running and ready 🚀");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
