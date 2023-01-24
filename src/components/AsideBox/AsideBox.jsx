import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMemberInfo } from "../../reducers/memberInfo";
import "./AsideBox.css";
import Side2 from "./Side2/Side2";

function AsideBox() {
  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  // 리덕스 저장소의 데이터 변경
  const dispatch = useDispatch();
  const addMemberInfo = (resdata) => {
    dispatch(updateMemberInfo(resdata));
  };
  const memberInfo = useSelector((state) => {
    return state.memberInfo.data;
  });

  useEffect(() => {
    //토큰값 보내고 data 받아오기
    const loadData = async () => {
      const response = await fetch(`/mypage/memberinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
        },
      });
      let data = await response.json();

      if (response.status === 401) {
        const res = await fetch(`/mypage/memberinfo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          },
        });
        data = await res.json();
      }
      console.log(data);
      addMemberInfo(data);
    };
    loadData();
  }, []);

  return (
    <div className="AsideBox">
      <div className="AsideBox__member">
        <Side2 users={memberInfo} />
      </div>
    </div>
  );
}

export default AsideBox;
