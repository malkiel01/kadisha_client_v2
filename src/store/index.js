import { configureStore } from '@reduxjs/toolkit';
import { dataCemeteriesSlice, columnsTableCemeteriesSlice, columnsPropertiesCemeteriesSlice, columnsFormCemeteriesSlice, categoryCemeteriesSlice } from './cemeteries'
import { dataBlocksSlice, columnsTableBlocksSlice, columnsPropertiesBlocksSlice, columnsFormBlocksSlice, categoryBlocksSlice } from './blocks'
import { dataPlotsSlice, columnsTablePlotsSlice, columnsPropertiesPlotsSlice, columnsFormPlotsSlice, categoryPlotsSlice } from './plots'
import { dataRowsSlice, columnsTableRowsSlice, columnsFormRowsSlice, categoryRowsSlice } from './rows'
import { dataReportsSlice, columnsFormReportsSlice, categoryReportsSlice } from './reports'
import { dataAreaGraveSlice, columnsTableAreaGraveSlice, columnsPropertiesAreaGraveSlice, columnsFormAreaGraveSlice, categoryAreaGraveSlice } from './areaGrave'
import { dataGravesSlice, columnsTableGravesSlice, columnsFormGravesSlice, categoryGravesSlice } from './graves'

import { dataCustomersSlice, columnsTableCustomersSlice, columnsFormCustomersSlice, categoryCustomersSlice } from './customers'
import { dataPurchasesSlice, columnsTablePurchasesSlice, columnsPropertiesPurchasesSlice, columnsFormPurchasesSlice, categoryPurchasesSlice } from './purchases'
import { dataBurialsSlice, columnsTableBurialsSlice, columnsPropertiesBurialsSlice, columnsFormBurialsSlice, categoryBurialsSlice } from './burials'
import { categoryPaymentsSlice, columnsTablePaymentsSlice, columnsFormPaymentsSlice, dataPaymentsSlice } from './payments';
import { dataCountriesSlice, columnsTableCountriesSlice, columnsFormCountriesSlice, categoryCountriesSlice } from './countries'
import { dataCitiesSlice, columnsTableCitiesSlice, columnsFormCitiesSlice, categoryCitiesSlice } from './cities'
import { dataPagesSlice, dataPagesNavSideSlice } from './pages'
import { dataOptionsFieldsHeSlice } from './optionsFieldsHe'
import menuReducer from './navBarSide'; // עדכן את הנתיב לפי הצורך

import { columnsFormPurchasesPer2Slice } from './permmision2/purchasesPer2'


const store = configureStore({
  reducer: {
    dataPages: dataPagesSlice.reducer,
    dataPagesNavSide: dataPagesNavSideSlice.reducer,
    dataOptionsFieldsHe: dataOptionsFieldsHeSlice.reducer,

    dataCemeteries: dataCemeteriesSlice.reducer,
    columnsTableCemeteries: columnsTableCemeteriesSlice.reducer,
    columnsPropertiesCemeteries: columnsPropertiesCemeteriesSlice.reducer,
    columnsFormCemeteries: columnsFormCemeteriesSlice.reducer,
    categoryCemeteries: categoryCemeteriesSlice.reducer,

    dataBlocks: dataBlocksSlice.reducer,
    columnsTableBlocks: columnsTableBlocksSlice.reducer,
    columnsPropertiesBlocks: columnsPropertiesBlocksSlice.reducer,
    columnsFormBlocks: columnsFormBlocksSlice.reducer,
    categoryBlocks: categoryBlocksSlice.reducer,

    dataPlots: dataPlotsSlice.reducer,
    columnsTablePlots: columnsTablePlotsSlice.reducer,
    columnsPropertiesPlots: columnsPropertiesPlotsSlice.reducer,
    columnsFormPlots: columnsFormPlotsSlice.reducer,
    categoryPlots: categoryPlotsSlice.reducer,

    dataRows: dataRowsSlice.reducer,
    columnsTableRows: columnsTableRowsSlice.reducer,
    columnsFormRows: columnsFormRowsSlice.reducer,
    categoryRows: categoryRowsSlice.reducer,

    dataAreaGraves: dataAreaGraveSlice.reducer,
    columnsTableAreaGraves: columnsTableAreaGraveSlice.reducer,
    columnsPropertiesAreaGraves: columnsPropertiesAreaGraveSlice.reducer,
    columnsFormAreaGraves: columnsFormAreaGraveSlice.reducer,
    categoryAreaGraves: categoryAreaGraveSlice.reducer,

    dataGraves: dataGravesSlice.reducer,
    columnsTableGraves: columnsTableGravesSlice.reducer,
    columnsFormGraves: columnsFormGravesSlice.reducer,
    categoryGraves: categoryGravesSlice.reducer,

    dataCustomers: dataCustomersSlice.reducer,
    columnsTableCustomers: columnsTableCustomersSlice.reducer,
    columnsFormCustomers: columnsFormCustomersSlice.reducer,
    categoryCustomers: categoryCustomersSlice.reducer,

    dataPurchases: dataPurchasesSlice.reducer,
    columnsTablePurchases: columnsTablePurchasesSlice.reducer,
    columnsPropertiesPurchases: columnsPropertiesPurchasesSlice.reducer,
    columnsFormPurchases: columnsFormPurchasesSlice.reducer,
    categoryPurchases: categoryPurchasesSlice.reducer,

    dataBurials: dataBurialsSlice.reducer,
    columnsTableBurials: columnsTableBurialsSlice.reducer,
    columnsPropertiesBurials: columnsPropertiesBurialsSlice.reducer,
    columnsFormBurials: columnsFormBurialsSlice.reducer,
    categoryBurials: categoryBurialsSlice.reducer,

    dataPayments: dataPaymentsSlice.reducer,
    columnsTablePayments: columnsTablePaymentsSlice.reducer,
    columnsFormPayments: columnsFormPaymentsSlice.reducer,
    categoryPayments: categoryPaymentsSlice.reducer,

    dataCountries: dataCountriesSlice.reducer,
    columnsTableCountries: columnsTableCountriesSlice.reducer,
    columnsFormCountries: columnsFormCountriesSlice.reducer,
    categoryCountries: categoryCountriesSlice.reducer,

    dataCities: dataCitiesSlice.reducer,
    columnsTableCities: columnsTableCitiesSlice.reducer,
    columnsFormCities: columnsFormCitiesSlice.reducer,
    categoryCities: categoryCitiesSlice.reducer,

    dataReports: dataReportsSlice.reducer,
    columnsFormReports: columnsFormReportsSlice.reducer,
    categoryReports: categoryReportsSlice.reducer,

    menu: menuReducer,


    // permmision 2
    columnsFormPurchasesPer2: columnsFormPurchasesPer2Slice.reducer,

  },
})

export default store



