import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getTopHeadlines } from "../api/news";

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    getTopHeadlines({ country: "us" }).then((data) =>
      setArticles(data.articles)
    );
  }, []);

  return (
    <div>
      <h1>Top Headlines</h1>
      <div className="articles">
        {articles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
