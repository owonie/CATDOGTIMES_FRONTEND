import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import ShareButton from "../Share/Share";
import "./Settings.css";

const Settings = ({ feedId }) => {
  const [modal2Open, setModal2Open] = useState(false);

  const deletePost = () => {
    axios
      .post("/post/delete", null, {
        params: {
          postId: feedId,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log("delete Success");
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
          <a href="#" onClick={deletePost} onCancel={() => setModal2Open(false)}>
            게시물 삭제
          </a>
        </div>
        <div className="setting__row">
          <a href="#">팔로우</a>
        </div>
        <div className="setting__row">
          <ShareButton />
        </div>
      </Modal>
    </>
  );
};
export default Settings;
