import React from "react";
import "./Ranking.css";

function Ranking() {
  return (
    <div className="AsideBox__ranking">
      <div className="AsideBox__ranking__title">
        <i class="fas fa-star"></i>
        <span>추천 리스트</span>
      </div>
      <ul>
        <a href="#">
          <li class="ranking-user">
            <div class="ranking-user__row">
              <div class="ranking-user__badge">1</div>
            </div>
            <div class="ranking-user__row">
              <img src="./img/bami.jpg" class="ranking-user__avatar" />
              <div class="ranking-user__text">
                <h4 class="ranking-user__title">바미</h4>
                <h6 class="ranking-user__subtitle">대답냥이다냥</h6>
              </div>
            </div>
          </li>
          <li class="ranking-user">
            <div class="ranking-user__row">
              <div class="ranking-user__badge2">2</div>
            </div>
            <div class="ranking-user__row">
              <img src="./img/wooyoo.jpg" class="ranking-user__avatar" />
              <div class="ranking-user__text">
                <h4 class="ranking-user__title">우유</h4>
                <h6 class="ranking-user__subtitle">털찐 거개</h6>
              </div>
            </div>
          </li>
          <li class="ranking-user">
            <div class="ranking-user__row">
              <div class="ranking-user__badge3">3</div>
            </div>
            <div class="ranking-user__row">
              <img src="./img/doge.jpg" class="ranking-user__avatar" />
              <div class="ranking-user__text">
                <h4 class="ranking-user__title">도지</h4>
                <h6 class="ranking-user__subtitle">물리면 아프다멍</h6>
              </div>
            </div>
          </li>
        </a>
      </ul>
    </div>
  );
}

export default Ranking;
