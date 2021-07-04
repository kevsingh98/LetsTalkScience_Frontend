import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../utilities/generalUtilities";


export const Post = ({ post, handleLikePost, handleUnLikePost }) => {
  const history = useHistory();

  const isLiked = () => {
    let liked = false;

    post?.likes.map(
      (like) =>
        (liked =
          like.user == JSON.parse(localStorage.getItem("jwt")).user._id
            ? true
            : false)
    );

    return liked;
  };

  return (
    <div className="post" key={post._id}>
      <Link to={`/user/${post.user}`}>
      <div className="post__header">
        <a href="#">
          <img className="post__headerImage" src={post.avatar} />
        </a>
        <a href="#">
          <h1 className="post__headerTitle">{post.name}</h1>
        </a>
      </div>
      </Link>
      <div className="post__content">{post.text}</div>
      <div className="post__meta">
        <p>
          {post.likes.length} {post.likes.length > 1 ? "Likes " : "Like "}|{" "}
          {post.comments.length}{" "}
          {post.comments.length > 1 ? "Comments" : "Comment"}
        </p>

        <span>Posted on {formatDate(post.date)}</span>
      </div>

      <div className="post__footer">
        <div className="toolbar">
          <a
            onClick={() =>
              isLiked()
                ? handleUnLikePost(post?._id)
                : handleLikePost(post?._id)
            }
            className="toolbar__action"
            type="button"
            style={{
              backgroundColor: isLiked() ? "#535d67" : "",
              color: isLiked() ? "white" : "",
            }}
          >
            <i className="toolbar__actionIcon icon material-icons">thumb_up</i>
            <span className="toolbar__actionName">
              {isLiked() ? "Liked" : "Like"}
            </span>
          </a>

          <a className="toolbar__action" type="button" href="">
            <i className="toolbar__actionIcon icon material-icons">share</i>
            <span className="toolbar__actionName">Share</span>
          </a>

          <a
            className="toolbar__action"
            type="button"
            onClick={() => history.push(`/post/${post._id}`)}
          >
            <i className="toolbar__actionIcon icon material-icons">comment</i>
            <span className="toolbar__actionName">Comments</span>
          </a>
        </div>
      </div>
    </div>
  );
};
