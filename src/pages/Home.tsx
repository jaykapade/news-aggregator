import React, { useEffect, useRef, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getNews } from "../api/news";
import Loader from "../components/Loader";

const HomePage: React.FC = () => {
  const PAGE_SIZE = 5;
  const loaderRef = useRef(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState<any>({
    search: "",
    category: "",
    source: "gaurdianAPI",
    from: "",
    to: "",
    pageSize: PAGE_SIZE,
    page: 1,
  });

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
          value={query.search}
          onChange={(e) => {
            setQuery((prev) => ({ ...prev, search: e.target.value }));
          }}
          placeholder="Search for articles..."
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="date"
          value={query.from}
          onChange={(e) => {
            setQuery((prev) => ({ ...prev, from: e.target.value }));
          }}
          placeholder="Search for articles..."
          className="p-2 border border-gray-300 rounded min-w-[10rem]"
        />
        <input
          type="date"
          value={query.to}
          onChange={(e) => {
            setQuery((prev) => ({ ...prev, to: e.target.value }));
          }}
          placeholder="Search for articles..."
          className="p-2 border border-gray-300 rounded min-w-[10rem]"
        />
        <select
          value={query.category}
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, category: e.target.value }))
          }
          className="p-2 border border-gray-300 rounded flex-1 max-w-[24rem]"
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
          onChange={(e) =>
            setQuery((prev: any) => ({ ...prev, source: e.target.value }))
          }
          className="p-2 border border-gray-300 rounded flex-1 max-w-[24rem]"
        >
          <option value="newsOrgApi">NewsApi.org</option>
          <option value="newsApi">NewsApi.com</option>
          <option value="guardian">Guardian</option>
          <option value="newyorkApi">Newyork Times</option>
        </select>
        <button
          onClick={() => {
            setQuery({
              search: "",
              category: "",
              source: "",
              from: "",
              to: "",
            });
          }}
          className="p-2 border border-gray-300 rounded w-full max-w-[8rem]"
        >
          Clear Filters
        </button>
      </div>
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
