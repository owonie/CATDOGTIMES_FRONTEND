import React, { useEffect, useState, useRef } from 'react';
import "./MainHeader.css";
import { useSelector, useDispatch } from "react-redux";   
import axios from 'axios';
import { Button, Modal } from 'antd';
import { updateMemberInfo } from "../../reducers/memberInfo";
const MainHeader = (props) => {
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
    const users = useSelector((state) => {
        return state.memberInfo.data;
    });

    const [open, setOpen] = useState(false);//팔로 모달
    const [followlist, setFollowlist] = useState();//팔로 리스트

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 100);
        //재 조회
        // axios.post("/mypage/memberinfo",null,{
        //     params:{
        //         id:users.memberId,
        //     }
        //     })
        //     .then(res=>{

        //     addMemberInfo(res.data);
            
        //     })
        //     .catch()

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
            

    };
    const handleCancel = () => {
        setOpen(false);
    };

    const followers = ()=>{
        console.log('팔로워 목록 - 나를 추가한 사람들');
        // axios.post("/mypage/followSearch",null,{
        //     params:{
        //         type : "follower",
        //         memberNo : users.memberNo
        //     }
        // })
        // .then(res=>{
        //     if(res.data.length > 0){
        //         console.log(res.data);
        //         setFollowlist(res.data);
        //         showModal();
        //     }else{
        //         alert('리스트가 없습니다')
        //     }
            
        // })
        // .catch() 

        let reqdata = {
            type : "follower",
            memberNo : users.memberNo
        }
        const loadData = async () => {
            const response = await fetch(`/mypage/followSearch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ACCESS_TOKEN: accessToken,
            },
            body:JSON.stringify(reqdata)
            });
            let data = await response.json();
        
            if (response.status === 401) {
                const res = await fetch(`/mypage/followSearch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ACCESS_TOKEN: accessToken,
                    REFRESH_TOKEN: refreshToken,
                },
                body:JSON.stringify(reqdata)
                });
                data = await res.json();
            }
            console.log(data);
            setFollowlist(data);
            showModal();
        };
        loadData();




    }
    const following = ()=>{
        console.log('팔로잉 목록 - 내가 추가한 사람들');
        // axios.post("/mypage/followSearch",null,{
        //     params:{
        //         type : "following",
        //         memberNo : users.memberNo
        //     }
        // })
        // .then(res=>{
        //     if(res.data.length > 0){
        //         console.log(res.data);
        //         setFollowlist(res.data);
        //         showModal();
        //     }else{
        //         alert('리스트가 없습니다')
        //     }
        // })
        // .catch()

        let reqdata = {
            type : "following",
            memberNo : users.memberNo
        }
        const loadData = async () => {
            const response = await fetch(`/mypage/followSearch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ACCESS_TOKEN: accessToken,
            },
            body:JSON.stringify(reqdata)
            });
            let data = await response.json();
        
            if (response.status === 401) {
                const res = await fetch(`/mypage/followSearch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ACCESS_TOKEN: accessToken,
                    REFRESH_TOKEN: refreshToken,
                },
                body:JSON.stringify(reqdata)
                });
                data = await res.json();
            }
            console.log(data);
            setFollowlist(data);
            showModal();
        };
        loadData();

    }

    const deleteFollow =(followId,type)=>{
        console.log(followId);
        // axios.post("/mypage/deleteFollower",null,{
        //     params:{
        //         type:type,
        //         memberNo:users.memberNo,
        //         followId : followId
        //     }
        // })
        // .then(res=>{
        //     console.log(res.data);
        //     setFollowlist(res.data);
        //     //새로고침
        // })
        // .catch()
        let reqdata = {
            type : type,
            memberNo : users.memberNo,
            followId : followId
        }
        
        const loadData = async () => {
            const response = await fetch(`/mypage/deleteFollower`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ACCESS_TOKEN: accessToken,
            },
            body:JSON.stringify(reqdata)
            });
            let data = await response.json();
        
            if (response.status === 401) {
                const res = await fetch(`/mypage/deleteFollower`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ACCESS_TOKEN: accessToken,
                    REFRESH_TOKEN: refreshToken,
                },
                body:JSON.stringify(reqdata)
                });
                data = await res.json();
            }
            console.log(data);
            setFollowlist(data);
            showModal();
        };
        loadData();

    }
    return <>
        <div id="main_header" className="main_header pt-3 pb-5">
            <div className="profile d-flex">
                <div className="profile_photo mr-5">
                    {
                        users !== null ? 
                        <img src={`${imgPath}${users.memberPhoto}`} alt={users.memberNickname} className="img-thumbnail rounded-circle" />
                        :  <img src={`${imgPath}undefined.jpg`} alt="undefiend" className="img-thumbnail rounded-circle" />
                    }
                </div>
                <div className="profile_info d-flex flex-column">
                    <h3 className="nickname">
                        {users !== null ? users.memberNickname : "NoData"}
                    </h3>
                    <div className="summ_cnt">
                        <span className="posts">총게시글수 (<span> {users !== null ?  users.postTotal:"NoData" } </span>)</span>
                        <span className="follower" onClick={followers}>팔로워 (<span>{users !== null ? users.followerCnt : "NoData" }</span>)</span>
                        <span className="following" onClick={following}>팔로잉 (<span>{users !== null ? users.followingCnt:  "NoData" }</span>)</span>
                    </div>
                    <p className="accountid">@{users !== null ? users.memberId : "NoData" }</p>
                </div>
            </div>

        {
            (followlist === null) 
            ? "NoData" : <Modal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel} >

                <h3>{(followlist && followlist.length>0) ? followlist[0].type : ""}</h3>
                <ul className="followlist">
                    {
                        (followlist && followlist.length>0)? followlist.map((da,i)=>(
                            <li key={i} className="d-flex">
                                <a href="#" className='d-flex'>
                                    <span className="no"> {da.followId} </span>
                                    <span className="thum">
                                        <img src={`${imgPath}${da.memberPhoto}`} alt={da.memberNickname} /> 
                                    </span>
                                    <span className="ptitle"> {da.memberNickname} </span>
                                </a>
                                <button onClick={()=>(deleteFollow(da.followId,followlist[0].type))} className="delete btn-danger">
                                    {followlist[0].type ==='follower' ? "팔로워 차단" : "팔로잉 취소" } 
                                </button>
                            </li>
                        ))
                        : "NoData" 
                    }
                </ul>
            </Modal>
            
        }

        </div>
    </>;
};

export default MainHeader;
