import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '../../components/mypage/Header';
import Side from '../../components/mypage/Side';

import Mobilemenu from '../../components/mypage/Mobilemenu';
import Backtobtn from '../../components/mypage/Backtobtn';
import Footer from '../../components/mypage/Footer';
import Searchbox from '../../components/mypage/Searchbox';
import { useSelector, useDispatch } from "react-redux";    
import { updateMemberInfo } from "../../reducers/memberInfo";
import "./MypageUpdatemyinfo.css";
const MypageUpdatemyinfo = (props) => {

  // 리덕스 저장소의 데이터 사용
  const memberInfo = useSelector((state) => {
    return state.memberInfo !== null ? state.memberInfo.data : alert('잘못된 접근입니다.') ;
  });

  // 리덕스 저장소의 데이터 변경
  const dispatch = useDispatch();
  const addMemberInfo = (resdata) => {
    dispatch(updateMemberInfo(resdata));
  };


  // const [name, setName] = useState("");
  // const handleInputName = (e) => {
  //   setName(e.target.value)
  // }

  //정보수정 버튼 클릭하면 실행
  const updateInfo = (e)=>{
    e.preventDefault();
    let photo = document.getElementById('photofile').files.length>0 ? document.getElementById('photofile').files[0].name
    : null;

    let mypage = {
      memberNo :    memberInfo.memberNo,
      memberId :    memberInfo.memberId,
      memberPhoto:  photo,
      memberPw :    document.getElementById('pw1').value,
      memberName :    document.getElementById('name').value,
      memberNickname : document.getElementById('nickname').value,
      memberEmail :   document.getElementById('email').value,
      memberAddress : document.getElementById('address').value,
      memberZipcode : document.getElementById('zipcode').value,
      memberDetailAddress : document.getElementById('detailAddress').value,
    }

    //모든 체크 중 하나라도 통과하지 못하면 
    if(!pwCheckOk || !pwCheckDouble){
      //alert('다시 확인');
      console.log(pwCheckOk);
      console.log(pwCheckDouble);

    }
    //내정보 POST방식으로 서버에 전송하고 리덕스에 저장하기
    // axios.post("/memberUpdate",mypage)
    // .then(res=>{
    //   console.log(res.data);
    //   addMemberInfo(res.data);
    //   document.location.href="/memberinfo";
    // })
    // .catch()
  }

  useEffect(() => {
    memberInfo ? setImgFile("mypage/photo/"+memberInfo.memberPhoto): setImgFile("mypage/photo/undefined.jpg");
    console.log(memberInfo);
  }, []);

  //이미지 파일 변수
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
    
  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setImgFile(reader.result);
    };
    console.log(imgFile.name);
  };

  //비밀번호 형식 확인
  let pwCheckOk = false;
  const pwCheck =()=>{
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const pw = document.getElementById('pw1').value;
    if(!reg.test(pw)){
      document.getElementById('re_pw1').innerHTML = '틀린 형식입니다.';
      document.getElementById('re_pw1').style.color='red';
    }else{
      document.getElementById('re_pw1').innerHTML = '올바른 형식';
      document.getElementById('re_pw1').style.color='green';
      pwCheckOk = true;
      console.log(pwCheckOk);
    }
  }
  //비밀번호 동일 확인
  let pwCheckDouble = false;
  const pwCheck2 =()=>{
    const pw1 = document.getElementById('pw1').value;
    const pw2 = document.getElementById('pw2').value;
    if(pw1 === pw2){
      document.getElementById('re_pw2').innerHTML = '비밀번호가 동일합니다';
      document.getElementById('re_pw2').style.color='green';
      pwCheckDouble = true;
      console.log(pwCheckDouble);
    }else{
      document.getElementById('re_pw2').innerHTML = '비밀번호를 다시 확인하세요';
      document.getElementById('re_pw2').style.color='red';
    }
  }



  //닉네임 기존 입력된 데이터 수정 가능도록.
  const [nickName,setNickName]=useState("");
  const nickNameChange=(e)=>{
    setNickName(e.target.value);
  }
  //닉네임 중복확인
  const checkNickName =()=>{
    let nickName = document.getElementById('nickname').value;
    //db에서 가져오기
    console.log(nickName);
  }

  //이메일 체크
  const emailCheck =()=>{

  }

  //주소찾기
  const execute_daum_address =()=>{

  }

  return (
    <>
      <div id="nt_wrapper">
        <Header />
        <article className="member_info container">
        <h3 className="h3 pb-5">내정보 수정</h3>
        <form encType="multipart/form-data" method="POST" onSubmit={updateInfo}> 
        
        {/* <input id="id" value={memberInfo !== null ? memberInfo.memberId : "NoData"} type="hidden"/> */}
        <div className=" pb-5 info_header">
          <div className="info1">
              <div className="profile-img">
                <img alt="프로필 사진 바꾸기" id="photo" src= {imgFile}/> 
              </div>
              <label htmlFor="photofile" className="ts__03 btn btn-primary">프로필 사진 바꾸기</label>
              <input accept="image/jpeg,image/png" id="photofile" type="file" onChange={saveImgFile} ref={imgRef} className="d-none"/>
          </div>

          <div className="info2">
              <h1 className="nick_name">{memberInfo !== null ? memberInfo.memberNickname : "NoData"}</h1>
              <input type="text" placeholder="아이디" value={memberInfo !== null ? `@`+memberInfo.memberId : "NoData"} id="id" disabled />
          </div>
        </div>
        {/* <form  method="POST" onSubmit={updateInfo}>  */}

        <div className="row pb-3">
          <aside className="col-sm-3"><label className="d-block text-right" htmlFor="pw1">비밀번호</label></aside>
          <div className="col-sm-6">
              <input id="pw1" onBlur={pwCheck} placeholder="영문자+숫자+특수문자 조합으로 8자리 이상 입력해주세요" type="password" className="input-text" />
              <div className="hint small"> <span id="re_pw1"></span></div>
          </div>
          <div className="col-sm-3"> </div>
        </div>
        <div className="row pb-3">
          <aside className="col-sm-3"><label className="d-block text-right" htmlFor="pw2">비밀번호 확인</label></aside>
          <div className="col-sm-6">
              <input id="pw2" onBlur={pwCheck2}  placeholder="비밀번호 확인" type="password" className="input-text"/>
              <div className="hint small"><span id="re_pw2"></span></div>
          </div>
          <div className="col-sm-3"> </div>
        </div>


        <div className="row pb-3">
            <aside className="col-sm-3"><label className="d-block text-right" htmlFor="name">이름(실명)</label></aside>
            <div className="col-sm-6">
                <input id="name"  placeholder="이름" type="text" className="input-text" disabled value={memberInfo !== null ?memberInfo.memberName : "NoData"}  />  
                <div className="hint small">개명하신 분은 고객센터에 문의하여 변경하실 수 있습니다.</div>
            </div>
            <div className="col-sm-3">  </div>
          </div>

          <div className="row pb-3 info_gender">
            <aside className="col-sm-3"><span className="d-block text-right">성별</span></aside>
            <div className="col-sm-6">
              <label><input type="radio" id="male" name="gender" value="M" disabled checked={memberInfo.memberGender ==='M' ? "checked" :""} />남자</label>
              <label><input type="radio" id="female" name="gender" value="W" disabled checked={memberInfo.memberGender ==='W' ? "checked" :""} />여자</label>
              <label><input type="radio" id="other" name="gender" value="O" disabled/>선택 안함</label>
              <div className="hint small">변경을 원하시는 분은 고객센터에 문의하여 주세요. </div>
            </div>
            <div className="col-sm-3"></div>
          </div>

          <div className="row pb-3">
            <aside className="col-sm-3"><label className="d-block text-right" htmlFor="nickname">닉네임(별명)</label></aside>
            <div className="col-sm-6">
                <input id="nickname" value={nickName ? nickName : memberInfo.memberNickname} onChange={nickNameChange} placeholder="닉네임" type="text" className="input-text" />
                <input type="hidden" name="nickNameCheckValue" value="0" />
                <div className="hint small">사람들이 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수
                  있도록 도와주세요. 하루 한번만 변경 가능합니다. </div>
            </div>
            <div className="col-sm-3">
              <button onClick={checkNickName} type="button" className="btn">중복확인</button>
            </div>
          </div>
          
          
          <div className="row pb-3">
            <aside className="col-sm-3"><label className="d-block text-right" htmlFor="email">이메일</label></aside>
            <div className="col-sm-6">
                <input type="text" placeholder="Email"  id="email" name="email"/>
                <input type="text" placeholder="인증번호 6자리 입력" id="email_check" disabled="disabled" maxLength="6"/>
                <input type="hidden" id="emailCheckValue" name="emailCheckValue" value="0" />
                <div className="hint small"><span id="mail-check-warn">입력한 이메일 계정에서 인증번호를 확인하세요. </span></div>
            </div>
            <div className="col-sm-3">
              <button type="button" onClick={emailCheck} className="btn">인증하기</button>
            </div>
          </div>
          

          

          <div className="row pb-3">
            <aside className="col-sm-3"><label className="d-block text-right" htmlFor="addrSearch">주소</label></aside>
            <div className="col-sm-6">
                {/* <input id="addr" placeholder="주소" type="text" className="input-text" /> */}
                <input type="text" placeholder="우편번호" id="zipcode" name="zipcode" disabled/>
                <input type="text" placeholder="주소"  id="address" name="address" disabled/>
                <input type="text" placeholder="상세주소" id="detailAddress" name="detailAddress" disabled/>
                <div className="hint small"></div>
            </div>
            <div className="col-sm-3">
              <button type="button" className="btn" id='addrSearch' onClick={execute_daum_address}>주소찾기</button>
            </div>
          </div>


          <div className="row fl_right  pb-3">
            
            <div className="col-sm-12 text-center">
              <button type="submit"  className="btn mx-1">정보수정</button> 
              <button type="button"  className="btn mx-1">탈퇴신청</button>
            </div>
            
          </div>

        </form>
      </article>
      <Side users={memberInfo}/>
        <Footer/>
    </div>
    <Searchbox/>
    <Mobilemenu/>
      <Backtobtn/>
    </>
  );
};
// let mypage = {
//   memberNo : "",
//   memberId : "",
// }
// axios.post("/memberUpdate",mypage)
// .then(res=>{
//   console.log(res.data);
// })
// .catch()
export default MypageUpdatemyinfo;
