const router = require("express").Router();
const {
    getODITeamRanking,
    getT20TeamRanking,
    getTeamsRanking,
    getTestTeamRanking,
    getODIPlayerBattingRanking,
    getT20PlayerBattingRanking,
    getTestPlayerBattingRanking,
    getODIPlayerBowlingRanking,
    getT20PlayerBowlingRanking,
    getTestPlayerBowlingRanking,
  } = require("../controller/ranking");


  router.get("/getTeamsRanking", async (req, res, next) => {
    try {
      const data = await getTeamsRanking();
      res.json(data);
    } catch {
      (err) => {
        throw new Error(err.message);
      };
    }
  });
  
  router.get("/getOdiTeamRanking", async (req, res, next) => {
    try {
      const data = await getODITeamRanking();
      res.json(data);
    } catch {
      (err) => {
        throw new Error(err.message);
      };
    }
  });
  
  router.get("/getT20TeamRanking", async (req, res, next) => {
    try {
      const data = await getT20TeamRanking();
      res.json(data);
    } catch {
      (err) => {
        throw new Error(err.message);
      };
    }
  });
  
  router.get("/getTestTeamRanking", async (req, res, next) => {
    try {
      const data = await getTestTeamRanking();
      res.json(data);
    } catch {
      (err) => {
        throw new Error(err.message);
      };
    }
  });
  
  router.get("/gett20PlayerBattingRanking", async (req, res ,next) => {
    try{
      const data = await getT20PlayerBattingRanking();
      res.json(data);
    }
    catch{
      err => {
        throw new Error(err.message);
      }
    }
  })
  
  router.get("/getOdiPlayerBattingRanking", async (req, res ,next) => {
    try{
      const data = await getODIPlayerBattingRanking();
      res.json(data);
    }
    catch{
      err => {
        throw new Error(err.message);
      }
    }
  })
  
  router.get("/getTestPlayerBattingRanking", async (req, res ,next) => {
    try{
      const data = await getTestPlayerBattingRanking();
      res.json(data);
    }
    catch{
      err => {
        throw new Error(err.message);
      }
    }
  })
  
  router.get("/gett20PlayerBowlingRanking", async (req, res ,next) => {
    try{
      const data = await getT20PlayerBowlingRanking();
      res.json(data);
    }
    catch{
      err => {
        throw new Error(err.message);
      }
    }
  })
  
  router.get("/getOdiPlayerBowlingRanking", async (req, res ,next) => {
    try{
      const data = await getODIPlayerBowlingRanking();
      res.json(data);
    }
    catch{
      err => {
        throw new Error(err.message);
      }
    }
  })
  
  router.get("/getTestPlayerBowlingRanking", async (req, res ,next) => {
    try{
      const data = await getTestPlayerBowlingRanking();
      res.json(data);
    }
    catch{
      err => {
        throw new Error(err.message);
      }
    }
  })

  module.exports = router;
