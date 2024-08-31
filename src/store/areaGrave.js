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

// שדות לטבלת קבר
export const columnsTableAreaGraveSlice = createSlice({
  name: 'columnsAreaGrave',
  initialState: {
    data: [
      { id: 0, field: 'id', headerName: 'ID', width: 70, show: false  },
      { id: 1, field: 'nameGrave', headerName: 'קבר', width: 70, show: true },
      { id: 4, field: 'lineId', headerName: 'שורה', width: 70, show: true },
      { id: 5, field: 'plotId', headerName: 'חלקה', width: 100, show: true },
      { id: 5, field: 'blockId', headerName: 'גוש', width: 100, show: true },
      { id: 5, field: 'cemeteryId', headerName: 'בית עלמין', width: 100, show: true },
      { id: 3, field: 'gravesCount', headerName: 'מס׳ קומות', width: 130, show: true },
      { id: 5, field: 'available',           headerName: 'פנויים',     width: 80, isActive: true , show: true},
      { id: 5, field: 'purchased',           headerName: 'רכישות',     width: 80, isActive: true , show: true},
      { id: 5, field: 'buried',           headerName: 'קבורים',     width: 80, isActive: true , show: true},
      { id: 5, field: 'saved',           headerName: 'שמורים',     width: 80, isActive: true , show: true},
      { id: 5, field: 'graveSum',           headerName: 'סה״כ',     width: 100, isActive: true , show: true},
      { id: 7, field: 'documentsList', headerName: 'רשימת מסמכים', width: 170, show: false },
      { id: 8, field: 'isActive', headerName: 'פעיל', width: 80, show: false },
      { id: 9, field: 'createdDate', headerName: 'תאריך יצירה', width: 130, show: false },
      { id: 10, field: 'updateDate', headerName: 'תאריך עדכון', width: 130, show: false },
      { id: 11, field: 'inactiveDate', headerName: 'תאריך הפסקה', width: 130, show: false },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})
export const columnsPropertiesAreaGraveSlice = createSlice({
  name: 'columnsAreaGrave',
  initialState: {
    data: [
      { id: 0, field: 'areaLocation', headerName: 'אחוזת קבר', show: true },

      { id: 1, field: 'cemeteryId',   headerName: 'בית עלמין', show: true },
      { id: 2, field: 'blockId',      headerName: 'גוש',       show: true },
      { id: 3, field: 'plotId',       headerName: 'חלקה',      show: true },
      { id: 4, field: 'lineId',       headerName: 'שורה',      show: true },
      { id: 5, field: 'nameGrave',    headerName: 'אחוזת קבר',    show: true },

      { id: 5, field: 'graveType', headerName: 'סוג הקבר', show: true },
      { id: 8, field: 'createDate', headerName: 'תאריך יצירה', show: true },
      { id: 9, field: 'updateDate', headerName: 'תאריך עדכון', show: true },
      { id: 7, field: '', headerName: 'אחוזה קטנה' },
      { id: 10, field: '', headerName: 'כיוון במעלות' },
      { id: 11, field: '', headerName: 'ציר ה - X' },
      { id: 12, field: '', headerName: 'ציר ה - Y' },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})
// שדות לטופס קבר
export const columnsFormAreaGraveSlice = createSlice({
  name: 'columnsAreaGrave',
  initialState: {
    data: [

      { name: 'cemeteryId', label: 'בית העלמין',   required: true, width: 250, show: true, input: 'selectedFree', disabled: true },
      { name: 'blockId', label: 'גוש',             required: true, width: 250, show: true, input: 'selectedFree', disabled: true },
      { name: 'plotId', label: 'חלקה',             required: true, width: 250, show: true, input: 'selectedFree', disabled: true },
      { name: 'lineId', label: 'שורה',             required: true, width: 125, show: true, input: 'selectedFree'},
      { name: 'nameGrave', label: 'מס׳ אחוזת קבר', required: true, width: 125, show: true, input: 'text', notRepeat: true },
      { name: 'graveType', label: 'סוג הקבר',      required: true, width: 100, show: true, input: 'selected'},
      { name: 'coordinates', label: 'קואורדינטות', input: 'text',  width: 300, show: true },
      { id: 10, name: 'comments', label: 'הערות',                  width: 170, show: true, input: 'text' },
      { name: 'addFloor', label: 'הוספת קומה',  required: true, width: 800, show: true, input: 'button', notRepeat: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

// Slice for categories of areaGrave
export const categoryAreaGraveSlice = createSlice({
  name: 'categoryAreaGrave',
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

// Exporting actions
export const dataAreaGraveActions = dataAreaGraveSlice.actions
export const columnsTableAreaGraveActions = columnsTableAreaGraveSlice.actions
export const columnsPropertiesAreaGraveActions = columnsPropertiesAreaGraveSlice.actions
export const columnsFormAreaGraveActions = columnsFormAreaGraveSlice.actions
export const categoryAreaGraveActions = categoryAreaGraveSlice.actions
