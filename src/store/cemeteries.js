import { createSlice } from '@reduxjs/toolkit'

export const dataCemeteriesSlice = createSlice({
  name: 'dataCountries',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const nameCemeteriesSlice = createSlice({
  name: 'dataCountries',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryCemeteriesSlice = createSlice({
    name: 'categoryCountries',
    initialState: { data: [
      {id:0, setting: {checkbox: true, menu: true}}
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })

  // עמודות לפרטי בתי עלמין
  export const columnsPropertiesCemeteriesSlice = createSlice({
    name: 'columnsCemeteries',
    initialState: { data: [
      { id: 0, field: 'id', headerName: 'ID', width: 200 , show: false},
      { id: 1, field: 'cemeteryNameHe',        headerName: 'בית העלמין',      width: 380, isActive: true , show: true},
      { id: 2, field: 'cemeteryNameEn',        headerName: 'בית העלמין (En)', width: 380, isActive: true , show: true},
      { id: 3, field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 200, isActive: true , show: true},
      { id: 4, field: 'cemeteryCode',          headerName: 'קוד בית עלמין',   width: 200, isActive: true , show: true},
      { id: 5, field: 'coordinates',           headerName: 'קואורדינטות',     width: 200, isActive: true , show: true},
      // { id: 6, field: 'address',               headerName: 'כתובת',           width: 120,  isActive: true , show: true},
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })

  // עמודות לטופס בתי עלמין
  export const columnsTableCemeteriesSlice = createSlice({
    name: 'columnsCemeteries',
    initialState: { data: [
      { id: 0, field: 'id', headerName: 'ID', width: 200 , show: false},
      { id: 1, field: 'cemeteryNameHe',        headerName: 'בית העלמין',      width: 180, isActive: true , show: true},
      { id: 2, field: 'cemeteryNameEn',        headerName: 'בית העלמין (En)', width: 180, isActive: true , show: true},
      { id: 3, field: 'nationalInsuranceCode', headerName: 'קוד ביטוח לאומי', width: 120, isActive: true , show: true},
      { id: 4, field: 'cemeteryCode',          headerName: 'קוד בית עלמין',   width: 120, isActive: true , show: true},
      { id: 5, field: 'available',           headerName: 'פנויים',     width: 100, isActive: true , show: true},
      { id: 5, field: 'purchased',           headerName: 'רכישות',     width: 100, isActive: true , show: true},
      { id: 5, field: 'buried',           headerName: 'קבורים',     width: 100, isActive: true , show: true},
      { id: 5, field: 'saved',           headerName: 'שמורים',     width: 100, isActive: true , show: true},
      { id: 5, field: 'graveSum',           headerName: 'סה״כ',     width: 100, isActive: true , show: true},
      { id: 5, field: 'coordinates',           headerName: 'קואורדינטות',     width: 200, isActive: true , show: false},
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })

  // עמודות לטבלת בתי עלמין
  export const columnsFormCemeteriesSlice = createSlice({
    name: 'columnsCountries',
    initialState: { data: [
      { id: 0, name: 'id', label: 'ID', width: 200 , show: false},
      { id: 1, name: 'cemeteryNameHe',        label: 'בית העלמין',      input: 'text', width: 380, isActive: true , show: true, notRepeat: true, required: true},
      { id: 2, name: 'cemeteryNameEn',        label: 'בית העלמין (En)', input: 'text', width: 380, isActive: true , show: true, required: true},
      { id: 3, name: 'nationalInsuranceCode', label: 'קוד ביטוח לאומי', input: 'text', width: 200, isActive: true , show: true, required: true},
      { id: 4, name: 'cemeteryCode',          label: 'קוד בית עלמין',   input: 'text', width: 200, isActive: true , show: true, required: true},
      { id: 5, name: 'coordinates',           label: 'קואורדינטות',     input: 'text', width: 200, isActive: true , show: true, required: false},
     ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })
  
  export const dataCemeteriesActions = dataCemeteriesSlice.actions
  export const columnsTableCemeteriesActions = columnsTableCemeteriesSlice.actions
  export const columnsPropertiesCemeteriesActions = columnsPropertiesCemeteriesSlice.actions
  export const columnsFormCemeteriesActions = columnsFormCemeteriesSlice.actions
  export const categoryCemeteriesActions = categoryCemeteriesSlice.actions

  // CREATE TABLE `mbeplusc_kadisha_v1`.`cemeteries` (`id` INT(11) NOT NULL AUTO_INCREMENT , 
  //              `cemeteryNameHe` TEXT NOT NULL , `cemeteryNameEn` TEXT NOT NULL , `nationalInsuranceCode` TEXT NOT NULL , 
  //              `cemeteryCode` TEXT NOT NULL , `coordinates` TEXT NOT NULL , `address` TEXT NOT NULL , `documents` TEXT NOT NULL , 
  //              `createDate` TEXT NOT NULL , `inactiveDate` TEXT NOT NULL , `contactName` VARCHAR(25) NOT NULL , 
  //              `contactPhoneName` VARCHAR(20) NOT NULL , `isActive` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

  