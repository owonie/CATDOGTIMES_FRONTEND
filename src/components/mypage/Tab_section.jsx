import React from 'react';

const Tab_section = ({users}) => {
return <>
<div className="kalles-section nt_section type_tab type_tab_collection tp_se_cdt pt-5">
                <div className="kalles-fashion-vertical__tab-container container">

                    <div className="tab_se_wrap">
                        <div className="tab_se_header tc mt__30">
                            <ul className="tab_cat_title ul_none des_tab_3">
                                <li className="dib">
                                    <a className="js_t4_tab tt_active" data-bid="kalles_tab_100" href="#"><span>게시물</span></a>
                                </li>
                                <li className="dib">
                                    <a className="js_t4_tab" data-bid="kalles_tab_200" href="#"><span>좋아요</span></a>
                                </li>
                                <li className="dib">
                                    <a className="js_t4_tab" data-bid="kalles_tab_300" href="#"><span>북마크</span></a>
                                </li>

                            </ul>
                        </div>
                        <div className="tab_se_content">
                            <div className="tab_se_element tab-0 lazyload ct_active" id="kalles_tab_100">
                                <div
                                    className="products nt_products_holder row fl_center row_pr_1 cdt_des_1 round_cd_false nt_cover ratio_nt position_8 space_30 equal_nt">
                                    <div
                                        className="col-lg-4 col-md-4 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                                        <div className="product-inner pr">
                                            <div className="product-image pr oh lazyload">
                                                <a className="d-block" href="#">
                                                    <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__127_586"
                                                        data-bgset="mypage/assets/images/catdog.jpg"></div>
                                                </a>
                                                
                                                <div className="hover_button op__0 tc pa flex column ts__03">
                                                    <a className="hover_ico" href="#">
                                                            <span><i className="facl facl-heart"></i> 5 </span>
                                                            <span><i className="fas fa-comment la-flip-horizontal"></i> 7 </span>
                                                    </a>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="tab_se_element tab-1 lazyload" id="kalles_tab_200">
                                <div
                                    className="products nt_products_holder row fl_center row_pr_1 cdt_des_1 round_cd_false nt_cover ratio_nt position_8 space_30 equal_nt">
                                    <div
                                        className="col-lg-12 col-md-12 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                                        <div className="product-inner pr">
                                            <div className="product-image pr oh lazyload">
                                                <ul className="likedlist">
                                                    <li>
                                                        <a href="#">
                                                        <span className="no"> 1 </span>
                                                        <span className="thum"> <img src="mypage/assets/images/catdog3.png" alt="gg" className="listthum"/> </span>
                                                        <span className="title"> 미소의 짧은다리의 역습</span>
                                                        <span className="writer">샙샙이</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="tab_se_element tab-2 lazyload" id="kalles_tab_300">
                                <div
                                    className="products nt_products_holder row fl_center row_pr_1 cdt_des_1 round_cd_false nt_cover ratio_nt position_8 space_30 equal_nt">
                                    <div
                                        className="col-lg-12 col-md-12 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                                        <div className="product-inner pr">
                                            <div className="product-image pr oh lazyload">
                                                <ul className="likedlist">
                                                    <li>
                                                        <a href="#">
                                                        <span className="no"> 1 </span>
                                                        <span className="thum"> <img src="mypage/assets/images/catdog3.png" alt="gg" className="listthum"/> </span>
                                                        <span className="title"> 멍냥이의 하루</span>
                                                        <span className="writer">ㅎㅎㅎ이</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
</>;
};

export default Tab_section;
