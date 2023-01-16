import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateRoomId,
  updateInRoom,
  updateLocation,
} from '../../reducers/userData';

const ChatRoomList = ({ messageRepository, roomRepository }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userData.userId);
  const roomId = useSelector((state) => state.userData.roomId);
  const navigate = useNavigate();

  const addRoom = (room) => {
    roomRepository.saveRoom(userId, room);
    messageRepository.initMessage(room);
  };

  const joinRoom = (room) => {
    goToRoom(room);
  };

  const goToRoom = (room) => {
    roomRepository.getRoom(room, (data) => {
      const event = data;
      if (event === true) {
        dispatch(updateRoomId(room));
        dispatch(updateLocation('room'));
        dispatch(updateInRoom(true));
        navigate('/room');
      }
    });
  };

  return <div>yes</div>;
};

export default ChatRoomList;
