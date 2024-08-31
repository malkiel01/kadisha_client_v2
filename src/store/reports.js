import { createSlice } from '@reduxjs/toolkit';

export const dataReportsSlice = createSlice({
  name: 'dataReports',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

// export const columnsTableReportsSlice = createSlice({
//   name: 'columnsReports',
//   initialState: { data: [
//     { id: 0, name: 'id', headerName: 'ID', width: 70 , show: false},
//     { id: 0, name: 'cemeteryId', label: 'בית העלמין', required: true, width: 100, show: true, input: 'selected', disabled: true },
//     { id: 0, name: 'blockId', label: 'גוש', required: true, width: 100, show: true, input: 'selected', disabled: true },
//     { id: 0, name: 'plotId', label: 'חלקה', required: true, width: 100, show: true, input: 'selected', disabled: true },
//     { id: 0, name: 'lineNameHe', label: 'שם השורה (עברית)', notRepeat: true, required: true, input: 'text', width: 150, show: true },
//     { id: 0, name: 'lineNameEn', label: 'שם השורה (אנגלית)', notRepeat: true, required: true, input: 'text', width: 150, show: true },
//     { id: 0, name: 'lineLocation', label: 'מיקום השורה', required: true, input: 'text', width: 120, show: true },
//   ] },
//   reducers: {
//     setData(state, action) {
//       state.data = action.payload;
//     },
//   },
// })

export const columnsFormReportsSlice = createSlice({
  name: 'columnsReports',
  initialState: { data: [
    { id: 0, name: 'id', headerName: 'ID', width: 70 , show: false},
    // { id: 21, label: 'קטגוריות לדו״ח', width: 900, isActive: true, input: 'card', show: true, lock: true },

    { id: 0, name: 'cemeteryId', label: 'בית העלמין', required: true, width: 250, show: true, input: 'selectedFree' },
    { id: 0, name: 'blockId', label: 'גוש', required: true, width: 250, show: true, input: 'selectedFree' },
    { id: 0, name: 'plotId', label: 'חלקה', required: true, width: 250, show: true, input: 'selectedFree' },
    // { id: 21, label: 'תקופת הדו״ח', width: 900, isActive: true, input: 'card', show: true, lock: true },
    { id: 15, name: 'startDate', label: 'תאריך התחלה', required: true, input: 'date', width: 300, isActive: true, show: true },
    { id: 15, name: 'endDate', label: 'תאריך סיום', required: true, input: 'date', width: 300, isActive: true, show: true },
 
    // { id: 0, name: 'lineNameHe', label: 'שם השורה (עברית)', notRepeat: true, required: true, input: 'text', width: 150, show: true },
    // { id: 0, name: 'lineNameEn', label: 'שם השורה (אנגלית)', notRepeat: true, required: true, input: 'text', width: 150, show: true },
    // { id: 0, name: 'lineLocation', label: 'מיקום השורה', required: true, input: 'text', width: 120, show: true },
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryReportsSlice = createSlice({
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

export const dataReportsActions = dataReportsSlice.actions
export const columnsFormReportsActions = columnsFormReportsSlice.actions
// export const columnsTableReportsActions = columnsTableReportsSlice.actions
export const categoryReportsActions = categoryReportsSlice.actions



