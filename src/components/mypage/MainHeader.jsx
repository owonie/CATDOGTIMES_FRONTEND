import React from 'react';
import "./MainHeader.css";
import { useSelector, useDispatch } from "react-redux";   
const MainHeader = (props) => {
    const users = useSelector((state) => {
        return state.memberInfo.data;
    });
    return <>
        <div id="main_header" className="main_header pt-3 pb-5">
            <div className="profile d-flex">
                <div className="profile_photo pr-5">
                    <img src={`mypage/assets/images/${users.memberPhoto}`} alt={users.memberNickname} className="img-thumbnail rounded-circle" />
                </div>
                <div className="profile_info d-flex flex-column">
                    <h3 className="nickname">{users.memberNickname}</h3>
                    <div className="summ_cnt">
                        <span className="posts">총게시글수 (<span>{users.postTotal}</span>)</span>
                        <span className="follower" onClick={() => { alert('팔로워 목록') }}>팔로워 (<span>{users.followerCnt}</span>)</span>
                        <span className="following" onClick={()=> { alert('팔로잉 목록') }}>팔로잉 (<span>{users.followingCnt}</span>)</span>
                    </div>
                    <p className="accountid">@{users.memberId}</p>
                </div>
            </div>
        </div>
    </>;
};

export default MainHeader;
