import React, { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css'
const logo = require("../../images/logo.png");
const searchIcon = require("../../images/search-icon.png");

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className = "header__navbar">
        <div className = "header__navbar-links">
        <a href = "/#home">
          <div className = "header__navbar-links_logo">
              <img id = "logo_img" alt = "logo_img" src = { logo } />
          </div>
        </a>
            <div className = "header__navbar-links_container">
                <p><a href = "#home">Browse</a></p>
                <p><a href = "#groups">Groups</a></p>
                <p><a href = "#feedback">Feedback</a></p>
            </div>
            <div className = "header__navbar-searchbar">
              <div id = "header__navbar-links_search-icon">
                <img src = { searchIcon } alt = ""/>
              </div>
              <input placeholder = "Search Kitsu" />
            </div>
            <div className = "header__navbar-sign">
              <p>Sign In</p>
              <button type = "button">Sign Up</button>
            </div>
            <div className="header__navbar-menu">
              {toggleMenu
                ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
              {toggleMenu && (
              <div className="header__navbar-menu_container scale-up-center">
                <div className="header__navbar-menu_container-links">
                  <p><a href = "#home">Browse</a></p>
                  <p><a href = "#groups">Groups</a></p>
                  <p><a href = "#feedback">Feedback</a></p>
                </div>
                <div className="header__navbar-menu_container-links-sign">
                  <p>Sign in</p>
                  <button type="button">Sign up</button>
                </div>
              </div>
              )}
            </div>
        </div>
    </div>
  )
}

export default Navbar