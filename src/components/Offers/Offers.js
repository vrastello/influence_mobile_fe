import React, { useEffect, useState } from 'react';


export default function Offers() {

  async function getOffers() {
    return fetch('http://localhost:3002/api/v1/offers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(data => data.json())
  }
  

  const [offers, setOffers] = useState([]);

  useEffect(() => { 
    offerList();
  }, []);

  const offerList = async () => {
    setOffers(await getOffers());
  }
  
  return (
    <div>
      <h2>Offers</h2>
      <text>{JSON.stringify(offers.offers)}</text>
      {/* <ol className="list-group list-group-numbered">
        {offers.offers.map((data) => {
          return <li className="list-group-item" key={data.id}>{data.description}</li>
        })}
      </ol> */}
    </div>
  );
}
