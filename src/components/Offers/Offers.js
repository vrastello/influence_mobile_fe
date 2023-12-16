import React, { useEffect, useState } from "react";

export default function Offers(token) {
  const [offers, setOffers] = useState([]);

  const offerList = async () => {
    const res = await getOffers(token);
    setOffers(res.offers);
  };

  useEffect(() => {
    offerList();
  }, []);

  return (
    <div>
      <h2>Offers</h2>
      <text></text>
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

async function getOffers(token) {
  return fetch("http://localhost:3002/api/v1/offers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.token,
    },
  }).then((data) => data.json());
}
