import { createSlice } from '@reduxjs/toolkit';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TimerIcon from '@mui/icons-material/Timer';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

// Slice עבור התפריט
export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    NAME_APP: 'חברה קדישא',
    NAME_CATEGORY_GRAVES: 'ניהול קברים',
    NAME_CATEGORY_CUSTOMERS: 'ניהול לקוחות',
    NAME_CATEGORY_PYTMENTS: 'ניהול מחירים',
    NAME_CATEGORY_REPORTS: 'ניהול דוחות',
    NAME_CEMETERY: 'בתי עלמין',
    NAME_BLOCK: 'גושים',
    NAME_PLOT: 'חלקות',
    NAME_AREA_GRAVE: 'אחוזות קבר',
    NAME_CUSTOMER: 'לקוחות',
    NAME_PURCHASE: 'רכישות',
    NAME_BURIAL: 'קבורות',
    NAME_PAYMENT: 'מחירים',
    NAME_REPORTS: 'דוחות',
    categories: [
      {
        id: 'ניהול קברים',
        children: [
          { id: 'בתי עלמין', icon: <PeopleIcon />, navigator: 'cemetery', active: true },
          { id: 'גושים', icon: <DnsRoundedIcon />, navigator: 'block', },
          { id: 'חלקות', icon: <PermMediaOutlinedIcon />, navigator: 'plot', },
          { id: 'אחוזות קבר', icon: <PublicIcon />, navigator: 'areaGrave', },
        ],
      },
      {
        id: 'ניהול לקוחות',
        children: [
          { id: 'לקוחות', icon: <PeopleIcon />, navigator: 'customer', active: true },
          { id: 'רכישות', icon: <DnsRoundedIcon />, navigator: 'purchase', },
          { id: 'קבורות', icon: <PermMediaOutlinedIcon />, navigator: 'burial', },
        ],
      },
      {
        id: 'ניהול מחירים',
        children: [
          { id: 'מחירים', icon: <PeopleIcon />, navigator: 'payment', active: true },
        ],
      },
      {
        id: 'ניהול דוחות',
        children: [
          { id: 'דוחות', icon: <PeopleIcon />, navigator: 'reports', active: true },
        ],
      },
      {
        id: 'Quality',
        children: [
      //     { id: 'home', icon: <SettingsIcon />, navigator: 'home', },
      //     { id: 'grave', icon: <SettingsIcon />, navigator: 'grave', },
      //     { id: 'row', icon: <SettingsIcon />, navigator: 'row', },
      //     { id: 'floorCreateCreate', icon: <SettingsIcon />, navigator: 'floorCreateCreate', },
      //     { id: 'paymentCreate', icon: <SettingsIcon />, navigator: 'paymentCreate', },
          { id: 'countryCreate', icon: <SettingsIcon />, navigator: 'countryCreate', },
          { id: 'cityCreate', icon: <SettingsIcon />, navigator: 'cityCreate', },
      //     { id: 'purchaseCreate', icon: <SettingsIcon />, navigator: 'purchaseCreate', },
      //     { id: 'cemeteryCreate', icon: <SettingsIcon />, navigator: 'cemeteryCreate', },
      //     { id: 'portfolioCreate', icon: <SettingsIcon />, navigator: 'portfolioCreate', },
      //     { id: 'blockCreate', icon: <SettingsIcon />, navigator: 'blockCreate', },
      //     { id: 'plotCreate', icon: <SettingsIcon />, navigator: 'plotCreate', },
      //     { id: 'rowCreate', icon: <SettingsIcon />, navigator: 'rowCreate', },
      //     { id: 'graveCreate', icon: <SettingsIcon />, navigator: 'graveCreate', },
      //     { id: 'customer', icon: <AssignmentIndIcon />, navigator: 'customer', },
      //     { id: 'Performance', icon: <TimerIcon />, navigator: 'not_found', },
      //     { id: 'Test Lab', icon: <PhonelinkSetupIcon />, navigator: 'not_found', },
        ],
      },
    ],
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setActiveRoute(state, action) {
      const { categoryId, childId } = action.payload;
      state.categories = state.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            children: category.children.map(child => ({
              ...child,
              active: child.id === childId,
            })),
          };
        }
        return category;
      });
    },
  },
});

export const { setCategories, setActiveRoute } = menuSlice.actions;
export default menuSlice.reducer;


