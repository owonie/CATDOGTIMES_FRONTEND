import React, {useState , useEffect } from 'react';
import Header from '../../components/mypage/Header';
import Side from '../../components/mypage/Side';
import Mobilemenu from '../../components/mypage/Mobilemenu';
import Backtobtn from '../../components/mypage/Backtobtn';
import Footer from '../../components/mypage/Footer';
import Searchbox from '../../components/mypage/Searchbox';
import Mywalks from '../../components/mypage/Mywalks';
import MainHeader from '../../components/mypage/MainHeader';
import TabSection from '../../components/mypage/TabSection';
import JoinedWalks from '../../components/mypage/JoinedWalks';
import { useSelector, useDispatch } from 'react-redux';
import { updateMemberInfo } from "../../reducers/memberInfo";
import axios from 'axios';
import 'antd/dist/antd';
// import { DatePicker } from 'antd';
import NavBar from '../../components/NavBar/NavBar';
import AsideBox from '../../components/AsideBox/AsideBox';
import '../SNS/SNS.css';
import {
    updateAccessToken,
    updateDisplayName,
    updateRefreshToken,
    updateUserId,
  } from '../../reducers/userData';

const Mypage = (props) => {
  const accessToken = useSelector(
    (state) => state.userData.catdogtimes_accessToken
  );
  const refreshToken = useSelector(
    (state) => state.userData.catdogtimes_refreshToken
  );
  //이미지 src
  const imgPath = 'http://localhost:8088/times/resources/upload/';

  // 리덕스 저장소의 데이터 변경
  const dispatch = useDispatch();
  const addMemberInfo = (resdata) => {
    dispatch(updateMemberInfo(resdata));
  };
  const memberInfo = useSelector((state) => {
    return state.memberInfo.data;
  });

  useEffect(() => {
    
    //토큰값 보내고 data 받아오기
    const loadData = async () => {
      const response = await fetch(`/mypage/memberinfo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: accessToken,
        },
      });
      let data = await response.json();

      if (response.status === 401) {
        const res = await fetch(`/mypage/memberinfo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          }
        });
        data = await res.json();
      }
      console.log(data);
      addMemberInfo(data);
    };
    loadData();

  }, []);



  return (
    <>
      <div id='a' className='SNS'>
        
        <nav id='nav' className='col'>
          <NavBar />
        </nav>
        
        <div id='nt_content' className='mainContent p-5 center'>

          <h3 className="h3 pb-5 pageTitle">내정보 보기</h3>
          <MainHeader/>
          <TabSection/>
          <Mywalks/>
          <JoinedWalks />
        </div>
        
        <aside id='asideBox'>
          <AsideBox />
        </aside>
      </div>

    </>
  );
};

export default Mypage;
