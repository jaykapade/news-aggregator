import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getTopHeadlines } from "../api/news";

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    getTopHeadlines({ country: "in" }).then((data) =>
      setArticles(data.articles)
    );
  }, []);

  return (
    <div className="p-4">
      <h1>Top Headlines</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
