import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    catdogtimes_userId: null,
    catdogtimes_displayName: null,
    catdogtimes_roomId: null,
    catdogtimes_photoURL: null,
    catdogtimes_currentTime: null,
    catdogtimes_inRoom: false,
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
  updateLocation,
} = userDataSlice.actions;

export default userDataSlice.reducer;
