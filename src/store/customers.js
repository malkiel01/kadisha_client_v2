import { createSlice } from '@reduxjs/toolkit'

export const dataCustomersSlice = createSlice({
  name: 'dataCustomers',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const nameCustomersSlice = createSlice({
  name: 'dataCustomers',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryCustomersSlice = createSlice({
  name: 'categoryCustomers',
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

// עמודות לטבלת בתי עלמין
export const columnsTableCustomersSlice = createSlice({
  name: 'columnsCustomers',
  initialState: {
    data: [
      { id: 0, field: 'id', headerName: 'ID', width: 200, show: false },
      { id: 1, field: 'typeId', headerName: 'סוג זיהוי', width: 80, isActive: true, show: true },
      { id: 2, field: 'numId', headerName: 'מס׳ זיהוי', width: 150, isActive: true, show: true },
      { id: 3, field: 'firstName', headerName: 'שם פרטי', width: 150, isActive: true, show: true },
      { id: 4, field: 'lastName', headerName: 'שם משפחה', width: 150, isActive: true, show: true },
      { id: 5, field: 'nom', headerName: 'שם בלועזית', width: 160, isActive: true, show: true },
      { id: 6, field: 'gender', headerName: 'מגדר', width: 120, isActive: true, show: true },
      { id: 7, field: 'nameFather', headerName: 'שם האב', width: 120, isActive: true, show: true },
      { id: 8, field: 'nameMother', headerName: 'שם האם', width: 120, isActive: true, show: true },
      { id: 9, field: 'maritalStatus', headerName: 'מצב משפחתי', width: 120, isActive: true, show: true },
      { id: 10, field: 'dateBirth', headerName: 'תאריך לידה', width: 120, isActive: true, show: true },
      { id: 11, field: 'phone', headerName: 'טלפון', width: 120, isActive: true, show: true },
      { id: 12, field: 'phoneMobile', headerName: 'טלפון סלולרי', width: 120, isActive: true, show: true },
      { id: 13, field: 'address', headerName: 'כתובת', width: 120, isActive: true, show: true },
      { id: 14, field: 'cityId', headerName: 'עיר', width: 120, isActive: true, show: true },
      { id: 15, field: 'countryId', headerName: 'מדינה', width: 120, isActive: true, show: true },
      { id: 12, field: 'isActive', headerName: 'isActive', width: 10, isActive: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})
// עמודות לטופס בתי עלמין
export const columnsFormCustomersSlice = createSlice({
  name: 'columnsCustomers',
  initialState: {
    data: [
      { id: 0, name: 'id',          label: 'ID', width: 70, show: false },
      { id: 1,                      label: 'פרטי הלקוח', width: 900, isActive: true, input: 'card', show: true, lock: true },
      { id: 4, name: 'gender',      label: 'מגדר', input: 'selected', required: true, width: 120, isActive: true, show: true },
      { id: 2, name: 'typeId',      label: 'סוג זיהוי', input: 'selectedFree', required: true, width: 100, isActive: true, show: true },
      { id: 3, name: 'numId',       label: 'מס׳ זיהוי', input: 'text',         required: true, width: 150, isActive: true, show: true, notRepeat: true },
      { id: 5, name: 'firstName',   label: 'שם פרטי', input: 'text', required: true, width: 250, isActive: true, show: true },
      { id: 6, name: 'lastName',    label: 'שם משפחה', input: 'text', required: true, width: 250, isActive: true, show: true },
      { id: 7, name: 'oldName',     label: 'שם קודם', input: 'text', width: 250, isActive: true, show: true },
      { id: 8, name: 'nom',         label: 'שם בלועזית', input: 'text', width: 250, isActive: true, show: true },
      { id: 9, name: 'nameFather',  label: 'שם האב', input: 'text', width: 250, isActive: true, show: true },
      { id: 10, name: 'nameMother', label: 'שם האם', input: 'text', width: 250, isActive: true, show: true },

      { id: 11, label: 'פרטים נוספים', width: 900, isActive: true, input: 'card', show: true },
      { id: 12, name: 'maritalStatus', label: 'מצב משפחתי', input: 'selected', required: true, width: 160, isActive: true, show: true },
      { id: 13, name: 'spouse', label: 'בן/ת הזוג', input: 'selectedFree', width: 160, isActive: true, show: true },
      { id: 15, name: 'resident', label: 'תושבות', input: 'selected', required: true, width: 160, isActive: true, show: true, lock: true },
      { id: 15, name: 'association', label: 'שיוך', input: 'selected', width: 160, isActive: true, show: true },
      { id: 14, name: 'dateBirth', label: 'תאריך לידה לועזי', input: 'date', width: 220, isActive: true, required: true, show: true },
      { id: 14, name: 'dateBirthHe', label: 'תאריך לידה עברי', input: 'text', width: 220, isActive: true, show: true, lock: true },

      { id: 16, label: 'כתובת ופרטי התקשרות', width: 900, isActive: true, input: 'card', show: true },
      { id: 17, name: 'address', label: 'כתובת', input: 'text', required: true, width: 350, isActive: true, show: true },
      { id: 18, name: 'cityId', label: 'עיר', input: 'selectedFree', required: true, width: 120, isActive: true, show: true },
      { id: 19, name: 'countryId', label: 'מדינה', input: 'selected', required: true, width: 120, isActive: true, show: true },
      { id: 20, name: 'phone', label: 'טלפון', width: 120, input: 'text', isActive: true, show: true },
      { id: 21, name: 'phoneMobile', label: 'טלפון סלולרי', input: 'text', required: true, width: 120, isActive: true, show: true },
      { id: 22, name: 'comment', label: 'הערות', input: 'text', width: 800, show: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})





export const dataCustomersActions = dataCustomersSlice.actions
export const columnsTableCustomersActions = columnsTableCustomersSlice.actions
export const columnsFormCustomersActions = columnsFormCustomersSlice.actions
export const categoryCustomersActions = categoryCustomersSlice.actions

// CREATE TABLE `mbeplusc_kadisha_v1`.`cemeteries` (`id` INT(11) NOT NULL AUTO_INCREMENT , 
//              `cemeteryNameHe` TEXT NOT NULL , `cemeteryNameEn` TEXT NOT NULL , `nationalInsuranceCode` TEXT NOT NULL ,
//              `cemeteryCode` TEXT NOT NULL , `coordinates` TEXT NOT NULL , `address` TEXT NOT NULL , `documents` TEXT NOT NULL ,
//              `createDate` TEXT NOT NULL , `inactiveDate` TEXT NOT NULL , `contactName` VARCHAR(25) NOT NULL ,
//              `contactPhoneName` VARCHAR(20) NOT NULL , `isActive` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

