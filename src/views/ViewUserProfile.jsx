import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { logout } from "../services/AuthService";
import { createAndUpdateProfile, getProfile, getProfileById } from "../services/ProfileService";
import { formatDate } from "../utilities/generalUtilities";

export const ViewUserProfile = () => {
  const history = useHistory();
  const [profileData, setProfileData] = useState({
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    githubusername: "",
    skills: [],
    experience: [],
    education: [],
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    social: {},
  });

  const { user } = JSON.parse(localStorage.getItem("jwt"));
  const [isOpen, setIsOpen] = useState(false);
  const {id} = useParams()
  console.log(id)


  useEffect(async () => {
    const response = await getProfileById(id);
    const data = response.data;
    console.log(response);
    setProfileData({ ...profileData, ...data });
  }, []);

  const createProfile = async () => {
    const response = await createAndUpdateProfile();
    console.log(response);
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
        <nav className="sideNavigation">
          <a
            className="sideNavigation__item sideNavigation__item--active"
            onClick={(e) => history.push("/home")}
          >
            <i className="icon material-icons">home</i>
            <span> Home </span>
          </a>
          <a className="sideNavigation__item" 
            onClick={(e) => history.push("/news")}

          >
            <i className="icon material-icons">trending_up</i>
            <span> Trending News </span>
          </a>
          <a className="sideNavigation__item" 
            onClick={(e) => history.push("/explore")}

          >
            <i className="icon material-icons">search</i>
            <span> Explore Interests </span>
          </a>
        </nav>
        <section className="content">
          <h1>{profileData?.user?.name}</h1>
          <section className="profile">
            <div className="profile__image">
              <img src="https://via.placeholder.com/100/" />
              <p>
                <span>{profileData?.user?.name}</span>
              </p>
            </div>

            <div className="profile__experience">
              <h2>General</h2>

              <div className="form__split">
                <label for="title">Company:</label>
                <p>{profileData.company}</p>
              </div>
              <div className="form__split">
                <label for="company">Website:</label>
                <p>{profileData.website}</p>
              </div>
              <div className="form__split">
                <label for="location">Location:</label>
                <p>{profileData.location}</p>
              </div>
              <div className="form__split">
                <label for="startdate">Status:</label>
                <p>{profileData.status}</p>
              </div>
              <div className="form__split">
                <label for="title">Skills:</label>
                <p>
                  {profileData.skills.map(
                    (skill, index) =>
                      `${skill}${
                        index !== profileData.skills.length - 1 ? ", " : ""
                      }`
                  )}
                </p>
              </div>
              <div className="form__split">
                <label for="title">Bio:</label>
                <p>{profileData.bio}</p>
              </div>
              <div className="form__split">
                <label for="title">Github Username:</label>
                <p>{profileData.githubusername}</p>
              </div>
            </div>

            <div className="profile__experience">
              {profileData.education.map((education, index) => (
                <>
                  <h2 style={{ marginTop: "30px" }}>Education {index + 1}</h2>

                  <div className="form__split">
                    <label for="title">School:</label>
                    {education.school}
                  </div>
                  <div className="form__split">
                    <label for="company">Degree:</label>
                    {education.degree}
                  </div>
                  <div className="form__split">
                    <label for="location">Field of Study:</label>
                    {education.fieldofstudy}
                  </div>
                  <div className="form__split">
                    <label for="startdate">From:</label>
                    {formatDate(education.from)}
                  </div>
                  <div className="form__split">
                    <label for="title">To:</label>
                    {formatDate(education.to)}
                  </div>
                  <div className="form__split">
                    <label for="title">Current:</label>
                    <input
                      style={{ width: "20px" }}
                      type="checkbox"
                      name="title"
                      checked={education.current}
                    />
                  </div>
                  <div className="form__split">
                    <label for="title">Description:</label>
                    <p>{education.description}</p>
                  </div>
                </>
              ))}
            </div>
            <div className="profile__experience">
              {profileData.experience.map((experience, index) => (
                <>
                  <h2>Experience {index + 1}</h2>

                  <div className="form__split">
                    <label for="title">Job Title:</label>
                    <p>{experience.title}</p>
                  </div>
                  <div className="form__split">
                    <label for="company">Company:</label>
                    <p>{experience.company}</p>
                  </div>
                  <div className="form__split">
                    <label for="location">Location:</label>
                    <p>{experience.company}</p>
                  </div>
                  <div className="form__split">
                    <label for="startdate">Start Date:</label>
                    <p>{formatDate(experience.from)}</p>
                  </div>
                  <div className="form__split">
                    <label for="startdate">End Date:</label>
                    <p>{formatDate(experience.to)}</p>
                  </div>
                  <div className="form__split">
                    <label for="title">Description:</label>
                    <p>{experience.description}</p>
                  </div>
                  <p style={{ height: "10px" }}> </p>
                </>
              ))}
            </div>

            <div className="profile__experience">
              <h2>Social Links</h2>

              <div className="form__split">
                <label for="title">YouTube:</label>
                <p>{profileData.social.youtube}</p>
              </div>
              <div className="form__split">
                <label for="company">Twitter:</label>
                <p>{profileData.social.twitter}</p>
              </div>
              <div className="form__split">
                <label for="location">Facebook:</label>
                <p>{profileData.social.facebook}</p>
              </div>
              <div className="form__split">
                <label for="startdate">LinkedIn:</label>
                <p>{profileData.social.linkedin}</p>
              </div>
              <div className="form__split">
                <label for="title">Instagram:</label>
                <p>{profileData.social.instagram}</p>
              </div>
            </div>

            {/* <div className="profile__links">
              <h2>Social Links</h2>
              <div>
                <a href="https://www.linkedin.com/" target="_blank">
                  <span className="link">
                    <i className="icon iconify" data-icon="mdi:linkedin"></i>
                    linkedin.com/
                  </span>
                </a>
              </div>
              <div>
                <a href="https://www.twitter.com/" target="_blank">
                  <span className="link">
                    <i className="icon iconify" data-icon="mdi:twitter"></i>
                    twitter.com/
                  </span>
                </a>
              </div>
              <div>
                <a href="https://www.facebook.com/" target="_blank">
                  <span className="link">
                    <i className="icon iconify" data-icon="mdi:facebook"></i>
                    facebook.com/
                  </span>
                </a>
              </div>
              <div>
                <a href="https://www.youtube.com/" target="_blank">
                  <span className="link">
                    <i className="icon iconify" data-icon="mdi:youtube"></i>
                    youtube.com/
                  </span>
                </a>
              </div>
              <div>
                <a href="https://www.instagram.com/" target="_blank">
                  <span className="link">
                    <i className="icon iconify" data-icon="mdi:instagram"></i>
                    instagram.com/
                  </span>
                </a>
              </div>
            </div> */}
          </section>
        </section>
      </section>
    </div>
  );
};
