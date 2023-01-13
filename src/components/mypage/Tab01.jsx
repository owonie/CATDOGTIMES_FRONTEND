import React from 'react';

const Tab01 = ({data}) => {
    console.log(data);
    return <>

        <h1>내게시물</h1>

        <div className="myPost row fl_center space_30 ">
            {data.map(da => ( 
            <div className="col-lg-4 col-md-4 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
            <h1>{da.postContent}</h1>
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
            ))}
        </div>

    </>;
};

export default Tab01;