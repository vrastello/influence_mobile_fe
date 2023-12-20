import react from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ role }) {
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

  function UserOffers({ role }) {
    let navigate = useNavigate();

    function handleUser() {
      navigate("/");
    }
    if (role === "admin") {
      return (
        <button
          type="button"
          onClick={() => {
            handleUser();
          }}
        >
          User Offers
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

  return (
    <div id="navbar">
      <ul>
        <li>
          <UserOffers role={role} />
        </li>
        <li>
          <AdminPortal role={role} />
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
}
