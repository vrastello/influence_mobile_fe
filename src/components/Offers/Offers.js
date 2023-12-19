import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getOffers from "../Services/getOffers";
import ErrorMessage from "../App/ErrorMessage";
import "../App/App.css";
import Offer from "./Offer";
import updateOffer from "../Services/updateOffer";
import SuccessMessage from "../App/SuccessMessage";

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
  console.log(`role in offers: ${roleString}`);
  console.log(`token in offers: ${tokenString}`);
  const navigate = useNavigate();
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
          console.log(res.status, res.statusText);
          throw new Error(`Status ${res.status}, ${res.statusText}`);
        } else {
          const data = await res.json();
          setOffers(data.offers);
          setUser(data.user);
          console.log(`data: ${data.user.age}`);
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

  async function submitEdit(play_hours, offer_detail_id) {
    try {
      const res = await updateOffer(tokenString, play_hours, offer_detail_id);
      console.log(res);
      if (!res.ok) {
        console.log(res.status, res.statusText);
        throw new Error(`Status ${res.status}, ${res.statusText}`);
      } else {
        const data = await res.json();
        setSuccess("Successfully logged play hours");
        console.log(`data: ${data}`);
        toggleEditForm();
      }
    } catch (error) {
      console.log(error.message);
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
                error={error}
                setError={setError}
                success={success}
                setSuccess={setSuccess}
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
