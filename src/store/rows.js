import { createSlice } from '@reduxjs/toolkit';

export const dataRowsSlice = createSlice({
  name: 'dataRows',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const columnsTableRowsSlice = createSlice({
  name: 'columnsBlocks',
  initialState: { data: [
    { id: 0, name: 'id', headerName: 'ID', width: 70 , show: false},
    { id: 0, name: 'cemeteryId', label: 'בית העלמין', required: true, width: 100, show: true, input: 'selected', disabled: true },
    { id: 0, name: 'blockId', label: 'גוש', required: true, width: 100, show: true, input: 'selected', disabled: true },
    { id: 0, name: 'plotId', label: 'חלקה', required: true, width: 100, show: true, input: 'selected', disabled: true },
    { id: 0, name: 'lineNameHe', label: 'שם השורה (עברית)', notRepeat: true, required: true, input: 'text', width: 150, show: true },
    { id: 0, name: 'lineNameEn', label: 'שם השורה (אנגלית)', notRepeat: true, required: true, input: 'text', width: 150, show: true },
    { id: 0, name: 'lineLocation', label: 'מיקום השורה', required: true, input: 'text', width: 120, show: true },
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})
export const columnsFormRowsSlice = createSlice({
  name: 'columnsBlocks',
  initialState: { data: [
    { id: 0, name: 'id', headerName: 'ID', width: 70 , show: false},
    { id: 0, name: 'cemeteryId', label: 'בית העלמין', required: true, width: 100, show: true, input: 'selected', disabled: true },
    { id: 0, name: 'blockId', label: 'גוש', required: true, width: 100, show: true, input: 'selected', disabled: true },
    { id: 0, name: 'plotId', label: 'חלקה', required: true, width: 100, show: true, input: 'selected', disabled: true },
    { id: 0, width: 900, show: true, disabled: true },
    { id: 0, name: 'lineNameHe', label: 'שם השורה (עברית)', notRepeat: true, required: true, input: 'text', width: 150, show: true },
    { id: 0, name: 'lineNameEn', label: 'שם השורה (אנגלית)', notRepeat: true, required: true, input: 'text', width: 150, show: true },
    // { id: 0, name: 'lineLocation', label: 'מיקום השורה', required: true, input: 'text', width: 120, show: true },
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryRowsSlice = createSlice({
  name: 'categoryRows',
  initialState: { data: [
    {id:0, setting: {checkbox: true, menu: true}}
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const dataRowsActions = dataRowsSlice.actions
export const columnsFormRowsActions = columnsFormRowsSlice.actions
export const columnsTableRowsActions = columnsTableRowsSlice.actions
export const categoryRowsActions = categoryRowsSlice.actions



