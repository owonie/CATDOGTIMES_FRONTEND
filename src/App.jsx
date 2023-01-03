import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import Walk from './routes/Walk/Walk';

const App = () => {
  const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;
  return (
    <>
      <div className='App'>
        <Routes>
          <Route
            path='/walk'
            element={<Walk weatherKey={weatherKey} />}
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
