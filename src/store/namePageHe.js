import { createSlice } from '@reduxjs/toolkit';

export const dataNamePagesHeSlice = createSlice({
  name: 'namePages',
  initialState: {
    data: [
    //  לטפל
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const dataNamePagesHeActions = dataNamePagesHeSlice.actions
