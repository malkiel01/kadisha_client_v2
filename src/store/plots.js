import { createSlice } from '@reduxjs/toolkit';

export const dataPlotsSlice = createSlice({
  name: 'dataPlots',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const columnsTablePlotsSlice = createSlice({
  name: 'columnsPlots',
  initialState: {
    data: [
      { id: 0, field: 'id', headerName: 'ID', width: 70 },
      { id: 1, field: 'plotNameHe', headerName: 'שם החלקה בעברית', width: 170, show: true },
      { id: 2, field: 'plotNameEn', headerName: 'שם החלקה באנגלית', width: 170, show: true },
      { id: 7, field: 'cemeteryId', headerName: 'בית העלמין', width: 100, show: true },
      { id: 7, field: 'blockId', headerName: 'גוש', width: 100, show: true },
      { id: 5, field: 'available',           headerName: 'פנויים',     width: 100, isActive: true , show: true},
      { id: 5, field: 'purchased',           headerName: 'רכישות',     width: 100, isActive: true , show: true},
      { id: 5, field: 'buried',           headerName: 'קבורים',     width: 100, isActive: true , show: true},
      { id: 5, field: 'saved',           headerName: 'שמורים',     width: 100, isActive: true , show: true},
      { id: 5, field: 'graveSum',           headerName: 'סה״כ',     width: 100, isActive: true , show: true},
      { id: 5, field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 140, show: true },
      { id: 6, field: 'plotCode', headerName: 'קוד החלקה', width: 110, show: true },
      { id: 8, field: 'comments', headerName: 'הערות', width: 170, show: false },
      { id: 9, field: 'coordinates', headerName: 'קורדינטה', width: 100, show: false },
      { id: 10, field: 'documentsList', headerName: 'רשימת מסמכים', width: 170, show: false },
      { id: 11, field: 'isActive', headerName: 'פעיל', width: 80, show: false },
      { id: 12, field: 'createdDate', headerName: 'תאריך יצירה', width: 130, show: false },
      { id: 13, field: 'updateDate', headerName: 'תאריך עדכון', width: 130, show: false },
      { id: 14, field: 'inactiveDate', headerName: 'תאריך הפסקה', width: 130, show: false },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const columnsPropertiesPlotsSlice = createSlice({
  name: 'columnsPlots',
  initialState: {
    data: [
      // { id: 0, field: 'id', headerName: 'ID', width: 70 },
      { id: 1, field: 'plotNameHe', headerName: 'שם החלקה', width: 170, show: true },
      { id: 2, field: 'plotNameEn', headerName: 'שם החלקה (En)', width: 170, show: true },
      // { id: 3, field: 'plotLocation', headerName: 'מיקום החלקה בבית העלמין', width: 130, show: true },
      // { id: 4, field: 'plotType', headerName: 'סוג החלקה', width: 110, show: true },
      { id: 5, field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 140, show: true },
      { id: 6, field: 'plotCode', headerName: 'קוד החלקה', width: 110, show: true },
      { id: 7, field: 'blockId', headerName: 'גוש', width: 100, show: true },
      { id: 7, field: 'cemeteryId', headerName: 'בית עלמין', width: 100, show: true },
      // { id: 8, field: 'comments', headerName: 'הערות', width: 170, show: true },
      // { id: 9, field: 'coordinates', headerName: 'קורדינטה', width: 100, show: true },
      // { id: 10, field: 'documentsList', headerName: 'רשימת מסמכים', width: 170, show: true },
      // { id: 11, field: 'isActive', headerName: 'פעיל', width: 80, show: true },
      // { id: 12, field: 'createdDate', headerName: 'תאריך יצירה', width: 130, show: true },
      // { id: 13, field: 'updateDate', headerName: 'תאריך עדכון', width: 130, show: true },
      // { id: 14, field: 'inactiveDate', headerName: 'תאריך הפסקה', width: 130, show: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const columnsFormPlotsSlice = createSlice({
  name: 'columnsPlots',
  initialState: {
    data: [
      { id: 0, field: 'id', headerName: 'ID', width: 70, show: false },

      { name: 'cemeteryId',            label: 'בית העלמין',        required: true, input: 'selectedFree', width: 250, show: true, disabled: true },
      { name: 'blockId',               label: 'גוש',               required: true, input: 'selectedFree', width: 250, show: true, disabled: true },
      { name: 'plotNameHe',            label: 'שם החלקה (עברית)',  required: true, input: 'text',         width: 250, show: true, notRepeat: true },
      { name: 'plotNameEn',            label: 'שם החלקה (אנגלית)', required: true, input: 'text',         width: 250, show: true },
      { name: 'nationalInsuranceCode', label: 'קוד ביטוח לאומי',   required: true, input: 'text',         width: 140, show: true },
      { name: 'plotCode',              label: 'קוד החלקה',         required: true, input: 'text',         width: 170, show: true },
      { name: 'coordinates',           label: 'קואורדינטות',       required: true, input: 'text',         width: 100, show: true },
      { id: 9, name: 'comments',       label: 'הערות',                             input: 'text',         width: 170, show: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryPlotsSlice = createSlice({
  name: 'categoryPlots',
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

export const dataPlotsActions = dataPlotsSlice.actions
export const columnsTablePlotsActions = columnsTablePlotsSlice.actions
export const columnsPropertiesPlotsActions = columnsPropertiesPlotsSlice.actions
export const columnsFormPlotsActions = columnsFormPlotsSlice.actions
export const categoryPlotsActions = categoryPlotsSlice.actions



