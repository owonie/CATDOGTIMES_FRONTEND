import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { BorderlessTableOutlined } from '@ant-design/icons';
import styles from './Write.module.css';
import UploadPicture from './UploadPicture';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';

const Write = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /* postContent 저장용 */
  const [postContent, setPostContent] = useState('');
  /* hashTag 저장용 */
  const [postHashtag, setPostHashtag] = useState('');
  /* upload 저장용 */
  const [imageOriginalName, setOriginalName] = useState('');
  const [imageSavedName, setSavedName] = useState('');
  const [file, setFile] = useState('');

  const setName = (name) => {
    console.log(imageSavedName);
    setOriginalName(name.imageOriginalName);
    setSavedName(name.imageSavedName);
    setFile(name.file);
  };

  let post = {
    postContent: postContent,
    memberNo: 1,
    postHashtag: postHashtag,
    imageOriginalName: imageOriginalName,
    imageSavedName: imageSavedName,
  };

  const formData = new FormData();
  formData.append(
    'post',
    new Blob([JSON.stringify(post)], { type: 'application/json' })
  );
  formData.append('file', file);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    axios
      .post('/post/add', formData)
      .then((res) => {
        console.log('post insert Success');
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
      <a href='#' onClick={showModal}>
        <i className='fa-solid fa-pen-nib fa-lg'></i>
        <span>글쓰기</span>
      </a>
      <Modal
        open={open}
        title='새 게시물 올리기'
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ height: 400 }}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <div id='upload' className={styles.write__upload}>
          <UploadPicture setName={setName} bodyStyle={{ height: 400 }} />
          <div className={styles.write__text}>
            <TextArea
              showCount
              maxLength={100}
              style={{
                height: 200,
              }}
              size='large'
              onChange={(e) => {
                setPostContent(e.target.value);
                console.log(e.target.value);
              }}
              placeholder='오늘은 어땠나요?'
              allowClear
              value={postContent}
            />
            <Input
              placeholder='Enter hashtag'
              prefix={
                <BorderlessTableOutlined
                  type='hashtag'
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              onChange={(e) => {
                setPostHashtag(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Write;
