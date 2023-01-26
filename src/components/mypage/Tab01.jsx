import React from "react";

const Tab01 = ({ data }) => {
  console.log(data);
  const imgPath = "http://localhost:8088/times/resources/upload/";
  return (
    <>
      {/* <h1>내게시물</h1> */}

      <div className="myPost row fl_center space_30 ">
        {data !== null
          ? data.map((da, i) => (
              <div className="col-lg-4 col-md-4 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1" key={i}>
                {/* <h1>{da.postContent}</h1> */}
                <div className="product-inner pr">
                  <div className="product-image pr oh lazyload ">
                    <a className="d-block post_img" href="#">
                      <div
                        className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__127_586"
                        data-bgset={`${imgPath}${da.imageSavedName}`}
                      ></div>
                    </a>

                    <div className="hover_button op__0 tc pa ts__03">
                      <a className="hover_ico" href="#">
                        <span>
                          <i className="facl facl-heart"></i> {da.likeCnt}{" "}
                        </span>
                        <span>
                          <i className="fas fa-comment la-flip-horizontal"></i> {da.replyCnt}{" "}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : "NoData"}
      </div>
    </>
  );
};

export default Tab01;
