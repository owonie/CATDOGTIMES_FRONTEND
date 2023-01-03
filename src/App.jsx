import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { Routes, Route } from "react-router-dom";
import Walk from "./routes/Walk/Walk";
import SNS from "./routes/SNS/SNS";
import Explore from "./routes/Explore/Explore";

const App = () => {
  const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/walk" element={<Walk weatherKey={weatherKey} />}></Route>
          <Route path="/post" element={<SNS />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
