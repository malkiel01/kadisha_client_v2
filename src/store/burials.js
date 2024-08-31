import { createSlice } from '@reduxjs/toolkit'

export const dataBurialsSlice = createSlice({
  name: 'dataBurials',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const nameBurialsSlice = createSlice({
  name: 'dataBurials',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryBurialsSlice = createSlice({
  name: 'categoryBurials',
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

export const columnsPropertiesBurialsSlice = createSlice({
  name: 'columnsBurials',
  initialState: {
    data: [
      { id: 1, field: 'clientId', headerName: 'שם הנפטר/ת', width: 350, isActive: true, show: true },
      { id: 6, field: 'buriaLicense', headerName: 'רשיון קבורה', width: 120, isActive: true, show: true },
      { id: 3, field: 'dateOpening', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },

      { id: 4, field: 'dateBurial', headerName: 'תאריך קבורה', width: 120, isActive: true, show: true },
      { id: 4, field: 'purchaseId', headerName: 'תיק רכישה', width: 120, isActive: true, show: true },
      { id: 2, field: 'spacious', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },

      { id: 5, field: 'timeBurial', headerName: 'שעת קבורה', width: 120, isActive: true, show: true },
      { id: 2, field: 'reportingBL', headerName: 'דווח לביטוח לאומי', width: 200, isActive: true, show: true },
      { id: 2, field: 'spacious', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },

      { id: 2, field: 'dateDeath', headerName: 'תאריך פטירה', width: 120, isActive: true, show: true },
      { id: 2, field: 'spacious', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },
      { id: 2, field: 'spacious', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },

      { id: 3, field: 'timeDeath', headerName: 'שעת פטירה', width: 120, isActive: true, show: true },
      { id: 2, field: 'spacious', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },
      { id: 2, field: 'spacious', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },
    ],
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

// עמודות לטבלת בתי עלמין
export const columnsTableBurialsSlice = createSlice({
  name: 'columnsBurials',
  initialState: {
    data: [
      { id: 0, field: 'dateOpening', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },
      { id: 1, field: 'clientId', headerName: 'שם לקוח', width: 350, isActive: true, show: true },
      { id: 2, field: 'dateDeath', headerName: 'תאריך פטירה', width: 120, isActive: true, show: true },
      { id: 3, field: 'timeDeath', headerName: 'שעת פטירה', width: 120, isActive: true, show: true },
      { id: 4, field: 'dateBurial', headerName: 'תאריך קבורה', width: 120, isActive: true, show: true },
      { id: 5, field: 'timeBurial', headerName: 'שעת קבורה', width: 120, isActive: true, show: true },
      { id: 6, field: 'buriaLicense', headerName: 'רשיון קבורה', width: 120, isActive: true, show: true },
      { id: 7, field: 'ReportingBL', headerName: 'דווח לביטוח לאומי', width: 120, isActive: true, show: true },
      { id: 8, field: 'cemeteryId', headerName: 'בית העלמין', width: 120, isActive: true, show: true },
      { id: 9, field: 'blockId', headerName: 'גוש', width: 120, isActive: true, show: true },
      { id: 10, field: 'plotId', headerName: 'חלקה', width: 120, isActive: true, show: true },
      { id: 11, field: 'lineId', headerName: 'שורה', width: 120, isActive: true, show: true },
      { id: 12, field: 'areaGraveId', headerName: 'אחוזת קבר', width: 120, isActive: true, show: true },
      { id: 13, field: 'graveId', headerName: 'קבר', width: 120, isActive: true, show: true },
      { id: 14, field: 'isActive', headerName: 'isActive', width: 10, isActive: false },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

// עמודות לטבלת בתי עלמין
export const columnsFormBurialsSlice = createSlice({
  name: 'columnsBurials',
  initialState: {
    data: [
      { id: 0, label: 'ID', name: 'id', width: 70, show: false },
      { id: 13, label: 'כללי', width: 900, isActive: true, input: 'card', show: true, lock: true },
      { id: 13, label: 'תאריך פתיחת תיק', name: 'dateOpening', input: 'date', width: 200, required: true, isActive: true, show: true },
      { id: 1, label: 'תיק רכישה', name: 'purchaseId', input: 'text', width: 200, show: true, disabled: true, lock: true },
      { id: 14, label: 'דווח לביטוח לאומי', name: 'reportingBL', input: 'date', width: 200, isActive: true, show: true },

      { id: 13, label: 'פרטי הלקוח', input: 'card', isActive: true, show: true, lock: true },
      { id: 11, label: 'שם לקוח', name: 'clientId', input: 'selectedFree', width: 250, required: true, isActive: true, show: true },

      { id: 21, label: 'פרטי איש קשר', width: 900, isActive: true, input: 'card', show: true, lock: true },
      { id: 22, label: 'שם איש הקשר', name: 'contactId', input: 'selectedFree', width: 250, isActive: true, show: true },
      { id: 23, label: 'קירבה', name: 'kinship', input: 'text', width: 200, isActive: true, show: true },

      { id: 13, label: 'פרטי מקום הקבורה', input: 'card', width: 900, isActive: true, show: true, lock: true },

      { id: 1, label: 'בית עלמין', name: 'cemeteryId', input: 'selected', width: 250, show: true, disabled: true },
      { id: 2, label: 'גוש', name: 'blockId', width: 250, input: 'selected', show: true, disabled: true },
      { id: 3, label: 'מספר החלקה', name: 'plotId', input: 'selected', width: 250, show: true, disabled: true },
      { id: 4, label: 'מספר שורה', name: 'lineId', input: 'selected', width: 130, show: true, disabled: true },
      { id: 5, label: 'אחוזת קבר', name: 'areaGraveId', input: 'selected', width: 120, isActive: true, show: true, disabled: true },
      { id: 6, label: 'קבר', name: 'graveId', input: 'selected', width: 120, isActive: true, show: true, disabled: true },


      { id: 24, label: 'פרטי הקבורה', width: 900, isActive: true, input: 'card', show: true, lock: true },

      { id: 8, label: 'תאריך פטירה', name: 'dateDeath', input: 'date', width: 200, isActive: true, show: true },
      { id: 9, label: 'שעת פטירה', name: 'timeDeath', input: 'time', width: 200, isActive: true, show: true },
      { id: 11, label: 'מקום הפטירה', name: 'placeDeath', input: 'text', width: 200, isActive: true, show: true },
      { id: 10, label: 'תאריך קבורה', name: 'dateBurial', input: 'date', width: 200, required: true, isActive: true, show: true },
      { id: 11, label: 'שעת קבורה', name: 'timeBurial', input: 'time', width: 200, isActive: true, show: true },
      { id: 12, label: 'רשיון קבורה', name: 'buriaLicense', input: 'text', width: 200, isActive: true, show: true },

      // ReportingBL

      { id: 24, label: 'פרטים נוספים', width: 900, isActive: true, input: 'card', show: true, lock: true },
      { id: 23, name: 'comment', label: 'הערות', input: 'text', width: 800, show: true },
      // { id: 15, name: 'isActive', label: 'isActive', width: 10, isActive: false },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const dataBurialsActions = dataBurialsSlice.actions
export const columnsTableBurialsActions = columnsTableBurialsSlice.actions
export const columnsPropertiesBurialsActions = columnsPropertiesBurialsSlice.actions
export const columnsFormBurialsActions = columnsFormBurialsSlice.actions
export const categoryBurialsActions = categoryBurialsSlice.actions

// CREATE TABLE `mbeplusc_kadisha_v1`.`cemeteries` (`id` INT(11) NOT NULL AUTO_INCREMENT , 
//              `cemeteryNameHe` TEXT NOT NULL , `cemeteryNameEn` TEXT NOT NULL , `nationalInsuranceCode` TEXT NOT NULL ,
//              `cemeteryCode` TEXT NOT NULL , `coordinates` TEXT NOT NULL , `address` TEXT NOT NULL , `documents` TEXT NOT NULL ,
//              `createDate` TEXT NOT NULL , `inactiveDate` TEXT NOT NULL , `contactName` VARCHAR(25) NOT NULL ,
//              `contactPhoneName` VARCHAR(20) NOT NULL , `isActive` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

