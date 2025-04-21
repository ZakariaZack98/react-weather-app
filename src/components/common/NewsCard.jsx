import React from 'react';

const NewsCard = ({ article }) => {
  const {
    urlToImage,
    title,
    source,
    publishedAt,
    url
  } = article;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full aspect-square"
    >
      <div className="h-2/3 w-full overflow-hidden relative">
        <img
          src={urlToImage || 'https://via.placeholder.com/300x200.png?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="h-1/3 p-3 flex flex-col justify-between">
        <h3 className="text-sm font-semibold line-clamp-3 text-gray-800">
          {title}
        </h3>
        <div className="text-xs text-gray-500 mt-2">
          {source?.name} • {formatDate(publishedAt)}
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
