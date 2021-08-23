import React from "react";


export const NewsCard = ({ eachNews, handleRetweetPost }) => {
  console.log(eachNews);

  
  return (
    <div className="post post--news">
      <div className="post__header">
        <h1 className="post__headerTitle">{eachNews.name}</h1>
      </div>

      <div className="post__content">
        <div className="post__main">
          <img
            className="post__image"
            src={eachNews.image?.thumbnail.contentUrl}
          />
          <span className="post__description">
            <p>{eachNews.description}</p>
            <a
              className="link link--block"
              href={eachNews.url}
              target="_blank"
              rel="noreferrer"
            >
              Read full article.
            </a>
          </span>
        </div>
        <div className="post__source">
          <img
            alt="Popular Mechanics"
            width="30px"
            src={eachNews.provider[0].image.thumbnail.contentUrl}
          />
          <span style={{ marginLeft: "10px" }}>
            {eachNews.provider[0].name}
          </span>
        </div>
      </div>

      <div className="post__meta">
        <span> {Date(eachNews.datePublished)} </span>
      </div>

      <div className="post__footer">
        <div className="toolbar">
          <a
            className="toolbar__action"
            type="button"
            onClick={() => handleRetweetPost(eachNews.description)}
          >
            <i className="toolbar__actionIcon icon material-icons">autorenew</i>
            <span className="toolbar__actionName">Repost</span>
          </a>

          {/* <a className="toolbar__action" type="button" href="">
            <i className="toolbar__actionIcon icon material-icons">comment</i>
            <span className="toolbar__actionName">Comments</span>
          </a> */}

          <a className="toolbar__action" type="button" href="">
            <i className="toolbar__actionIcon icon material-icons">share</i>
            <span className="toolbar__actionName">Share</span>
          </a>
        </div>
      </div>
    </div>
  );
};
