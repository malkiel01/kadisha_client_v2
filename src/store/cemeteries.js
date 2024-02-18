import { createSlice } from '@reduxjs/toolkit'

export const dataCemeteriesSlice = createSlice({
  name: 'dataPages',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const nameCemeteriesSlice = createSlice({
  name: 'dataPages',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryCemeteriesSlice = createSlice({
    name: 'categoryCemeteries',
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
export const columnsCemeteriesSlice = createSlice({
    name: 'columnsCemeteries',
    initialState: { data: [
        { id: 0, field: 'id', headerName: 'ID', width: 200 , show: false},
        { id: 1, field: 'cemeteryNameHe',        headerName: 'בית העלמין',      width: 900, isActive: true , show: true},
        { id: 2, field: 'cemeteryNameEn',        headerName: 'בית העלמין (En)', width: 350, isActive: true , show: true},
        { id: 3, field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 200, isActive: true , show: true},
        { id: 4, field: 'cemeteryCode',          headerName: 'קוד בית עלמין',   width: 200, isActive: true , show: true},
        { id: 5, field: 'coordinates',           headerName: 'קואורדינטות',     width: 160, isActive: true , show: true},
        { id: 6, field: 'address',               headerName: 'כתובת',           width: 120,  isActive: true , show: true},
        // { id: 7, field: 'documents', headerName: 'מסמכים', width: 70, isActive: true },
        // { id: 8, field: 'createDate', headerName: 'createDate', width: 70, isActive: true },
        // { id: 9, field: 'inactiveDate', headerName: 'inactiveDate', width: 70, isActive: true },
        // { id: 10, field: 'contactName', headerName: 'איש קשר', width: 70, isActive: true },
        // { id: 11, field: 'contactPhoneName', headerName: 'טלפון איש קשר', width: 70, isActive: true },
        // { id: 12, field: 'isActive', headerName: 'isActive', width: 10, isActive: true },
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })

  export const dataCemeteriesActions = dataCemeteriesSlice.actions
  export const columnsCemeteriesActions = columnsCemeteriesSlice.actions
  export const categoryCemeteriesActions = categoryCemeteriesSlice.actions

  // CREATE TABLE `mbeplusc_kadisha_v1`.`cemeteries` (`id` INT(11) NOT NULL AUTO_INCREMENT , 
  //              `cemeteryNameHe` TEXT NOT NULL , `cemeteryNameEn` TEXT NOT NULL , `nationalInsuranceCode` TEXT NOT NULL , 
  //              `cemeteryCode` TEXT NOT NULL , `coordinates` TEXT NOT NULL , `address` TEXT NOT NULL , `documents` TEXT NOT NULL , 
  //              `createDate` TEXT NOT NULL , `inactiveDate` TEXT NOT NULL , `contactName` VARCHAR(25) NOT NULL , 
  //              `contactPhoneName` VARCHAR(20) NOT NULL , `isActive` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

  