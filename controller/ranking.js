const request = require("request-promise");
const cheerio = require("cheerio");

let ranking = {
  test: [],
  odi: [],
  t20: [],
};
const baseTeamRankingURL =
  "https://www.espncricinfo.com/rankings/content/page/211271.html";

const getTeamsRanking = async (link = baseTeamRankingURL) => {
  const { $ } = await getHtml(link);
  const rankingObj = await getRankingObj($);
  let testRanking = rankingObj.TEST.children;
  let odiRanking = rankingObj.ODI.children;
  let t20Ranking = rankingObj.T20I.children;
  ranking.odi = [];
  ranking.t20 = [];
  ranking.test = [];
  await makeList(testRanking, ranking.test, $);
  await makeList(odiRanking, ranking.odi, $);
  await makeList(t20Ranking, ranking.t20, $);
  return ranking;
};

const getTestTeamRanking = async (link = baseTeamRankingURL) => {
  const { $ } = await getHtml(link);
  const rankingObj = await getRankingObj($);
  let testRanking = rankingObj.TEST.children;
  ranking.test = [];
  await makeList(testRanking, ranking.test, $);
  return ranking.test;
};

const getODITeamRanking = async (link = baseTeamRankingURL) => {
  const { $ } = await getHtml(link);
  const rankingObj = await getRankingObj($);
  let odiRanking = rankingObj.ODI.children;
  ranking.odi = [];
  await makeList(odiRanking, ranking.odi, $);
  return ranking.odi;
};

const getT20TeamRanking = async (link = baseTeamRankingURL) => {
  const { $ } = await getHtml(link);
  const rankingObj = await getRankingObj($);
  let t20Ranking = rankingObj.T20I.children;
  ranking.t20 = [];
  await makeList(t20Ranking, ranking.t20, $);
  return ranking.t20;
};

/*-------------getTeamsRanking Utility Methods-------------*/
const getRankingObj = async ($) => {
  const ranking_html = await $(".StoryengineTable tbody:lt(3)");
  const rankingName = ["TEST", "ODI", "T20I"];
  let rankingHTMLOBJ = {};
  for (let index = 0; index < ranking_html.length; index++) {
    rankingHTMLOBJ[rankingName[index]] = ranking_html[index];
  }
  return rankingHTMLOBJ;
};

const getHtml = async (link) => {
  let html = await request.get(link);
  let $ = await cheerio.load(html);
  return { $, html };
};

const makeList = (type, rankingArr, $) => {
  for (let i = 2; i < type.length; i += 2) {
    let team = type[i].children;

    rankingArr.push({
      pos: $(team[1]).text(),
      team: $(team[3]).text(),
      matched: $(team[5]).text(),
      points: $(team[7]).text(),
      rating: $(team[9]).text(),
    });
  }
};
/*---------------end of getTeamsRaning utility Methods---------------*/

// const playerRankingBaseURL = "https://feed.cricket-rankings.com/feed/odi/batting/"

const getPlayerRanking = async (format, type, array) => {
  const { $ } = await getHtml(
    `https://feed.cricket-rankings.com/feed/${format}/${type}/`
  );
  const rankingDivs = await $(".rankings");

  for (let i = 0; i < rankingDivs.length; i++) {
    let test = rankingDivs[i];
    let temp = test.children;

    array.push({
      rank: $(temp[1]).text().trim(),
      name: $(temp[3]).text().trim(),
      country: $(temp[5]).text().trim(),
      rating: $(temp[7]).text().trim(),
    });
  }
  return array;
};

const getODIPlayerBattingRanking = async () =>{
  ranking.odi = [];
  const odiRanking =  await getPlayerRanking("odi" ,"batting" ,ranking.odi);
  return odiRanking;
}

const getT20PlayerBattingRanking = async () =>{
  ranking.t20 = [];
  const t20Ranking = await getPlayerRanking("t20","batting" , ranking.t20);
  return t20Ranking;
}

const getTestPlayerBattingRanking = async () => {
  ranking.test = [];
  const testRanking = await getPlayerRanking("test","batting" , ranking.test);
  return testRanking;
}

const getODIPlayerBowlingRanking = async () => {
  ranking.odi = [];
  const odiRanking = await getPlayerRanking("odi","bowling" ,ranking.odi);
  return odiRanking;
}
const getT20PlayerBowlingRanking = async () => {
  ranking.t20 = [];
  const t20Ranking = await getPlayerRanking("t20","bowling" ,ranking.t20);
  return t20Ranking;
}
const getTestPlayerBowlingRanking = async () => {
  ranking.test = [];
  const testRanking = await getPlayerRanking("test","bowling" ,ranking.test);
  return testRanking;
}

module.exports = {
  getODITeamRanking,
  getTeamsRanking,
  getTestTeamRanking,
  getT20TeamRanking,
  getODIPlayerBattingRanking,
  getT20PlayerBattingRanking,
  getTestPlayerBattingRanking,
  getODIPlayerBowlingRanking,
  getTestPlayerBowlingRanking,
  getT20PlayerBowlingRanking,

};
