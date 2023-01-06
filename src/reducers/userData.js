import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    userId: null,
    displayName: null,
    roomId: null,
    photoURL: null,
    currentTime: null,
    inRoom: false,
    playedVideo: null,
    location: null,
  },
  reducers: {
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
    updateDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    updateRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    updatePhotoURL: (state, action) => {
      state.photoURL = action.payload;
    },
    updateCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    updateInRoom: (state, action) => {
      state.inRoom = action.payload;
    },
    updatePlayedVideo: (state, action) => {
      state.playedVideo = action.payload;
    },
    updateLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {
  updateUserId,
  updateDisplayName,
  updateRoomId,
  updatePhotoURL,
  updateCurrentTime,
  updateInRoom,
  updatePlayedVideo,
  updateLocation,
} = userDataSlice.actions;

export default userDataSlice.reducer;
