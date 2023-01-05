import React, { useState } from 'react';
import axios from 'axios';

const TestLogin = () => {

  const [id, setId] = useState("");
  const handleInputId = (e) => {
    setId(e.target.value)
  }
  const onClickLogin = (e) => {
    e.preventDefault();

    axios.post("/memberinfo",null,{
      params:{
        id:id,
      }
    })
    .then(res=>{
      sessionStorage.setItem('userid',res.data.memberId);
      sessionStorage.setItem('memberNo',res.data.memberNo);

      document.location.href="/memberinfo";
    })
    .catch()
  }

  return (
    <div>
      <div className='container w-25'>
        
        <form onSubmit={onClickLogin}>
          <h1 className='text-center pb-5'>Test Login</h1>
          <p>(lee 또는 shin)</p>
          <div className='form-row'>
            <input type="text" name='id' value={id} onChange={handleInputId} />
            <button className='w-100 mt-3'>TestLogin</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default TestLogin;
