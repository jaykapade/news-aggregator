import React, { useState } from "react";
import NewsCard from "../components/NewsCard";
import { searchArticles } from "../api/news";

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await searchArticles({ q: query });
    setArticles(data.articles);
  };

  return (
    <div>
      <h1>Search Articles</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for articles..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="articles">
        {articles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
