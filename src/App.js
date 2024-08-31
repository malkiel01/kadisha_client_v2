import React, { createContext, useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { heIL } from '@mui/material/locale'
import RTL from './RTL'; // Make sure the path is correct based on your file structure


// lyouts
import RouterApp from './new_version/routing'
import { useIndexedDB } from './database/dataLocal/useIndexedDB';
import LoadingOverlay from './new_version/pages/pagesMains/LoadingOverlay';
import NotConnected from './new_version/pages/pagesMains/notConnection';

const GlobalContext = createContext()

const theme = createTheme( 
  {
    dir: "rtl",
    typographyTitle: {
      fontSize: '1.5rem',
      color: '#475569',
      backgroundColor: '#E2E8F0',
    },
    direction: 'rtl',
    heIL,

  }
)

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const db = useIndexedDB('myDatabase', 1, 'myStore');

  const [permission, setPermission] = useState(parseInt(localStorage.getItem('permission') || -1))

  const [routerName, setRouterName] = useState([])

  const [loading, setLoading] = useState(false)

  // --- *** --- *** --- *** --- *** --- *** --- *** --- *** --- *** --- *** קבלת טפסים
  const NAME_LOCALSTORAGE_COUNTER = 'counterForm'
  const NAME_LOCALSTORAGE_RECORDS_FORM = 'recordsForm'

  const [counterForms, setCounterForms] = useState(0)
  const [formComponents, setFormComponents] = useState([])

  useEffect(() => {
    let count = localStorage.getItem(NAME_LOCALSTORAGE_COUNTER)
    count && setCounterForms(parseInt(count))
    let form = localStorage.getItem(NAME_LOCALSTORAGE_RECORDS_FORM)
    form && setFormComponents(JSON.parse(form))
  }, [])
  // --- *** --- *** --- *** --- *** --- *** --- *** --- *** --- *** --- *** קבלת בית עלמין

  const [dataCemeteries, setDataCemeteries] = useState([])
  const [dataBlocks, setDataBlocks] = useState([])
  const [dataPlots, setDataPlots] = useState([])
  const [dataAreaGraves, setDataAreaGraves] = useState([])
  const [dataGraves, setDataGraves] = useState([])
  const [dataRows, setDataRows] = useState([])

  const [dataCustomers, setDataCustomers] = useState([])
  const [dataPurchases, setDataPurchases] = useState([])
  const [dataBurials, setDataBurials] = useState([])
  
  const [dataPayments, setDataPayments] = useState([])
  const [dataSignatures, setDataSignatures] = useState([])

  const [dataCities, setDataCities] = useState([])
  const [dataCountries, setDataCountries] = useState([])

  const [breadcrumbs, setBreadcrumbs] = useState([]);


  const [temp, setTemp] = useState([])

  const [title, setTitle] = useState('בתי עלמין');

  useEffect(() => {
    setDataCemeteries(JSON.parse(localStorage.getItem('dataCemeteries')) || [])
    setDataBlocks(JSON.parse(localStorage.getItem('dataBlocks')) || [])
    setDataPlots(JSON.parse(localStorage.getItem('dataPlots')) || [])
    setDataAreaGraves(JSON.parse(localStorage.getItem('dataAreaGraves')) || [])
    setDataRows(JSON.parse(localStorage.getItem('dataRows')) || [])

  }, [])

  // --- *** --- *** --- *** --- *** --- *** --- *** --- *** --- *** --- *** 

  const varibleGlobal = {
    db,
    token, setToken,
    loading, setLoading,
    permission, setPermission,
    counterForms, setCounterForms,
    formComponents, setFormComponents,
    routerName, setRouterName,

    dataCemeteries, setDataCemeteries,
    dataBlocks, setDataBlocks,
    dataPlots, setDataPlots,
    dataAreaGraves, setDataAreaGraves,
    dataGraves, setDataGraves,
    dataRows, setDataRows,
    dataCustomers, setDataCustomers,

    dataPurchases, setDataPurchases,
    dataBurials, setDataBurials,

    dataPayments, setDataPayments,
    dataSignatures, setDataSignatures,
    dataCities, setDataCities,
    dataCountries, setDataCountries,

    breadcrumbs, setBreadcrumbs,
    title, setTitle,

    temp, setTemp,
  }

  // setPermission(1)


  return (
    <RTL>
      <GlobalContext.Provider value={varibleGlobal}>
        <ThemeProvider theme={theme}>
          {db ?
          permission !== 10 ?
          <RouterApp /> 
          : <NotConnected />
           : <LoadingOverlay />}
        </ThemeProvider>
      </GlobalContext.Provider>
    </RTL>
  )
}

export default App;
export {
  GlobalContext
}