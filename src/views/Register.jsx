import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { register } from "../services/AuthService";

const Register = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/home");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
    } else {
      const response = await register({ name, email, password });

      if (response.success === false) {
        setErrorMessage(response.message);
        setLoading(false);
      } else if (response.success === true) {
        setErrorMessage("");
        setLoading(false);
        history.push("/home");
      }
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
            <h1>Create your account</h1>
          </div>

          <form className="onboard__action form" onSubmit={(e) => onSubmit(e)}>
            <div className="form__group">
              <label htmlFor="name">Your Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                name="name"
                autoComplete="given-name"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form__split">
              <div className="form__group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="6+ Characters"
                  minLength="6"
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="form__group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  minLength="6"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>

            <div className="form__message--failed ">{errorMessage}</div>

            <button type="submit" className="button" value="Register">
              {loading ? (
                <BarLoader color={"#fff"} height={2} width={100} />
              ) : (
                "Register"
              )}
            </button>

            <p className="form__meta">
              {"Already have an account? "}
              <Link className="link" to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Register;
