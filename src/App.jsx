import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { Routes, Route } from "react-router-dom";
import Walk from "./routes/Walk/Walk";
import SNS from "./routes/SNS/SNS";
import Search from "./components/Search/Search";

const App = () => {
  const [message, setMessage] = useState();
  useEffect(() => {
    fetch("/")
      .then((res) => {
        return res.status;
      })
      .then((data) => {
        if (data === 200) {
          setMessage("백엔드와 연결 성공!");
        }
      });
  }, []);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/walk" element={<Walk />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/post" element={<SNS />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
