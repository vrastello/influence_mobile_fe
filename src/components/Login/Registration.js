import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createUser from "../Services/createUser";
import ErrorMessage from "../App/ErrorMessage";

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

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUser({
        user: {
          username,
          password,
          email,
          first_name,
          last_name,
          birthdate,
          gender,
        },
      });
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
    <div className="login-wrapper">
      <h1>Registration</h1>
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
        <label>
          <p>email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>First Name</p>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Birthdate</p>
          <input type="date" onChange={(e) => setBirthDate(e.target.value)} />
        </label>
        <label>
          <p>Gender</p>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="radio-inline">Male</label>
          </div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="radio-inline">Female</label>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button
        type="button"
        onClick={() => {
          goToLogin();
        }}
      >
        Log in
      </button>
      <div>
        <ErrorMessage hasError={error} />
      </div>
    </div>
  );
}
