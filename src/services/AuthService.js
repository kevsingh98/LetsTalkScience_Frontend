import axios from "axios";

// Authenticate User
export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return localStorage.getItem("jwt");
  } else {
    return false;
  }
};

export const logout = () => {
  localStorage.clear();
  window.location = "/";
};

// Login User
export const login = async (data) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/api/auth`,
      data: data,
      headers: {
        "x-auth-token": process.env.REACT_APP_API_KEY,
      },
    });

    if (!response) {
      return { success: false, message: "Unable to signin" };
    }

    localStorage.setItem("jwt", JSON.stringify(response.data));
    return { success: true, token: response.data };
  } catch (err) {
    return { success: false, message: "Unable to signin" };
  }
};

// Login User
export const register = async (data) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/api/users`,
      data: data,
    });

    if (!response) {
      return { success: false, message: "Unable to signin" };
    }

    localStorage.setItem("jwt", JSON.stringify(response.data));
    return { success: true, token: response.data };
  } catch (err) {
    return { success: false, message: "Unable to signin" };
  }
};
