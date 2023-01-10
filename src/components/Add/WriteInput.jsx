import React from "react";
import { Input } from "antd";
import axios from "axios";
const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};

// let insertPost = {
//   postContent: "들어간다 쭉쭉쭉",
//   memberNo: 2, //memberNo는 데이터 있는 것만 가능
// };
// axios
//   .post("/post/add", insertPost)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch();

const WriteInput = () => (
  <>
    <TextArea
      showCount
      maxLength={100}
      style={{
        height: 200,
      }}
      size="large"
      onChange={onChange}
      placeholder="오늘은 어땠나요?"
      allowClear
    />
  </>
);
export default WriteInput;
