import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getOffers from "../Services/getOffers";
import ErrorMessage from "../App/ErrorMessage";

function AdminPortal({ role }) {
  console.log(`role in user: ${role}`);
  let navigate = useNavigate();

  function handleAdmin() {
    console.log("handleAdmin");
    navigate("/admin");
  }
  if (role === "admin") {
    return (
      <button
        type="button"
        onClick={() => {
          handleAdmin();
        }}
      >
        Admin Portal
      </button>
    );
  } else {
    return <div></div>;
  }
}

function Logout() {
  let navigate = useNavigate();

  function handleLogout() {
    console.log("handleLogout");
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <button
      type="button"
      onClick={() => {
        handleLogout();
      }}
    >
      Logout
    </button>
  );
}

export default function Offers({ token, error, setError }) {
  const [offers, setOffers] = useState([]);
  const tokenString = token.token;
  const roleString = token.role;
  console.log(`role in offers: ${roleString}`);
  console.log(`token in offers: ${tokenString}`);
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
  }, []);

  useEffect(() => {
    const offerList = async () => {
      try {
        const res = await getOffers(tokenString);
        if (!res.ok) {
          console.log(res.status, res.statusText);
          throw new Error(`Status ${res.status}, ${res.statusText}`);
        } else {
          const data = await res.json();
          setOffers(data.offers);
          console.log(`data: ${data}`);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    offerList();
  }, []);

  return (
    <div>
      <h2>Offers</h2>
      <div>
        <AdminPortal role={roleString} />
      </div>
      <div>
        <Logout />
      </div>
      <div>
        <ErrorMessage hasError={error} />
      </div>
      <div>
        {offers.map((data) => {
          return (
            <div className="card" key={data.id}>
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{data.genre}</h6>
                <p className="card-text">
                  Description: {data.description}
                  <br />
                  Payout: {data.payout}
                </p>
                <a href="#" className="card-link">
                  Log Play
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
