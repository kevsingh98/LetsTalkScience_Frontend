import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { login } from "../services/AuthService";

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/home");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const response = await login({ email, password });

    if (response.success === true) {
      setErrorMessage("");
      setLoading(false);
      history.push("/home");
    } else {
      setLoading(false);
      setErrorMessage(response.message);
    }
  };

  return (
    <Fragment>
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
            <h1>Login to your account</h1>
          </div>

          <form className="onboard__action form" onSubmit={(e) => onSubmit(e)}>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                autoComplete="email"
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Your password"
                name="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form__message--failed ">{errorMessage}</div>

            <button
              type="submit"
              disabled={loading}
              className="button"
              value="Login"
            >
              {loading ? (
                <BarLoader color={"#fff"} height={2} width={100} />
              ) : (
                "Log in"
              )}
            </button>

            <p className="form__meta">
              {"Don't have an account? "}
              <Link className="link" to="/register">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
