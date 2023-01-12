import React from 'react';
import { useSelector, useDispatch } from "react-redux";   
import { updateMemberInfo } from "../../reducers/memberInfo";

const Side = (props) => {
    const users = useSelector((state) => {
        return state.memberInfo.data;
    });
    // const dispatch = useDispatch();
    // const delMemberInfo = (e) => {
    //     e.preventDefault();
    //     dispatch(updateMemberInfo(null));
    // };

return <>
<aside id="ntside" className="ntheader right_side h_icon_iccl p-3">
            <div className="ntheader_wrapper pr z_200">
                <div id="kalles-section-header_7" className="kalles-section sp_header_mid">
                    <div className="header__mid pl__15 pr__15">
                        <div className="row al_center">
                            <div className="col-lg-12 col-6 tc">
                                <div className="branding ts__05 lh__1 pb-3">
                                    <a className="dib" href="./memberinfo" title='Go MyPage'>
                                        <img className="w__95 logo_normal dn db_lg rounded-circle " src=
                                            {users !== null ? `http://localhost:8088/times/resources/upload/${users.memberPhoto}` : 
                                            "http://localhost:8088/times/resources/upload/undefined.jpg"}
                                            alt="photo"/>
                                        <img className="w__100 logo_sticky dn rounded-circle" src={users !== null 
                                            ? `http://localhost:8088/times/resources/upload/${users.memberPhoto}` 
                                            : "http://localhost:8088/times/resources/upload/undefined.jpg"}
                                            alt="photo"/>
                                        <img className="w__100 logo_mobile dn_lg rounded-circle" src={users !== null 
                                            ? `http://localhost:8088/times/resources/upload/${users.memberPhoto}` 
                                            : "http://localhost:8088/times/resources/upload/undefined.jpg"}
                                            alt="photo"/>
                                        <span className="nickname pt-3 d-inline-block">{users !== null ? users.memberNickname : "NoData"}</span>
                                    </a>
                                    <div className="myranking pt-2">
                                        MyRanking (<span className="cnt">999</span>) 
                                    </div>
                                </div>
                                <div className="profile-btns pt-3">
                                    <a href="./mypageupdate" className="d-inline-block p-3">정보수정</a>
                                    <a href="./testlogin"  className="d-inline-block p-3">로그아웃</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 dn db_lg mt__10 mb__30 tc allrank">
                <div className="widget widget_product_list text-left p-3">
                    <h5 className="widget-title pt-5">전체랭킹</h5>
                    <ul className="product_list_widget">
                        <li className="row mb__10 pb__10">
                            <div className="col widget_img_pr">
                                <img src="mypage/assets/images/profile1.jpg"  className="ls-is-cached lazyloaded rounded" alt="랭킹 1위"/>
                            </div>
                            <div className="col widget_if_pr">
                                <span className="nick d-block">흰둥이</span><span className="account small">@white1004</span>
                            </div>
                            <div className="col rank al_center"><span className="badge badge-info p-1">1위</span></div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </aside>
</>;
};

export default Side;
