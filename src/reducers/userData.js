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
    catdogtimes_token: null,
    location: null,
  },
  reducers: {
    updateUserId: (state, action) => {
      state.catdogtimes_userId = action.payload;
    },
    updateDisplayName: (state, action) => {
      state.catdogtimes_displayName = action.payload;
    },
    updateRoomId: (state, action) => {
      state.catdogtimes_roomId = action.payload;
    },
    updatePhotoURL: (state, action) => {
      state.catdogtimes_photoURL = action.payload;
    },
    updateCurrentTime: (state, action) => {
      state.catdogtimes_currentTime = action.payload;
    },
    updateInRoom: (state, action) => {
      state.catdogtimes_inRoom = action.payload;
    },
    updateToken: (state, action) => {
      state.catdogtimes_token = action.payload;
    },
    updateLocation: (state, action) => {
      state.catdogtimes_location = action.payload;
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
  updateToken,
  updateLocation,
} = userDataSlice.actions;

export default userDataSlice.reducer;
