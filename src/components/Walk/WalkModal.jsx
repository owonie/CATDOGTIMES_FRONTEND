import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Modal,
  Carousel,
  Form,
  Radio,
  Avatar,
  Divider,
  List,
  Skeleton,
  Popconfirm,
  Rate,
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../Add/Write.module.css';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import UploadPicture from '../Add/UploadPicture';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const WalkModal = ({
  kakaoDrawingManager,
  kakaoMap,
  kakao,
  kakaoToolbox,
  isWalking,
  setIsWalking,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('공개');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
  };

  const toolbox = new kakao.maps.Drawing.Toolbox({
    drawingManager: kakaoDrawingManager,
  });
  const [value, setValue] = useState(3);
  const [loading, setLoading] = useState(false);
  const [followerLoading, setFollowerLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [toolCheck, setToolCheck] = useState(false);
  const ref = useRef();
  const walkingRef = useRef();
  const formRef = useRef(null);
  /* routeName 저장용 */
  const [routeName, setrouteName] = useState('');
  const [routeStart, setRouteStart] = useState('');
  const [routeEnd, setRouteEnd] = useState('');
  /* upload 저장용 */
  const [imageOriginalName, setOriginalName] = useState('');
  const [imageSavedName, setSavedName] = useState('');
  const [file, setFile] = useState('');

  const [data, setData] = useState([]);
  const [walkingEnd, setWalkingEnd] = useState(false);

  const desc = ['안좋아요', '별로에요', '보통', '좋아요', '최고!'];

  let route = {
    routeName: routeName,
    memberNo: 1,
    imageOriginalName: imageOriginalName,
    imageSavedName: imageSavedName,
    routePulic: formLayout,
    routeStart: routeStart,
    routeEnd: routeEnd,
  };

  const confirm = () => {
    if (!walkingEnd) {
      walkingRef.current.next();
      setWalkingEnd(true);
      return;
    }
    setWalkingEnd(false);
    setOpen(false);
    setIsWalking(false);
    navigate('/post');
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  const setName = (name) => {
    console.log(imageSavedName);
    setOriginalName(name.imageOriginalName);
    setSavedName(name.imageSavedName);
    setFile(name.file);
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  const addLocations = () => {
    if (toolCheck) {
      return;
    }
    kakaoMap.addControl(
      kakaoToolbox.getElement(),
      kakao.maps.ControlPosition.TOP
    );
    setToolCheck(true);
    setOpen(false);
  };
  const addLocationsDone = () => {
    if (!toolCheck) {
      return;
    }
    kakaoMap.removeControl(
      kakaoToolbox.getElement(),
      kakao.maps.ControlPosition.TOP
    );
    setToolCheck(false);
  };

  const formData = new FormData();
  formData.append(
    'post',
    new Blob([JSON.stringify(route)], { type: 'application/json' })
  );
  formData.append('file', file);

  const showModal = () => {
    addLocationsDone();
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
        {isWalking === false ? (
          <img src='./img/footprint.png' />
        ) : (
          <img src='./img/walking.png' />
        )}
      </a>
      {isWalking === false ? (
        <Modal
          open={open}
          title={[<div>산책루트 만들기</div>]}
          onOk={handleOk}
          onCancel={handleCancel}
          bodyStyle={{ height: 400 }}
          footer={[
            <Button key='back' onClick={() => ref.current.prev()}>
              이전
            </Button>,

            <Button key='next' onClick={() => ref.current.next()}>
              다음
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={loading}
              onClick={() => {
                setIsWalking(true);
                setOpen(false);
                console.log(route);
              }}
            >
              산책하기
            </Button>,
          ]}
        >
          <Carousel
            style={{ marginTop: '30px' }}
            dots={false}
            draggable
            ref={ref}
          >
            <div>
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
                      setrouteName(e.target.value);
                    }}
                    placeholder='산책루트 이름을 정해주세요!'
                    allowClear
                    value={routeName}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div>
              <Form
                name='dynamic_form_item'
                {...formItemLayoutWithOutLabel}
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
              >
                <Form
                  {...formItemLayout}
                  layout={formLayout}
                  form={form}
                  initialValues={{
                    layout: formLayout,
                  }}
                  onValuesChange={onFormLayoutChange}
                  style={{
                    maxWidth: 600,
                  }}
                >
                  <Form.Item
                    label='루트 공개'
                    name='layout'
                    style={{ marginTop: '30px' }}
                  >
                    <Radio.Group value={formLayout}>
                      <Radio.Button value='공개'>공개</Radio.Button>
                      <Radio.Button value='비공개'>비공개</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label='출발지'
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: '장소를 입력하세요!.',
                      },
                    ]}
                  >
                    <Input
                      placeholder='출발지를 입력해주세요!'
                      onChange={(e) => {
                        setRouteStart(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label='도착지'
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: '장소를 입력하세요!.',
                      },
                    ]}
                  >
                    <Input
                      placeholder='도착지를 입력해주세요!'
                      onChange={(e) => {
                        setRouteEnd(e.target.value);
                      }}
                    />
                  </Form.Item>
                </Form>
                <Form.Item>
                  <Button
                    className={styles.walkModalBtn}
                    onClick={addLocations}
                    type='primary'
                    htmlType='submit'
                  >
                    산책 루트 그리기
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div>
              <div
                id='scrollableDiv'
                style={{
                  height: 400,
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
              >
                <InfiniteScroll
                  dataLength={data.length}
                  next={loadMoreData}
                  hasMore={data.length < 50}
                  loader={
                    <Skeleton
                      avatar
                      paragraph={{
                        rows: 1,
                      }}
                      active
                    />
                  }
                  endMessage={
                    <Divider plain>It is all, nothing more 🤐</Divider>
                  }
                  scrollableTarget='scrollableDiv'
                >
                  <List
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item key={item.email}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.picture.large} />}
                          title={
                            <a href='https://ant.design'>{item.name.last}</a>
                          }
                          description={item.email}
                        />
                        <Button
                          className={styles.walkModalBtn}
                          type='primary'
                          htmlType='submit'
                        >
                          산책신청
                        </Button>
                        <div>Content</div>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </div>
          </Carousel>
        </Modal>
      ) : (
        <Modal
          open={open}
          title={[<div>산책 중</div>]}
          onOk={handleOk}
          onCancel={handleCancel}
          bodyStyle={{ height: 400 }}
          footer={[
            <Popconfirm
              title='산책종료'
              description='산책을 종료하시겠습니까?'
              onConfirm={confirm}
              onOpenChange={() => console.log('open change')}
            >
              <Button
                key='submit'
                type='primary'
                loading={loading}
                style={{ backgroundColor: 'red' }}
                onClick={() => {}}
              >
                산책종료
              </Button>
            </Popconfirm>,
          ]}
        >
          <Carousel style={{ marginTop: '30px' }} ref={walkingRef} dots={false}>
            <div>산책멤버</div>
            <div>
              <span style={{ display: 'block' }}>
                <span className='ant-rate-text'>루트 평점: </span>
                <Rate tooltips={desc} onChange={setValue} value={value} />
                {value ? (
                  <span className='ant-rate-text'>{desc[value - 1]}</span>
                ) : (
                  ''
                )}
              </span>
              <span style={{ display: 'block' }}>
                <span className='ant-rate-text'>사용자 평점: </span>
                <Rate tooltips={desc} onChange={setValue} value={value} />
                {value ? (
                  <span className='ant-rate-text'>{desc[value - 1]}</span>
                ) : (
                  ''
                )}
              </span>
            </div>
          </Carousel>
        </Modal>
      )}
    </>
  );
};
export default WalkModal;