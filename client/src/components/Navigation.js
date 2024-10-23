import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <header className="App-header">
          <button className="header-icon">
            <span className="material-symbols-rounded">add</span>
          </button>
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><p>My Monthly Subscriptions</p></Link>
        <Link to="/stats">
          <button className="header-icon">
            <span className="material-symbols-rounded">bar_chart</span>
          </button>
        </Link>
      </header>
    </>
  );
}

export default Navigation;
