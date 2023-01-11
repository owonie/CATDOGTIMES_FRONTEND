import React, { useState } from "react";
import { Input } from "antd";
import { BorderlessTableOutlined } from "@ant-design/icons";
import axios from "axios";
const { TextArea } = Input;

/* axios로 insert 연결 */
const insertPost = () => {
  axios
    .post("/post/add", {
      postContent: "",
      memberNo: 1,
    })
    .then((res) => {
      console.log("insert Success");
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// let insertPost = {
//   postContent: "들어간다 쭉쭉쭉3",
//   memberNo: 2, //memberNo는 데이터 있는 것만 가능
// };
// axios
//   .post("/post/add", insertPost)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch();

//삭제 연습
// axios
//   .post("/post/delete", null, {
//     params: {
//       postId: "4",
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch();

const WriteInput = () => {
  const [postContent, setPostContent] = useState("");

  return (
    <>
      <TextArea
        showCount
        maxLength={100}
        style={{
          height: 200,
        }}
        size="large"
        onChange={(e) => {
          setPostContent(e.target.value);
          // console.log(e.target.value);
        }}
        placeholder="오늘은 어땠나요?"
        allowClear
        value={postContent}
      />
      <Input placeholder="Enter Instagram hashtag" prefix={<BorderlessTableOutlined type="hashtag" style={{ color: "rgba(0,0,0,.25)" }} />} />
    </>
  );
};
export default WriteInput;
