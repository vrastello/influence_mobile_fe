import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createUser from "../Services/createUser";
import ErrorMessage from "../App/ErrorMessage";
import "./Login.scss";

// parse rails validation errors
function parseError(error) {
  const errorList = Object.entries(error).map(([key, value]) => {
    const errorMessage = value.join(", ");
    return `${key.replace("_", " ")}: ${errorMessage}`;
  });
  return errorList;
}

export default function Registration({ error, setError, setSuccess }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [birthdate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const timeOut = false;

  function data() {
    let user_params = {};

    const data = {
      user: {
        username,
        password,
        email,
        first_name,
        last_name,
        birthdate,
        gender,
      },
    };
    console.log(data.user);
    console.log(JSON.stringify(data.user));
    if (JSON.stringify(data.user) === "{}") {
      user_params = { user: { user: "empty" } };
    } else {
      user_params = data;
    }
    return user_params;
  }

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createUser(data());
      if (!res.ok) {
        const data = await res.json();
        setError(parseError(data.error));
        throw new Error(`${res.status}`);
      } else {
        setSuccess("Successfully registered, please log in");
        navigate("/login");
      }
    } catch (error) {}
  };

  useEffect(() => {
    setError(false);
  }, []);

  function goToLogin() {
    navigate("/login");
  }

  return (
    <div className="align">
      <div className="grid aling__item">
        <div className="register">
          <img src="/logo.png" alt="Influence Mobile Logo" />
          <h2>Influence Mobile</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>Username</label>
            <div className="form__field">
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <label>Password</label>
            <div className="form__field">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label>Email</label>
            <div className="form__field">
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <label>First Name</label>
            <div className="form__field">
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <label>Last Name</label>
            <div className="form__field">
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <label>Birthdate</label>
            <div className="form__field">
              <input
                type="date"
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="row">
              <p>Gender</p>
              <div className="col-6">
                <div className="form__field">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label>Male</label>
                </div>
              </div>
              <div className="col-6">
                <div className="form__field">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>
            <div className="form__field">
              <ErrorMessage hasError={error} timeOut={timeOut} />
            </div>
            <div className="form__field">
              <input type="submit" value="Sign In" />
            </div>
          </form>
          <p>
            Already have an account?{" "}
            <button
              className="link-button"
              onClick={() => {
                goToLogin();
              }}
            >
              Log in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
