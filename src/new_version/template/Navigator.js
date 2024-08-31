import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navigator(props) {
        const titlesApp = useSelector((state) => state.menu);
        const categories = useSelector((state) => state.menu.categories);
        const theme = useTheme();
        const { ...other } = props;
        const [myCategories, setMyCategories] = useState(categories);

        useEffect(() => {
                const pathnameParts = window.location.pathname.split('/').filter(part => part.trim() !== '');
                const updatedCategories = myCategories.map((category) => {
                        return {
                                ...category,
                                children: category.children.map((child) => {
                                        const isActive = child?.navigator === pathnameParts[0];
                                        if (isActive) {
                                                localStorage.setItem('active_route', JSON.stringify(child?.navigator));
                                        }
                                        return {
                                                ...child,
                                                active: isActive,
                                        };
                                }),
                        };
                });
                setMyCategories(updatedCategories);
        }, []);

        const handleItemClick = (clickedId) => {
                const updatedCategories = myCategories.map((category) => {
                        return {
                                ...category,
                                children: category.children.map((child) => {
                                        const isActive = child.id === clickedId;
                                        isActive && localStorage.setItem('active_route', JSON.stringify(child?.navigator));
                                        return { ...child, active: isActive };
                                }),
                        };
                });

                setMyCategories(updatedCategories);
        };

        return (
                <Drawer variant="permanent" {...other}>
                        <List>
                                {/* <ListItem style={theme?.CustomNavBarSide?.typographyCategory}>
                                        {titlesApp?.NAME_APP}
                                </ListItem> */}
                                <ListItem style={theme?.CustomNavBarSide?.logoContainer}>
                                        <Box
                                                component="img"
                                                src="/logoMini.png"
                                                alt="App Logo"
                                                sx={theme?.CustomNavBarSide?.logo}
                                        />
                                </ListItem>
                                <ListItem sx={{ ...theme?.CustomNavBarSide?.item, ...theme?.CustomNavBarSide?.itemCategory }}>
                                        <ListItemIcon>
                                                <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText style={theme?.CustomNavBarSide?.listItemTextColor}>Project Overview</ListItemText>
                                </ListItem>
                                {myCategories.map(({ id, children }) => (
                                        <Box key={id}
                                                sx={{ ...theme?.CustomNavBarSide?.boxBgColor, ...theme?.CustomNavBarSide?.itemCategory }}
                                        >
                                                <NavLink to="#"
                                                        style={theme?.CustomNavBarSide?.navLink}
                                                >
                                                        <ListItemText
                                                                style={theme?.CustomNavBarSide?.listItemCategoryTextColor}
                                                        >{id}</ListItemText>
                                                </NavLink>

                                                {/* <NavLink style={{ fontSize: '0.7rem' }}>טסט</NavLink> */}
                                                {children.map(({ id: childId, icon, navigator, active }) => (
                                                        <NavLink to={navigator}
                                                                // sx={{ fontSize: '1rem' }}
                                                                style={{
                                                                        ...theme?.CustomNavBarSide?.navLink,
                                                                        ...theme?.CustomNavBarSide?.typography
                                                                        // fontSize: '1rem'
                                                                }}
                                                                key={childId}
                                                        >

                                                                <ListItemButton
                                                                        onClick={() => handleItemClick(childId)}
                                                                        selected={active} sx={theme?.CustomNavBarSide?.item}>
                                                                        <ListItemIcon >{icon}</ListItemIcon>
                                                                        <ListItemText
                                                                                primaryTypographyProps={{
                                                                                        sx: { ...theme?.CustomNavBarSide?.listItemTextColor, ...theme?.CustomNavBarSide?.typography }
                                                                                }}
                                                                        >{childId}
                                                                        </ListItemText>
                                                                </ListItemButton>
                                                        </NavLink>
                                                ))}
                                                <Divider sx={theme?.CustomNavBarSide?.divider} />
                                        </Box>
                                ))}
                        </List>
                </Drawer>
        );
}
