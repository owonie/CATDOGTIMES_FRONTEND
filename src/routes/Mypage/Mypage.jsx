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

const Mypage = (props) => {

    const memberInfo = useSelector((state) => {
        return state.memberInfo.data;
    });

return (
<>
    <div id="nt_wrapper">
    <Header users={memberInfo} />
    <div id="nt_content" className="mainContent p-5">
        
        <div>Mypage page</div>
            <MainHeader users={memberInfo}/>
            <TabSection users={memberInfo}/>
            <Mywalks users={memberInfo}/>
            <JoinedWalks users={memberInfo}/>

        </div>
        <Side  users={memberInfo}/>
        <Footer/>
    </div>
    <Searchbox users={memberInfo}/>
    <Mobilemenu users={memberInfo}/>
    <Backtobtn/>
</>
);
};

export default Mypage;
