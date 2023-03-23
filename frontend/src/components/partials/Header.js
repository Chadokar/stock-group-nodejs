import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Header() {
  const logouthandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <nav className="main">
        <h1 className="name">
          <a href="/">Shubham Chadokar</a>
        </h1>
        <ul className="nav-right">
          <li className="nav-right-btn" onClick={logouthandler}>
            <a href="/">Log out</a>
          </li>
          <li className="nav-right-btn">
            <a href="/login">Log in</a>
          </li>
          <li className="nav-right-btn">
            <a href="/signup" className="btn">
              Sign up
            </a>
          </li>
          <li className="nav-right-btn">
            <a href="/profile" className="btn">
              <img src="" alt="" />
            </a>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
