// theme.js
import { createTheme } from '@mui/material/styles';

const customTypography = {
  typographyHeader: {
    fontFamily: 'Noto Sans Hebrew, sans-serif', // הגדרת הפונט כ-Noto Sans Hebrew
    fontSize: 46, // גודל הפונט הכללי של הכותרת
    fontOpticalSizing: 'auto', // אופטימיזציה אופטי אוטומטי עבור הפונט
    fontWeight: 600, // משקל הפונט (500 - חצי עבה)
    fontStyle: 'normal', // סגנון הפונט (רגיל)
    fontVariationSettings: '"wdth" 150', // הגדרת רוחב הפונט דרך font-variation-settings
    letterSpacing: '0.06em', // מרווח בין האותיות
  },
};


let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#325567',
      dark: '#006db3',
    },
  },
  customTypography: customTypography,
  CustomNavBarSide: {
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '120px', // גובה גדול יותר לעיגול
      marginBottom: '10px', // ריווח מתחת לעיגול
      marginTop: '20px', // ריווח מעל לעיגול
    },
    logo: {
      width: '110px', // גודל הרוחב של הלוגו (גדול יותר בתוך העיגול)
      height: '110px', // גודל הגובה של הלוגו (גדול יותר בתוך העיגול)
      borderRadius: '50%', // יוצר עיגול
      backgroundColor: '#fff', // רקע לבן ללוגו
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', // טשטוש בקצוות
      objectFit: 'cover', // התאמת התמונה לגבולות העיגול
      padding: '0px', // ריווח פנימי ללוגו
    },
    item: {
      py: 0,
      mx: 2,
      my: 0.3,
      pl: 2,
      color: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '8px', // פינות עגולות
      '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    itemCategory: {
      // boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
      py: 1.5,
      px: 2,
    },
    boxBgColor: {
      bgcolor: '#042F36',
    },
    listItemCategoryTextColor: {
      color: '#fff',
      px: 13,
      py: 1,
    },
    listItemTextColor: {
      color: '#fff',
    },
    navLink: {
      color: '#fff',
      listStyle: 'none',
      textDecoration: 'none',
      '&.active': {
        bgcolor: '#1A4C53',

        // הגדרות נוספות ללינק אקטיבי אם יש צורך
      },
      py: 2,
      px: 3,
    },
    divider: {
      borderWidth: '1px', // שינוי העובי של הקו
      width: 'calc(100% - 10px)', // קביעת הרוחב כך שיתחיל ויסתיים במרחק 5 פיקסלים מההתחלה והסוף
      margin: '0 5px', // ריווח של 5 פיקסלים מכל צד
      borderColor: 'rgba(255, 255, 255, 0.5)', // קביעת הצבע של הקו (לבן בהיר יותר)
    },
    typographyHeader: {
      fontFamily: 'Noto Sans Hebrew, sans-serif', // הגדרת הפונט כ-Noto Sans Hebrew
      fontSize: 46, // גודל הפונט הכללי של הכותרת
      fontOpticalSizing: 'auto', // אופטימיזציה אופטי אוטומטי עבור הפונט
      fontWeight: 600, // משקל הפונט (500 - חצי עבה)
      fontStyle: 'normal', // סגנון הפונט (רגיל)
      fontVariationSettings: '"wdth" 150', // הגדרת רוחב הפונט דרך font-variation-settings
      letterSpacing: '0.06em', // מרווח בין האותיות
    },
    typography: {
      color: '#fff',
      listStyle: 'none',
      textDecoration: 'none',

      fontFamily: 'Noto Sans Hebrew, sans-serif', // הגדרת הפונט כ-Noto Sans Hebrew
      fontSize: '20px', // גודל הפונט הכללי של הכותרת
      '&.active': {
        bgcolor: '#1A4C53',
        fontOpticalSizing: 'auto', // אופטימיזציה אופטי אוטומטי עבור הפונט
        fontWeight: 600, // משקל הפונט (500 - חצי עבה)
        fontStyle: 'normal', // סגנון הפונט (רגיל)
        fontVariationSettings: '"wdth" 50', // הגדרת רוחב הפונט דרך font-variation-settings
        letterSpacing: '0.06em', // מרווח בין האותיות

        // הגדרות נוספות ללינק אקטיבי אם יש צורך
      },
    },
    typographyCategory: {
      fontFamily: 'Noto Sans Hebrew, sans-serif', // הגדרת הפונט כ-Noto Sans Hebrew
      fontSize: 20, // גודל הפונט עבור הקטגוריות
      fontWeight: 500, // משקל הפונט (500 - חצי עבה)
      color: '#ffffff', // צבע הטקסט של הקטגוריות
      padding: '10px 20px', // ריווח פנימי (padding) עבור פריטי הקטגוריה
    },
  },
  CustomHeader: {
    elevation: 0,
    component: 'div',
    appBar1: {
      color: 'primary',
      position: 'sticky',
    },
    appBar2: {
      bgcolor: 'primary.main',
      position: 'static',
      zIndex: 0,
      color: theme => theme.palette.primary.contrastText,
    },
    toolbar: {
      container: {
        spacing: 1,
        alignItems: 'center',
      },
    },
    palette: {
      primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
    },
  },
  typography: {
    fontFamily: 'Noto Sans Hebrew, sans-serif', // הגדרת הפונט כ-Noto Sans Hebrew   
    fontSize: 20, // גודל הפונט הכללי של הכותרת
    allVariants: {
      fontOpticalSizing: 'auto',
      fontVariationSettings: '"wdth" 80',
      fontStyle: 'normal',
    },
  },
  shape: {
    borderRadius: 8,
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#042F36',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#ffffff', // צבע הטקסט של הכפתור
          backgroundColor: '#99C01C', // צבע הרקע של הכפתור
          '&:hover': {
            backgroundColor: '#87AC18', // צבע רקע כהה יותר לריחוף מעל הכפתור
          },
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          // fontSize: 14,
          // fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
}

export default theme;
