import React, { useState } from "react";
import { Button, Modal } from "antd";
import WriteUpload from "./WirteUpload";
import WriteInput from "./WriteInput";
import "./Write.css";
const Write = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <a href="#" onClick={showModal}>
        <i className="fa-solid fa-pen-nib fa-lg"></i>
        <span>글쓰기</span>
      </a>
      <Modal
        open={open}
        title="새 게시물 올리기"
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ height: 400 }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <div className="write__upload">
          <WriteUpload bodyStyle={{ height: 400 }} />
        </div>
        <div className="write__text">
          <WriteInput />
        </div>
      </Modal>
    </>
  );
};
export default Write;
