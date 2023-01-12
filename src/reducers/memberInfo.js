import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const memberInfoSlice = createSlice({
  name: 'memberInfo',
  initialState: {
    data:null,
  },
  reducers: {
    updateMemberInfo:(state, action) => {
      state.data = action.payload;
    }
  },
});

export const {
  updateMemberInfo
} = memberInfoSlice.actions;

export default memberInfoSlice.reducer;