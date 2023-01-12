import React from "react";
import { PictureOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const WriteUpload = () => (
  <Dragger {...props} accept=".png,.jpeg,.jpg,.bmp,.gif" listType="picture-card" maxCount={1}>
    <p className="ant-upload-drag-icon">
      <PictureOutlined />
    </p>
    <p className="ant-upload-text">
      사진을 여기에 끌어다 넣어주세요{"("}파일 한 개만{")"}
    </p>
    <p className="ant-upload-hint">
      {"("}.png · .jpg · .jpeg · .bmp · .gif only {")"}
    </p>
  </Dragger>
);
export default WriteUpload;
