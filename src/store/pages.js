import { createSlice } from '@reduxjs/toolkit';

export const dataPagesSlice = createSlice({
  name: 'pages',
  initialState: { data: [
    {id:0, path: 'graves', label: 'ניהול קברים' },
    {id:1, path: 'reports', label: 'דוחות' },
    {id:2, path: 'definitions', label: 'הגדרות' },
    {id:2, path: 'test', label: 'טסטים' },
  ] },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
})

export const dataPagesNavSideSlice = createSlice({
    name: 'navSide',
    initialState: { data: [
      {id:0, page: 'graves' , box: 0, path: 'cemetery', label: 'בתי עלמין' },
      {id:1, page: 'graves' , box: 0, path: 'block', label: 'גושים' },
      {id:2, page: 'graves' , box: 0, path: 'plot', label: 'חלקות' },
      {id:3, page: 'graves' , box: 1, path: '/customers', label: 'לקוחות' },
      {id:4, page: 'graves' , box: 1, path: '/purchases', label: 'רכישות' },
      {id:5, page: 'graves' , box: 1, path: '/burials', label: 'קבורות' },
      {id:6, page: 'reports' , box: 0, path: '/path0', label: 'path0' },
      {id:7, page: 'reports' , box: 0, path: '/path1', label: 'path1' },
      {id:8, page: 'reports' , box: 0, path: '/path3', label: 'path' },
    ] },
    reducers: {
      setData(state, action) {
        state.data = action.payload;
      },
    },
  })

  export const dataPagesActions = dataPagesSlice.actions
  export const dataPagesNavSideActions = dataPagesNavSideSlice.actions
