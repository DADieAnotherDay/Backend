const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/render-endpoint", (req, res) => {
  const { message } = req.body;
  console.log("Received:", message);
  res.send("Backend received your message: " + message);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Backend running on port", PORT));
