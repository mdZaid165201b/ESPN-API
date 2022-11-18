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

  await makeList(testRanking, ranking.test, $);
  await makeList(odiRanking, ranking.odi, $);
  await makeList(t20Ranking, ranking.t20, $);
  return ranking;
};

const getTestTeamRanking = async (link = baseTeamRankingURL) => {
  const { $ } = await getHtml(link);
  const rankingObj = await getRankingObj($);
  let testRanking = rankingObj.TEST.children;
  await makeList(testRanking, ranking.test, $);
  return ranking.test;
};

const getODITeamRanking = async (link = baseTeamRankingURL) => {
  const { $ } = await getHtml(link);
  const rankingObj = await getRankingObj($);
  let odiRanking = rankingObj.ODI.children;
  await makeList(odiRanking, ranking.odi, $);
  return ranking.odi;
};

const getT20TeamRanking = async (link = baseTeamRankingURL) => {
  const { $ } = await getHtml(link);
  const rankingObj = await getRankingObj($);
  let t20Ranking = rankingObj.T20I.children;
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


module.exports = {
  getODITeamRanking,
  getTeamsRanking,
  getTestTeamRanking,
  getT20TeamRanking,
};
