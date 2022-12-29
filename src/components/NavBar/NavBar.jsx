import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="Nav">
      <div className="title">
        <img src="./img/catdog.svg" />
      </div>
      <ul className="menu">
        <li className="menu__row">
          <a href="#">
            <i class="fas fa-home fa-lg"></i>
            <span>홈</span>
          </a>
        </li>
        <li className="menu__row">
          <a href="#">
            <i class="fas fa-search fa-lg"></i>
            <span>검색</span>
          </a>
        </li>
        <li className="menu__row">
          <a href="#">
            <i class="far fa-compass fa-lg"></i>
            <span>탐색</span>
          </a>
        </li>
        <li className="menu__row">
          <a href="#">
            <i class="far fa-bell fa-lg"></i>
            <span>알림</span>
          </a>
        </li>
        <li className="menu__row">
          <a href="#">
            <i class="fas fa-dove fa-lg"></i>
            <span>DM</span>
          </a>
        </li>
        <li className="menu__row">
          <a href="#">
            <i class="fas fa-paw fa-lg"></i>
            <span>북마크</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
