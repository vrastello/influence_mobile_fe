import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ErrorMessage from "../App/ErrorMessage";
import loginUser from "../Services/loginUser";

import "./Login.scss";
import SuccessMessage from "../App/SuccessMessage";

export default function Login({ setToken, error, setError, success }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const timeOut = false;
  const successTimeOut = true;

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        username,
        password,
      });
      if (!res.ok) {
        throw new Error(`Status ${res.status}, ${res.statusText}`);
      } else {
        const data = await res.json();
        setToken(data);
        navigate("/");
      }
    } catch (error) {
      if (error.message === "Status 401, Unauthorized") {
        setError("invalid username or password");
      } else if (error.message) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    setError(false);
  }, []);

  function handleRegistration() {
    navigate("/registration");
  }

  return (
    <div className="align">
      <div className="grid aling__item">
        <div className="register">
          <img src="/logo.png" alt="Influence Mobile Logo" />
          <h2>Influence Mobile</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__field">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form__field">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form__field">
              <input type="submit" value="Sign In" />
            </div>
          </form>
          <div>
            <ErrorMessage hasError={error} timeOut={timeOut} />
          </div>
          <div>
            <SuccessMessage success={success} timeOut={successTimeOut} />
          </div>
          <p>
            Don't have an account?{" "}
            <button
              className="link-button"
              onClick={() => {
                handleRegistration();
              }}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
