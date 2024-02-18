import { createSlice } from '@reduxjs/toolkit';

export const dataBlocksSlice = createSlice({
  name: 'dataBlocks',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const columnsBlocksSlice = createSlice({
  name: 'columnsBlocks',
  initialState: { data: [
      { id: 0,field: 'id', headerName: 'ID', width: 70 , show: false},

      { id: 1,field: 'blockNameHe', headerName: 'שם הגוש בעברית', width: 170 , show: true},
      { id: 2,field: 'blockNameEn', headerName: 'שם הגוש באנגלית', width: 170 , show: true},
      { id: 3,field: 'blockLocation', headerName: 'מיקום הגוש בבית העלמין', width: 75 , show: true},
      { id: 4,field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 75 , show: true},
      { id: 5,field: 'blockCode', headerName: 'קוד הגוש', width: 75 , show: true},
      { id: 6,field: 'coordinates', headerName: 'קורדינטה', width: 100 , show: true},
      { id: 7,field: 'comments', headerName: 'הערות', width: 170 , show: true},
      { id: 8,field: 'documents', headerName: 'מסמכים', width: 170 , show: true},
      { id: 9,field: 'cemeteryId', headerName: 'cemeteryId', width: 170 , show: true},

      { id: 10,field: 'createDate', headerName: 'createDate', width: 170 , show: false},
      { id: 11,field: 'inactiveDate', headerName: 'inactiveDate', width: 170 , show: true},
      { id: 12,field: 'contactName', headerName: 'איש קשר', width: 170 , show: true},
      { id: 13,field: 'contactPhoneName', headerName: 'טלפון איש קשר', width: 170 , show: true},
      { id: 14,field: 'isActive', headerName: 'isActive', width: 170 , show: false},
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryBlocksSlice = createSlice({
  name: 'categoryBlocks',
  initialState: { data: [
    {id:0, setting: {checkbox: true, menu: true}}
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const dataBlocksActions = dataBlocksSlice.actions
export const columnsBlocksActions = columnsBlocksSlice.actions
export const categoryBlocksActions = categoryBlocksSlice.actions



