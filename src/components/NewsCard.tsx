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
    <article className="flex flex-col max-w-[24rem] shadow-md rounded-xl overflow-hidden hover:shadow-2xl ease-in-out">
      <img
        src={urlToImage}
        alt={title}
        className="object-cover h-[16rem] max-h-[16rem] min-h-[16rem]"
      />
      <div className="p-4 flex flex-col gap-1 h-full w-full">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-ellipsis text-md line-clamp-3">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-md"
        >
          Read more
        </a>
        <span className="text-sm text-gray-600 mt-auto ml-auto">
          Published on {new Date(publishedAt).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
};

export default NewsCard;
