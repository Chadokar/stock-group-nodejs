import axios from "axios";
import React from "react";

import "./stock.css";
import { redirect } from "react-router-dom";

function Stocks() {
  const token = localStorage.getItem("userToken");
  if (!token) return redirect("/login");
  const stock = async (e) => {
    e.preventDefault();
    const symbol = "TCS";
    const apiKey = "E3T2L10PTU6WK0SE";
    axios.get`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`() // PROVIDE THE SINGLE DATA OF LAST DAY
    // `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=60min&symbol=${symbol}&apikey=${apiKey}`
    // "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
    // "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo"
      .then((response) => {
        // const data = response.data["Global Quote"];
        const res = response.data;
        console.log(res);
        // console.log(res["Time Series (60min)"]);
        // console.log(`Symbol: ${data["01. symbol"]}`);
        // console.log(`Price: ${data["05. price"]}`);
        // console.log(`Change: ${data["09. change"]}`);
        // console.log(`Percent change: ${data["10. change percent"]}`);
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="stock">
      <button onClick={stock}>Click</button>
    </div>
  );
}

export default Stocks;

// Alpha Vantage STOCK APIs key
// E3T2L10PTU6WK0SE
