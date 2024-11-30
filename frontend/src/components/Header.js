import React from "react";


const Header = () => {
  // Function to handle dropdown visibility
  const toggleDropdown = (e) => {
    const dropdownMenu = e.currentTarget.nextElementSibling;
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show"); // Toggle visibility
    }
  };

  return (
    <div className="header">
          <div className="logo-container">
        <img src="/Assets/logo.png" alt="Logo" className="logo" />
        <span className="company-name">Atma Studios</span>
      </div>

      <div className="header-title">
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Course
            <span className="arrow down"></span>
          </button>
          <div className="dropdown-menu">
            <ul>
              <li>Event 1</li>
              <li>Event 2</li>
              <li>Event 3</li>
            </ul>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Events
            <span className="arrow down"></span>
          </button>
          <div className="dropdown-menu">
            <ul>
              <li>Event 1</li>
              <li>Event 2</li>
              <li>Event 3</li>
            </ul>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Community
            <span className="arrow down"></span>
          </button>
          <div className="dropdown-menu">
            <ul>
              <li>Event 1</li>
              <li>Event 2</li>
              <li>Event 3</li>
            </ul>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            For Teams
           
          </button>
          <div className="dropdown-menu">
            <ul>
              <li>Event 4</li>
              <li>Event 5</li>
              <li>Event 6</li>
            </ul>
          </div>
        </div>
      </div>
      <button className="get-in-touch-btn">Get in Touch</button>
    </div>
  );
};

export default Header;
