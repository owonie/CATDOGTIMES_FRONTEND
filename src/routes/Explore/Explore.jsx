import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import NavBar from "../../components/NavBar/NavBar";
import Search from "../../components/Search/Search";
import "./Explore.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Explore = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: 1,
      name: "산책하는 댕댕이",
      status: "done",
      url: "/img/explore/puppy.jpg",
    },
    {
      uid: 2,
      name: "기다리는 고양이",
      status: "done",
      url: "/img/explore/kitten2.jpg",
    },
    {
      uid: 3,
      name: "댕댕이 남친짤",
      status: "done",
      url: "/img/explore/dog1.jpg",
    },
    {
      uid: 4,
      name: "dog with flowers",
      status: "done",
      url: "/img/explore/dog2.jpg",
    },
    {
      uid: 5,
      name: "다소곳한 고양이",
      status: "done",
      url: "/img/explore/kitten3.jpg",
    },
    {
      uid: 6,
      name: "선글라스 쓴 고양이",
      status: "done",
      url: "/img/explore/cat1.jpg",
    },
    {
      uid: 7,
      name: "선글라스 쓴 고양이",
      status: "done",
      url: "/img/explore/cat1.jpg",
    },
    {
      uid: 8,
      name: "선글라스 쓴 고양이",
      status: "done",
      url: "/img/explore/cat1.jpg",
    },
    {
      id: 9,
      name: "선글라스 쓴 고양이",
      status: "done",
      url: "/img/explore/cat1.jpg",
    },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <div className="explore">
        <nav id="nav">
          <NavBar />
        </nav>
        <section className="center">
          <div className="search">
            <Search />
          </div>
          <div className="explore__content">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
        </section>
      </div>
    </>
  );
};
export default Explore;
