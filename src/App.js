import React, { createContext, useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { heIL } from '@mui/material/locale';

// lyouts
import RouterApp from './routing'

const GlobalContext = createContext()

const theme = createTheme({
  bady: {
    position: 'fixed',
    height: '100vh', // 100% של גובה המסך (viewport height)
    width: '100vw',  // 100% של רוחב המסך (viewport width)
    color: 'green'
  },
  typography: {
    fontSize: 26, // גודל הפונט הכללי של האפליקציה
  },
  typographyTitle: {
    fontSize: '1.5rem',
    color: '#475569',
    backgroundColor: '#E2E8F0',
},
paragraph: {
  fontSize: '1.1rem',
},
  direction: 'rtl',
  heIL,
  
})

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [permission, setPermission] = useState(localStorage.getItem('permission')) 
  
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
  const [nameCemeteries, setNameCemeteries] = useState([])

  const [dataBlocks, setDataBlocks] = useState([])
  const [nameBlocks, setNameBlocks] = useState([])

  const [dataPlots, setDataPlots] = useState([])
  const [namePlots, setNamePlots] = useState([])

  const [dataAreaGraves, setDataAreaGraves] = useState([])
  const [nameAreaGraves, setNameAreaGraves] = useState([])

  useEffect(() => {
    let dataCemeteries = localStorage.getItem('dataCemeteries')
    setDataCemeteries(JSON.parse(dataCemeteries) || [])

    let dataBlocks = localStorage.getItem('dataBlocks')
    setDataBlocks(JSON.parse(dataBlocks) || [])

    let dataPlots = localStorage.getItem('dataPlots')
    setDataPlots(JSON.parse(dataPlots) || [])

    let dataAreaGraves = localStorage.getItem('dataAreaGraves')
    setDataAreaGraves(JSON.parse(dataAreaGraves) || [])
  }, [])

  // --- *** --- *** --- *** --- *** --- *** --- *** --- *** --- *** --- *** 

  // burialGround

  const varibleGlobal = { 
                token, setToken,
                loading, setLoading,
                permission, setPermission,
                counterForms, setCounterForms,
                formComponents, setFormComponents,
                routerName, setRouterName,
                
                dataCemeteries, setDataCemeteries,
                nameCemeteries, setNameCemeteries,

                dataBlocks, setDataBlocks,
                nameBlocks, setNameBlocks,

                dataPlots, setDataPlots,
                namePlots, setNamePlots,

                dataAreaGraves, setDataAreaGraves,
                nameAreaGraves, setNameAreaGraves,
              }


  return (
    <GlobalContext.Provider value={varibleGlobal}>
      <ThemeProvider theme={theme}>
          <RouterApp/>
      </ThemeProvider>
    </GlobalContext.Provider>
  )
}

export default App;
export {
  GlobalContext
}