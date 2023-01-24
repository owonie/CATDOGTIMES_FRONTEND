import React from "react";
import Notification from "../Notification/Notification";
import Write from "../Add/Write";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="Nav">
      <div className="title">
        <img src="./img/catdog.svg" />
      </div>
      <ul className="menu">
        <li className="menu__row">
          <a href="/post">
            <i className="fas fa-home fa-lg"></i>
            <span>홈</span>
          </a>
        </li>
        <li className="menu__row">
          <a href="/explore">
            <i className="far fa-compass fa-lg"></i>
            <span>탐색</span>
          </a>
        </li>
        <li className="menu__row">
          <Notification />
        </li>
        <li className="menu__row">
          <a href="/direct">
            <i className="fas fa-dove fa-lg"></i>
            <span>DM</span>
          </a>
        </li>
        <li className="menu__row">
          <a href="/memberInfo">
            <i className="fas fa-paw fa-lg"></i>
            <span>내 정보</span>
          </a>
        </li>
      </ul>
      <ul className="menu__bottom">
        <li className="menu__bottom__row">
          <Write />
        </li>
        <li className="menu__bottom__row">
          <a href="/walk">
            <i className="fas fa-dog fa-lg"></i>
            <span>산 책</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
