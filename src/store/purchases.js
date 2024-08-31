import { createSlice } from '@reduxjs/toolkit'

export const dataPurchasesSlice = createSlice({
  name: 'dataPurchases',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const namePurchasesSlice = createSlice({
  name: 'dataPurchases',
  initialState: { data: [] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const categoryPurchasesSlice = createSlice({
  name: 'categoryPurchases',
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

// עמודות לפרטי בתי עלמין
export const columnsPropertiesPurchasesSlice = createSlice({
  name: 'columnsCemeteries',
  initialState: {
    data: [
      { id: 1, field: 'clientId', headerName: 'שם הרוכש', width: 350, isActive: true, show: true },
      { id: 2, field: 'serialPurchaseId', headerName: 'מספר רכישה', width: 120, isActive: true, show: true },
      { id: 3, field: 'buyerStatus', headerName: 'סוג רכישה', width: 200, isActive: true, show: true },
      { id: 4, field: 'dateOpening', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },
      { id: 5, field: 'purchaseStatus', headerName: 'סטטוס', width: 200, isActive: true, show: true },
      { id: 6, field: 'price', headerName: 'סך תשלום', width: 160, isActive: true, show: true },
      { id: 7, field: 'isFuneralPayments', headerName: 'שירותי לוויה', width: 200, show: true },
      { id: 8, field: 'PaymentEndDate', headerName: 'תאריך סיום תשלום', width: 120, isActive: true, show: true },
      { id: 9, field: 'numOfPayments', headerName: 'מספר תשלומים', width: 100, show: true },
      { id: 10, field: 'BookkeepingApproval', headerName: 'אישור הנה״ח', width: 120, isActive: true, show: true },
      { id: 11, field: 'deedNum', headerName: 'מספר שטר', width: 120, isActive: true, show: true },
      // { id: 12, field: 'cemeteryId', headerName: 'בית העלמין', width: 120, isActive: true, show: true },
      // { id: 13, field: 'blockId', headerName: 'גוש', width: 120, isActive: true, show: true },
      // { id: 14, field: 'plotId', headerName: 'חלקה', width: 120, isActive: true, show: true },
      // { id: 15, field: 'lineId', headerName: 'שורה', width: 120, isActive: true, show: true },
      // { id: 16, field: 'areaGraveId', headerName: 'אחוזת קבר', width: 120, isActive: true, show: true },
      // { id: 17, field: 'graveId', headerName: 'קבר', width: 120, isActive: true, show: true },
      // { id: 18, field: 'isActive', headerName: 'רשומה פעילה', width: 10, isActive: true },
      { id: 19, field: 'comment', headerName: 'הערות', width: 100, show: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

// עמודות לטבלת בתי עלמין
export const columnsTablePurchasesSlice = createSlice({
  name: 'columnsPurchases',
  initialState: {
    data: [
      { id: 0, field: 'dateOpening', headerName: 'תאריך פתיחת תיק', width: 200, isActive: true, show: true },
      { id: 1, field: 'clientId', headerName: 'שם לקוח', width: 350, isActive: true, show: true },
      { id: 2, field: 'purchaseStatus', headerName: 'סטטוס', width: 200, isActive: true, show: true },
      { id: 3, field: 'buyerStatus', headerName: 'סוג רכישה', width: 200, isActive: true, show: true },
      { id: 4, field: 'price', headerName: 'סך תשלום', width: 160, isActive: true, show: true },
      { id: 5, field: 'PaymentEndDate', headerName: 'תאריך סיום תשלום', width: 120, isActive: true, show: true },
      { id: 6, field: 'BookkeepingApproval', headerName: 'אישור הנה״ח', width: 120, isActive: true, show: true },
      { id: 7, field: 'deedNum', headerName: 'מספר שטר', width: 120, isActive: true, show: true },
      { id: 8, field: 'serialPurchaseId', headerName: 'מספר רכישה', width: 120, isActive: true, show: true },
      { id: 9, field: 'cemeteryId', headerName: 'בית העלמין', width: 120, isActive: true, show: true },
      { id: 10, field: 'blockId', headerName: 'גוש', width: 120, isActive: true, show: true },
      { id: 11, field: 'plotId', headerName: 'חלקה', width: 120, isActive: true, show: true },
      { id: 12, field: 'lineId', headerName: 'שורה', width: 120, isActive: true, show: true },
      { id: 13, field: 'areaGraveId', headerName: 'אחוזת קבר', width: 120, isActive: true, show: true },
      { id: 14, field: 'graveId', headerName: 'קבר', width: 120, isActive: true, show: true },
      { id: 12, field: 'isActive', headerName: 'isActive', width: 10, isActive: false, show: false },
      { id: 13, field: 'isFuneralPayments', headerName: 'כולל שירותי לוויה', width: 200, show: true },
      { id: 14, field: 'numOfPayments', headerName: 'מספר תשלומים', width: 100, show: true },
      { id: 14, field: 'comment', headerName: 'הערות', width: 100, show: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})
// עמודות לטבלת בתי עלמין
export const columnsFormPurchasesSlice = createSlice({
  name: 'columnsPurchases',
  initialState: {
    data: [
      { id: 1, name: 'id',                  label: 'ID',                                       width: 70, show: false },
      { id: 2,                              label: 'פרטי מקום הקבורה', width: 900, isActive: true, input: 'card', show: true, lock: true },

      { id: 3, name: 'cemeteryId',          label: 'בית עלמין',         input: 'selected',     width: 250,                 show: true, disabled: true, required: true,  },
      { id: 4, name: 'blockId',             label: 'גוש',               input: 'selectedFree', width: 250,                 show: true, disabled: true, required: true,  },
      { id: 5, name: 'plotId',              label: 'מספר החלקה',        input: 'selectedFree', width: 250,                 show: true, disabled: true, required: true,  },
      { id: 6, name: 'lineId',              label: 'מספר שורה',         input: 'selected',     width: 130,                 show: true, disabled: true, required: true,  },
      { id: 7, name: 'areaGraveId',         label: 'אחוזת קבר',         input: 'selected',     width: 120, isActive: true, show: true, disabled: true, required: true,  },
      { id: 8, name: 'graveId',             label: 'קבר',               input: 'selected',     width: 120, isActive: true, show: true, disabled: true, required: true,  },

      // { id: 9,                              label: 'פרטי הלקוח',        input: 'card',                     isActive: true, show: true,                  lock: true },

      
      { id: 11,                             label: 'פרטי הרכישה',       input: 'card',         width: 900, isActive: true, show: true,                 lock: true },
      { id: 10, name: 'clientId',           label: 'שם לקוח',           input: 'selectedFree', width: 250, isActive: true, show: true, required: true,  },
      { id: 12, name: 'buyerStatus',        label: 'סוג רכישה',         input: 'selected',     width: 130, isActive: true, show: true, required: true,  },
      { id: 13, name: 'diesSpouse',         label: 'צמוד לבן זוג נפטר', input: 'selected',     width: 180,                 show: true, required: true,  },

      // { id: 13, name: 'isFuneralPayments',  label: 'שירותי לוויה',      input: 'selected',     width: 180,                 show: true },
       
      // { id: 17, name: 'deedNum',            label: 'מספר שטר',         input: 'text',          width: 120, isActive: true, show: true,                 lock: true },
      // { id: 18, name: 'serialPurchaseId',   label: 'מספר שטר רכישה',   input: 'text',          width: 120, isActive: true, show: true,                 lock: true },
      
      { id: 20, name: 'comment',            label: 'הערות',            input: 'text',          width: 800,                 show: true },
      
      { id: 19,                             label: 'תשלומים',       input: 'card',         width: 900, isActive: true, show: true,                 lock: true },
      { id: 22, name: 'paymentsList',       label: 'סוגי תשלומים',      input: 'multiSelect',  width: 500, isActive: true, show: true },
      { id: 14, name: 'price',              label: 'סך תשלום',         input: 'text',          width: 150, isActive: true, show: true,                 lock: true },
      { id: 19, name: 'numOfPayments',      label: 'מספר תשלומים',     input: 'selected',      width: 100,                 show: true },
      { id: 15, name: 'PaymentEndDate',     label: 'תאריך סיום תשלום', input: 'date',          width: 120, isActive: true, show: true,                 required: true,  },
      { id: 16, name: 'BookkeepingApproval',label: 'אישור הנה״ח',      input: 'selected',      width: 120, isActive: true, show: true },
    
      { id: 21,                             label: 'פרטי איש קשר',     input: 'card',          width: 900, isActive: true, show: true, lock: true },

      { id: 22, name: 'contactId',          label: 'שם איש הקשר',      input: 'selectedFree',  width: 250, isActive: true, show: true },
      { id: 23, name: 'kinship',            label: 'קירבה',            input: 'text',          width: 200, isActive: true, show: true },

      { id: 24,                             label: 'פרטים נוספים',     input: 'date',          width: 900, isActive: true, input: 'card', show: true, lock: true },

      { id: 25, name: 'dateOpening',        label: 'תאריך פתיחת תיק',  input: 'date',         width: 200, isActive: true, show: true, required: true, },
      { id: 26, name: 'purchaseStatus',     label: 'סטטוס',            input: 'selected',     width: 200, isActive: true, show: true, disabled: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})
// עמודות לטבלת בתי עלמין
export const columnsFormPurchasesSlice2 = createSlice({
  name: 'columnsPurchases',
  initialState: {
    data: [
      { id: 1, name: 'id',                  label: 'ID',                                       width: 70, show: false },
      { id: 2,                              label: 'פרטי מקום הקבורה', width: 900, isActive: true, input: 'card', show: true, lock: true },

      { id: 3, name: 'cemeteryId',          label: 'בית עלמין',         input: 'selected',     width: 250,                 show: true, disabled: true, required: true,  },
      { id: 4, name: 'blockId',             label: 'גוש',               input: 'selectedFree', width: 250,                 show: true, disabled: true, required: true,  },
      { id: 5, name: 'plotId',              label: 'מספר החלקה',        input: 'selectedFree', width: 250,                 show: true, disabled: true, required: true,  },
      { id: 6, name: 'lineId',              label: 'מספר שורה',         input: 'selected',     width: 130,                 show: true, disabled: true, required: true,  },
      { id: 7, name: 'areaGraveId',         label: 'אחוזת קבר',         input: 'selected',     width: 120, isActive: true, show: true, disabled: true, required: true,  },
      { id: 8, name: 'graveId',             label: 'קבר',               input: 'selected',     width: 120, isActive: true, show: true, disabled: true, required: true,  },

      { id: 9,                              label: 'פרטי הלקוח',        input: 'card',                     isActive: true, show: true,                  lock: true },

      { id: 10, name: 'clientId',           label: 'שם לקוח',           input: 'selectedFree', width: 250, isActive: true, show: true, required: true,  },

      { id: 11,                             label: 'פרטי הרכישה',       input: 'card',         width: 900, isActive: true, show: true,                 lock: true },

      { id: 12, name: 'buyerStatus',        label: 'סוג רכישה',         input: 'selected',     width: 130, isActive: true, show: true, required: true,  },
      { id: 13, name: 'isFuneralPayments',  label: 'שירותי לוויה',      input: 'selected',     width: 180,                 show: true },
      { id: 13, name: 'diesSpouse',         label: 'צמוד לבן זוג נפטר', input: 'selected',     width: 180,                 show: true, required: true,  },
       
      { id: 14, name: 'price',              label: 'סך תשלום',         input: 'text',          width: 150, isActive: true, show: true,                 lock: true },
      { id: 16, name: 'BookkeepingApproval',label: 'אישור הנה״ח',      input: 'selected',      width: 120, isActive: true, show: true },
      { id: 15, name: 'PaymentEndDate',     label: 'תאריך סיום תשלום', input: 'date',          width: 120, isActive: true, show: true,                 required: true,  },
      { id: 19, name: 'numOfPayments',      label: 'מספר תשלומים',     input: 'selected',      width: 100,                 show: true },
      { id: 17, name: 'deedNum',            label: 'מספר שטר',         input: 'text',          width: 120, isActive: true, show: true,                 lock: true },
      { id: 18, name: 'serialPurchaseId',   label: 'מספר שטר רכישה',   input: 'text',          width: 120, isActive: true, show: true,                 lock: true },

      { id: 20, name: 'comment',            label: 'הערות',            input: 'text',          width: 800,                 show: true },

      { id: 21,                             label: 'פרטי איש קשר',     input: 'card',          width: 900, isActive: true, show: true, lock: true },

      { id: 22, name: 'contactId',          label: 'שם איש הקשר',      input: 'selectedFree',  width: 250, isActive: true, show: true },
      { id: 23, name: 'kinship',            label: 'קירבה',            input: 'text',          width: 200, isActive: true, show: true },

      { id: 24,                             label: 'פרטים נוספים',     input: 'date',          width: 900, isActive: true, input: 'card', show: true, lock: true },

      { id: 25, name: 'dateOpening',        label: 'תאריך פתיחת תיק',  input: 'date',         width: 200, isActive: true, show: true, required: true, },
      { id: 26, name: 'purchaseStatus',     label: 'סטטוס',            input: 'selected',     width: 200, isActive: true, show: true, disabled: true },
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const dataPurchasesActions = dataPurchasesSlice.actions
export const columnsTablePurchasesActions = columnsTablePurchasesSlice.actions
export const columnsPropertiesPurchasesActions = columnsPropertiesPurchasesSlice.actions
export const columnsFormPurchasesActions = columnsFormPurchasesSlice.actions
export const categoryPurchasesActions = categoryPurchasesSlice.actions

// CREATE TABLE `mbeplusc_kadisha_v1`.`cemeteries` (`id` INT(11) NOT NULL AUTO_INCREMENT , 
//              `cemeteryNameHe` TEXT NOT NULL , `cemeteryNameEn` TEXT NOT NULL , `nationalInsuranceCode` TEXT NOT NULL ,
//              `cemeteryCode` TEXT NOT NULL , `coordinates` TEXT NOT NULL , `address` TEXT NOT NULL , `documents` TEXT NOT NULL ,
//              `createDate` TEXT NOT NULL , `inactiveDate` TEXT NOT NULL , `contactName` VARCHAR(25) NOT NULL ,
//              `contactPhoneName` VARCHAR(20) NOT NULL , `isActive` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

