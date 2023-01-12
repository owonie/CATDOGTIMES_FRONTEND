import React, { useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/mypage/Header';
import Side from '../../components/mypage/Side';

import Mobilemenu from '../../components/mypage/Mobilemenu';
import Backtobtn from '../../components/mypage/Backtobtn';
import Footer from '../../components/mypage/Footer';
import Searchbox from '../../components/mypage/Searchbox';
import { useSelector, useDispatch } from "react-redux";    

const MypageUpdatemyinfo = (props) => {
  const memberInfo = useSelector((state) => {
    return state.memberInfo.data;
  });

  return (
    <>
      <div id="nt_wrapper">
        <Header users={memberInfo} />
        <article className="member_info container">
        <h3 className="h3 pb-5">내정보 수정</h3>

        <div className="row pb-5">
          <div className="col-3">
              <div className="profile-img">
                <img alt="프로필 사진 바꾸기" id="photo" src={`mypage/assets/images/${memberInfo.memberPhoto}`}/>
              </div>
          </div>

          <div className="col-9">
            <form encType="multipart/form-data" method="POST" role="presentation">
              <h1 className="nick_name">{memberInfo.memberNickname}</h1>
              <label htmlFor="photofile" className="ts__03">프로필 사진 바꾸기</label>
              <input accept="image/jpeg,image/png" id="photofile" type="file" onChange={()=>{document.getElementById('photo').src = window.URL.createObjectURL(this.files[0])}}/>
            </form>
          </div>
        </div>


        <form className="myinfo" method="POST">
          <div className="row pb-3">
            <aside className="col-sm-3"><label className="d-block text-right" htmlFor="name">닉네임(별명)</label></aside>
            <div className="col-sm-6">
                <input id="name" placeholder="이름" type="text" className="input-text" />
                <div className="hint small">사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수
                  있도록 도와주세요.</div>
            </div>
            <div className="col-sm-3">
              <button type="button" className="btn_link">중복확인</button>
            </div>
          </div>
          
          <div className="row pb-3">
            <aside className="col-sm-3"><label className="d-block text-right" htmlFor="pw1">비밀번호</label></aside>
            <div className="col-sm-6">
                <input id="pw1" placeholder="8글자 이상, 영문+숫자+특수문자로 구성" type="password" className="input-text" />
                <div className="hint small"> </div>
            </div>
            <div className="col-sm-3"> </div>
          </div>

          <div className="row pb-3">
            <aside className="col-sm-3"><label className="d-block text-right" htmlFor="pw2">비밀번호 확인</label></aside>
            <div className="col-sm-6">
                <input id="pw2" placeholder="비밀번호 확인" type="password" className="input-text"/>
                <div className="hint small"> </div>
            </div>
            <div className="col-sm-3"> </div>
          </div>

          <div className="row pb-3">
            <aside className="col-sm-3"><label className="d-block text-right" htmlFor="addr">주소</label></aside>
            <div className="col-sm-6">
                <input id="addr" placeholder="주소" type="text" className="input-text" />
                <div className="hint small"></div>
            </div>
            <div className="col-sm-3">
              <button type="button"  className="btn_link">주소검색</button>
            </div>
          </div>

          <div className="row fl_right  pb-3">
            
            <div className="col-sm-12 text-center">
              <button type="button"  className="button button_primary mx-1">정보수정</button> 
              <button type="button"  className="button button_primary mx-1">탈퇴신청</button>
            </div>
            
          </div>

        </form>
      </article>
      <Side  users={memberInfo}/>
        <Footer/>
    </div>
    <Searchbox users={memberInfo}/>
    <Mobilemenu users={memberInfo}/>
      <Backtobtn/>
    </>
  );
};

export default MypageUpdatemyinfo;
