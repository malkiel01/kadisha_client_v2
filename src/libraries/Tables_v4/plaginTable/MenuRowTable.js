
import React from 'react'
import {  Menu, MenuItem } from '@mui/material'

const MenuRowTable = ({
    value = {id: 2},
    items = [],
    anchorEl,
    menuPosition  = {},
    menuHandle,
    handleMenuClose
}) => { 

    
    return (
        <Menu id={`row-menu-${value.id}`} 

        style={{ left: menuPosition.left, top: menuPosition.top}}
            anchorEl={anchorEl} 
            open={menuHandle === value.id} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>{value.id}</MenuItem>
            {items.map((item, index) => (
                <MenuItem 
                    key={index} 
                    onClick={(event) => {
                        handleMenuClose()
                        item.value(event, value)
                    }} 
                 >{item.name}</MenuItem>
            ))}
        </Menu>
    );
  }
  
  export default MenuRowTable;
  