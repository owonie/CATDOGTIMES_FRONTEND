import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import NavBar from "../../components/NavBar/NavBar";
import Search from "../../components/Search/Search";
import "./Explore.css";
import { useSelector } from "react-redux";

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

  const [feeds, setFeeds] = useState();

  //이미지 src
  const imgPath = "http://localhost:8088/times/resources/upload/";

  const [fileList, setFileList] = useState([
    {
      imageId: 1,
      status: "done",
      url: "/img/explore/puppy.jpg",
    },
    {
      imageId: 2,
      name: "기다리는 고양이",
      status: "done",
      url: "/img/explore/kitten2.jpg",
    },
    {
      imageId: 3,
      name: "댕댕이 남친짤",
      status: "done",
      url: "/img/explore/dog1.jpg",
    },
    {
      imageId: 4,
      name: "dog with flowers",
      status: "done",
      url: "/img/explore/dog2.jpg",
    },
    {
      imageId: 5,
      name: "다소곳한 고양이",
      status: "done",
      url: "/img/explore/kitten3.jpg",
    },
    {
      imageId: 6,
      name: "선글라스 쓴 고양이",
      status: "done",
      url: "/img/explore/cat1.jpg",
    },
    {
      imageId: 7,
      name: "선글라스 쓴 고양이",
      status: "done",
      url: "/img/explore/cat1.jpg",
    },
    {
      imageId: 8,
      name: "선글라스 쓴 고양이",
      status: "done",
      url: "/img/explore/cat1.jpg",
    },
    {
      imageId: 9,
      name: "선글라스 쓴 고양이",
      status: "done",
      url: "/img/explore/cat1.jpg",
    },
  ]);

  const [toMemberNo, setToMemberNo] = useState(-1);

  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`post/explore?toMemberNo=${toMemberNo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
        },
      });
      let data = await response.json();

      if (response.status === 401) {
        const res = await fetch(`post/explore`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          },
        });
        data = await res.json();
      }
      setFeeds(data);
    };
    loadData();
  }, []);

  console.log(feeds);

  // for (let i = 0; i < feeds.length; i++) {
  //   console.log(feeds[i].imageId);
  //   console.log(feeds[i].imageSavedName);
  //   console.log(feeds[i].imageOriginalName);
  // }

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
            <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
              {fileList.length >= 1 ? null : uploadButton}
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
