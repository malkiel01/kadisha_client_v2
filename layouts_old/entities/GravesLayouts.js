// import React from 'react'
// import Box from '@mui/material/Box'
// import Drawer from '@mui/material/Drawer'
// import Toolbar from '@mui/material/Toolbar'
// import ListItem from '@mui/material/ListItem'
// import ListItemButton from '@mui/material/ListItemButton'
// import { useSelector } from 'react-redux'
// import { NavLink, Outlet } from 'react-router-dom';

// const drawerWidth = 340;

// const GravesLayouts = () => {

//     const data = useSelector((state) => state.dataPagesNavSide.data)

//     return (
//         <Box 
//         sx={{ display: 'flex' ,
//             border: 'green 1px solid',
//         }}>
//             <Drawer
//                 variant="permanent"
//                 anchor="right"
//                 sx={{
//                 width: drawerWidth,
//                 flexShrink: 0,
//                 [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//                 }}>
//                 <Toolbar style={{padding: 50}}/>
//                 <Box sx={{ overflow: 'auto' }}>
//                     {data.map((item, index) => (
//                         <React.Fragment key={index}>
//                         <ListItem disablePadding>
//                             <ListItemButton>
//                             <NavLink
//                                 to={item.path}
//                                 style={{
//                                     textDecoration: 'none',
//                                     color: 'black',
//                                     width: '100%',
//                                     minHeight: 100,
//                                     textAlign: 'right',
//                                     display: 'flex',
//                                     alignItems: 'center', // Center vertically
//                                     justifyContent: 'center', // Center horizontally
//                                     fontSize: '2.3rem', // Adjust the font size to your preference
//                                   }}
//                             >
//                                 {item.label}
//                             </NavLink>
//                             </ListItemButton>
//                         </ListItem>
//                         {index < data.length - 1 && (
//                             <Box
//                             sx={{
//                                 borderBottom: '1.2px solid rgba(224, 224, 224, 0.5)', // Adjust the color and alpha value to your preference
//                                 marginX: 5, // Adjust the horizontal margin to your preference
//                                 borderRadius: '0 8px 8px 0', // Adjust the border radius to match the corners
//                               }}/>
//                         )}
//                         </React.Fragment>
//                     ))}
//                 </Box>
//             </Drawer>
//             <Box 
//                 component="main" sx={{ flexGrow: 1, p: 3, 
//                 border: 'green 1px solid'
//             }}>
//                 <Outlet/>
//             </Box>
//         </Box>
//     );
// }

// export default GravesLayouts;
