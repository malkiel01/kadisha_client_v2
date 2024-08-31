import { createSlice } from '@reduxjs/toolkit'

export const dataPaymentsSlice = createSlice({
  name: 'dataPayments',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const namePaymentsSlice = createSlice({
  name: 'dataPayments',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryPaymentsSlice = createSlice({
    name: 'categoryPayments',
    initialState: { data: [
      {id:0, setting: {checkbox: true, menu: true}}
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })
  
// עמודות לטבלת בתי עלמין
export const columnsTablePaymentsSlice = createSlice({
  name: 'columnsPayments',
  initialState: { data: [
    { id: 6, field: 'price', headerName: 'תשלום', width: 140, isActive: true, show: true },
    { id: 5, field: 'startPayment', headerName: 'מועד תחילת ההגדרה', width: 200, isActive: true, show: true },
    { id: 7, field: 'priceDefinition', headerName: 'הגדרת המחיר', width: 180, isActive: true, show: true },

    { id: 1, field: 'cemeteryName', headerName: 'בית עלמין', width: 200, isActive: true, show: true },
    { id: 1, field: 'blockName', headerName: 'גוש', width: 200, isActive: true, show: true },
    { id: 1, field: 'plotName', headerName: 'חלקה', width: 200, isActive: true, show: true },
    { id: 1, field: 'lineName', headerName: 'שורה', width: 200, isActive: true, show: true },

    { id: 1, field: 'plotType', headerName: 'סוג חלקה', width: 200, isActive: true, show: true },
    { id: 2, field: 'graveType', headerName: 'סוג קבר', width: 200, isActive: true, show: true },

    { id: 3, field: 'resident', headerName: 'תושב', width: 200, isActive: true, show: true },
    { id: 4, field: 'buyerStatus', headerName: 'סטטוס רוכש', width: 200, isActive: true, show: true },

    { id: 8, field: 'isActive', headerName: 'אם הרשומה פעילה', width: 100, isActive: true, show: true },
    { id: 9, field: 'createDate', headerName: 'תאריך יצירה', width: 200, isActive: true, show: true }
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})
// עמודות לטבלת בתי עלמין
export const columnsFormPaymentsSlice = createSlice({ 
    name: 'columnsPayments',
    initialState: { data: [
      { id: 24, label: 'הגדרת איזור',                                                           input: 'card',         width: 900, isActive: true,                 show: true, lock: true },
      { id: 1,                        name: 'cemeteryId',      label: 'בית עלמין',              input: 'selectedFree', width: 250, isActive: true, required: true, show: true },
      { id: 1,                        name: 'blockId',         label: 'גוש',                    input: 'selectedFree', width: 250, isActive: true, required: true, show: true },
      { id: 1,                        name: 'plotId',          label: 'חלקה',                   input: 'selectedFree', width: 250, isActive: true, required: true, show: true },
      { id: 1,                        name: 'lineId',          label: 'שורה',                   input: 'selectedFree', width: 250, isActive: true, required: true, show: true },
      { id: 24, label: 'הגדרת קבר',                                                             input: 'card',         width: 900, isActive: true,                 show: true, lock: true },
      { id: 1,                        name: 'plotType',        label: 'סוג חלקה',               input: 'selectedFree', width: 250, isActive: true, required: true, show: true },
      { id: 2,                        name: 'graveType',       label: 'סוג קבר',                input: 'selectedFree', width: 250, isActive: true, required: true, show: true },
      { id: 24, label: 'הגדרת לקוח',                                                            input: 'card',         width: 900, isActive: true,                 show: true, lock: true },
      { id: 3,                        name: 'resident',        label: 'תושב',                   input: 'selectedFree', width: 250, isActive: true, required: true, show: true },
      { id: 4,                        name: 'buyerStatus',     label: 'סטטוס רוכש',             input: 'selectedFree', width: 250, isActive: true, required: true, show: true },
      { id: 24, label: 'הגדרת תשלום',                                                           input: 'card',         width: 900, isActive: true,                 show: true, lock: true },
      { id: 5,                        name: 'priceDefinition', label: 'סוג תשלום',              input: 'selectedFree', width: 200, isActive: true, required: true, show: true },
      // { id: 5, name: 'createDate', label: 'מועד תחילת הגדרת תשלום', input: 'date', width: 200, isActive: true, show: true },
      { id: 5,                        name: 'startPayment',    label: 'מועד תחילת הגדרת תשלום', input: 'date',         width: 200, isActive: true, required: true, show: true },
      { id: 6,                        name: 'price',           label: 'מחיר',                   input: 'text',         width: 200, isActive: true, required: true, show: true },
      // { id: 8,                        name: 'isActive',        label: 'אם הרשומה פעילה', width: 100, isActive: true, show: false },
      // { id: 9, name: 'createDate', label: 'תאריך יצירה', width: 200, isActive: true,input: 'date', show: false }
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })

  export const dataPaymentsActions = dataPaymentsSlice.actions
  export const columnsTablePaymentsActions = columnsTablePaymentsSlice.actions
  export const columnsFormPaymentsActions = columnsFormPaymentsSlice.actions
  export const categoryPaymentsActions = categoryPaymentsSlice.actions

  // CREATE TABLE `mbeplusc_kadisha_v1`.`cemeteries` (`id` INT(11) NOT NULL AUTO_INCREMENT , 
  //              `cemeteryNameHe` TEXT NOT NULL , `cemeteryNameEn` TEXT NOT NULL , `nationalInsuranceCode` TEXT NOT NULL , 
  //              `cemeteryCode` TEXT NOT NULL , `coordinates` TEXT NOT NULL , `address` TEXT NOT NULL , `documents` TEXT NOT NULL , 
  //              `createDate` TEXT NOT NULL , `inactiveDate` TEXT NOT NULL , `contactName` VARCHAR(25) NOT NULL , 
  //              `contactPhoneName` VARCHAR(20) NOT NULL , `isActive` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

  