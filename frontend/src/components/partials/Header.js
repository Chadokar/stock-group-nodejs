import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Header() {
  const token = localStorage.getItem("userToken");
  const logouthandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("userToken");
    document.location.reload();
  };

  return (
    <>
      <nav className="main">
        <h1 className="name">
          <a href="/">Shubham Chadokar</a>
        </h1>
        <ul className="nav-right">
          {token && (
            <li className="nav-right-btn">
              <a href="/profile">
                <img src="" alt="" />
                Profile
              </a>
            </li>
          )}
          {token && (
            <li className="nav-right-btn" onClick={logouthandler}>
              <button className="btn">Log out</button>
            </li>
          )}
          {!token && (
            <>
              <li className="nav-right-btn">
                <a href="/login">Log in</a>
              </li>
              <li className="nav-right-btn">
                <a href="/signup" className="btn">
                  Sign up
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
