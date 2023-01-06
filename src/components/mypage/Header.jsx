import React from 'react';
import { useSelector, useDispatch } from "react-redux";

const Header = (props) => {
    const users = useSelector((state) => {
        return state.memberInfo.data;
    });
    return <>

        <header id="ntheader" className="ntheader header_7 h_icon_iccl p-3">
            <div className="ntheader_wrapper pr z_200">
                <div id="kalles-section-header_7" className="kalles-section sp_header_mid">
                    <div className="header__mid pl__15 pr__15">
                        <div className="row al_center">
                            {/* <!-- 모바일에서 메뉴보기 아이콘 --> */}
                            <div className="col-lg-12 col-3 dn_lg">
                                <a href="#" data-id="#nt_menu_canvas"
                                    className="push_side push-menu-btn lh__1 flex al_center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                        <rect width="30" height="1.5"></rect>
                                        <rect y="7" width="20" height="1.5"></rect>
                                        <rect y="14" width="30" height="1.5"></rect>
                                    </svg>
                                </a>
                            </div>
                            {/* <!-- 반응형 로고 --> */}
                            <div className="col-lg-12 col-6 tc">
                                <div className="branding ts__05 lh__1 pb-5">
                                    <a className="dib" href="/">
                                        <img className="logo logo_normal dn db_lg" src="mypage/assets/images/catdog.svg"
                                            alt="멍냥일보" />
                                        <img className="logo logo_sticky dn" src="mypage/assets/images/catdog.svg"
                                            alt="멍냥일보" />
                                        <img className="logo logo_mobile dn_lg" src="mypage/assets/images/catdog.svg"
                                            alt="멍냥일보" />
                                    </a>
                                </div>
                            </div>
                            {/* <!-- PC 메뉴 --> */}
                            <div className="col-12 dn db_lg mt__10 mb__30 tc">
                                <nav id="nav_header7" className="nav_header7 nt_navigation center-xs">
                                    <ul className="nt_mb_menu">
                                        <li id="item_header_7-0" className="menu-item  ">
                                            <a href="#" className="chp"><span className="nav_link_txt flex al_center">
                                                <i className='fas fa-home'></i>
                                                HOME</span></a>
                                        </li>
                                        <li className="menu-item ">
                                            <a href="#" className="icon_search push_side cb chp" data-id="#nt_search_canvas" >
                                                <span className="nav_link_txt flex al_center">
                                                    <i className='fas fa-search'></i>
                                                    검색</span></a>
                                        </li>
                                        <li className="menu-item ">
                                            <a href="#" className="chp"><span className="nav_link_txt flex al_center">
                                                <i className='fas fa-globe'></i>
                                                탐색</span></a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#" className="chp kalles-lbl__nav-sale">
                                                <i className='fas fa-list-alt'></i>
                                                알림<span className="lbc_nav_mb ml__5">5</span></a>
                                        </li>
                                        <li className="menu-item ">
                                            <a href="#" className="chp"><span className="nav_link_txt flex al_center">
                                                <i className='fas fa-comment-dots'></i>
                                                DM</span></a>
                                        </li>
                                        <li className="menu-item  ">
                                            <a href="#" className="chp"><span className="nav_link_txt flex al_center">
                                                <i className='fas fa-bookmark'></i>
                                                북마크</span></a>
                                        </li>

                                    </ul>
                                </nav>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div className="d-flex flex-column text-center p-3">
                <a className="button p-3 m-3" href="#">새글쓰기</a>
                <a className="button p-3 m-3" href="#">산책하기</a>
            </div>
        </header>

    </>;
};

export default Header;
