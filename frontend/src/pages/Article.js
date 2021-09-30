import React, { useState, useEffect } from 'react';
import articleContent from './article-content';
import NotFound from './NotFound';

const Article = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find((article) => article.name === name);

  const [articleInfo, setArticleInfo] = useState({ comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      console.log(body)
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);

  if (!article) return <NotFound />;
  return (
    <>
      <h1 className="sm:text-4xl text-2xl font-bold mt-6 mb-6 text-gray-600">
        {article.title}
      </h1>
      {article.content.map((paragraph, index) => (
        <p className="mx-auto reading-relaxed text-base mb-4" key={index}>
          {paragraph}
        </p>
      ))}
    </>
  )
}

export default Article;
