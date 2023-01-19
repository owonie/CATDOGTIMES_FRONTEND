// import React, {useState, useEffect } from 'react';
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { updateToken } from "../../reducers/userData";
// import { updateMemberInfo } from "../../reducers/memberInfo";
// import axios from 'axios';

// import Header from '../../components/mypage/Header';
// import Side from '../../components/mypage/Side';
// import Mobilemenu from '../../components/mypage/Mobilemenu';
// import Backtobtn from '../../components/mypage/Backtobtn';
// import Footer from '../../components/mypage/Footer';
// import Searchbox from '../../components/mypage/Searchbox';
// import Mywalks from '../../components/mypage/Mywalks';
// import MainHeader from '../../components/mypage/MainHeader';
// import TabSection from '../../components/mypage/TabSection';
// import JoinedWalks from '../../components/mypage/JoinedWalks';
// import "antd/dist/antd";
// // import { DatePicker } from 'antd';

// const Mypage = (props) => {

//     const token = useSelector((state) => state.userData.catdogtimes_token);
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const params = new URLSearchParams(location.search);
//     const navigate = useNavigate();

//     const tt = token.split("?resfeshToken=");
//     const ACCESS_TOKEN= tt[0];
//     const REFRESH_TOKEN = tt[1];
//     console.log(ACCESS_TOKEN);
//     console.log(REFRESH_TOKEN);

//     useEffect(()=>{
//         if (!token) {
//             const userToken = params.get("accessToken");
//             console.log("token", userToken);
//             dispatch(updateToken(userToken));
//             navigate("/memberinfo");
//         }
//         axios.get("/mypage/memberinfo",null,{
//             // params:{
//             //     id:1,
//             // },
//             headers : {
//                 ACCESS_TOKEN : ACCESS_TOKEN,
//                 REFRESH_TOKEN: REFRESH_TOKEN,
//             }
//         })
//         .then(res=>res.json())
//         .then(json=>{
//             console.log(json);
//             //addMemberInfo(res.data);
//         })
//         .catch()

//     },[]);

//     const memberInfo = useSelector((state) => {
//         return state.memberInfo.data;
//     });
//     const addMemberInfo = (resdata) => {
//         dispatch(updateMemberInfo(resdata));
//     };

// return (
// <>

//     <div id="nt_wrapper">
//     <Header/>
//     <div id="nt_content" className="mainContent p-5">
//     {/* <DatePicker/> */}
//         <div>Mypage page</div>
//             {/* <MainHeader users={memberInfo}/>
//             <TabSection />
//             <Mywalks/>
//             <JoinedWalks/> */}

//         </div>
//         {/* <Side  users={memberInfo}/> */}
//         <Footer/>
//     </div>
//     <Searchbox/>
//     <Mobilemenu/>
//     <Backtobtn/>
// </>
// );
// };

// export default Mypage;
