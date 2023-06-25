import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  async function fetchData() {
    const token = localStorage.getItem("userToken");
    if (localStorage.getItem("userToken")) {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      };
      await axios
        .get(`/profile/${token}`, config)
        .then(({ data }) => console.log("data: ", data))
        .catch((err) => console.log(err));
    }
  }

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
      fetchData();
      navigate("/smoothies");
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
        <button>Log up</button>
      </form>
    </div>
  );
}

export default Login;
