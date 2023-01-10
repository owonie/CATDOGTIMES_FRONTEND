import { Input } from "antd";
import { BorderlessTableOutlined } from "@ant-design/icons";

const WriteHashtagInput = () => (
  <>
    <Input placeholder="Enter Instagram hashtag" prefix={<BorderlessTableOutlined type="hashtag" style={{ color: "rgba(0,0,0,.25)" }} />} />
  </>
);

export default WriteHashtagInput;
