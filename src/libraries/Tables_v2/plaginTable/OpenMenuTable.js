
import React, { Fragment, useEffect, useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'

const OpenMenuTable = ({
    value = {id: 2},
    anchorEl,
    items = [],
    menuPosition  = {},
    menuHandle,
    handleMenuClose
}) => {

    useEffect(() => {
        // console.log((menuHandle === value.id) && (value.id !== undefined))
        // console.log(value.id)
    }, [anchorEl, menuHandle, value]);
        
    
    return (
        <Menu id={`row-menu-${value.id}`} 

        style={{ left: menuPosition.left, top: menuPosition.top}}
            anchorEl={anchorEl} 
            open={menuHandle === value.id} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>{value.id}</MenuItem>
            <MenuItem onClick={handleMenuClose}>{JSON.stringify(value)}</MenuItem>
            {/* {items.map((item, index) => {
                <MenuItem key={index} onClick={handleMenuClose} value={item.value} >{item.name}</MenuItem>
            })} */}
            {items.map((item, index) => (
                <MenuItem key={index} onClick={handleMenuClose} value={item.value} >{item.name}</MenuItem>
            ))}
        </Menu>
    );
  }
  
  export default OpenMenuTable;
  