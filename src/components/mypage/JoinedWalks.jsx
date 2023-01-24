import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateMemberInfo } from "../../reducers/memberInfo";
import Pagination from "./Pagination";
import axios from 'axios';

const JoinedWalks = (props) => {
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

    const [walkroute, setWalkroute] = useState(null);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;  

    // const routeLoad = ()=> {
    //     axios.post("/mypage/joinedWalks",null,{
    //         params:{
    //             memberNo : users.memberNo
    //         }
    //     })
    //     .then(res=>{
    //         console.log("join routes  : ", res.data);
    //         setWalkroute(res.data);
    //     })
    //     .catch()
    // };
    useEffect(() => {
        let reqdata = {
            memberNo : memberInfo.memberNo
        }

        const loadData = async () => {
            const response = await fetch(`/mypage/joinedWalks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ACCESS_TOKEN: accessToken,
            },
            body:JSON.stringify(reqdata)
            });
            let data = await response.json();
        
            if (response.status === 401) {
                const res = await fetch(`/mypage/joinedWalks`, {
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
        <div className="joinedwalks list">
            <h5 className="widget-title pt-5">내가 참여한 산책경로</h5>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>파티이름</th>
                        <th>경로</th>
                        <th>참여자</th>
                        <th>경로보기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        walkroute !== null ?walkroute.slice(offset,offset+limit).map((route,i)=>(
                            <tr key={i}>
                                <td> {i+1} </td>
                                <td> {route.partyName} </td>
                                <td> {route.partyDepartures} -&gt; {route.partyDestination}</td>
                                <td> {route.partyMemberNickname} </td>
                                <td> <a href="#">경로보기</a> </td>
                            </tr>
                        )) : <tr><td colSpan={5}>NoData</td></tr>
                    }
                </tbody>
            </table>
            <footer>
                <Pagination
                    total={walkroute !== null ? walkroute.length : 0}
                    limit={limit}
                    page={page}
                    setPage={setPage} />
            </footer>
        </div>
    </>;
};

export default JoinedWalks;
