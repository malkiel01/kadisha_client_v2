import React, { useContext, useEffect, useState } from 'react';
import { TemplateContext } from '../../pages/pagesMains/GravesManagers/Graves';

import AppBar from '@mui/material/AppBar'
import Paper from '@mui/material/Paper'
import { Outlet, useLocation } from 'react-router-dom'
import CustomGrid from '../../pages/pagesTesting/CustomGrid';
import { Box } from '@mui/material';

const General = () => {
  const { totalWidthContainer } = useContext(TemplateContext)

  const location = useLocation();
  const [settings, setSettings] = useState(null);

  const handleSettingeComponent = (path) => {
    let arr = [
      { name: 'cemetery', title: false, search: true, group: true, breadcrumbs: true, btnCreate: true, refresh: true },
      { name: 'block', title: true, search: true, group: true, breadcrumbs: true, btnCreate: true, refresh: true },
      { name: 'plot', title: true, search: true, group: true, breadcrumbs: true, btnCreate: true, refresh: true },
      { name: 'areaGrave', title: true, search: true, group: true, breadcrumbs: true, btnCreate: true, refresh: true },
      { name: 'customer', title: true, search: true, group: true, breadcrumbs: true, btnCreate: true, refresh: true },
      { name: 'payment', title: false, search: true, group: true, breadcrumbs: true, btnCreate: true, refresh: true },
    ];

    // חיפוש האובייקט במערך שמתאים ל-path
    const index = arr.findIndex(item => item.name === path[0])

    if (index !== -1) { // אם האיבר נמצא
      // חישוב האינדקס של האיבר המבוקש לפי ה-length
      const targetIndex = index + path?.length - 1;
      // מאתר אם אני בדף יצירת רשומה
      const result = arr.find(item => item.name + 'Create' === path[path?.length - 1])

      // בדיקה אם האינדקס נמצא בטווח של המערך
      if (targetIndex < arr.length && !result) {

        setSettings(arr[targetIndex]); // עדכון ה-temp עם ה-label של האיבר המבוקש
        return arr[targetIndex]; // החזרת ה-label
      } else {
        setSettings(null); // עדכון ה-temp כאשר אין איבר
        return null; // החזרת null אם האיבר מחוץ לטווח
      }
    } else {
      setSettings(null); // עדכון ה-temp כאשר ה-path לא נמצא
      return null; // החזרת null אם ה-path לא נמצא
    }
  }


  useEffect(() => {
    const tempPath = location.pathname.split('/').filter(Boolean);

    // console.log(
      handleSettingeComponent(tempPath)
    // );

  }, [location]);




  return (
    <Box sx={{ maxWidth: totalWidthContainer, margin: 'auto', overflow: 'hidden' }}>
      {
        settings && 
        <CustomGrid 
        search={settings?.search} 
        breadcrumbs={settings?.breadcrumbs}
        group={settings?.group}
        btnCreate={settings?.btnCreate}
        refresh={settings?.refresh}
         />
      }
      <Paper sx={{ maxWidth: totalWidthContainer, margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          {
        settings && settings?.title &&
          <AppBar
            position="static"
            elevation={0}
            sx={{ height: 50, backgroundColor: '#F9FAFC' }}
          >
          </AppBar>
      }
        </AppBar>
        <div sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          <Outlet />
        </div>
      </Paper>
    </Box>
  );
}

export default General;
