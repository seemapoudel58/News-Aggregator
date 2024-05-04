import React from 'react';
import { Link } from 'react-router-dom';

export const NewsTable = ({ news }) => {
  const filteredNews = news.filter(article => !article.title.includes('Removed'));

  return (
    filteredNews && filteredNews.length > 0 && (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white ">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Title</th>
              <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Feed URL</th>
              <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Published Date</th>
              <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.map((article) => (
              <tr key={article.url} className="hover:bg-gray-100">
                <td className="py-4 px-6 border text-left border-gray-200">{article.title}</td>
                <td className="py-4 px-6 border border-gray-200">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Read Article</a>
                </td>
                <td className="py-4 px-6 border border-gray-200">{article.publishedAt}</td>
                <td className="py-4 px-6 border border-gray-200">
                  <Link to={`/news/${encodeURIComponent(article.url)}`} className="text-indigo-600 hover:text-indigo-900">Read More</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};
