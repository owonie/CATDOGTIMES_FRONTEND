import React, { useState } from "react";
import { Input } from "antd";

const HashtagAdd = () => {
  /* hashTag 저장용 */
  const [postHashtags, setPostHashtags] = useState("");

  return (
    <Input
      placeholder="Enter hashtag"
      prefix={
        <BorderlessTableOutlined
          type="hashtag"
          style={{ color: "rgba(0,0,0,.25)" }}
          onChange={(e) => {
            setPostHashtags(e.target.value);
            console.log(e.target.value);
          }}
        />
      }
    />
  );
};

export default HashtagAdd;
