import React from 'react';

const Walk = (props) => {
  const onHandleClick = () => {
    console.log('be clicked!');
  };
  return (
    <>
      <div>walk page</div>
      <button onClick={() => onHandleClick()}>click!</button>
    </>
  );
};

export default Walk;
