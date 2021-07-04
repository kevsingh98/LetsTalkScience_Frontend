import axios from "axios";

export const createAndUpdateProfile = async (data) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND}/api/profile`,
      data: data,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status === 401) {
      return { success: false, message: "Unable to update profile" };
    }

    return {
      success: true,
      data: response.data,
      message: "Successfully Updated Profile",
    };
  } catch (err) {
    return { success: false, message: "Unable to update profile", err };
  }
};

export const getProfile = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND}/api/profile/me`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status === 401) {
      return { success: false, message: "Unable to update profile" };
    }

    return {
      success: true,
      data: response.data,
      message: "Successfully Updated Profile",
    };
  } catch (err) {
    return { success: false, message: "Unable to update profile", err };
  }
};

export const getProfileById = async (userId) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND}/api/profile/user/${userId}`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status === 401) {
      return { success: false, message: "Unable to update profile" };
    }

    return {
      success: true,
      data: response.data,
      message: "Successfully Updated Profile",
    };
  } catch (err) {
    alert("Profile does not exist")
    return { success: false, message: "Unable to update profile", err };
  }
};

export const addExperience = async (data) => {
  try {
    const response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_BACKEND}/api/profile/experience`,
      data: data,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status === 401) {
      return { success: false, message: "Unable to update profile" };
    }

    return {
      success: true,
      data: response.data,
      message: "Successfully Updated Profile",
    };
  } catch (err) {
    return { success: false, message: "Unable to update profile", err };
  }
};

export const addEducation = async (data) => {
  try {
    const response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_BACKEND}/api/profile/education`,
      data: data,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status === 401) {
      return { success: false, message: "Unable to update profile" };
    }

    return {
      success: true,
      data: response.data,
      message: "Successfully Updated Profile",
    };
  } catch (err) {
    return { success: false, message: "Unable to update profile", err };
  }
};

export const deleteExperience = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BACKEND}/api/profile/experience/${id}`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status === 401) {
      return { success: false, message: "Unable to update profile" };
    }

    return {
      success: true,
      message: "Successfully Updated Profile",
    };
  } catch (err) {
    return { success: false, message: "Unable to update profile", err };
  }
};

export const deleteEducation = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BACKEND}/api/profile/education/${id}`,
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
    });

    if (response.status === 401) {
      return { success: false, message: "Unable to update profile" };
    }

    return {
      success: true,
      message: "Successfully Updated Profile",
    };
  } catch (err) {
    return { success: false, message: "Unable to update profile", err };
  }
};
