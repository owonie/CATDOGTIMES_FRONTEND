import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Routes, Route, Link } from 'react-router-dom';
import Walk from './routes/Walk/Walk';
import SNS from './routes/SNS/SNS';
import Mypage from './routes/Mypage/Mypage';
import Testlogin from './routes/Mypage/Testlogin';
import Explore from './routes/Explore/Explore';
import MypageUpdatemyinfo from './routes/Mypage/MypageUpdatemyinfo';
import DirectMessage from './routes/Direct/Direct';
import Comment from './components/Comment/Comment';
import FeedBox from './components/FeedBox/FeedBox';

const App = ({ roomRepository, messageRepository, routeRepository }) => {
  const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;

  const [user, setUser] = useState(null);
  const sessionInfo = (user) => {
    console.log('--------');
    console.log(user);
    setUser(user);
  };

  return (
    <>
      <div className='App'>
        <div className='text-center'>
          <div>멍냥일보 프론트엔드입니당</div>
          <Link to='/testlogin' className='button'>
            테스트 로그인
          </Link>
        </div>
        <Routes>
          <Route path='/feed' element={<FeedBox />}></Route>
          <Route path='/comment' element={<Comment />}></Route>
          <Route
            path='/walk'
            element={
              <Walk weatherKey={weatherKey} routeRepository={routeRepository} />
            }
          ></Route>
          <Route path='/post' element={<SNS />}></Route>
          <Route path='/explore' element={<Explore />}></Route>
          <Route
            path='/direct'
            element={
              <DirectMessage
                roomRepository={roomRepository}
                messageRepository={messageRepository}
              />
            }
          ></Route>
          <Route path='/testlogin' element={<Testlogin />}></Route>
          <Route
            path='/memberinfo'
            element={<Mypage user={user} sessionInfo={sessionInfo} />}
          ></Route>
          <Route
            path='/mypageupdate'
            element={
              <MypageUpdatemyinfo user={user} sessionInfo={sessionInfo} />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
