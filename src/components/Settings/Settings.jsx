import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import "./Settings.css";

const Settings = ({ feedId }) => {
  const [modal2Open, setModal2Open] = useState(false);
  const deletePost = () => {
    axios
      .post("/post/delete", {
        postId: feedId,
        memberNo: 1,
      })
      .then((res) => {
        console.log("delete Success");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <a onClick={() => setModal2Open(true)} href="#">
        <i className="fas fa-ellipsis-h fa-lg"></i>
      </a>

      <Modal footer={""} centered open={modal2Open} onOk={() => setModal2Open(false)} onCancel={() => setModal2Open(false)}>
        <div className="setting__row">
          <a href="#" onClick={deletePost}>
            게시물 삭제
          </a>
        </div>
        <div className="setting__row">
          <a href="#">링크복사</a>
        </div>
        <div className="setting__row">
          <a href="#">공유</a>
        </div>
      </Modal>
    </>
  );
};
export default Settings;
