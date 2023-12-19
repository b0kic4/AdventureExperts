import React from "react";
import "./style.css";
import Search from "./Search/Search";

const Travel: React.FC = () => {
  return (
    <div className="container">
      <div className="content-items">
        <div className="search-container">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Travel;
