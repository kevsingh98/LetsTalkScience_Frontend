import { format, set } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  createPost,
  getAllPosts,
  likePost,
  unLikePost,
} from "../services/PostService";
import CommentModel from "./CommentModel";
import { CreatePost } from "./CreatePost";
import Headers from "./Headers";
import { Posts } from "./Posts";
import { Sidebar } from "./Sidebar";

export const Home = () => {
  const [posts, setPosts] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);

  const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);

    const response = await getAllPosts();

    if (response.success) {
      setPosts(response.posts);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const handleCreatePost = async () => {
    setTags([]);
    setIsLoadingCreatePost(true);

    const r = text.split("#");
    console.log(r);

    let _tags = [];

    r.map((word) => {
      if (r[0] !== word) {
        word = word.replace(" ", "");
        word = word.replace("\n", "");
        _tags.push(word);
      }
    });
    setTags(_tags);

    const response = await createPost(text, _tags);
    console.log(response);

    if (response.success) {
      setText("");
      getPosts();
      setIsLoadingCreatePost(false);
    } else {
      setIsLoadingCreatePost(false);
      setError(true);
      setTags([]);
      alert("Unable to create posts");
    }
  };

  const handleLikePost = async (id) => {
    const response = await likePost(id);
    if (response.success) {
      getPosts();
      setLoading(false);
    } else {
      alert(response.message);
    }
  };

  const handleUnLikePost = async (id) => {
    const response = await unLikePost(id);
    if (response.success) {
      getPosts();
      setLoading(false);
    } else {
      alert(response.message);
    }
  };

  return (
    <div>
      <Headers />
      {/* <CommentModel /> */}
      <section className="template__body">
        <Sidebar route="home" />
        <section className="content">
          <CreatePost
            text={text}
            onChangeText={(value) => setText(value)}
            handleCreatePost={handleCreatePost}
            loading={isLoadingCreatePost}
          />
          <Posts
            posts={posts}
            loading={loading}
            handleLikePost={handleLikePost}
            handleUnLikePost={handleUnLikePost}
          />
        </section>
      </section>
    </div>
  );
};
