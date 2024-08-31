import React, { createContext, useEffect, useState, useContext } from 'react'
import useQueries from '../../../../database/useQueries'
import { ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Content from '../../../template/Content'
import Header from '../../../template/Header'
import Navigator from '../../../template/Navigator'
import ConnectionBanner from '../ConnectionBanner'
import IconButton from '@mui/material/IconButton'
import theme from '../../../template/theme' // ייבוא הקובץ החדש

const TemplateContext = createContext()

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MBE
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const Graves = () => {
  const [data, setData] = useState(null);

  const { AllDataCemeteries, AllDataBlocks, AllDataPlots, AllDataAreaGraves, AllDataGraves, AllDataRows, AllDataBurials,
    AllDataCustomers, AllDataPurchases, AllDataPayments, AllDataCities, AllDataCountries, AllDataSignatures } = useQueries()
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [currentTab, setCurrentTab] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [totalWidthContainer, setTotalWidthContainer] = useState(1400)
  const [drawerWidth, setDrawerWidth] = useState(256)
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // מצב פתוח/סגור של תפריט הצד

  const [title, setTitle] = useState(null)
  const [nameBtnAdd, setNameBtnAdd] = useState(null)

  const varibleTemplate = {
    data, setData,
    title,
    nameBtnAdd: nameBtnAdd,
    currentTab, setCurrentTab,
    searchText, setSearchText,
    totalWidthContainer,
    drawerWidth,
    totalWidthContainer, setTotalWidthContainer
  }

  useEffect(() => {
    if (!navigator.onLine) {
      localStorage.setItem('connection', JSON.stringify({ msg: 'אין חיבור לאינטרנט', active: true }))
    } else {
      AllDataCemeteries()
      AllDataBlocks()
      AllDataPlots()
      AllDataAreaGraves()
      AllDataGraves()
      AllDataRows()
      AllDataCustomers()
      AllDataPurchases()
      AllDataBurials()
      AllDataPayments()
      AllDataCities()
      AllDataCountries()
      AllDataSignatures()
    }
  }, [navigator.onLine])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const handleDrawerOpenClose = () => {
    setIsDrawerOpen(!isDrawerOpen); // שינוי מצב פתוח/סגור
  }

  return (
    <TemplateContext.Provider value={varibleTemplate}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <CssBaseline />
          {currentTab === 0 && (
            <Box
              component="nav"
              sx={{ width: { sm: isDrawerOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
            >
              {(isSmUp && isDrawerOpen) ? null : (
                <Navigator
                  PaperProps={{ style: { width: drawerWidth } }}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                />
              )}
              <Navigator
                PaperProps={{ style: { width: isDrawerOpen ? drawerWidth : 0 } }} // שינוי הרוחב של ה-Navigator עצמו
                sx={{ display: { sm: 'block', xs: 'none' }, transition: 'width 0.3s ease' }}
              />
              <IconButton
                onClick={handleDrawerOpenClose}
                sx={{
                  position: 'fixed',  // מיקום קבוע יחסית למסך
                  top: '50%',  // אמצע הגובה של המסך
                  left: isDrawerOpen ? `${drawerWidth + 2}px` : '2px',  // מיקום אופקי משתנה לפי מצב התפריט
                  transform: 'translateY(-50%)',
                  zIndex: 1200,
                  width: '16px',
                  height: '140px',
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                  '&::before': {
                    content: "''",
                    width: '2px',
                    height: '70px',
                    backgroundColor: '#333',
                    borderRadius: '1px',
                    position: 'absolute',
                    top: 'calc(50% - 35px)',
                    left: 'calc(50% - 4.5px)',
                  },
                  '&::after': {
                    content: '""',
                    width: '2px',
                    height: '70px',
                    backgroundColor: '#333',
                    borderRadius: '1px',
                    position: 'absolute',
                    top: 'calc(50% - 35px)',
                    right: 'calc(50% - 4.5px)',
                  },
                }}
              >
              </IconButton>

            </Box>
          )}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{
              flex: 1,
              py: 6,
              px: 4, backgroundColor: '#f2f2f2',
              backgroundImage: `url("https://www.transparenttextures.com/patterns/asfalt-dark.png")`,
            }}>
              <Content />
            </Box>
            <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
              <Copyright />
              <ConnectionBanner />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </TemplateContext.Provider>
  );
}

export default Graves
export {
  TemplateContext
}
