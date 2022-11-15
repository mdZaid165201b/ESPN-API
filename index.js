const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const getLatestNews = require("./utility");
const PORT = process.env.PORT || 3000;

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res, next) => {
  res.sendFile("public/index.html");
});

app.get("/getLatestNews", async (req, res, next) => {
  try {
    const data = await getLatestNews();
    res.json(data);
  } catch {
    (err) => {
      throw new Error(err.message);
    };
  }
});

app.use((req, res, next) => {
  res.status(404).send({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
