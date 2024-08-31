import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
// import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const root = ReactDOM.createRoot(document.getElementById('root'))

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    // fontSize: 26, // גודל הפונט הכללי של האפליקציה
    allVariants: {
      fontOpticalSizing: 'auto',
      fontVariationSettings: '"wdth" 100',
      fontStyle: 'normal',
    },
  },
  palette: {
    primary: {
      main: '#1976D2', // צבע כחול מטריאל
    },
  },
  header: {
    backgroundColor: '#1976D2',
    // fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    color: 'red',
  }
})


root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </Provider>
)
