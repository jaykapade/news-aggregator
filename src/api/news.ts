import axios from "axios";

const NEWS_ORG_API_KEY = import.meta.env.VITE_NEWS_API_ORG_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWSYORK_TIMES_API_KEY = import.meta.env.VITE_NEWSYORK_TIMES_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

const newsOrgApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    Authorization: `Bearer ${NEWS_ORG_API_KEY}`,
  },
});

const newsApi = axios.create({
  baseURL: "https://api.thenewsapi.com/v1/",
  headers: {
    Authorization: `Bearer ${NEWS_API_KEY}`,
  },
});

const newyorkApi = axios.create({
  baseURL: "https://api.nytimes.com",
});

const guardianApi = axios.create({
  baseURL: "https://content.guardianapis.com",
});

export const getNews = async (query: any) => {
  const { source } = query;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { country: "us", page: 1, language: "en" };
  if (source === "newsOrgApi") {
    if (query.search) params["q"] = query.search;
    if (query.category) params["category"] = query.category;
    if (query.from) params["from"] = query.from;
    if (query.to) params["to"] = query.to;
    if (query.page) params["page"] = query.page;
    if (query.pageSize) params["pageSize"] = query.pageSize;
    const response = await newsOrgApi.get("/top-headlines", { params });
    return response.data;
  } else if (source === "newsApi") {
    if (query.search) params["search"] = query.search;
    if (query.category) params["categories"] = query.category;
    if (query.from) params["published_after"] = query.from;
    if (query.to) params["published_before"] = query.to;
    if (query.page) params["page"] = query.page;
    if (query.pageSize) params["pageSize"] = query.pageSize;
    const response: any = await newsApi.get("/news/all", { params });
    const formattedData = (response.data?.data || [])?.map((item: any) => {
      const {
        title = "",
        description = "",
        url = "",
        image_url = "",
        published_at = "",
        source = "",
      } = item;
      return {
        title,
        description,
        url,
        urlToImage: image_url,
        publishedAt: published_at,
        author: source,
      };
    });
    return {
      articles: formattedData,
      totalResults: response?.data?.meta?.found || 0,
    };
  } else if (source === "newyorkApi") {
    params["api-key"] = NEWSYORK_TIMES_API_KEY;
    if (query.search) params["q"] = query.search;
    if (query.from) params["begin_date"] = query.from;
    if (query.to) params["end_date"] = query.to;
    if (query.page) params["page"] = query.page;
    if (query.pageSize) params["limit"] = query.pageSize;
    const response = await newyorkApi.get("/svc/search/v2/articlesearch.json", {
      params,
    });
    const formattedData = response?.data?.response?.docs.map((item: any) => {
      const {
        headline: { main = "" } = {},
        abstract = "",
        web_url = "",
        lead_paragraph = "",
        source = "",
        multimedia = [],
        pub_date = "",
      } = item;
      return {
        title: main || abstract,
        description: lead_paragraph,
        url: web_url,
        urlToImage: multimedia?.[0]?.url
          ? `https://static01.nyt.com/${multimedia?.[0]?.url}`
          : "",
        publishedAt: pub_date,
        author: source,
      };
    });
    return {
      articles: formattedData,
      totalResults: response?.data?.response?.meta?.hits || 0,
    };
  } else {
    params["api-key"] = GUARDIAN_API_KEY;
    if (query.search) params["q"] = query.search;
    if (query.from) params["from-date"] = query.from;
    if (query.to) params["to-date"] = query.to;
    if (query.page) params["page"] = query.page;
    if (query.pageSize) params["page-size"] = query.pageSize;
    const response = await guardianApi.get("/search", {
      params,
    });
    console.log("🚀 ~ response:", response);
    const formattedData = response?.data?.response?.results.map((item: any) => {
      const { webTitle = "", webUrl = "", webPublicationDate = "" } = item;
      return {
        title: webTitle,
        description: webTitle,
        url: webUrl,
        urlToImage: "",
        publishedAt: webPublicationDate,
        author: "",
      };
    });
    return {
      articles: formattedData,
      totalResults: response?.data?.response?.total || 0,
    };
  }
};

export const getAllStories = async (params: any) => {
  const response = await newsOrgApi.get("/everything", { params });
  return response.data;
};

export const getSources = async () => {
  const response = await guardianApi.get("/search");
  return response.data;
};
