import React, { useEffect } from 'react';
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
import "antd/dist/antd";
// import { DatePicker } from 'antd';

const Mypage = (props) => {

    const memberInfo = useSelector((state) => {
        return state.memberInfo.data;
    });

return (
<>

    <div id="nt_wrapper">
    <Header/>
    <div id="nt_content" className="mainContent p-5">
    {/* <DatePicker/> */}
        <div>Mypage page</div>
            <MainHeader users={memberInfo}/>
            <TabSection />
            <Mywalks/>
            <JoinedWalks/>

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
