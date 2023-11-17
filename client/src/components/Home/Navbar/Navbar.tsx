import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
function Navbar() {
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
      {/* <div className="nav-links">
        <button>
          <h2>Home</h2>
        </button>
        <button>
          <h2>Login</h2>
        </button>
        <button>
          <h2>Travel</h2>
        </button>
        <button>
          <h2>Destinations</h2>
        </button>
      </div> */}
    </div>
  );
}

export default Navbar;
