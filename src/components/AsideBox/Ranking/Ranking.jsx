import React from "react";
import "./Ranking.css";

function Ranking() {
  return (
    <div className="AsideBox__ranking">
      <div className="AsideBox__ranking__title">
        <i className="fas fa-star"></i>
        <span>추천 리스트</span>
      </div>
      <ul>
        <a href="#">
          <li className="ranking-user">
            <div className="ranking-user__row">
              <img src="./img/bami.jpg" className="ranking-user__avatar" />
              <div className="ranking-user__text">
                <h4 className="ranking-user__title">바미</h4>
                <h6 className="ranking-user__subtitle">대답냥이다냥</h6>
              </div>
            </div>
          </li>
          <li className="ranking-user">
            <div className="ranking-user__row">
              <img src="./img/wooyoo.jpg" className="ranking-user__avatar" />
              <div className="ranking-user__text">
                <h4 className="ranking-user__title">우유</h4>
                <h6 className="ranking-user__subtitle">털찐 거개</h6>
              </div>
            </div>
          </li>
          <li className="ranking-user">
            <div className="ranking-user__row">
              <img src="./img/doge.jpg" className="ranking-user__avatar" />
              <div className="ranking-user__text">
                <h4 className="ranking-user__title">도지</h4>
                <h6 className="ranking-user__subtitle">물리면 아프다멍</h6>
              </div>
            </div>
          </li>
        </a>
      </ul>
    </div>
  );
}

export default Ranking;
