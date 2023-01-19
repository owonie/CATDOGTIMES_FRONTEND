import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./walks.css";
import { useSelector, useDispatch } from "react-redux";   
import { updateMemberInfo } from "../../reducers/memberInfo";

const Mywalks = (props) => {
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

    
    const [walkroute, setWalkroute] = useState([]);
    // const routeLoad = ()=> {
    //     axios.post("/mypage/myWalks",null,{
    //         params:{
    //             memberNo : users.memberNo
    //         }
    //     })
    //     .then(res=>{
    //         console.log("routes  : ", res.data);
    //         setWalkroute(res.data);
    //     })
    //     .catch()
    // };
    useEffect(() => {
        let reqdata = {
            memberNo : memberInfo.memberNo
        }

        const loadData = async () => {
            const response = await fetch(`/mypage/myWalks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ACCESS_TOKEN: accessToken,
            },
            body:JSON.stringify(reqdata)
            });
            let data = await response.json();
        
            if (response.status === 401) {
                const res = await fetch(`/mypage/myWalks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ACCESS_TOKEN: accessToken,
                    REFRESH_TOKEN: refreshToken,
                },
                //body:JSON.stringify(reqdata)
                });
                data = await res.json();
            }
            console.log(data);
            setWalkroute(data);
        };
        loadData();

        //routeLoad();
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
