import { createSlice } from '@reduxjs/toolkit'

export const dataCitiesSlice = createSlice({
  name: 'dataCities',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const nameCitiesSlice = createSlice({
  name: 'dataCities',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryCitiesSlice = createSlice({
    name: 'categoryCities',
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
  export const columnsTableCitiesSlice = createSlice({
    name: 'columnsCities',
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
  export const columnsFormCitiesSlice = createSlice({
    name: 'columnsCities',
    initialState: { data: [
      { id: 0, name: 'id', label: 'ID', width: 200 , show: false},
      { id: 1, name: 'countryId',         label: 'מדינה',        input: 'selected', width: 550, isActive: true , required: true, show: true},
      { id: 1, name: 'cityNameHe',        label: 'שם העיר',      input: 'text',     width: 350, isActive: true , required: true, show: true, notRepeat: true},
      { id: 2, name: 'cityNameEn',        label: 'שם העיר (En)', input: 'text',     width: 350, isActive: true ,                 show: true},
     ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })
  
  export const dataCitiesActions = dataCitiesSlice.actions
  export const columnsTableCitiesActions = columnsTableCitiesSlice.actions
  export const columnsFormCitiesActions = columnsFormCitiesSlice.actions
  export const categoryCitiesActions = categoryCitiesSlice.actions

  // CREATE TABLE `mbeplusc_kadisha_v1`.`cities` (`id` INT(11) NOT NULL AUTO_INCREMENT , 
  //              `cityNameHe` TEXT NOT NULL , `cityNameEn` TEXT NOT NULL ,
  //              `createDate` TEXT NOT NULL , `inactiveDate` TEXT NOT NULL ,
  //              `isActive` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


  // CREATE TABLE `mbeplusc_kadisha_v1`.`countries` (`id` INT(11) NOT NULL AUTO_INCREMENT , 
  //              `countryNameHe` TEXT NOT NULL , `countryNameEn` TEXT NOT NULL ,
  //              `createDate` TEXT NOT NULL , `inactiveDate` TEXT NOT NULL ,
  //              `isActive` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

  