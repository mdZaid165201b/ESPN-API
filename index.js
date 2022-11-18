const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const { getLatestNews } = require("./Routes/news");
const {
  getODITeamRanking,
  getT20TeamRanking,
  getTeamsRanking,
  getTestTeamRanking,
} = require("./Routes/ranking");

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

app.get("/getTeamsRanking", async (req, res, next) => {
  try {
    const data = await getTeamsRanking();
    res.json(data);
  } catch {
    (err) => {
      throw new Error(err.message);
    };
  }
});

app.get("/getOdiTeamRanking", async (req, res, next) => {
  try {
    const data = await getODITeamRanking();
    res.json(data);
  } catch {
    (err) => {
      throw new Error(err.message);
    };
  }
});

app.get("/getT20TeamRanking", async (req, res, next) => {
  try {
    const data = await getT20TeamRanking();
    res.json(data);
  } catch {
    (err) => {
      throw new Error(err.message);
    };
  }
});

app.get("/getTestTeamRanking", async (req, res, next) => {
  try {
    const data = await getTestTeamRanking();
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
