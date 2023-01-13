import React from 'react';

const Tab03 = ({data}) => {
    console.log(data);
return <>
    <h1>북마크</h1>
    <ul className="bookmarklist">
    {data.map(da => ( 
        <li>
            <a href="#">
            <span className="no"> {da.postId} </span>
            <span className="thum"> <img src="mypage/assets/images/catdog3.png" alt="gg" className="listthum"/> </span>
            <span className="ttitle"> {da.postContent} </span>
            <span className="writer">{da.memberNo}</span>
            <span className="lastUpdate">{da.postUpdateDate}</span>
            </a>
        </li>
    ))}
    </ul>
</>;
};

export default Tab03;
