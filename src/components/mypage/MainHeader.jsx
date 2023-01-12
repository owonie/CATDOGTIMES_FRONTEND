import React, { useEffect, useState, useRef } from 'react';
import "./MainHeader.css";
import { useSelector, useDispatch } from "react-redux";   

import { Button, Modal } from 'antd';

const MainHeader = (props) => {
    const users = useSelector((state) => {
        //console.log(state.memberInfo.data);
        return state.memberInfo.data;
    });


    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);
    // const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        // setModalText('The modal will be closed after two seconds');
        // setConfirmLoading(true);
        setTimeout(() => {
        setOpen(false);
        // setConfirmLoading(false);
        }, 100);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const followers = ()=>{
        alert('팔로워 목록')
    }
    const following = ()=>{
        alert('팔로잉 목록')
    }

    return <>
        <div id="main_header" className="main_header pt-3 pb-5">
            <div className="profile d-flex">
                <div className="profile_photo pr-5">
                    {
                        users !== null ? 
                        <img src={`http://localhost:8088/times/resources/upload/${users.memberPhoto}`} alt={users.memberNickname} className="img-thumbnail rounded-circle" />
                        :  <img src="http://localhost:8088/times/resources/upload/undefined.jpg" alt="undefiend" className="img-thumbnail rounded-circle" />
                    }
                    
                </div>
                <div className="profile_info d-flex flex-column">
                    <h3 className="nickname">
                        {users !== null ? users.memberNickname : "NoData"}
                    </h3>
                    <div className="summ_cnt">
                        <span className="posts">총게시글수 (<span> {users !== null ?  users.postTotal:"NoData" } </span>)</span>
                        <span className="follower" onClick={followers}>팔로워 (<span> {users !== null ? users.followerCnt : "NoData" }</span>)</span>
                        <span className="following" onClick={following}>팔로잉 (<span> {users !== null ? users.followingCnt:  "NoData" }</span>)</span>
                    </div>
                    <p className="accountid">@{users !== null ? users.memberId : "NoData" }</p>
                </div>
            </div>

            <div id="followerlist">
                followerlist
            </div>

            <div id="followinglist">
                followinglist
            </div>

            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>dfg dg sfg</p>
            </Modal>


        </div>
    </>;
};

export default MainHeader;
