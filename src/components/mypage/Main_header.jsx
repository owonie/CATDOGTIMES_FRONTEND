import React from 'react';

const Main_header = ({users}) => {

return <>
<div id="main_header" className="main_header pt-3 pb-5">
        <div className="profile d-flex">
            <div className="profile_photo pr-5">
            <img src={`mypage/assets/images/${users.memberPhoto}`} alt={users.memberNickname} className="img-thumbnail rounded-circle" />
            </div>
            <div className="profile_info">
            <h3 className="nickname">{users.memberNickname}</h3>
            <div className="summ_cnt">
                <span className="posts">총게시글수 (<span>{users.postTotal}</span>)</span>
                <span className="follower">팔로워 수 (<span>{users.followerCnt}</span>)</span>
                <span className="follow">팔로우 수 (<span>{users.followingCnt}</span>)</span>
            </div>
            <p className="accountid" onClick={() => { alert('test') }}>@{users.memberId}</p>
            </div>
        </div>
        </div>
</>;
};

export default Main_header;
