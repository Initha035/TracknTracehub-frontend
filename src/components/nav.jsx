import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./authcontext";
import { useLocation } from "react-router-dom";

function Nav() {
  const { user, logout } = useAuth();
  // get the current location and disable nav on the login and register pages
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register")
    return null;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container ">
        <NavLink className="navbar-brand text-warning" to="/">
          <img src="/logo.svg" width={150} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto d-flex align-items-center mt-md-2">
            <li className="nav-item">
              <NavLink className="nav-link  text-warning" to="/">
                Home
              </NavLink>
            </li>
            {user ? (
              <li className="nav-item">
                <div className="nav-link  text-warning" onClick={logout}>
                  Logout
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
