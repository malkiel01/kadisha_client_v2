import { createSlice } from '@reduxjs/toolkit';

// Slice for data of areaGrave
export const dataAreaGraveSlice = createSlice({
  name: 'dataAreaGrave',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

// Slice for columns of areaGrave
export const columnsAreaGraveSlice = createSlice({
  name: 'columnsAreaGrave',
  initialState: { data: [
      { id:0 , field: 'id', headerName: 'ID', width: 70 },
      { id:1 , field: 'areaLocation', headerName: 'מיקום האזור', width: 170 ,show: true },
      { id:2 , field: 'coordinates', headerName: 'קורדינטות', width: 130 ,show: true },
      { id:3 , field: 'gravesList', headerName: 'רשימת קברים', width: 130 ,show: true },
      { id:4 , field: 'lineId', headerName: 'מספר שורה', width: 100 ,show: true },
      { id:5 , field: 'plotId', headerName: 'מספר החלקה', width: 100 ,show: true},
      { id:6 , field: 'comments', headerName: 'הערות', width: 170 ,show: true },
      { id:7 , field: 'documentsList', headerName: 'רשימת מסמכים', width: 170 ,show: true },
      { id:8 , field: 'isActive', headerName: 'פעיל', width: 80 ,show: true },
      { id:9 , field: 'createdDate', headerName: 'תאריך יצירה', width: 130 ,show: true },
      { id:10 , field: 'updateDate', headerName: 'תאריך עדכון', width: 130 ,show: true },
      { id:11 , field: 'inactiveDate', headerName: 'תאריך הפסקה', width: 130 ,show: true },
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

// Slice for categories of areaGrave
export const categoryAreaGraveSlice = createSlice({
  name: 'categoryAreaGrave',
  initialState: { data: [
    {id:0, setting: {checkbox: true, menu: true}}
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

// Exporting actions
export const dataAreaGraveActions = dataAreaGraveSlice.actions
export const columnsAreaGraveActions = columnsAreaGraveSlice.actions
export const categoryAreaGraveActions = categoryAreaGraveSlice.actions
