import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TableFooter, Select, MenuItem } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TableFooter, Select, MenuItem } from '@material-ui/core'
import { GlobalContextTable } from '../TemplateTable';

const Footer = () => {
    const {  
        data, 
        selectedRows,
        rowsPerPage, setRowsPerPage
   } = useContext(GlobalContextTable)

       // מעדכן את מספר הרשומות שיוצגו בטבלה
       const handleRowsPerPageChange = (event) => {
        setRowsPerPage(event.target.value);
    }
    return (
        <TableFooter>
        <TableRow>
            {/* טקסט המציג את מספר הרשומות הנבחרות */}
            <TableCell colSpan={3} style={{ textAlign: 'right', paddingRight: 90 }}>
                {`${selectedRows.length} מתוך ${data.length} רשומות נבחרו`}
            </TableCell>
            {/* סלקט לבחירת מספר הרשומות */}
            <TableCell style={{ textAlign: 'left' }}>
                <Select
                    value={rowsPerPage}
                    // מעדכן את מספר הרשומות שיוצגו בטבלה
                    onChange={handleRowsPerPageChange}
                >
                    {[5, 10, 15].map((number) => (
                        <MenuItem key={number} value={number}>
                            {number}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
        </TableRow>
    </TableFooter>
    );
}

export default Footer;
