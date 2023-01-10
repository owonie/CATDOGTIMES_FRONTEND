import React from 'react';
import "./MainHeader.css";
import { useSelector, useDispatch } from "react-redux";   
const MainHeader = (props) => {
    const users = useSelector((state) => {
        console.log(state.memberInfo.data);
        return state.memberInfo.data;
    });
    return <>
        <div id="main_header" className="main_header pt-3 pb-5">
            <div className="profile d-flex">
                <div className="profile_photo pr-5">
                    {
                        users !== null ? 
                        <img src={`mypage/photo/${users.memberPhoto}`} alt={users.memberNickname} className="img-thumbnail rounded-circle" />
                        :  <img src="mypage/photo/undefined.jpg" alt="undefiend" className="img-thumbnail rounded-circle" />
                    }
                    
                </div>
                <div className="profile_info d-flex flex-column">
                    <h3 className="nickname">
                        {users !== null ? users.memberNickname : "NoData"}
                    </h3>
                    <div className="summ_cnt">
                        <span className="posts">총게시글수 (<span> {users !== null ?  users.postTotal:"NoData" } </span>)</span>
                        <span className="follower" onClick={() => { alert('팔로워 목록') }}>팔로워 (<span> {users !== null ? users.followerCnt : "NoData" }</span>)</span>
                        <span className="following" onClick={()=> { alert('팔로잉 목록') }}>팔로잉 (<span> {users !== null ? users.followingCnt:  "NoData" }</span>)</span>
                    </div>
                    <p className="accountid">@{users !== null ? users.memberId : "NoData" }</p>
                </div>
            </div>
        </div>
    </>;
};

export default MainHeader;
