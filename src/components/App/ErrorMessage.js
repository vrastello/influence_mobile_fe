import "./App.css";

export default function ErrorMessage({ hasError }) {
  if (!hasError) {
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
