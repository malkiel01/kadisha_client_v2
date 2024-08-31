import { createSlice } from '@reduxjs/toolkit';

export const dataOptionsFieldsHeSlice = createSlice({
  name: 'optionsFieldsHe',
  initialState: {
    data: [
      {
        field: 'typeId',
        values: [
          { value: 1, name: 'ת.ז' },
          { value: 2, name: 'דרכון' },
          { value: 3, name: 'אלמוני' }
        ]
      },
      {
        field: 'gender',
        values: [
          { value: 1, name: 'זכר' },
          { value: 2, name: 'נקבה' }
        ]
      },
      {
        field: 'priceDefinition',
        values: [
          { value: 1, name: 'מחיר עלות הקבר' },
          { value: 2, name: 'שירות' },
          { value: 3, name: 'מצבה' },
          { value: 4, name: 'העברת בעלות' },
        ]
      },
      {
        field: 'plotType',
        values: [
          { value: 1, name: 'פטורה' },
          { value: 2, name: 'חריגה' },
          { value: 3, name: 'סגורה' },
        ]
      },
      {
        field: 'association',
        values: [
          { value: 1, name: 'ישראל' },
          { value: 2, name: 'לוי' },
          { value: 3, name: 'כהן' },
        ]
      },
      {
        field: 'graveType',
        values: [
          { value: 1, name: 'שדה' },
          { value: 2, name: 'רוויה' },
          { value: 3, name: 'סנהדרין' },
        ]
      },
      {
        field: 'graveStatus',
        values: [
          { value: 1, name: 'פנוי' },
          { value: 2, name: 'נרכש' },
          { value: 3, name: 'קבור' },
          { value: 4, name: 'שמור' },
        ]
      },
      {
        field: 'resident', 
        values: [
          { value: 1, name: 'תושב ירושלים והסביבה' },
          { value: 2, name: 'תושב ישראל' },
          { value: 3, name: 'תושב חו״ל' },
        ]
      },
      {
        field: 'diesSpouse',
        values: [
          { value: 1, name: 'לא' },
          { value: 2, name: 'כן' },
        ]
      },
      {
        field: 'maritalStatus',
        values: [
          { value: 1, name: 'רווק/ה' },
          { value: 2, name: 'נשוי/אה' },
          { value: 3, name: 'גרוש/ה' },
          { value: 4, name: 'אלמן/ה' }
        ]
      },
      {
        field: 'buyerStatus',
        values: [
          { value: 1, name: 'בחיים' },
          { value: 2, name: 'לאחר פטירה' },
        ]
      },
      {
        field: 'isFuneralPayments',
        values: [
          { value: 1, name: 'לא כולל שירותי לוויה' },
          { value: 2, name: 'כולל שירותי לוויה' },
        ]
      },
      {
        field: 'purchaseStatus',
        values: [
          { value: 1, name: 'פתוח' },
          { value: 2, name: 'שולם' },
          { value: 3, name: 'סגור' },
          { value: 4, name: 'בוטל' },
        ]
      },
      {
        field: 'BookkeepingApproval',
        values: [
          { value: 1, name: 'לא' },
          { value: 2, name: 'כן' },
        ]
      },
      {
        field: 'numOfPayments',
        values: [
          { value: 1, name: '1' },
          { value: 2, name: '2' },
          { value: 3, name: '3' },
          { value: 4, name: '4' },
          { value: 5, name: '5' },
          { value: 6, name: '6' },
        ]
      },
      {
        field: 'isActive',
        values: [
          { value: 1, name: 'פעיל' },
          { value: 2, name: 'לא פעיל' },
        ]
      }
    ]
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const dataOptionsFieldsHeActions = dataOptionsFieldsHeSlice.actions
