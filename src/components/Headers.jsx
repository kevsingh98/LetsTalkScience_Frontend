import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/AuthService";
import Footer from "./Footer";

const Headers = () => {
  const { user } = JSON.parse(localStorage.getItem("jwt"));
  const [isOpen, setIsOpen] = useState(false);

  return (
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
  );
};

export default Headers;
