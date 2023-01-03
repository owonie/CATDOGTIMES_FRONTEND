import { useEffect, useState } from "react";
import AsideBox from "../../components/AsideBox/AsideBox";
import FeedBox from "../../components/FeedBox/FeedBox";
import NavBar from "../../components/NavBar/NavBar";
import Search from "../../components/Search/Search";
import "./SNS.css";

function SNS() {
  return (
    <>
      <div class="SNS">
        <nav id="nav" className="col">
          <NavBar />
        </nav>
        <section className="center">
          <Search />
          <FeedBox />
        </section>
        <aside id="asideBox" className="col-3">
          <AsideBox />
        </aside>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"
        />
      </div>
    </>
  );
}

export default SNS;
