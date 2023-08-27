import React from "react";
import { redirect, useNavigate } from "react-router-dom";

function Smoothies() {
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  if (!token) navigate("login");
  return (
    <div>
      <ul className="recipes">
        <li className="recipe">
          <img
            src={require("../../assets/img/smoothie.png")}
            alt="smoothie recipe icon"
          />
          <h4>Banana Boost</h4>
          <p>Banana, Vanilla ice cream, Milk</p>
        </li>
        <li className="recipe">
          <img
            src={require("../../assets/img/smoothie.png")}
            alt="smoothie recipe icon"
          />
          <h4>Tropical Twist</h4>
          <p>Peach, Pinapple, Apple juice</p>
        </li>
        <li className="recipe">
          <img
            src={require("../../assets/img/smoothie.png")}
            alt="smoothie recipe icon"
          />
          <h4>Protein Packer</h4>
          <p>Oats, Peanut butter, Milk, Banana, Blueberries</p>
        </li>
        <li className="recipe">
          <img
            src={require("../../assets/img/smoothie.png")}
            alt="smoothie recipe icon"
          />
          <h4>Banana Boost</h4>
          <p>Banana, Vanilla ice cream, Milk</p>
        </li>
        <li className="recipe">
          <img
            src={require("../../assets/img/smoothie.png")}
            alt="smoothie recipe icon"
          />
          <h4>Tropical Twist</h4>
          <p>Peach, Pinapple, Apple juice</p>
        </li>
        <li className="recipe">
          <img
            src={require("../../assets/img/smoothie.png")}
            alt="smoothie recipe icon"
          />
          <h4>Protein Packer</h4>
          <p>Oats, Peanut butter, Milk, Banana, Blueberries</p>
        </li>
      </ul>
    </div>
  );
}

export default Smoothies;
