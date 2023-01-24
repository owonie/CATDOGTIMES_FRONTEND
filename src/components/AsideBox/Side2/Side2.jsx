import React from "react";
import { useSelector } from "react-redux";
import Ranking from "../Ranking/Ranking";
import "./Side2.css";
const Side2 = () => {
  const imgPath = "http://localhost:8088/times/resources/upload/";
  const users = useSelector((state) => {
    return state.memberInfo.data;
  });

  return (
    <>
      <aside id="ntside" className="ntheader right_side h_icon_iccl p-3">
        <div className="ntheader_wrapper pr z_200">
          <div id="kalles-section-header_7" className="kalles-section sp_header_mid">
            <div className="header__mid pl__15 pr__15">
              <div className="row al_center">
                <div className="col-lg-12 col-6 tc">
                  <div className="branding ts__05 lh__1 pb-3">
                    <a className="dib" href="./memberinfo" title="Go MyPage">
                      <div className="profile">
                        <img
                          className="w__95 logo_normal dn db_lg rounded-circle "
                          src={users !== null ? `${imgPath}${users.memberPhoto}` : "`${imgPath}`undefined.jpg"}
                          alt="photo"
                        />
                      </div>
                      <span className="nickname pt-3 d-inline-block">{users !== null ? users.memberNickname : "NoData"}</span>
                    </a>
                  </div>
                  <div className="profile-btns pt-3">
                    <a href="./mypageupdate" id="edit" className="d-inline-block p-3">
                      정보수정
                    </a>
                    <a href="./testlogin" id="logout" className="d-inline-block p-3">
                      로그아웃
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Ranking />
      </aside>
    </>
  );
};

export default Side2;
