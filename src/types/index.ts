export type ArticleProps = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author?: string;
};

export type QueryProps = {
  search: string;
  category: string;
  source: string;
  from: string;
  to: string;
  pageSize: number;
  page: number;
};
