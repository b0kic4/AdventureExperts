import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import "./style.css";

const Navbar: React.FC = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <button>
          <h1>
            <FontAwesomeIcon icon={faGlobe} />
            AdventureExperts
          </h1>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
