require("dotenv").config();
const express = require("express");
const cors = require("cors");
const openaiProxy = require("./proxy/openai");
const emailNotify = require("./notify/email");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "https://manage.ux.eflorist.com",
      "https://manage.eflorist.com",
    ],
  })
);
app.use(express.json());

// Routes
app.use("/proxy/openai", openaiProxy);
app.use("/notify/email", emailNotify);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
