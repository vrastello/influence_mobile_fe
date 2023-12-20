import React, { useState, useEffect } from "react";

// dynamic offer card, allows user to log play inside offer UI component
export default function Offer({
  offer,
  offerToEdit,
  submitEdit,
  toggleEditForm,
}) {
  const [playHours, setPlayHours] = useState(0);
  const [isEditing, setIsEditing] = useState(offerToEdit === offer.id);

  useEffect(() => {
    setIsEditing(offerToEdit === offer.id);
  }, [offerToEdit, offer.id]);

  function submitHandler(e) {
    e.preventDefault();
    submitEdit(playHours, offer.id);
    resetState();
  }

  function resetState() {
    setPlayHours(0);
  }

  const cardBody = (
    <p>
      Description: {offer.description}
      <br />
      Payout: {offer.payout}
    </p>
  );

  const editBody = (
    <p>
      Log your play hours:
      <br />
      <input
        type="number"
        value={playHours}
        onChange={(e) => {
          e.target.value >= 1 ? setPlayHours(e.target.value) : setPlayHours("");
        }}
      />
    </p>
  );

  const editButton = (
    <button
      className="btn btn-success"
      type="button"
      onClick={() => {
        toggleEditForm();
      }}
    >
      Log Play
    </button>
  );

  const submitButton = (
    <button
      className="btn btn-primary"
      type="submit"
      onClick={(e) => submitHandler(e)}
    >
      Confirm
    </button>
  );

  return (
    <div className="card-body">
      <h5 className="card-title">{offer.title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{offer.genre}</h6>
      <div className="card-text">{isEditing ? editBody : cardBody}</div>
      <div className="btn-group">
        <div className="row">
          <div className="col-6-sm">{editButton}</div>
        </div>
        <div className="row">
          <div className="col-6">{isEditing ? submitButton : ""}</div>
        </div>
      </div>
    </div>
  );
}
