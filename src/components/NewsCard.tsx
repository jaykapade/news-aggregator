import React from "react";

import { ArticleProps } from "../types";

const NewsCard: React.FC<ArticleProps> = ({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  author = "",
}) => {
  const dateAndAuthor = `${new Date(publishedAt).toLocaleDateString()} ${
    author ? `| ${author}` : ""
  }`;
  return (
    <article className="flex flex-col max-w-[24rem] shadow-md rounded-xl overflow-hidden hover:shadow-2xl ease-in-out gap-2">
      <img
        src={urlToImage || "https://placehold.co/600x400"}
        alt={title}
        className="object-cover h-[16rem] max-h-[16rem] min-h-[16rem]"
      />
      <span className="text-sm  px-2">{dateAndAuthor}</span>
      <div className="px-2 pb-4 flex flex-col gap-1 h-full w-full">
        <h2
          className="text-xl font-semibold text-ellipsis line-clamp-3"
          title={title}
        >
          {title}
        </h2>
        <p className="text-ellipsis text-md line-clamp-3">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-md"
        >
          Read more
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
