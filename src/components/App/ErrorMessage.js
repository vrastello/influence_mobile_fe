import react from "react";

export default function ErrorMessage({ hasError }) {
  console.log(hasError);
  if (!hasError) {
    return null;
  }
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{hasError}</p>
    </div>
  );
}
