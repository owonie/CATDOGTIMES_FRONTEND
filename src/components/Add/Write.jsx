import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import WriteInput from "./WriteInput";
import styles from "./Write.module.css";
import WriteHashtagInput from "./WriteHashtagInput";
import UploadPicture from "./UploadPicture";
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

  const [add, setAdd] = useState([]);
  useEffect(() => {
    fetch("post/add")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

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
            <WriteInput />
          </div>
          <div className={styles.write__hashtag}>
            <WriteHashtagInput />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Write;
