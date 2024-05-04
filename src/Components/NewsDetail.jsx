import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../utilities/config";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const NewsDetail = () => {
  const { articleUrl } = useParams();
  console.log("Article URL:", articleUrl);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("API Response:", res.data);
        const foundArticle = res.data.articles.find(
          (article) => article.url === articleUrl
        );
        console.log("Found Article:", foundArticle);
        setArticle(foundArticle);
      })
      .catch((err) => {
        console.log("Error fetching article:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [articleUrl]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : article ? (
        <>
          <div>
            <Link to={"/"}>
              <button> Home </button>
            </Link>
          </div>
          <div>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>{article.description}</p>
            <p>Published At: {article.publishedAt}</p>
            <p>source of news: {article.source.name}</p>
            <p>Author: {article.author}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
};

export default NewsDetail;
