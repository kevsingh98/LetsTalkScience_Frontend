import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { getAllPosts, likePost } from "../services/PostService";
import BarLoader from "react-spinners/BarLoader";

import { Post } from "../components/Post";
import { formatDate } from "../utilities/generalUtilities";
import Headers from "../components/Headers";

export const ExploreInterests = () => {
  const [posts, setPosts] = useState();
  const [tags, setTags] = useState([
    "science",
    "nasa",
    "astrology",
    "space",
    "universe",
  ]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllPostsAPI();
  }, []);

  const getAllPostsAPI = async () => {
    setLoading(true);
    const response = await getAllPosts();
    if (response.success) {
      setPosts(response.posts);
      setSortedPosts(response.posts);
      // getTags(response.posts);
      setLoading(false);
    }
  };

  const handleLikePost = async (id) => {
    setLoading(true);
    const response = await likePost(id);
    if (response.success) {
      setLoading(false);
      getAllPostsAPI();
    } else {
      alert(response.message);
    }
  };

  let x = [];

  const getTags = (posts) => {
    const tagsFromPosts = posts.map((post) =>
      post.tags.map((tag) => {
        x.push(tag);
      })
    );
    console.log(x);
    let uniqueArray = x.filter(function (item, pos) {
      return x.indexOf(item) == pos;
    });
    setTags(uniqueArray);
  };

  let y = [];
  const sortByTags = (postTag) => {
    posts.map((post) =>
      post.tags.map((tag) => {
        if (tag == postTag) {
          y.push(post);
        }
      })
    );
    console.log(y);
    setSortedPosts(y);
  };

  return (
    <div>
      <Headers />
      <section className="template__body">
        <Sidebar route="explore__interests" />

        {/* Content */}
        <div className="content">
          {sortedPosts && !loading ? (
            <div>
              <div className="tags">
                {tags.map((tag) => (
                  <div className="tag" onClick={() => sortByTags(tag)}>
                    #{tag.slice(0, 15)}
                  </div>
                ))}
              </div>
              {sortedPosts.map((post) => (
                <Post
                  id={post._id}
                  post={post}
                  handleLikePost={handleLikePost}
                  key={post._id}
                />
              ))}
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </section>
    </div>
  );
};
