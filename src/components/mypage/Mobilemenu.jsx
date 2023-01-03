import React from 'react';

const Mobilemenu = (props) => {
return <>
{/* <!-- mobile menu --> */}
    <div id="nt_menu_canvas" className="nt_fk_canvas nt_sleft dn lazyload pt-3">
        <i className="close_pp pegk pe-7s-close ts__03 cd"></i>
        <div className="pr mb_nav_ul flex al_center fl_center p-3" >멍냥일보</div>
        
        <div id="kalles-section-mb_nav_js" className="mb_nav_tab active">
            <div id="kalles-section-mb_nav" className="kalles-section">
                <ul id="menu_mb_ul" className="nt_mb_menu">
                    <li id="item_header_7-0" className="menu-item  ">
                        <a href="#"><span className="nav_link_txt flex al_center">HOME</span></a>
                    </li>
                    <li className="menu-item ">
                        <a href="#" className="icon_search push_side cb chp"  data-id="#nt_search_canvas" ><span className="nav_link_txt flex al_center">검색</span></a>
                    </li>
                    <li className="menu-item ">
                        <a href="#"><span className="nav_link_txt flex al_center">탐색</span></a>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="kalles-lbl__nav-sale">알림<span className="lbc_nav_mb ml__5">5</span></a>
                    </li>
                    <li className="menu-item ">
                        <a href="#"><span className="nav_link_txt flex al_center">DM</span></a>
                    </li>
                    <li className="menu-item  ">
                        <a href="#"><span className="nav_link_txt flex al_center">북마크</span></a>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
    {/* <!-- end mobile menu --> */}
</>;
};

export default Mobilemenu;
