import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getOffers from "../Services/getOffers";
import ErrorMessage from "../App/ErrorMessage";
import "../App/App.css";
import Offer from "./Offer";
import updateOffer from "../Services/updateOffer";
import SuccessMessage from "../App/SuccessMessage";

function AdminPortal({ role }) {
  let navigate = useNavigate();

  function handleAdmin() {
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
        <SuccessMessage success={success} />
      </div>
      <div className="wrapper">
        <h5>
          <strong>User Details</strong>
        </h5>
        <p>
          username: {user?.username}
          <br />
          age: {user?.age}
        </p>
      </div>
      <div>
        {offers.map((offer) => {
          return (
            <div className="card" key={offer.id}>
              <Offer
                user={user}
                offer={offer}
                offerToEdit={offerToEdit}
                submitEdit={submitEdit}
                toggleEditForm={() => toggleEditForm(offer.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
