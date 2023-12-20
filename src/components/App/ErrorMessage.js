import React, { useState, useEffect } from "react";
import "./App.css";

export default function ErrorMessage({ hasError, timeOut }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!hasError) {
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
  }, [hasError, timeOut]);
  if (!visible) {
    return null;
  }
  if (Array.isArray(hasError)) {
    return (
      <div className="error">
        <div>
          {hasError.map((error) => (
            <ul>
              <li>{error}</li>
            </ul>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="error">
        <div>{hasError}</div>
      </div>
    );
  }
}
