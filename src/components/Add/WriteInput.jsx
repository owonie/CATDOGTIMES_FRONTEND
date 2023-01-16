import React from "react";
import { Input } from "antd";
const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};
const WriteInput = () => (
  <>
    <TextArea
      showCount
      maxLength={100}
      style={{
        height: 200,
        marginBottom: 24,
      }}
      size="large"
      onChange={onChange}
      placeholder="오늘은 어땠나요?"
      allowClear
    />
  </>
);
export default WriteInput;
