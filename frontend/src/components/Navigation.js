import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./afterauth/Profile";
import Smoothies from "./afterauth/Smoothies";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Groupchat from "./groupchat/Groupchat";
import Home from "./home/Home";
import Header from "./partials/Header";
import { Groups } from "./redux/actions/Action";
import Stocks from "./Stocks/Stocks";
import axios from "axios";

function Navigation() {
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [datas, setDatas] = useState();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login page if token doesn't exist
    } else {
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        {token && (
          <>
            <Route path="/smoothies" element={<Smoothies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stock" element={<Stocks />} />
            <Route path="/group" element={<Groupchat />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default Navigation;
