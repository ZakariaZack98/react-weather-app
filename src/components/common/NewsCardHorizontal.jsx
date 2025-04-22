import React from 'react';

const NewsCardHorizontal = ({ article }) => {
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
      className="block w-full aspect-[2/1] rounded-xl overflow-hidden group"
    >
      <div className="relative w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundImage: `url(${urlToImage || 'https://via.placeholder.com/600x300.png?text=No+Image'})`
          }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.0) 100%)'
          }}
        />
        <div className="absolute bottom-0 w-full p-4 text-white z-10">
          <h3 className="text-base font-semibold leading-tight line-clamp-2">
            {title}
          </h3>
          <div className="text-xs text-gray-300 mt-1">
            {source?.name} • {formatDate(publishedAt)}
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCardHorizontal;
