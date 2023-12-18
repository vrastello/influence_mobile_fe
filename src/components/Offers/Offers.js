import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Offers({ token }) {
  const [offers, setOffers] = useState([]);
  const tokenString = token.token;
  const roleString = token.role;
  console.log(`role in offers: ${roleString}`);
  console.log(`token in offers: ${tokenString}`);

  const offerList = async () => {
    const res = await getOffers(tokenString);
    setOffers(res.offers);
  };

  useEffect(() => {
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
        {offers.map((data) => {
          return (
            <div class="card" key={data.id}>
              <div class="card-body">
                <h5 class="card-title">{data.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{data.genre}</h6>
                <p class="card-text">
                  Description: {data.description}
                  <br />
                  Payout: {data.payout}
                </p>
                <a href="#" class="card-link">
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

async function getOffers(tokenString) {
  console.log(`token: ${tokenString}`);
  return fetch("http://localhost:3002/api/v1/offers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenString,
    },
  }).then((data) => data.json());
}
