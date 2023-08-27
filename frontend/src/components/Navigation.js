import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import { debounce } from "./utility/debounce";
import RequireAuth from "./hooks/useAuth";
import { io } from "socket.io-client";

function Navigation() {
  const [socket, setSocket] = useState(null);
  // useEffect(() => {
  //   if (!token) {
  //     console.log(pathname);
  //     // debounce(() => navigate("/login"), 0);
  //     navigate(pathname);
  //   } else {
  //   }
  // }, [pathname]);

  const setupSocket = async () => {
    const token = localStorage.getItem("userToken");
    if (token && !socket) {
      const newSocket = await io("http://localhost:8000", {
        query: {
          token: token,
        },
      });

      newSocket.on("disconnect", () => {
        console.log("successfully disconnected");
        setSocket(null);
        setTimeout(setupSocket, 3000);
      });

      newSocket.on("connection", () => {
        console.log("successfully connected");
      });

      setTimeout(() => {
        setSocket(newSocket);
        console.log(newSocket);
      }, 300);
    }
  };

  console.log(socket);

  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, [socket]);

  const navItems = [
    {
      path: "/login",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <Login />
        </Suspense>
      ),
      protected: false,
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <Home />
        </Suspense>
      ),
      protected: false,
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <Signup />
        </Suspense>
      ),
      protected: false,
    },
    {
      path: "/smoothies",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <Smoothies />
        </Suspense>
      ),
      protected: true,
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <Profile />
        </Suspense>
      ),
      protected: true,
    },

    {
      path: "/group",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <Groupchat socket={socket} />
        </Suspense>
      ),
      protected: true,
    },
  ];

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        {navItems
          .filter((ele) => !ele.protected)
          .map((ele, i) => (
            <Route key={i} element={ele.element} path={ele.path} />
          ))}
        <Route element={<RequireAuth />}>
          {navItems
            .filter((ele) => ele.protected)
            .map((ele, i) => (
              <Route key={i} element={ele.element} path={ele.path} />
            ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default Navigation;
