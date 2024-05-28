import React from "react";

type NewsCardProps = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
};

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
}) => {
  return (
    <div className="news-card">
      <img src={urlToImage} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
      <span>{new Date(publishedAt).toLocaleDateString()}</span>
    </div>
  );
};

export default NewsCard;
