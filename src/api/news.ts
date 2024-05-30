import axios from "axios";

const NEWS_ORG_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const newsOrgApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    Authorization: `Bearer ${NEWS_ORG_API_KEY}`,
  },
});

const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    Authorization: `Bearer ${NEWS_ORG_API_KEY}`,
  },
});

export const getTopHeadlines = async (params: any) => {
  const response = await newsOrgApi.get("/top-headlines", { params });
  return response.data;
};

export const getAllStories = async (params: any) => {
  const response = await newsOrgApi.get("/everything", { params });
  return response.data;
};

export const getSources = async () => {
  const response = await newsOrgApi.get("/top-headlines/sources");
  return response.data;
};
