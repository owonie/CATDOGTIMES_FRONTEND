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

import { Button, Form, Input, InputNumber } from 'antd';
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
    const memberInfo = useSelector((state) => {
        return state.memberInfo.data;
    });
    const onFinish = (values) => {
        console.log(values);
        console.log(memberInfo.memberNo);
        let outinfo = {
            memberNo :  memberInfo.memberNo,
            outReasons: values.user.outReasons,
        }
        axios.post("/withdrawal",outinfo)
        .then(res=>{
            console.log(res.data);
        })
    };
return (
<>

    <div id="nt_wrapper">
    <Header/>
        <div id="nt_content" className="mainContent p-5">
            <div>회원 탈퇴 신청</div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            
                <Form.Item name={['user', 'outReasons']} label="탈퇴사유">
                    <Input.TextArea style={{height:'100px'}} placeholder={"400자 이내로 작성해 주세요"} />
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
        <Side  users={memberInfo}/>
        <Footer/>
    </div>
    <Searchbox/>
    <Mobilemenu/>
    <Backtobtn/>
</>
);
};

export default Mypage;
