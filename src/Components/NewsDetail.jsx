import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../utilities/config";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaUser, FaCalendarAlt } from "react-icons/fa";

const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const NewsDetail = () => {
  const { articleUrl } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((res) => {
        const foundArticle = res.data.articles.find(
          (article) => article.url === articleUrl
        );
        setArticle(foundArticle);
      })
      .catch((err) => {
        console.log("Error fetching article:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [articleUrl]);


  const toggleDescription = () =>{
    setDescription(!description);
  }

  return (
    <div className="container mx-auto py-8">
      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : article ? (
        <>
          <div className="mb-6 flex justify-end ">
            <Link to={"/"}>
              <button className= "  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Home
              </button>
            </Link>
          </div>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-9">{article.title}</h2>
            <p className="text-gray-700 mb-4">{article.content}</p>
            <div className="flex items-center mb-4">
              <FaInfoCircle className="text-blue-500 mr-2 cursor-pointer text-2xl" onClick={toggleDescription} />
              <span className="text-gray-700 font-semibold">Description</span>
            </div>
            {description && (
              <div className="bg-gray-100 p-4 mb-4 rounded">
                <p className="text-gray-700">{article.description}</p>
              </div>
            )}
            <div className="flex items-center text-gray-700 mb-4">
              <FaUser className="mr-2 text-xl" />
              <span className="font-semibold">{article.author}</span>
            </div>
            <div className="flex items-center text-gray-700 mb-2">
              <FaCalendarAlt className="mr-2 text-xl" />
              <span className="font-semibold">Published At: </span> {article.publishedAt}
            </div>
            <div className="text-gray-700 mt-8 mb-3">
              <span className="font-semibold">Source of news:</span> {article.source.name}
            </div>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read More</a>
          </div>
        </>
      ) : (
        <p className="text-red-500">Article not found</p>
      )}
    </div>
  );
};

export default NewsDetail;
