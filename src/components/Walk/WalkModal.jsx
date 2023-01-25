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
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import UploadPicture from '../Add/UploadPicture';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WalkModal.module.css';
import { useSelector } from 'react-redux';

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const imgPath = 'http://localhost:8088/times/resources/upload/';

const WalkModal = ({
  kakaoDrawingManager,
  kakaoMap,
  kakao,
  kakaoToolbox,
  isWalking,
  setIsWalking,
  followlist,
}) => {
  const accessToken = useSelector(
    (state) => state.userData.catdogtimes_accessToken
  );
  const refreshToken = useSelector(
    (state) => state.userData.catdogtimes_refreshToken
  );

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState(true);
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

  const [routeInfo, setRouteInfo] = useState(null);
  const [routeRating, setRouteRating] = useState(3);
  const [participantNo, setParticipantNo] = useState();

  const userId = useSelector((state) => state.userData.catdogtimes_userId);
  const desc = ['안좋아요', '별로에요', '보통', '좋아요', '최고!'];

  let route = {
    routeName: routeName,
    memberNo: userId && userId,
    routeThumbnail: imageSavedName,
    imageSavedName: imageSavedName,
    routePublic: formLayout,
    routeDepartures: routeStart,
    routeDestination: routeEnd,
  };

  let rate = {
    routeNo: routeInfo && routeInfo.routeNo,
    routeRatingScore: routeRating,
    memberNo: userId && userId,
  };

  let userRate = {
    routeNo: routeInfo && routeInfo.routeNo,
    routeRatingScore: routeRating,
    memberNo: userId && userId,
  };

  let participant = {
    memberNo: participantNo,
    partyNo: userId,
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
    handleRating();
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
    'route',
    new Blob([JSON.stringify(route)], { type: 'application/json' })
  );
  formData.append('file', file);

  const routeRatingData = new FormData();
  routeRatingData.append(
    'rate',
    new Blob([JSON.stringify(rate)], { type: 'application/json' })
  );

  const userRatingData = new FormData();
  userRatingData.append(
    'userRate',
    new Blob([JSON.stringify(userRate)], { type: 'application/json' })
  );

  const showModal = () => {
    addLocationsDone();
    console.log(followlist);
    setOpen(true);
  };

  const handleRating = () => {
    console.log('rate:', rate);
    axios
      .post('/route/addrouterating', routeRatingData)
      .then((res) => {
        console.log('route rating Success');
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };

  const handleWalkInvite = (memberNo) => {
    participant = {
      memberNo: memberNo,
      partyNo: userId,
    };
    const participantData = new FormData();
    participantData.append(
      'participant',
      new Blob([JSON.stringify(participant)], { type: 'application/json' })
    );
    console.log('rate:', participant);
    axios
      .post('/route/addparticipant', participantData)
      .then((res) => {
        console.log('route rating Success');
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOk = () => {
    axios
      .post('/route/addroute', formData)
      .then((res) => {
        axios
          .get(`/route/routelist?MemberNo=${userId}`)
          .then((res) => {
            {
              Object.keys(res.data).map((key) => {
                if (res.data[key].routeName === routeName) {
                  setRouteInfo(res.data[key]);
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        console.log('route insert Success');
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
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
                handleOk();
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
                      console.log(formLayout);
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
                      <Radio.Button value={true}>공개</Radio.Button>
                      <Radio.Button value={false}>비공개</Radio.Button>
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
                        console.log(routeStart);
                      }}
                      value={routeStart}
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
                      value={routeEnd}
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
                <h3>
                  {followlist && followlist.length > 0
                    ? followlist[0].type
                    : ''}
                </h3>
                <ul className='followlist' style={{ overflow: 'hidden' }}>
                  {followlist && followlist.length > 0
                    ? followlist.map((da, i) => (
                        <li
                          key={i}
                          className='d-flex'
                          style={{ margin: '20px' }}
                        >
                          <a
                            href='#'
                            className='d-flex'
                            style={{ position: 'relative' }}
                          >
                            <span className='thum'>
                              <img
                                src={`${imgPath}${da.memberPhoto}`}
                                alt={da.memberNickname}
                              />
                            </span>
                            <span className='ptitle'>
                              {' '}
                              {da.memberNickname}{' '}
                            </span>
                            <Button
                              key='submit'
                              type='primary'
                              style={{
                                position: 'absolute',
                                left: '300px',
                                backgroundColor: '#e48663',
                              }}
                              onClick={() => {
                                console.log('산책신청!');
                                setParticipantNo(da.memberNo);

                                handleWalkInvite(da.memberNo);
                              }}
                            >
                              <span style={{ margin: '0' }}>산책 신청</span>
                            </Button>
                          </a>
                        </li>
                      ))
                    : 'NoData'}
                </ul>
              </div>
            </div>
          </Carousel>
        </Modal>
      ) : (
        <Modal
          open={open}
          title={[<div>산책 중</div>]}
          onCancel={handleCancel}
          bodyStyle={{ height: 400 }}
          footer={[
            <div>
              {walkingEnd && (
                <Button key='back' onClick={() => walkingRef.current.prev()}>
                  이전
                </Button>
              )}

              {walkingEnd && (
                <Button key='next' onClick={() => walkingRef.current.next()}>
                  다음
                </Button>
              )}
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
                >
                  산책종료
                </Button>
              </Popconfirm>
            </div>,
          ]}
        >
          <Carousel style={{ marginTop: '30px' }} ref={walkingRef} dots={false}>
            {walkingEnd != true && (
              <div>
                {' '}
                <ul className='followlist'>
                  {followlist && followlist.length > 0
                    ? followlist.map((da, i) => (
                        <li
                          key={i}
                          className='d-flex'
                          style={{ margin: '20px' }}
                        >
                          <a
                            href='#'
                            className='d-flex'
                            style={{ position: 'relative' }}
                          >
                            <span className='thum'>
                              <img
                                src={`${imgPath}${da.memberPhoto}`}
                                alt={da.memberNickname}
                              />
                            </span>
                            <span className='ptitle'>
                              {' '}
                              {da.memberNickname}{' '}
                              <span
                                style={{
                                  right: '70px',
                                  color: 'blue',
                                  fontWeight: '600',
                                  position: 'absolute',
                                }}
                              >
                                산책 중
                              </span>
                            </span>
                          </a>
                        </li>
                      ))
                    : 'NoData'}
                </ul>
              </div>
            )}

            {walkingEnd && (
              <div className={styles.ratingPage}>
                <span style={{ display: 'block' }}>
                  <span className='ant-rate-text'>루트 평점: </span>
                  <img
                    src={`${imgPath}${imageSavedName}`}
                    alt='pfp'
                    style={{ width: '300px', height: '300px' }}
                  />
                  <Rate
                    tooltips={desc}
                    onChange={setRouteRating}
                    value={routeRating}
                  />
                  {routeRating ? (
                    <span className='ant-rate-text'>
                      {desc[routeRating - 1]}
                    </span>
                  ) : (
                    ''
                  )}
                </span>
              </div>
            )}
            {walkingEnd && (
              <div>
                <span style={{ display: 'block' }}>
                  <span className='ant-rate-text'>사용자 평점: </span>
                  <ul className='followlist'>
                    {followlist && followlist.length > 0
                      ? followlist.map((da, i) => (
                          <li
                            key={i}
                            className='d-flex'
                            style={{ margin: '10px' }}
                          >
                            <a
                              href='#'
                              className='d-flex'
                              style={{ position: 'relative' }}
                            >
                              <span className='thum'>
                                <img
                                  src={`${imgPath}${da.memberPhoto}`}
                                  alt={da.memberNickname}
                                />
                              </span>
                              <span className='ptitle'>
                                {' '}
                                {da.memberNickname}{' '}
                                <Rate
                                  tooltips={desc}
                                  onChange={setValue}
                                  value={value}
                                />
                                {value ? (
                                  <span className='ant-rate-text'>
                                    {desc[value - 1]}
                                  </span>
                                ) : (
                                  ''
                                )}
                              </span>
                            </a>
                          </li>
                        ))
                      : 'NoData'}
                  </ul>
                </span>
              </div>
            )}
          </Carousel>
        </Modal>
      )}
    </>
  );
};
export default WalkModal;
