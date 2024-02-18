import { configureStore } from '@reduxjs/toolkit';
import { dataCemeteriesSlice, columnsCemeteriesSlice, categoryCemeteriesSlice } from './cemeteries'
import { dataBlocksSlice, columnsBlocksSlice, categoryBlocksSlice } from './blocks'
import { dataPlotsSlice, columnsPlotsSlice, categoryPlotsSlice } from './plots'
import { dataAreaGraveSlice, columnsAreaGraveSlice, categoryAreaGraveSlice } from './areaGrave'
import { dataPagesSlice, dataPagesNavSideSlice } from './pages'

const store = configureStore({
  reducer: {
    dataPages: dataPagesSlice.reducer,
    dataPagesNavSide: dataPagesNavSideSlice.reducer,

    dataCemeteries: dataCemeteriesSlice.reducer,
    columnsCemeteries: columnsCemeteriesSlice.reducer,
    categoryCemeteries: categoryCemeteriesSlice.reducer,

    dataBlocks: dataBlocksSlice.reducer,
    columnsBlocks: columnsBlocksSlice.reducer,
    categoryBlocks: categoryBlocksSlice.reducer,

    dataPlots: dataPlotsSlice.reducer,
    columnsPlots: columnsPlotsSlice.reducer,
    categoryPlots: categoryPlotsSlice.reducer,

    dataAreaGraves: dataAreaGraveSlice.reducer,
    columnsAreaGraves: columnsAreaGraveSlice.reducer,
    categoryAreaGraves: categoryAreaGraveSlice.reducer,
  },
})

export default store



