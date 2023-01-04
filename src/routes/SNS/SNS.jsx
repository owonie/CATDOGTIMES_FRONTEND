import { useEffect, useState } from "react";
import AsideBox from "../../components/AsideBox/AsideBox";
import FeedBox from "../../components/FeedBox/FeedBox";
import NavBar from "../../components/NavBar/NavBar";
import Search from "../../components/Search/Search";
import "./SNS.css";

function SNS() {
  return (
    <>
      <div className="SNS">
        <nav id="nav" className="col">
          <NavBar />
        </nav>
        <section className="center">
          <Search />
          <FeedBox />
        </section>
        <aside id="asideBox">
          <AsideBox />
        </aside>
      </div>
    </>
  );
}

export default SNS;
