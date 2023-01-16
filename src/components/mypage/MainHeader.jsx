import React, { useEffect, useState, useRef } from 'react';
import "./MainHeader.css";
import { useSelector, useDispatch } from "react-redux";   
import axios from 'axios';
import { Button, Modal } from 'antd';
import { updateMemberInfo } from "../../reducers/memberInfo";
const MainHeader = (props) => {
    // 리덕스 저장소의 데이터 사용
    const users = useSelector((state) => {
        //console.log(state.memberInfo.data);
        return state.memberInfo.data;
    });

    // 리덕스 저장소의 데이터 변경
    const dispatch = useDispatch();
    const addMemberInfo = (resdata) => {
        dispatch(updateMemberInfo(resdata));
    };

    const imgPath = "http://localhost:8088/times/resources/upload/";
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
        axios.post("/memberinfo",null,{
            params:{
                id:users.memberId,
            }
            })
            .then(res=>{

            addMemberInfo(res.data);
            
            })
            .catch()

    };
    const handleCancel = () => {
        setOpen(false);
    };

    const followers = ()=>{
        console.log('팔로워 목록 - 나를 추가한 사람들');
        axios.post("/memberFollowSearch",null,{
            params:{
                type : "follower",
                memberNo : users.memberNo
            }
        })
        .then(res=>{
            if(res.data.length > 0){
                console.log(res.data);
                setFollowlist(res.data);
                showModal();
            }else{
                alert('리스트가 없습니다')
            }
            
        })
        .catch() 
    }
    const following = ()=>{
        console.log('팔로잉 목록 - 내가 추가한 사람들');
        axios.post("/memberFollowSearch",null,{
            params:{
                type : "following",
                memberNo : users.memberNo
            }
        })
        .then(res=>{
            if(res.data.length > 0){
                console.log(res.data);
                setFollowlist(res.data);
                showModal();
            }else{
                alert('리스트가 없습니다')
            }
        })
        .catch()
    }

    const deleteFollow =(followId,type)=>{
        console.log(followId);
        axios.post("/deleteFollower",null,{
            params:{
                type:type,
                memberNo:users.memberNo,
                followId : followId
            }
        })
        .then(res=>{
            console.log(res.data);
            setFollowlist(res.data);
            //새로고침
        })
        .catch()
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
