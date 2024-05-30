import React, { useEffect, useRef, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getTopHeadlines } from "../api/news";
import Loader from "../components/Loader";

const HomePage: React.FC = () => {
  const loaderRef = useRef(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  console.log("🚀 ~ totalResults:", totalResults);
  const [query, setQuery] = useState({
    search: "",
    category: "",
    source: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    async function fetchData() {
      const params: any = { country: "us", pageSize: 20, page: offset };
      if (query.search) params["q"] = query.search;
      if (query.category) params["category"] = query.category;
      // if (query.source) params["sources"] = query.source;
      if (query.from) params["from"] = query.from;
      if (query.to) params["to"] = query.to;
      setIsLoading(true);
      try {
        const data = await getTopHeadlines(params);
        setArticles((prev) => [...prev, ...data.articles]);
        console.log("data", data);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, offset]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && offset * 16 < totalResults && !isLoading) {
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
            setOffset(1);
            setQuery((prev) => ({ ...prev, search: e.target.value }));
          }}
          placeholder="Search for articles..."
          className="p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="date"
          value={query.from}
          onChange={(e) => {
            setOffset(1);
            setQuery((prev) => ({ ...prev, from: e.target.value }));
          }}
          placeholder="Search for articles..."
          className="p-2 border border-gray-300 rounded min-w-[10rem]"
        />
        <input
          type="date"
          value={query.to}
          onChange={(e) => {
            setOffset(1);
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
          // onChange={(e) =>
          //   setQuery((prev) => ({ ...prev, category: e.target.value }))
          // }
          className="p-2 border border-gray-300 rounded flex-1 max-w-[24rem]"
        >
          <option value="newsapi.org">NewsApi.org</option>
          <option value="newsapi.com">NewsApi.com</option>
          <option value="guardian">Guardian</option>
          <option value="newyork">Newyork Times</option>
          <option value="gnews">GNews</option>
        </select>
        <button
          onClick={() => {
            setOffset(1);
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
