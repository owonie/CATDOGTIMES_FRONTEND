import React from 'react';
import WalkMap from '../../components/map/WalkMap';

const Walk = (props) => {
  const onHandleClick = () => {
    console.log('be clicked!');
  };
  return (
    <>
      <div>walk page</div>
      <WalkMap />

      <button onClick={() => onHandleClick()}>click!</button>
    </>
  );
};

export default Walk;
