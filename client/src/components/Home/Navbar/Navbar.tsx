import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const Navbar: React.FC = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <button>
          <h1>
            <FontAwesomeIcon icon={faBus} />
            YourBus
          </h1>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
