import { useEffect, useState } from 'react';
import styles from './app.module.css';

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
  return <div className='App'>멍냥일보 프론트엔드입니당:{message}</div>;
};

export default App;
