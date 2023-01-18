import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AsideBox from "../../components/AsideBox/AsideBox";
import FeedBox from "../../components/FeedBox/FeedBox";
import NavBar from "../../components/NavBar/NavBar";
import Search from "../../components/Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { updateToken } from "../../reducers/userData";

import "./SNS.css";

function SNS() {
  const token = useSelector((state) => state.userData.catdogtimes_token);
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      const userToken = params.get("accessToken");
      console.log("token", userToken);
      dispatch(updateToken(userToken));
      navigate("/post");
    }
  });
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
