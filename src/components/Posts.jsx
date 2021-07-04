import React from "react";
import { Post } from "./Post";

import MoonLoader from "react-spinners/MoonLoader";

export const Posts = ({ posts, handleLikePost, loading, handleUnLikePost }) => {
  return (
    <div className="posts">
      {loading ? (
        <div
          style={{
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MoonLoader color="white" />
        </div>
      ) : (
        posts?.map((post) => (
          <Post
            key={post._id}
            post={post}
            handleLikePost={handleLikePost}
            handleUnLikePost={handleUnLikePost}
          />
        ))
      )}
    </div>
  );
};
