import React from 'react';
import "./walks.css";

const Mywalks = ({ users }) => {
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
                    <tr>
                        <td> 1 </td>
                        <td> 주말산책 </td>
                        <td> 주민센터 &gt; 평화공원</td>
                        <td> 곰곰, 진진 </td>
                        <td> <a href="#">경로보기</a> </td>
                        <td> <a href="#">공개</a> </td>
                        <td> <a href="#">삭제</a> </td>
                    </tr>
                    <tr>
                        <td> 1 </td>
                        <td> 주말산책 </td>
                        <td> 주민센터 &gt; 평화공원</td>
                        <td> 곰곰, 진진 </td>
                        <td> <a href="#">경로보기</a> </td>
                        <td> <a href="#">공개</a> </td>
                        <td> <a href="#">삭제</a> </td>
                    </tr>
                    <tr>
                        <td> 1 </td>
                        <td> 주말산책 </td>
                        <td> 주민센터 &gt; 평화공원</td>
                        <td> 곰곰, 진진 </td>
                        <td> <a href="#">경로보기</a> </td>
                        <td> <a href="#">공개</a> </td>
                        <td> <a href="#">삭제</a> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>;
};

export default Mywalks;
