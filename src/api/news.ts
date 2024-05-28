import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getTopHeadlines = async (params: any) => {
  const response = await newsApi.get("/top-headlines", { params });
  return response.data;
};

export const searchArticles = async (params: any) => {
  const response = await newsApi.get("/everything", { params });
  return response.data;
};
