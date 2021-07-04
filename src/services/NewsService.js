import axios from "axios";

export const getNews = async () => {
  try {
    const response = await axios({
      method: "get",
      url:
        "https://bing-news-search1.p.rapidapi.com/news?mkt=en-US&safeSearch=Off&category=science&textFormat=Raw",
      headers: {
        "accept-language": "en",
        "x-bingapis-sdk": "true",
        "x-rapidapi-key": "9bebe1d516msha361dedfc95e4a8p1e93a9jsn5f42a6124aa2",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      },
    });

    if (response.status !== 200) {
      return { success: false, message: "Unable to access Posts" };
    }

    return { success: true, news: response.data.value };
  } catch (err) {
    return { success: false, message: "Unable to signin" };
  }
};
