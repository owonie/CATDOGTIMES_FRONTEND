import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { Routes, Route, Link } from "react-router-dom";
import Walk from "./routes/Walk/Walk";
import SNS from "./routes/SNS/SNS";
import Mypage from "./routes/Mypage/Mypage";
import Testlogin from "./routes/Mypage/Testlogin";
import Explore from "./routes/Explore/Explore";

import Mypage_updatemyinfo from "./routes/Mypage/Mypage_updatemyinfo";
import DirectMessage from "./routes/Direct/Direct";

const App = () => {
  const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [user, setUser] = useState(null);

  const sessionInfo = (user) => {
    console.log("--------");
    console.log(user);
    setUser(user);
  };

  return (
    <>
      <div className="App">
        <div className="text-center">
          <div>멍냥일보 프론트엔드입니당</div>
          <Link to="/testlogin" className="button">
            테스트 로그인
          </Link>
          <Link to="/memberinfo" className="button">
            멤버인포
          </Link>
          <Link to="/mypageupdate" className="button">
            {" "}
            정보수정
          </Link>
        </div>
        <Routes>
          <Route path="/walk" element={<Walk weatherKey={weatherKey} />}></Route>
          <Route path="/post" element={<SNS />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/direct" element={<DirectMessage />}></Route>
          <Route path="/testlogin" element={<Testlogin />}></Route>
          <Route path="/memberinfo" element={<Mypage user={user} sessionInfo={sessionInfo} />}></Route>
          <Route path="/mypageupdate" element={<Mypage_updatemyinfo user={user} sessionInfo={sessionInfo} />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
