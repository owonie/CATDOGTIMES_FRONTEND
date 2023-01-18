import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./walks.css";
import { useSelector, useDispatch } from "react-redux";   

const Mywalks = (props) => {
    const users = useSelector((state) => {
        return state.memberInfo.data;
    });
    const [walkroute, setWalkroute] = useState(null);
    const routeLoad = ()=> {
        axios.post("/mypage/myWalks",null,{
            params:{
                memberNo : users.memberNo
            }
        })
        .then(res=>{
            console.log("routes  : ", res.data);
            setWalkroute(res.data);
        })
        .catch()
    };
    useEffect(() => {
        routeLoad();
    },[])

    
    return <>
        <div className="mywalks list">
            <h5 className="widget-title pt-5">내가 등록한 산책경로</h5>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>경로이름</th>
                        <th>경로</th>
                        <th>참여자</th>
                        <th>경로보기</th>
                        <th>공개여부</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        walkroute !== null ?walkroute.map((route,i)=>(
                            <tr key={i}>
                                <td> {i+1} </td>
                                <td> {route.routeName} </td>
                                <td> {route.routeDepartures} -&gt; {route.routeDestination}</td>
                                <td> {route.partyMemberNickname} </td>
                                <td> <a href="#">경로보기</a> </td>
                                <td> <a href="#">{route.routePublic}</a> </td>
                                <td> <a href="#">삭제</a> </td>
                            </tr>
                        )) : <tr><td colSpan={7}>NoData</td></tr>
                    }
                    
                </tbody>
            </table>
        </div>
    </>;
};

export default Mywalks;
