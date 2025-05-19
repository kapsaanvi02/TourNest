import { useState, useEffect, useRef } from "react";
import IndiaMap from "./IndiaMap";
import Sidebar from "./Sidebar";

import "./index.css";

// Import existing state images
import kerala from "./assets/images/kerala.png";
import rajasthan from "./assets/images/rajasthan.png";
import punjab from "./assets/images/punjab.png";
import odisha from "./assets/images/odisha.png";
import nagaland from "./assets/images/nagaland.png";
import bihar from "./assets/images/bihar.png";
import assam from "./assets/images/assam.png";
import ladakh from "./assets/images/ladakh.png";
import goa from "./assets/images/goa.png";
import maharashtra from "./assets/images/maharashtra.png";
import manipur from "./assets/images/manipur.png";

// Import 15 new states images — replace these with your actual image imports
import tamilNadu from "./assets/images/tamil-nadu.png";
import karnataka from "./assets/images/karnataka.png";
import gujarat from "./assets/images/gujarat.png";
import westBengal from "./assets/images/west-bengal.png";
import madhyaPradesh from "./assets/images/madhya-pradesh.png";
import uttarakhand from "./assets/images/uttarakhand.png";
import himachalPradesh from "./assets/images/himachal-pradesh.png";
import jammuKashmir from "./assets/images/jammu-and-kashmir.png";
import sikkim from "./assets/images/sikkim.png";
import arunachalPradesh from "./assets/images/arunachal-pradesh.png";
import chhattisgarh from "./assets/images/chattisgarh.png";
import telangana from "./assets/images/telangana.png";

import delhi from "./assets/images/delhi.png";

// Import intro logo/image
import logo from "./assets/images/logo.png"; // <-- Change this path to your intro image

export default function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [scrollX, setScrollX] = useState(0);
  const tickerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleStateClick = (stateName) => setSelectedState(stateName);
  const handleSidebarClose = () => setSelectedState(null);
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const scrollLeft = () => {
    setScrollX((prev) => Math.min(prev + 200, 0));
  };

  const scrollRight = () => {
    const tickerWidth = tickerRef.current?.scrollWidth || 0;
    const containerWidth = tickerRef.current?.parentElement?.offsetWidth || 0;
    const maxScroll = -(tickerWidth - containerWidth);
    setScrollX((prev) => Math.max(prev - 200, maxScroll));
  };

  return (
    <div className={`app ${theme}`}>
      {showIntro ? (
        <div className="intro-screen">
          <img
            src={logo}
            alt="TourNest Logo"
            className={`intro-logo ${theme === "dark" ? "dark" : ""}`}
          />
        </div>
      ) : (
        <>
          {/* Top Navbar */}
          <div className="navbar">
            <div className="nav-links">
              <a href="#destinations">Destinations</a>
              <a href="#experiences">Experiences</a>
              <a href="#travel-tips">Travel Tips</a>
              <a href="#about-us">About Us</a>
            </div>
            <button className="plan-button">Plan Your Trip</button>
          </div>

          <div className={`container ${selectedState ? "sidebar-open" : ""}`}>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle Dark Mode"
            >
              {theme === "light" ? "🌙" : "☀"}
            </button>

            <div className="map-container">
              <div className="background-text">
                <span className="discover-text">Discover</span>
                <span className="blank"> </span>
                <span className="india-text">India</span>
                <div className="subtitle-line">Your journey starts here</div>
                <div className="subtitle-line">Click on map to discover states</div>
              </div>
              <IndiaMap onStateClick={handleStateClick} />
            </div>

            {selectedState && (
              <Sidebar stateName={selectedState} onClose={handleSidebarClose} />
            )}
          </div>

          {!selectedState && (
            <div className="ticker-wrapper">
              <button className="arrow left" onClick={scrollLeft}>◀</button>
              <div className="ticker-container">
                <div
                  className="ticker-content"
                  ref={tickerRef}
                  style={{
                    transform: `translateX(${scrollX}px)`,
                    transition: "transform 0.3s ease"
                  }}
                >
                  {/* Original 11 states */}
                  <img src={kerala} alt="Kerala" />
                  <img src={rajasthan} alt="Rajasthan" />
                  <img src={punjab} alt="Punjab" />
                  <img src={odisha} alt="Odisha" />
                  <img src={nagaland} alt="Nagaland" />
                  <img src={bihar} alt="Bihar" />
                  <img src={jammuKashmir} alt="Jammu & Kashmir" />
                  <img src={assam} alt="Assam" />
                  <img src={ladakh} alt="Ladakh" />
                  <img src={goa} alt="Goa" />
                  <img src={maharashtra} alt="Maharashtra" />
                  <img src={manipur} alt="Manipur" />

                  {/* 15 new states */}
                  <img src={uttarakhand} alt="Uttarakhand" />
                  <img src={tamilNadu} alt="Tamil Nadu" />
                  <img src={karnataka} alt="Karnataka" />
                  <img src={sikkim} alt="Sikkim" />
                  <img src={gujarat} alt="Gujarat" />
                  <img src={westBengal} alt="West Bengal" />
                  <img src={madhyaPradesh} alt="Madhya Pradesh" />
                  
                  <img src={himachalPradesh} alt="Himachal Pradesh" />
                  
                  
                  <img src={arunachalPradesh} alt="Arunachal Pradesh" />
                  <img src={chhattisgarh} alt="Chhattisgarh" />
                  <img src={telangana} alt="Telangana" />
                  <img src={delhi} alt="Delhi" />
                </div>
              </div>
              <button className="arrow right" onClick={scrollRight}>▶</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
