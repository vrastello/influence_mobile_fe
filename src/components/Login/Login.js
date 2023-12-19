import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ErrorMessage from "../App/ErrorMessage";
import loginUser from "../Services/loginUser";

import "./Login.css";
import SuccessMessage from "../App/SuccessMessage";

export default function Login({
  setToken,
  error,
  setError,
  success,
  setSuccess,
}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        username,
        password,
      });
      if (!res.ok) {
        console.log(res.status, res.statusText);
        throw new Error(`Status ${res.status}, ${res.statusText}`);
      } else {
        const data = await res.json();
        console.log(`data: ${data}`);
        setToken(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
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
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button
        type="button"
        onClick={() => {
          handleRegistration();
        }}
      >
        Registration
      </button>
      <div>
        <ErrorMessage hasError={error} />
      </div>
      <div>
        <SuccessMessage success={success} />
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
