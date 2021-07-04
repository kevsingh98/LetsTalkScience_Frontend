import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../services/AuthService";
import {
 createAndUpdateProfile,
 deleteEducation,
 deleteExperience,
 getProfile,
 addExperience,
 addEducation,
} from "../services/ProfileService";
import { formatDate } from "../utilities/generalUtilities";
import { Modal } from "../components/Modal";
import BarLoader from "react-spinners/BarLoader";
 
export const EditProfile = () => {
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
   social: {
     facebook: "",
     instagram: "",
     linkedin: "",
     twitter: "",
     youtube: "",
   },
 });
 
 const { user } = JSON.parse(localStorage.getItem("jwt"));
 const [isOpen, setIsOpen] = useState(false);
 const [loading, setLoading] = useState(true);
 
 const [ExperienceModal, setExperienceModal] = useState(false);
 
 const [newExperience, setNewExperience] = useState({
   checked: false,
   title: "",
   company: "",
   location: "",
   from: new Date(),
   to: new Date(),
 });
 const [addingExperience, setAddingExperience] = useState(false);
 
 const [newEducation, setNewEducation] = useState({
   school: "",
   degree: "",
   fieldofstudy: "",
   from: new Date(),
   to: new Date(),
   current: false,
   description: "",
 });
 const [addingEducation, setAddingEducation] = useState(false);
 const [educationModal, setEducationModal] = useState(false);
 
 useEffect(async () => {
   const response = await getProfile();
   const data = response.data;
   console.log(data);
   setProfileData({ ...profileData, ...data });
   setLoading(false);
 }, []);
 
 const handleCreateAndUpdateProfile = async () => {
   const response = await createAndUpdateProfile({
     ...profileData,
     ...profileData.social,
   });
   console.log(response);
   window.location.reload();
 };
 
 const handleChange = (field, value) => {
   console.log(field);
   if (field === "skills") {
     let data = value.trim().split(",");
     console.log(data);
     setProfileData({ ...profileData, skills: data });
     return false;
   }
 
   if (
     field === "youtube" ||
     field === "twitter" ||
     field === "instagram" ||
     field === "linkedin" ||
     field === "facebook"
   ) {
     setProfileData({
       ...profileData,
       social: { ...profileData.social, [field]: value },
     });
     return false;
   }
 
   setProfileData({ ...profileData, [field]: value });
 };
 
 const handleExperienceDelete = async (id) => {
   const response = await deleteExperience(id);
   console.log(response);
   window.location.reload();
 };
 
 const handleEducationDelete = async (id) => {
   const response = await deleteEducation(id);
   console.log(response);
   window.location.reload();
 };
 
 const addExperienceAPI = async () => {
   setAddingExperience(true);
   const response = await addExperience(newExperience);
   setAddingExperience(false);
   setNewExperience({
     title: "",
     company: "",
     location: "",
     startDate: new Date(),
     endDate: new Date(),
   });
   setExperienceModal(!ExperienceModal);
   window.location.reload();
 };
 
 const addEducationAPI = async () => {
   setAddingEducation(true);
   const response = await addEducation(newEducation);
   setAddingEducation(false);
   setNewEducation({
     school: "",
     degree: "",
     fieldofstudy: "",
     from: new Date(),
     to: new Date(),
     current: false,
     description: "",
   });
   setEducationModal(!educationModal);
   window.location.reload();
 };
 
 return loading ? (
   <div
     style={{
       height: "200px",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
     }}
   >
     Loading...
   </div>
 ) : (
   <div>
     <section className="template__header">
       <header className="header">
         <Link to="/home">
           <img className="header__logo" src="/images/logo--white.svg" />
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
           onClick={() => history.push("/home")}
         >
           <i className="icon material-icons">home</i>
           <span> Home </span>
         </a>
         <a
           className="sideNavigation__item"
           onClick={() => history.push("/news")}
         >
           <i className="icon material-icons">trending_up</i>
           <span> Trending News </span>
         </a>
         <a
           className="sideNavigation__item"
           onClick={() => history.push("/explore")}
         >
           <i className="icon material-icons">search</i>
           <span> Explore Interests </span>
         </a>
       </nav>
       <section className="content">
         <h1>John Doe</h1>
         <section className="profile">
           <div className="profile__image">
             <img src="https://via.placeholder.com/100/" />
             <p>
               <span>Hi {user.name}</span>
               <a
                 className="link"
                 href="https://en.gravatar.com/support/how-to-sign-up/"
               >
                 <i className="icon material-icons">manage_accounts</i> Setup
                 your image
               </a>
             </p>
           </div>
 
           <div className="profile__experience">
             <h2>General</h2>
 
             <div className="form__split">
               <label for="title">Company:</label>
               <input
                 type="text"
                 placeholder="Company"
                 name="company"
                 value={profileData.company}
                 onChange={(e) => handleChange(e.target.name, e.target.value)}
               />
             </div>
             <div className="form__split">
               <label for="company">Website:</label>
               <input
                 type="text"
                 placeholder="Website"
                 name="website"
                 value={profileData.website}
                 onChange={(e) => handleChange(e.target.name, e.target.value)}
               />
             </div>
             <div className="form__split">
               <label for="location">Location:</label>
               <input
                 type="text"
                 placeholder="location"
                 name="location"
                 value={profileData.location}
                 onChange={(e) => handleChange(e.target.name, e.target.value)}
               />
             </div>
             <div className="form__split">
               <label for="startdate">Status:</label>
               <input
                 type="text"
                 placeholder="Status"
                 name="status"
                 value={profileData.status}
                 onChange={(e) => handleChange(e.target.name, e.target.value)}
               />
             </div>
             <div className="form__split">
               <label for="title">Skills:</label>
               <div>
                 <input
                   type="text"
                   placeholder="Skills"
                   name="skills"
                   value={profileData.skills}
                   onChange={(e) =>
                     handleChange(e.target.name, e.target.value)
                   }
                 />
                 <p
                   style={{
                     fontSize: "12px",
                     marginTop: "5px",
                     color: "#ccc",
                   }}
                 >
                   **Skills has to be Comma Seperated**
                 </p>
               </div>
             </div>
             <div className="form__split">
               <label for="title">Bio:</label>
               <input
                 type="text"
                 placeholder="Bio"
                 name="bio"
                 value={profileData.bio}
                 onChange={(e) => handleChange(e.target.name, e.target.value)}
               />
             </div>
             <div className="form__split">
               <label for="title">Github Username:</label>
               <input
                 type="text"
                 placeholder="Github Username"
                 name="githubusername"
                 value={profileData.githubusername}
                 onChange={(e) => handleChange(e.target.name, e.target.value)}
               />
             </div>
             <div className="profile__experience">
               <h2>Social Links</h2>
 
               <div className="form__split">
                 <label for="title">YouTube:</label>
                 <input
                   type="text"
                   placeholder="YouTube"
                   name="youtube"
                   value={profileData.social.youtube}
                   onChange={(e) =>
                     handleChange(e.target.name, e.target.value)
                   }
                 />
               </div>
               <div className="form__split">
                 <label for="company">Twitter:</label>
                 <input
                   type="text"
                   placeholder="Twitter"
                   name="twitter"
                   value={profileData.social.twitter}
                   onChange={(e) =>
                     handleChange(e.target.name, e.target.value)
                   }
                 />
               </div>
               <div className="form__split">
                 <label for="location">Facebook:</label>
                 <input
                   type="text"
                   placeholder="Facebook"
                   name="facebook"
                   value={profileData.social.facebook}
                   onChange={(e) =>
                     handleChange(e.target.name, e.target.value)
                   }
                 />
               </div>
               <div className="form__split">
                 <label for="startdate">LinkedIn:</label>
                 <input
                   placeholder="LinkedIn"
                   name="linkedin"
                   value={profileData.social.linkedin}
                   onChange={(e) =>
                     handleChange(e.target.name, e.target.value)
                   }
                 />
               </div>
               <div className="form__split">
                 <label for="title">Job Title:</label>
                 <input
                   type="text"
                   placeholder="Instagram"
                   name="instagram"
                   value={profileData.social.instagram}
                   onChange={(e) =>
                     handleChange(e.target.name, e.target.value)
                   }
                 />
               </div>
               <button
                 onClick={handleCreateAndUpdateProfile}
                 className="button"
               >
                 Update
               </button>
             </div>
           </div>
 
           {profileData.education.length === 0 && (
             <button
               className="add__button"
               onClick={(e) => setEducationModal(!educationModal)}
             >
               Add new Education
             </button>
           )}
           {profileData.education?.map((education, index) => (
             <div className="profile__experience">
               {index === 0 ? (
                 <button
                   className="add__button"
                   onClick={(e) => setEducationModal(!educationModal)}
                 >
                   Add new Education
                 </button>
               ) : (
                 ""
               )}
 
               <h2 style={{ marginTop: index === 0 ? "15px" : "" }}>
                 Education {index + 1}
               </h2>
 
               <div className="form__split">
                 <label for="title">School:</label>
                 <input
                   type="text"
                   placeholder="School"
                   name="school"
                   value={education.school}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="company">Degree:</label>
                 <input
                   type="text"
                   placeholder="Degree"
                   name="degree"
                   value={education.degree}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="location">Field of Study:</label>
                 <input
                   type="text"
                   placeholder="fieldofstudy"
                   name="study"
                   value={education.fieldofstudy}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="startdate">From:</label>
                 <input
                   type="text"
                   placeholder="From"
                   name="from"
                   value={formatDate(education.from)}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="title">To:</label>
                 <input
                   type="text"
                   placeholder="To"
                   name="to"
                   value={formatDate(education.to)}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="title">Current:</label>
                 <input
                   style={{ width: "20px" }}
                   type="checkbox"
                   name="title"
                   checked={education.current}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="title">Description:</label>
                 <input
                   type="text"
                   placeholder="Description"
                   name="description"
                 />
               </div>
               <button
                 className="delete__button"
                 onClick={() => handleEducationDelete(education._id)}
               >
                 Delete
               </button>
             </div>
           ))}
 
           {profileData.experience.length === 0 && (
             <button
               className="add__button"
               onClick={(e) => setExperienceModal(!ExperienceModal)}
             >
               Add new Experience
             </button>
           )}
           {profileData.experience?.map((experience, index) => (
             <div className="profile__experience" key={experience._id}>
               {index === 0 ? (
                 <button
                   className="add__button"
                   onClick={(e) => setExperienceModal(!ExperienceModal)}
                 >
                   Add new Experience
                 </button>
               ) : (
                 ""
               )}
               <h2 style={{ marginTop: index === 0 ? "15px" : "" }}>
                 Experience {index + 1}
               </h2>
 
               <div className="form__split">
                 <label for="title">Job Title:</label>
                 <input
                   type="text"
                   placeholder="Your title"
                   name="title"
                   value={experience.title}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="company">Company:</label>
                 <input
                   type="text"
                   placeholder="Your Company"
                   name="company"
                   value={experience.company}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="location">Location:</label>
                 <input
                   type="text"
                   placeholder="location"
                   name="location"
                   value={experience.location}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="title">Current:</label>
                 <input
                   style={{ width: "20px" }}
                   type="checkbox"
                   name="title"
                   checked={experience.current}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="startdate">Start Date:</label>
                 <input
                   placeholder="Start Date"
                   name="startdate"
                   value={formatDate(experience.from)}
                   readOnly
                 />
               </div>
               <div className="form__split">
                 <label for="startdate">End Date:</label>
                 <input
                   placeholder="End Date"
                   name="startdate"
                   value={experience.to ? formatDate(experience.to) : ""}
                   readOnly
                 />
               </div>
               <button
                 className="delete__button"
                 onClick={() => handleExperienceDelete(experience._id)}
               >
                 Delete
               </button>
             </div>
           ))}
 
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
     {ExperienceModal && (
       <Modal
         open={ExperienceModal}
         setOpen={() => setExperienceModal(!ExperienceModal)}
         title="Add new Experience"
       >
         <div style={{ width: "100%", marginTop: "10px" }}>
           <form
             onSubmit={(e) => {
               e.preventDefault();
               addExperienceAPI();
             }}
           >
             <input
               className="form__input"
               required
               placeholder="Job title"
               value={newExperience.title}
               onChange={(e) =>
                 setNewExperience({
                   ...newExperience,
                   title: e.target.value,
                 })
               }
             />
             <input
               className="form__input"
               required
               placeholder="Company"
               value={newExperience.company}
               onChange={(e) =>
                 setNewExperience({
                   ...newExperience,
                   company: e.target.value,
                 })
               }
             />
             <input
               className="form__input"
               required
               placeholder="Location"
               value={newExperience.location}
               onChange={(e) =>
                 setNewExperience({
                   ...newExperience,
                   location: e.target.value,
                 })
               }
             />
             <div
               style={{
                 display: "flex",
                 alignItems: "center",
                 paddingBottom: "10px",
               }}
             >
               <label>Current:</label>
               <input
                 type="checkbox"
                 style={{
                   width: "10px",
                   display: "inline-flex",
                   marginBottom: "0px",
                   marginLeft: "10px",
                 }}
                 required
                 className="form__input"
                 checked={newExperience.current}
                 onChange={(e) =>
                   setNewExperience({
                     ...newExperience,
                     current: !newExperience.current,
                   })
                 }
               />
             </div>
             <input
               type="date"
               required
               className="form__input"
               placeholder="Start Date"
               value={newExperience.startDate}
               onChange={(e) =>
                 setNewExperience({
                   ...newExperience,
                   startDate: e.target.value,
                 })
               }
             />
             <input
               type="date"
               required
               className="form__input"
               placeholder="End Date"
               value={newExperience.endDate}
               onChange={(e) =>
                 setNewExperience({
                   ...newExperience,
                   endDate: e.target.value,
                 })
               }
             />
             <button
               disabled={addingExperience}
               onClick={(e) => {
                 e.preventDefault();
                 addExperienceAPI();
               }}
               className="button"
               type="submit"
             >
               {addingExperience ? "Loading..." : "Add Experience"}
             </button>
           </form>
         </div>
       </Modal>
     )}
 
     {educationModal && (
       <Modal
         open={educationModal}
         setOpen={() => setEducationModal(!educationModal)}
         title="Add new Education"
       >
         <div style={{ width: "100%", marginTop: "10px" }}>
           <form
             onSubmit={(e) => {
               e.preventDefault();
               addEducationAPI();
             }}
           >
             <input
               className="form__input"
               required
               placeholder="School"
               value={newEducation.school}
               onChange={(e) =>
                 setNewEducation({
                   ...newEducation,
                   school: e.target.value,
                 })
               }
             />
             <input
               className="form__input"
               required
               placeholder="Degree"
               value={newEducation.degree}
               onChange={(e) =>
                 setNewEducation({
                   ...newEducation,
                   degree: e.target.value,
                 })
               }
             />
             <input
               className="form__input"
               required
               placeholder="Field Of study"
               value={newEducation.fieldofstudy}
               onChange={(e) =>
                 setNewEducation({
                   ...newEducation,
                   fieldofstudy: e.target.value,
                 })
               }
             />
             <input
               type="date"
               required
               className="form__input"
               placeholder="From"
               value={newEducation.from}
               onChange={(e) =>
                 setNewEducation({
                   ...newEducation,
                   from: e.target.value,
                 })
               }
             />
             <input
               type="date"
               required
               className="form__input"
               placeholder="To"
               value={newEducation.to}
               onChange={(e) =>
                 setNewEducation({
                   ...newEducation,
                   to: e.target.value,
                 })
               }
             />
             <div
               style={{
                 display: "flex",
                 alignItems: "center",
                 paddingBottom: "10px",
               }}
             >
               <label>Current:</label>
               <input
                 type="checkbox"
                 style={{
                   width: "10px",
                   display: "inline-flex",
                   marginBottom: "0px",
                   marginLeft: "10px",
                 }}
                 required
                 className="form__input"
                 checked={newEducation.current}
                 onChange={(e) =>
                   setNewEducation({
                     ...newEducation,
                     current: !newEducation.current,
                   })
                 }
               />
             </div>
             <input
               className="form__input"
               required
               placeholder="Description"
               value={newEducation.description}
               onChange={(e) =>
                 setNewEducation({
                   ...newEducation,
                   description: e.target.value,
                 })
               }
             />
             <button
               disabled={addingEducation}
               onClick={(e) => {
                 e.preventDefault();
                 addEducationAPI();
               }}
               className="button"
               type="submit"
             >
               {addingEducation ? "Loading..." : "Add Education"}
             </button>
           </form>
         </div>
       </Modal>
     )}
   </div>
 );
};
 

