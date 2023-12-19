import "./App.css";

export default function SuccessMessage({ success }) {
  if (!success) {
    return null;
  }

  return (
    <div className="success">
      <div>{success}</div>
    </div>
  );
}
