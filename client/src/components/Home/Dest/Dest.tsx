// Dest.jsx

import React from "react";
import "./style.css";
import summerVideo from "./assets/pexels-tima-miroshnichenko-6010489 (2160p).mp4";
import winterVideo from "./assets/pexels-sinan-serin-8951664 (720p).mp4";
import exoticVideo from "./assets/production_id 5058332 (2160p).mp4";
import "./style.css";

const Dest: React.FC = () => {
  return (
    <div className="container">
      <div className="dest-items">
        <div className="dest-item start-traveling">
          <button>
            <video autoPlay loop muted>
              <source src={summerVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="text-overlay">
              <h1>Summer time</h1>
            </div>
          </button>
        </div>
        <div className="dest-item schedule-traveling">
          <button>
            <video autoPlay loop muted>
              <source src={winterVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="text-overlay">
              <h1>Winter time</h1>
            </div>
          </button>
        </div>
        <div className="dest-item more-about-traveling">
          <button>
            <video autoPlay loop muted>
              <source src={exoticVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="text-overlay">
              <h1>Exotic Places</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dest;
