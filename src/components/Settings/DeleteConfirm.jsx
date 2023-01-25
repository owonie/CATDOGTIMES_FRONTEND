import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
const { confirm } = Modal;

const DeleteConfirm = ({ postId }) => {
  /* 토큰 */
  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  let deleteData = {
    postId: postId,
  };

  const delPost = async () => {
    const response = await fetch(`/post/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: accessToken,
      },
      body: JSON.stringify(deleteData),
    });
    let data = await response.json();
    console.log(data);

    if (response.status === 401) {
      const res = await fetch(`/post/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
          REFRESH_TOKEN: refreshToken,
        },
        body: JSON.stringify(deleteData),
      });
      data = await res.json();
    }
  };

  const deletePost = () => {
    axios
      .post("/post/delete", null, {
        params: {
          postId: postId,
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

  const showDeleteConfirm = () => {
    confirm({
      title: "정말로 게시글을 삭제하시겠습니까?",
      icon: <ExclamationCircleFilled />,
      content: "게시글 및 관련 댓글·이미지 등이 전부 삭제됩니다.",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        deletePost();
        window.location.replace("/post");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <a className="deleteConfirm" href="#" onClick={showDeleteConfirm}>
        게시물 삭제
      </a>
    </>
  );
};

export default DeleteConfirm;
