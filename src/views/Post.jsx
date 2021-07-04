import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Sidebar } from "../components/Sidebar";
import {
  createCommentById,
  getPostById,
  likePost,
} from "../services/PostService";

import BarLoader from "react-spinners/BarLoader";
import MoonLoader from "react-spinners/MoonLoader";
import { formatDate } from "../utilities/generalUtilities";
import { Link } from "react-router-dom";
import { logout } from "../services/AuthService";

export const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(null);

  const { user } = JSON.parse(localStorage.getItem("jwt"));
  const [isOpen, setIsOpen] = useState(false);

  const { postId } = useParams();

  useEffect(() => {
    getPostByIdAPI();
    isLiked();
  }, [commentLoading]);

  const getPostByIdAPI = async () => {
    setLoading(true);
    const response = await getPostById(postId);
    if (response.post?.comments?.length > 6) {
      setShowComments(5);
    } else {
      setShowComments(response.post?.comments?.length);
    }

    setPost(response.post);

    setLoading(false);
  };

  const handleLikePost = async (id) => {
    const response = await likePost(id);
    if (response.success) {
      setLoading(false);
      getPostByIdAPI();
    } else {
      alert(response.message);
    }
  };

  const createCommentAPI = async (e, id) => {
    setComment("");

    e.preventDefault();
    setCommentLoading(true);
    const response = await createCommentById(id, comment);
    if (!response.success) {
      alert("Not able to create comment");
    }

    setCommentLoading(false);
  };

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
    <div>
      <section className="template__header">
        <header className="header">
          <Link to="/home">
            <img className="header__logo" src="./images/logo--white.svg" />
          </Link>

          <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
            <div className="header__profile dropdown__trigger">
              <div className="header__profileName">
                Hello, <p>{user.name}</p>
              </div>
              <img className="header__profilePicture" src={user.avatar} />
              <i className="icon material-icons">arrow_drop_down</i>
            </div>

            <div
              className="dropdown__content"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <ul className="list">
                <li>
                  <Link to="/profile" className="list__item">
                    <i className="icon material-icons">person</i>
                    <span>My Profile</span>
                  </Link>
                </li>

                <li onClick={logout}>
                  <Link className="list__item" to="/">
                    <i className="icon material-icons">logout</i>
                    <span>Log out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </section>

      <section className="template__body">
        <Sidebar route="home" />

        <div className="post__page">
          {loading && !post ? (
            <div
              style={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <MoonLoader color="white" />
            </div>
          ) : (
            <div className="post" key={post?._id} style={{ margin: "30px" }}>
              <div className="post__header">
                <a href="#">
                  <img className="post__headerImage" src={post?.avatar} />
                </a>
                <a href="#">
                  <h1 className="post__headerTitle">{post?.name}</h1>
                </a>
              </div>
              <div className="post__content">{post?.text}</div>
              <div className="post__meta">
                <p>
                  {post?.likes.length}{" "}
                  {post?.likes.length > 1 ? "Likes " : "Like "}|{" "}
                  {post?.comments.length}{" "}
                  {post?.comments.length > 1 ? "Comments" : "Comment"}
                </p>

                {post?.date && <span>Posted on {formatDate(post?.date)}</span>}
              </div>

              <div className="post__footer">
                <div className="toolbar">
                  <a
                    onClick={() => handleLikePost(post?._id)}
                    className="toolbar__action"
                    type="button"
                    style={{
                      backgroundColor: isLiked() ? "#535d67" : "",
                      color: isLiked() ? "white" : "",
                    }}
                  >
                    <i className="toolbar__actionIcon icon material-icons">
                      thumb_up
                    </i>
                    <span className="toolbar__actionName">
                      {isLiked() ? "Liked" : "Like"}
                    </span>
                  </a>

                  <a className="toolbar__action" type="button" href="">
                    <i className="toolbar__actionIcon icon material-icons">
                      share
                    </i>
                    <span className="toolbar__actionName">Share</span>
                  </a>
                </div>
              </div>

              <div className="post__comments">
                <>
                  <form
                    className="form"
                    onSubmit={(e) => createCommentAPI(e, post?._id)}
                  >
                    <input
                      placeholder={`Add a comment on ${post?.text.substring(
                        0,
                        30
                      )}...`}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={commentLoading}
                      style={{
                        background: commentLoading ? "grey" : "",
                        border: commentLoading ? "none" : "",
                      }}
                    >
                      {commentLoading ? "Commenting..." : "Comment"}
                    </button>
                  </form>

                  {post?.comments.slice(0, showComments).map((comment) => (
                    <div className="post__comments__section">
                      <div className="post__comment">
                        <div>
                          <img src={comment.avatar} />
                          <div className="post__text">
                            <h1>{comment.name}</h1>
                            <p>{comment.text}</p>
                          </div>
                        </div>
                        <p className="comment__date">
                          {formatDate(comment.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {post?.comments.length > 4 ? (
                    showComments === post?.comments.length ? (
                      <button
                        className="show__more"
                        onClick={() => setShowComments(5)}
                      >
                        Show Less
                        <i className="icon material-icons">
                          keyboard_arrow_up_icon
                        </i>
                      </button>
                    ) : (
                      <button
                        className="show__more"
                        onClick={() => setShowComments(post?.comments.length)}
                      >
                        Show{" "}
                        {post?.comments.length > 6
                          ? post?.comments.length - showComments
                          : ""}{" "}
                        more
                        <i className="icon material-icons">arrow_drop_down</i>
                      </button>
                    )
                  ) : (
                    ""
                  )}
                </>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
