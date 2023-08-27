import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("userToken", JSON.stringify(data.token));
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      navigate("/smoothies");
      document.location.reload();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submithandler} action="">
        <h2>Log in</h2>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="email error"></div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="password error"></div>
        <button>Log In</button>
      </form>
    </div>
  );
}

export default Login;
