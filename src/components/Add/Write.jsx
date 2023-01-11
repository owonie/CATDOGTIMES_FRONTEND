import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { BorderlessTableOutlined } from "@ant-design/icons";
import styles from "./Write.module.css";
import UploadPicture from "./UploadPicture";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const Write = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /* postContent 저장용 */
  const [postContent, setPostContent] = useState("");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    axios
      .post("/post/add", {
        postContent: postContent,
        memberNo: 1,
      })
      .then((res) => {
        console.log("insert Success");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

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
        <div className={styles.write__upload}>
          <UploadPicture bodyStyle={{ height: 400 }} />
          <div className={styles.write__text}>
            <TextArea
              showCount
              maxLength={100}
              style={{
                height: 200,
              }}
              size="large"
              onChange={(e) => {
                setPostContent(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="오늘은 어땠나요?"
              allowClear
              value={postContent}
            />
            <Input placeholder="Enter Instagram hashtag" prefix={<BorderlessTableOutlined type="hashtag" style={{ color: "rgba(0,0,0,.25)" }} />} />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Write;
