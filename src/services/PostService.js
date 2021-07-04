import axios from "axios";

export const getAllPosts = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND}/api/posts`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status == 401) {
      return { success: false, message: "Token is not valid." };
    }

    return { success: true, posts: response.data };
  } catch (err) {
    return { success: false, message: "Unable to get posts" };
  }
};

export const createPost = async (text, tags) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/api/posts`,
      data: { text, tags },
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status == 401) {
      return { success: false, message: "Token is not valid." };
    }

    return { success: true, message: "Successfully created post" };
  } catch (err) {
    return { success: false, message: "Unable to create post" };
  }
};

export const likePost = async (id) => {
  try {
    const response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_BACKEND}/api/posts/like/${id}`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status == 401) {
      return { success: false, message: "Token is not valid." };
    }

    if (response.status == 400) {
      return { success: false, message: "Post already liked" };
    }

    return { success: true, message: "Successfully liked post" };
  } catch (err) {
    return { success: false, message: "Unable to like post" };
  }
};

export const unLikePost = async (id) => {
  try {
    const response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_BACKEND}/api/posts/unlike/${id}`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status == 401) {
      return { success: false, message: "Token is not valid." };
    }

    if (response.status == 400) {
      return { success: false, message: "Post already Unliked" };
    }

    return { success: true, message: "Successfully unliked post" };
  } catch (err) {
    return { success: false, message: "Unable to unlike post" };
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND}/api/posts/${id}`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status == 401) {
      return { success: false, message: "Token is not valid." };
    }

    if (response.status == 404) {
      return { success: false, message: "Post not found" };
    }

    return { success: true, post: response.data };
  } catch (err) {
    return { success: false, message: "Unable to get post" };
  }
};

export const deletePostById = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BACKEND}/api/posts/${id}`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status == 401) {
      return { success: false, message: "Token is not valid." };
    }

    if (response.status == 404) {
      return { success: false, message: "Post not found" };
    }

    return { success: true, post: response.data };
  } catch (err) {
    return { success: false, message: "Unable to delete post" };
  }
};

export const createCommentById = async (id, comment) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/api/posts/comment/${id}`,
      data: {
        text: comment,
      },
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status == 401) {
      return { success: false, message: "Token is not valid." };
    }

    if (response.status == 404) {
      return { success: false, message: "Post not found" };
    }

    return { success: true, message: "Successfully Commented post" };
  } catch (err) {
    return { success: false, message: "Unable to Comment post" };
  }
};

export const deleteCommentById = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BACKEND}/api/posts/comment/${id}`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status == 401) {
      return { success: false, message: "Token is not valid." };
    }

    if (response.status == 404) {
      return { success: false, message: "Post not found" };
    }

    return { success: true, message: "Successfully Deleted comment" };
  } catch (err) {
    return { success: false, message: "Unable to delete comment" };
  }
};
