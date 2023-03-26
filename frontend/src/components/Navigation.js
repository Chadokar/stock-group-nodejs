import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Profile from "./afterauth/Profile";
import Smoothies from "./afterauth/Smoothies";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Groupchat from "./groupchat/Groupchat";
import Home from "./home/Home";
import Header from "./partials/Header";
import { Groups } from "./redux/actions/Action";
import Stocks from "./Stocks/Stocks";

function Navigation() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/smoothies" element={<Smoothies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/stock" element={<Stocks />} />
        <Route path="/group" element={<Groupchat />} />
      </Route>
    </Routes>
  );
}

export default Navigation;
