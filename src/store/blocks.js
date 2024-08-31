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

export const columnsTableBlocksSlice = createSlice({
  name: 'columnsBlocks',
  initialState: {
    data: [
      { id: 0, field: 'id', headerName: 'ID', width: 70, show: false },

      { id: 1, field: 'blockNameHe', headerName: 'שם הגוש בעברית', width: 200, show: true },
      { id: 2, field: 'blockNameEn', headerName: 'שם הגוש באנגלית', width: 200, show: true },
      { id: 9, field: 'cemeteryId', headerName: 'בית העלמין', width: 200, show: true },
      { id: 5, field: 'available',           headerName: 'פנויים',     width: 80, isActive: true , show: true},
      { id: 5, field: 'purchased',           headerName: 'רכישות',     width: 80, isActive: true , show: true},
      { id: 5, field: 'buried',           headerName: 'קבורים',     width: 80, isActive: true , show: true},
      { id: 5, field: 'saved',           headerName: 'שמורים',     width: 80, isActive: true , show: true},
      { id: 5, field: 'graveSum',           headerName: 'סה״כ',     width: 100, isActive: true , show: true},
      { id: 4, field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 75, show: true },
      { id: 5, field: 'blockCode', headerName: 'קוד הגוש', width: 75, show: true },
      { id: 6, field: 'coordinates', headerName: 'קורדינטה', width: 100, show: false },
      { id: 10, field: 'createDate', headerName: 'createDate', width: 170, show: false },
      { id: 11, field: 'inactiveDate', headerName: 'inactiveDate', width: 170, show: false },
      { id: 12, field: 'contactName', headerName: 'איש קשר', width: 170, show: false },
      { id: 13, field: 'contactPhoneName', headerName: 'טלפון איש קשר', width: 170, show: false },
      { id: 14, field: 'isActive', headerName: 'isActive', width: 170, show: false },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})
export const columnsPropertiesBlocksSlice = createSlice({
  name: 'columnsBlocks',
  initialState: {
    data: [
      { id: 0, field: 'id', headerName: 'ID', width: 70, show: false },

      { id: 1, field: 'blockNameHe', headerName: 'שם הגוש בעברית', width: 270, show: true },
      { id: 2, field: 'blockNameEn', headerName: 'שם הגוש באנגלית', width: 270, show: true },
      { id: 9, field: 'cemeteryId', headerName: 'בית העלמין', width: 170, show: true },
      { id: 4, field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 75, show: true },
      { id: 5, field: 'blockCode', headerName: 'קוד הגוש', width: 75, show: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const columnsFormBlocksSlice = createSlice({
  name: 'columnsBlocks',
  initialState: {
    data: [
      { id: 0, field: 'id', headerName: 'ID', width: 70, show: false },

      { name: 'cemeteryId',            label: 'שם בית העלמין',    width: 250, input: 'selectedFree', required: true, show: true },
      { name: 'blockNameHe',           label: 'שם הגוש (עברית)',  width: 270, input: 'text',     required: true, show: true, notRepeat: true },
      { name: 'blockNameEn',           label: 'שם הגוש (אנגלית)', width: 270, input: 'text',     required: true, show: true },
      { name: 'nationalInsuranceCode', label: 'קוד ביטוח לאומי',  width: 170, input: 'text',     required: true, show: true },
      { name: 'blockCode',             label: 'קוד הגוש',         width: 170, input: 'text',     required: true, show: true },
      { name: 'coordinates',           label: 'קואורדינטות',      width: 100, input: 'text',     required: true, show: true },
      { id: 7, name: 'comments',       label: 'הערות',            width: 100, input: 'text',                     show: true },
     ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryBlocksSlice = createSlice({
  name: 'categoryBlocks',
  initialState: {
    data: [
      { id: 0, setting: { checkbox: true, menu: true } }
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const dataBlocksActions = dataBlocksSlice.actions
export const columnsFormBlocksActions = columnsFormBlocksSlice.actions
export const columnsTableBlocksActions = columnsTableBlocksSlice.actions
export const columnsPropertiesBlocksActions = columnsPropertiesBlocksSlice.actions
export const categoryBlocksActions = categoryBlocksSlice.actions



