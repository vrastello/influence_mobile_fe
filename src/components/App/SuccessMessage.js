import React, { useState, useEffect } from "react";
import "./App.css";

export default function SuccessMessage({ success, timeOut }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!success) {
      setVisible(false);
      return;
    }
    setVisible(true);
    if (timeOut) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, timeOut]);
  if (!visible) {
    return null;
  }
  return (
    <div className="success">
      <div>{success}</div>
    </div>
  );
}
