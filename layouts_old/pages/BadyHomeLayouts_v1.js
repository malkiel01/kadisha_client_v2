// import React, { useEffect, useContext, useState } from 'react';
// import { NavLink, Outlet, useLocation } from 'react-router-dom'

// import AppBar from '@mui/material/AppBar'
// import CssBaseline from '@mui/material/CssBaseline'
// import Toolbar from '@mui/material/Toolbar'
// import Button from '@mui/material/Button'
// import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'

// import Hamburger from '../../libraries/navbar_v1/plaginNavbar/hamburger'
// import Logo from '../../libraries/navbar_v1/plaginNavbar/logo'
// import SearchApp from '../../libraries/navbar_v1/plaginNavbar/search'
// import Notification from '../../libraries/navbar_v1/plaginNavbar/notification'
// import Mail from '../../libraries/navbar_v1/plaginNavbar/mail'
// import User from '../../libraries/navbar_v1/plaginNavbar/user'

// import NavSide from '../../libraries/navbar_v1/plaginNavbar/navSide'

// import { useSelector } from 'react-redux'

// const BadyHomeLayouts = () => {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const dataNavbar = useSelector((state) => state.dataPages.data)

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   }

//   return (
//     <>
//     <Box sx={{ display: 'flex', ml: 1, flexDirection: 'column', height: '100vh' }} dir="rtl">
      
//         <CssBaseline /> 
//       <AppBar component="nav" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ml: 1, dir: 'rtl', padding: 2 }}>
//             <Toolbar sx={{ ml: 1 , dir: 'rtl'}}>
     
//                 {/* אייקון תפריט אמבורגר */}
//                 <Hamburger data={dataNavbar} handleDrawerToggle={handleDrawerToggle} />

//                 {/* לוגו */}
//                 <Logo/>

//                {/* לא ידוע */}
//                 <Box sx={{ flexGrow: 1 }} />
                
//                 {/* תפריט בנב בר העליון */}
//                 {/* <NavigationBarMenu/> */}
               

//                {/* ----------------------------------------------------------------------------------------------------------------------- */}
//                <Typography
//                   variant="h6"
//                   component="div"
//                   sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' },
//                           textAlign: 'right', // שנה את הכיוון לימין
//                   }}
//                   >
//                       {dataNavbar.map((item, index) => {
//                         return (
//                             <Button key={index} sx={{ color: '#ffffff', ml: 1 }} onClick={() => localStorage.setItem('idPage',item.id)}> 
//                               <NavLink key={index} to={item.path} style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}>
//                                   {item.label}
//                               </NavLink>
//                             </Button>
//                           )
//                         }
//                       )}
//                   </Typography>
//                {/* ----------------------------------------------------------------------------------------------------------------------- */}


//                 {/* חיפוש */}
//                 <SearchApp width={250} value={console.log}></SearchApp>

//                 {/* אייקונים ופרופיל */}
//                 <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//                     <Mail/>
//                     <Notification/>
//                 </Box>

//                 {/* אייקון יוזר */}
//                 <User/>
//             </Toolbar>

//             {/* תפריט אמבורגר */}
//             <NavSide data={dataNavbar} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} window={undefined} />
//         </AppBar>
//         <Toolbar style={{padding: 60}}/>
//         <Outlet/>
//       </Box>
//     </>
//   );
// }

// export default BadyHomeLayouts;
