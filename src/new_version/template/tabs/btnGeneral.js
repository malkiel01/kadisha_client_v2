import { Button, Grid } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../App';

const BtnGeneral = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nameBtn, setTemp] = useState(null);
  const [myPermissions, setMyPermissions] = useState([]);
  const [navigationBtn, setNnavigation] = useState(null);

  const { permission } = useContext(GlobalContext);

  const handleBtn = (path) => {
    let arr = [
      { name: 'cemetery', label: 'הוספת בתי עלמין', permission : [1] },
      { name: 'block', label: 'הוספת גוש', permission : [1] },
      { name: 'plot', label: 'הוספת חלקה', permission : [1] },
      { name: 'areaGrave', label: 'הוספת קבר', permission : [1] },
      { name: 'customer', label: 'הוספת לקוח', permission : [1]},
      { name: 'payment', label: 'הוספת מחיר', permission : [1] },
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

        setTemp(arr[targetIndex].label); // עדכון ה-temp עם ה-label של האיבר המבוקש
        setMyPermissions(arr[targetIndex]?.permission || [])
        setNnavigation(arr[targetIndex].name + 'Create'); // הוספת 'Create' לסוף ה-path
        return arr[targetIndex].label; // החזרת ה-label
      } else {
        setTemp(null); // עדכון ה-temp כאשר אין איבר
        return null; // החזרת null אם האיבר מחוץ לטווח
      }
    } else {
      setTemp(null); // עדכון ה-temp כאשר ה-path לא נמצא
      return null; // החזרת null אם ה-path לא נמצא
    }
  }


  useEffect(() => {
    const tempPath = location.pathname.split('/').filter(Boolean);
    handleBtn(tempPath)
  }, [location]);

  const handleNavigation = () => {
    navigate(`${location.pathname}/${navigationBtn}`, {
      state: {...location.state}
    });
  };

  return (
    <React.Fragment >
      <Grid item style={{ marginRight: 0, paddingRight: 0 }}>
        {nameBtn &&
          <Button variant="contained" onClick={handleNavigation} disabled={(permission === 0) ? false : !(myPermissions.includes(permission))}>
            {nameBtn}</Button>
        }
      </Grid>
    </React.Fragment>
  );
}

export default BtnGeneral;
