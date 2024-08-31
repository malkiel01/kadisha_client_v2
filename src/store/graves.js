import { createSlice } from '@reduxjs/toolkit'

export const dataGravesSlice = createSlice({
  name: 'dataGraves',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const nameGravesSlice = createSlice({
  name: 'dataGraves',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryGravesSlice = createSlice({
    name: 'categoryGraves',
    initialState: { data: [
      {id:0, setting: {checkbox: true, menu: true}}
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })

  // עמודות לטופס בתי עלמין
  export const columnsTableGravesSlice = createSlice({
    name: 'columnsGraves',
    initialState: { data: [
      { id: 0, field: 'id', headerName: 'ID', width: 200 , show: false},
      // { id: 1, field: 'cemeteryNameHe',        headerName: 'בית העלמין',      width: 380, isActive: true , show: true},
      // { id: 2, field: 'cemeteryNameEn',        headerName: 'בית העלמין (En)', width: 380, isActive: true , show: true},
      // { id: 3, field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 200, isActive: true , show: true},
      // { id: 4, field: 'cemeteryCode',          headerName: 'קוד בית עלמין',   width: 200, isActive: true , show: true},
      // { id: 5, field: 'coordinates',           headerName: 'קואורדינטות',     width: 200, isActive: true , show: true},
      // { id: 6, field: 'address',               headerName: 'כתובת',           width: 120,  isActive: true , show: true},
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })
  // עמודות לטבלת בתי עלמין
  export const columnsFormGravesSlice = createSlice({
    name: 'columnsGraves',
    initialState: { data: [
      { id: 0, name: 'id', label: 'ID', width: 200 , show: false},
      { id: 1, name: 'nameGrave', label: 'שם קומת הקבר', input: 'text', width: 250, isActive: true , show: true, notRepeat: true},
      { id: 1, name: 'plotType', label: 'סוג חלקה', input: 'selected', width: 250, isActive: true , show: true, notRepeat: true},
      // { id: 1, name: 'cemeteryNameHe',        label: 'בית העלמין',      input: 'selectedFree', width: 380, isActive: true , show: true, notRepeat: true, required: true},
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })
  
  export const dataGravesActions = dataGravesSlice.actions
  export const columnsTableGravesActions = columnsTableGravesSlice.actions
  export const columnsFormGravesActions = columnsFormGravesSlice.actions
  export const categoryGravesActions = categoryGravesSlice.actions

  // CREATE TABLE `mbeplusc_kadisha_v1`.`cemeteries` (`id` INT(11) NOT NULL AUTO_INCREMENT , 
  //              `cemeteryNameHe` TEXT NOT NULL , `cemeteryNameEn` TEXT NOT NULL , `nationalInsuranceCode` TEXT NOT NULL , 
  //              `cemeteryCode` TEXT NOT NULL , `coordinates` TEXT NOT NULL , `address` TEXT NOT NULL , `documents` TEXT NOT NULL , 
  //              `createDate` TEXT NOT NULL , `inactiveDate` TEXT NOT NULL , `contactName` VARCHAR(25) NOT NULL , 
  //              `contactPhoneName` VARCHAR(20) NOT NULL , `isActive` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

  