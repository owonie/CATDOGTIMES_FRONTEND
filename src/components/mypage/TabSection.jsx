import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tab01 from './Tab01';
import Tab02 from './Tab02';
import Tab03 from './Tab03';
import "./TabSection.css";

const TabSection = ({users}) => {
    //let searchType="";   //postlike, bookmark
    const [searchType, setSearchType] = useState("");
    const [postSearch, setPostSearch] = useState([]);
        
    useEffect(() => {
        memberPostSearch(searchType);
    }, [searchType])
    
    const memberPostSearch = (searchType) => {
        const memberNo = sessionStorage.getItem("memberNo");
       // const memberNo = users.memberId;
        axios.post("/memberPostSearch",null,{
            params:{
                searchType : searchType,
                memberNo : memberNo
            }
        })
        .then(res=>{
            setPostSearch(res.data);
        })
        .catch()
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
