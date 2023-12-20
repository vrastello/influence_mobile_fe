import React, { useEffect, useState } from "react";
import getOffers from "../Services/getOffers";
import ErrorMessage from "../App/ErrorMessage";
import "../App/App.css";
import Offer from "./Offer";
import updateOffer from "../Services/updateOffer";
import SuccessMessage from "../App/SuccessMessage";
import NavBar from "../App/NavBar";
import { chunk } from "lodash";
import "./Offers.css";

export default function Offers({
  token,
  error,
  setError,
  success,
  setSuccess,
}) {
  const [offers, setOffers] = useState([]);
  const [user, setUser] = useState();
  const tokenString = token.token;
  const roleString = token.role;
  const [offerToEdit, setOfferToEdit] = useState(0);
  const timeOut = true;
  const successTimeOut = true;

  useEffect(() => {
    setError(false);
    setSuccess(false);
  }, []);

  useEffect(() => {
    const offerList = async () => {
      try {
        const res = await getOffers(tokenString);
        if (!res.ok) {
          throw new Error(`Status ${res.status}, ${res.statusText}`);
        } else {
          const data = await res.json();
          setOffers(data.offers);
          setUser(data.user);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    offerList();
  }, []);

  function toggleEditForm(offer_id) {
    if (offerToEdit === offer_id) {
      setOfferToEdit(0);
    } else {
      setOfferToEdit(offer_id);
    }
  }

  async function submitEdit(play_hours, offer_id) {
    try {
      const res = await updateOffer(tokenString, play_hours, offer_id);
      if (!res.ok) {
        throw new Error(`Status ${res.status}, ${res.statusText}`);
      } else {
        setSuccess("Successfully logged play hours");
        toggleEditForm();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const sections = chunk(offers, 4);

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <img src="/logo-small.png" alt="Influence Mobile Logo" />
        </div>
        <div className="col-10">
          <h2>Influence Mobile</h2>
        </div>
      </div>
      <div className="wrapper"></div>
      <div>
        <ErrorMessage hasError={error} timeOut={timeOut} />
      </div>
      <div>
        <SuccessMessage success={success} timeOut={successTimeOut} />
      </div>
      <div className="wrapper">
        <h3>Play to Earn Offers</h3>
        <p>
          username: {user?.username}
          <br />
          age: {user?.age}
          <br />
          gender: {user?.gender}
          <br />
          Offer Count: {offers?.length}
        </p>
      </div>
      <div>
        <NavBar role={roleString} />
      </div>
      <div>
        {sections.map((section, index) => (
          <div className="row" key={index}>
            {section.map((offer) => (
              <div className="column">
                <div className="card" key={offer.id}>
                  <Offer
                    user={user}
                    offer={offer}
                    offerToEdit={offerToEdit}
                    submitEdit={submitEdit}
                    toggleEditForm={() => toggleEditForm(offer.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
