import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getOffers from "../Services/Api";

/*
another api call not needed for data, since we already have that in state
but since we want to authenticate this request anyways, we 
might as well request api with id to get the offer we want
*/

function OfferView({ token }) {
  const [offer, setOffer] = useState([]);
  const tokenString = token.token;
  const rowParams = useParams();
  console.log(`rowParams: ${rowParams.id}`);

  const offerList = async () => {
    const res = await getOffers(tokenString, null, rowParams.id);
    console.log(`res: ${JSON.stringify(res)}`);
    setOffer(res);
  };

  useEffect(() => {
    offerList();
  }, []);

  console.log(`offer: ${offer?.title}`);
  return (
    <div>
      <h2>OfferView</h2>
      <h2>{offer?.title}</h2>
    </div>
  );
}

export default OfferView;
