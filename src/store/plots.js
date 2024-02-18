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

export const columnsPlotsSlice = createSlice({
  name: 'columnsPlots',
  initialState: { data: [
      { id: 0, field: 'id', headerName: 'ID', width: 70 },
      { id: 1, field: 'plotNameHe', headerName: 'שם החלקה בעברית', width: 170 ,show: true},
      { id: 2, field: 'plotNameEn', headerName: 'שם החלקה באנגלית', width: 170 ,show: true},
      { id: 3, field: 'plotLocation', headerName: 'מיקום החלקה בבית העלמין', width: 130 ,show: true},
      { id: 4, field: 'plotType', headerName: 'סוג החלקה', width: 110 ,show: true},
      { id: 5, field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 140 ,show: true},
      { id: 6, field: 'plotCode', headerName: 'קוד החלקה', width: 110 ,show: true},
      { id: 7, field: 'blockId', headerName: 'מספר הגוש', width: 100 ,show: true},
      { id: 8, field: 'comments', headerName: 'הערות', width: 170 ,show: true},
      { id: 9, field: 'coordinates', headerName: 'קורדינטה', width: 100 ,show: true},
      { id: 10, field: 'documentsList', headerName: 'רשימת מסמכים', width: 170 ,show: true},
      { id: 11, field: 'isActive', headerName: 'פעיל', width: 80 ,show: true},
      { id: 12, field: 'createdDate', headerName: 'תאריך יצירה', width: 130 ,show: true},
      { id: 13, field: 'updateDate', headerName: 'תאריך עדכון', width: 130 ,show: true},
      { id: 14, field: 'inactiveDate', headerName: 'תאריך הפסקה', width: 130 ,show: true},
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryPlotsSlice = createSlice({
  name: 'categoryPlots',
  initialState: { data: [
    {id:0, setting: {checkbox: true, menu: true}}
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const dataPlotsActions = dataPlotsSlice.actions
export const columnsPlotsActions = columnsPlotsSlice.actions
export const categoryPlotsActions = categoryPlotsSlice.actions



