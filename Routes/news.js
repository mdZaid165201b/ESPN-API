const router = require("express").Router();
const { getLatestNews } = require("../controller/news");

router.get("/getLatestNews", async (req, res, next) => {
    try {
      const data = await getLatestNews();
      res.json(data);
    } catch {
      (err) => {
        throw new Error(err.message);
      };
    }
  });
