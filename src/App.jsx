import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import Walk from './routes/Walk/Walk';
import Login from './routes/Login/Login';

const App = () => {
  const [message, setMessage] = useState();
  useEffect(() => {
    fetch('/')
      .then((res) => {
        return res.status;
      })
      .then((data) => {
        if (data === 200) {
          setMessage('백엔드와 연결 성공!');
        }
      });
  }, []);
  return (
    <>
      <div className='App'>
        <div>멍냥일보 프론트엔드입니당 {message}</div>
        <Routes>
          <Route path='/walk' element={<Walk />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
