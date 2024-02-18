import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root'))

const theme = createTheme({
  typography: {
    fontSize: 26, // גודל הפונט הכללי של האפליקציה
    color: 'red'
  },
   palette: {
    primary: {
      main: '#1976D2', // צבע כחול מטריאל
    },
  },
  header: {
    backgroundColor: '#1976D2',
    fontSize:26,
    color: 'white',
    fontWeight: 'bold',
    color: 'red',
  }
})


root.render(
  <Provider store={store}>
     <ThemeProvider theme={theme}>
        < App/> 
    </ThemeProvider>
</Provider>
)
