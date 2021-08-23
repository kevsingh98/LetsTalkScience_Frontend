import React, { useState } from "react";
import BarLoader from "react-spinners/BarLoader";

export const CreatePost = ({
  text,
  onChangeText,
  handleCreatePost,
  loading,
}) => {
  const { user } = JSON.parse(localStorage.getItem("jwt"));

  return (
    <form className="post post--create">
      <div className="post__header">
        <img
          className="post__headerImage"
          src={user.avatar} alt="User Avatar" 
        />
        <h1 className="post__headerTitle">Create a post</h1>
      </div>

      <textarea
        className="post__content"
        id="createPostText"
        name="postText"
        placeholder="Type something..."
        value={text}
        onChange={(e) => onChangeText(e.target.value)}
        required
        spellCheck
      ></textarea>

      <div className="post__footer">
        <div></div>
        <button
          onClick={() => handleCreatePost()}
          disabled={loading}
          type="button"
          title="Post"
          className="button"
        >
          {loading ? (
            <BarLoader color={"#fff"} height={2} width={100} />
          ) : (
            <>
              Post
              <i className="button__icon icon material-icons">forward</i>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
