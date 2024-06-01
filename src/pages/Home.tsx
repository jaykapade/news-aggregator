import React, { useEffect, useRef, useState } from "react";

import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

import { getNews } from "../api/news";
import { debounce } from "../utils";
import { ArticleProps, QueryProps } from "../types";
import EmptyState from "../components/EmptyState";

const PAGE_SIZE = 5;

const sources = [
  { label: "NewsApi.org", value: "newsOrgApi" },
  { label: "NewsApi.com", value: "newsApi" },
  { label: "The New York Times", value: "newyorkApi" },
  { label: "The Guardian", value: "guardianApi" },
];

const baseQuery = {
  search: "",
  category: "",
  source: "guardianApi",
  from: "",
  to: "",
  pageSize: PAGE_SIZE,
  page: 1,
};

const HomePage: React.FC = () => {
  const loaderRef = useRef(null);
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState<QueryProps>(baseQuery);

  const handleFilterChange = (key: string, value: string) => {
    if (key === "source") setArticles([]);
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const debouncedFilterChange = debounce(handleFilterChange, 500);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getNews(query);
        setArticles(data.articles);
        console.log("data", data);
        setOffset(1);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getNews({ ...query, page: offset });
        setArticles((prev) => [...prev, ...data.articles]);
        console.log("data", data);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (offset > 1) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        offset * PAGE_SIZE < totalResults &&
        !isLoading
      ) {
        setOffset((prev) => prev + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loaderRef.current);
      }
    };
  }, [totalResults, offset, isLoading]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-4xl font-semibold">News App</h1>
      <div className="flex gap-2 flex-wrap">
        <input
          type="search"
          onChange={(e) => debouncedFilterChange("search", e.target.value)}
          placeholder="Search for articles..."
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="date"
          value={query.from}
          onChange={(e) => handleFilterChange("from", e.target.value)}
          placeholder="Pubished After"
          className="p-2 border border-gray-300 rounded min-w-[10rem]"
          max={query.to || new Date().toISOString().split("T")[0]}
        />
        <input
          type="date"
          value={query.to}
          onChange={(e) => handleFilterChange("to", e.target.value)}
          placeholder="Published Before"
          className="p-2 border border-gray-300 rounded min-w-[10rem]"
          min={query.from || new Date().toISOString().split("T")[0]}
        />
        <select
          value={query.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="p-2 border border-gray-300 rounded flex-1 max-w-[24rem]"
          disabled={query.source === "guardianApi"}
        >
          <option value="">Select a Category</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
        <select
          value={query.source}
          onChange={(e) => handleFilterChange("source", e.target.value)}
          className="p-2 border border-gray-300 rounded flex-1 max-w-[24rem]"
        >
          <option value="">
            {sources.find((s) => s.value === query.source)?.label ||
              "Select a Source"}
          </option>
          {sources
            .filter((s) => s.value !== query.source)
            .map((source) => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
        </select>
        <button
          onClick={() => {
            setQuery({ ...baseQuery, page: query.page });
          }}
          className="p-2 border border-gray-300 rounded w-full max-w-[8rem]"
        >
          Clear Filters
        </button>
      </div>
      {articles?.length < 1 && !isLoading && <EmptyState />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {articles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
      <div ref={loaderRef}>{isLoading && <Loader />}</div>
    </div>
  );
};

export default HomePage;
