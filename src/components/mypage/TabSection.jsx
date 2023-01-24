import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tab01 from './Tab01';
import Tab02 from './Tab02';
import Tab03 from './Tab03';
import "./TabSection.css";
import { useSelector, useDispatch } from "react-redux";  
import { updateMemberInfo } from "../../reducers/memberInfo";

const TabSection = (props) => {
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

    //let searchType="";   //postlike, bookmark
    const [searchType, setSearchType] = useState("");
    const [postSearch, setPostSearch] = useState([]);
        
    useEffect(() => {
        // memberInfo !== null ? memberPostSearch(searchType) : alert('잘못된 접근입니다');
        memberInfo !== null ? memberPostSearch(searchType) : window.location.reload();

    }, [searchType])
    
    const memberPostSearch = (searchType) => {
        // axios.post("/mypage/postSearch",null,{
        //     params:{
        //         searchType : searchType,
        //         memberNo : memberInfo.memberNo
        //     }
        // })
        // .then(res=>{
        //     setPostSearch(res.data);
        // })
        // .catch()

        let reqdata = {
            searchType : searchType,
            memberNo : memberInfo.memberNo
        }

        const loadData = async () => {
            const response = await fetch(`/mypage/postSearch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ACCESS_TOKEN: accessToken,
            },
            body:JSON.stringify(reqdata)
            });
            let data = await response.json();
        
            if (response.status === 401) {
                const res = await fetch(`/mypage/postSearch`, {
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
            setPostSearch(data);
        };
        loadData();


    }

    const objTabs = {
        0: <Tab01 data={postSearch}/>,
        1: <Tab02 data={postSearch}/>,
        2: <Tab03 data={postSearch}/>,
    };
    const [tab, setTab] = useState(0);
    const clickHandler = (tabNo) => {
        setTab(tabNo);
        if (tabNo === 0)
            setSearchType("")
        else if (tabNo === 1)
            setSearchType("postlike")
        else if (tabNo === 2)
            setSearchType("bookmark")

    };
return <>

<div className="wrapper">
    <ul className="tabs">
        <li className={`${tab === 0? 'active': ''}`} onClick={() => {clickHandler(0)}}>게시물</li>
        <li className={`${tab === 1? 'active': ''}`} onClick={() => {clickHandler(1)}}>좋아요</li>
        <li className={`${tab === 2? 'active': ''}`} onClick={() => {clickHandler(2)}}>북마크</li>
    </ul>
    <div className="contents">
        {objTabs[tab]}
    </div>
</div>

</>;
};

export default TabSection;
