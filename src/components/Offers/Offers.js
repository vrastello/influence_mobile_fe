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
      <ul className="list-group list-group-numbered">
        {offers.map((data) => {
          return (
            <li className="list-group-item" key={data.id}>
              {data.description}
            </li>
          );
        })}
      </ul>
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
