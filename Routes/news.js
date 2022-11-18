const request = require("request-promise");
const cheerio = require("cheerio");

const getLatestNews = async (
  link = "https://www.espncricinfo.com/latest-cricket-news",
  pageNo = 1
) => {
  let ESPNNews = {
    data: [],
  };
  const baseImageURL =
    "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_960/lsci";
  const basePostURL = "https://www.espncricinfo.com";
  const postedTime = [];
  const newsLinks = [];

  const html = await request.get(link);
  const $ = await cheerio.load(html);

  let mainContentDiv = await $(".ds-bg-fill-content-prime")[1];
  let divArray = await mainContentDiv.children[0].children;

  for (let i = 0; i < divArray.length; i++) {
    let time = await $(divArray[i]).find("span").first().text();
    if (time !== "") {
      await postedTime.push(time);
    }
  }

  for (let i = 0; i < divArray.length; i++) {
    let link = await $(divArray[i]).find("a").attr("href");
    if (link !== undefined) {
      newsLinks.push(`${basePostURL}${link}`);
    }
  }

  let json = await $("#__NEXT_DATA__").text();
  let data = await JSON.parse(json);
  data = await data.props.appPageProps.data.data.content.stories.results;

  await data.forEach((element, index) => {
    const formatedImageURL = baseImageURL + element.image.peerUrls.FILM;
    ESPNNews.data.push({
      id: element.id,
      postedAt: postedTime[index],
      postedBy: element.byline,
      title: element.title,
      summary: element.summary,
      images: formatedImageURL,
      newsURL: newsLinks[index],
    });
  });
  return await ESPNNews.data;
};

module.exports = { getLatestNews };
