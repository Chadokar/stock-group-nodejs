import axios from "axios";
import React from "react";

import "./stock.css";

function Stocks() {
  const stock = async (e) => {
    e.preventDefault();
    const symbol = "TCS";
    const apiKey = "E3T2L10PTU6WK0SE";
    axios
      .get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      )
      .then((response) => {
        const data = response.data["Global Quote"];
        console.log(`Symbol: ${data["01. symbol"]}`);
        console.log(`Price: ${data["05. price"]}`);
        console.log(`Change: ${data["09. change"]}`);
        console.log(`Percent change: ${data["10. change percent"]}`);
        console.log(data);
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
