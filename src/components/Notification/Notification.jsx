import React, { useState } from 'react';
import { Drawer } from 'antd';
import RecommendList from '../List/RecommendList';
import './Notification.css';
import AlarmList from '../List/AlarmList';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [alarm, setAlarm] = useState('');
  const [invite, setInvite] = useState([{}]);
  const [recommends, setRecommends] = useState('');

  const accessToken = useSelector(
    (state) => state.userData.catdogtimes_accessToken
  );
  const refreshToken = useSelector(
    (state) => state.userData.catdogtimes_refreshToken
  );

  //AlarmList
  const loadAlarm = async () => {
    const response = await fetch(`post/notifications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ACCESS_TOKEN: accessToken,
      },
    });
    let data = await response.json();
    setAlarm(data);

    if (response.status === 401) {
      const res = await fetch(`post/notifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: accessToken,
          REFRESH_TOKEN: refreshToken,
        },
      });
      data = await res.json();
      setAlarm(data);
    }
  };

  //WalkInviteList

  const loadInvite = async () => {
    axios
      .get(`route/getWalkParticipant?WalkParticipantNo=21`)
      .then((res) => {
        setInvite(res.data);
        console.log('res.data:', res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //RecommendList
  const loadRecommend = async () => {
    const response = await fetch(`post/recommends`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ACCESS_TOKEN: accessToken,
      },
    });
    let data = await response.json();
    setRecommends(data);

    if (response.status === 401) {
      const res = await fetch(`post/recommends`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: accessToken,
          REFRESH_TOKEN: refreshToken,
        },
      });
      data = await res.json();
      setRecommends(data);
    }
    console.log(recommends);
  };

  const showDrawer = () => {
    setOpen(true);
    loadAlarm();
    loadRecommend();
    loadInvite();
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <a href='#' onClick={showDrawer}>
        <i className='far fa-bell fa-lg'></i>
        <span>알림</span>
      </a>
      <Drawer
        title='알림'
        placement='right'
        onClose={onClose}
        open={open}
        size='large'
      >
        <div className='alarm'>
          <span>오늘</span>
          <AlarmList alarm={alarm} invite={invite} />
        </div>

        <div className='recommend'>
          <div className='recommend__title'>회원님을 위한 추천</div>
          <RecommendList recommends={recommends} />
        </div>
      </Drawer>
    </>
  );
};
export default Notification;
