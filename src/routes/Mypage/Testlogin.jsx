import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { updateMemberInfo } from "../../reducers/memberInfo";

const TestLogin = () => {
  const token = useSelector((state) => state.userData.catdogtimes_token);
  const dispatch = useDispatch();
  // const memberInfo = useSelector((state) => {
  //   console.log(state)
  //   return state.data;
  // });
  const addMemberInfo = (resdata) => {
    dispatch(updateMemberInfo(resdata));
  };
  const [id, setId] = useState("");
  const handleInputId = (e) => {
    setId(e.target.value)
  }
  const onClickLogin = (e) => {
    e.preventDefault();
    
    // const tt = token.split("?resfeshToken=");
    // const ACCESS_TOKEN= tt[0];
    // const REFRESH_TOKEN = tt[1];

    // console.log(ACCESS_TOKEN);
    // console.log(REFRESH_TOKEN);

    axios.post("/mypage/memberinfo",null,{
      params:{
        id:id,
      },
      // headers : {
      //   ACCESS_TOKEN : ACCESS_TOKEN,
      //   REFRESH_TOKEN: REFRESH_TOKEN,
      // }
    })
    .then(res=>{
      // sessionStorage.setItem('userid',res.data.memberId);
      // sessionStorage.setItem('memberNo',res.data.memberNo);
      // console.log(res.data)
      addMemberInfo(res.data);

      document.location.href="/memberinfo";
    })
    .catch()
  }

  return (
    <div>
      <div className='container w-25'>
        
        <form onSubmit={onClickLogin}>
          <h1 className='text-center pb-5'>Test Login</h1>
          <p>(DB에 있는 계정으로 로그인 )</p>
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
