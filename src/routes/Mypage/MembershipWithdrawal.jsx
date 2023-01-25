import React, { useEffect } from 'react';
import axios from 'axios';
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
import { useSelector, useDispatch } from "react-redux";    
import { updateMemberInfo } from "../../reducers/memberInfo";
import { Button, Form, Input, InputNumber } from 'antd';

import NavBar from '../../components/NavBar/NavBar';
import AsideBox from '../../components/AsideBox/AsideBox';
import '../SNS/SNS.css';
import {
    updateAccessToken,
    updateDisplayName,
    updateRefreshToken,
    updateUserId,
  } from '../../reducers/userData';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const validateMessages = {
    required: '${label} is required!',
    };

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

    const onFinish = (values) => {
        console.log(values);
        console.log(memberInfo.memberNo);
        console.log(values.user.outReasons);
        if(values.user.outReasons === undefined || values.user.outReasons === null){
            alert('탈퇴사유를 적어주세요');
            return false;
        }
        let outinfo = {
            memberNo :  memberInfo.memberNo,
            outReasons: values.user.outReasons,
        }
        // axios.post("/mypage/delete/account",outinfo)
        // .then(res=>{
        //     console.log(res.data);
        //     document.location.href = '/';
        // })

        const loadData = async () => {
            const response = await fetch(`/mypage/delete/account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ACCESS_TOKEN: accessToken,
            },
            body:JSON.stringify(outinfo)
            });
            //let data = await response.json();
        
            if (response.status === 401) {
                const res = await fetch(`/mypage/delete/account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ACCESS_TOKEN: accessToken,
                    REFRESH_TOKEN: refreshToken,
                },
                body:JSON.stringify(outinfo)
                });
                //data = await res.json();
            }
            //console.log(data);
            addMemberInfo(null);
            dispatch(updateAccessToken(null));
            dispatch(updateRefreshToken(null));
            dispatch(updateUserId(null));
            dispatch(updateDisplayName(null));
            document.location.href = 'http://localhost:8088/times/member/login';
        };
        loadData();

    };
return (
<>

    <div id='a' className='SNS'>
        <nav id='nav' className='col'>
            <NavBar />
        </nav>
        <div id="nt_content" className="mainContent p-5 center">
            <h3 className="h3 pb-5 pageTitle">회원 탈퇴 신청</h3>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            
                <Form.Item name={['user', 'outReasons']} label="탈퇴사유" required >
                    <Input.TextArea style={{height:'100px', width:'600px'}} placeholder={"400자 이내로 작성해 주세요"} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                    }} >
                    <Button type="primary" htmlType="submit">
                    탈퇴 신청
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <aside id='asideBox'>
            <AsideBox />
        </aside>
    </div>
</>
);
};

export default Mypage;
