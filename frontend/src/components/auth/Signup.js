import axios from "axios";
import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/signup",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submithandler} action="">
        <h2>Sign Up</h2>
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

export default Signup;
