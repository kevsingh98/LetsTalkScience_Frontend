import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "./Footer";

const Onboard = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/home");
    }
  }, []);

  return (
    <section className="template template--onboard">
      <div className="onboard">
        <Link to="/">
          <img
            className="onboard__branding"
            alt="Logo"
            src="./images/logo--white.svg"
          />
        </Link>

        <div className="onboard__description">
          <h1>Explore the topics you are interested in</h1>
          <p>
            Check out the latest science news, publish your views and connect
            with the community.
          </p>
        </div>

        <form className="onboard__action form">
          <Link
            to="/login"
            type="button"
            className="button button--secondary"
            value="Log in"
          >
            Log In
          </Link>
          <Link
            to="/register"
            type="button"
            className="button"
            value="Register"
          >
            Register
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Onboard;
