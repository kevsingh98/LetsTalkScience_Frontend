import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import { NewsCard } from "../components/NewsCard";
import { Sidebar } from "../components/Sidebar";
import { getNews } from "../services/NewsService";
import { createPost } from "../services/PostService";

const News = () => {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false);

  useEffect(() => {
    getNewsAPI();
  }, []);

  const getNewsAPI = async () => {
    setLoading(true);
    const response = await getNews();
    setNews(response.news);
    setLoading(false);
  };

  // Same endpoint for Retweet and Comment
  const handleRetweetPost = async (text) => {
    setIsLoadingCreatePost(true);

    const response = await createPost(text);
    console.log(response);

    if (response.success) {
      setText("");
      setIsLoadingCreatePost(false);
    } else {
      setIsLoadingCreatePost(false);
      setError(true);
      alert("Unable to create posts");
    }
  };

  return (
    <div>
      <Headers />
      <section className="template__body">
        <Sidebar route="news" />
        <section className="content">
          {news?.map((eachNews) => (
            <NewsCard
              eachNews={eachNews}
              handleRetweetPost={handleRetweetPost}
            />
          ))}
        </section>
      </section>
    </div>
  );
};

export default News;
