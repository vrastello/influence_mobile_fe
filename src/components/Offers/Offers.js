import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import useToken from "../App/useToken";

export default function Offers() {
  const [offers, setOffers] = useState([]);

  const offerList = async () => {
    const res = await getOffers();
    setOffers(res.offers);
  };

  useEffect(() => {
    offerList();
  }, []);

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <h2>Offers</h2>
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

async function getOffers() {
  return fetch("http://localhost:3002/api/v1/offers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}
