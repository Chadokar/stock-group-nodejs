import React from "react";
import "./home.css";
function Home() {
  return (
    <>
      <header>
        <div className="smoothie">
          <img src={require("../../assets/img/smoothie.png")} alt="" />
        </div>
        <div className="headings">
          <h2>Lorem ipsum dolor sit.</h2>
          <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
          <a href="/smoothies" className="btn">
            View Recipes
          </a>
        </div>
      </header>
    </>
  );
}

export default Home;
