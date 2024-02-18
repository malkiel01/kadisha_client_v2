import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TableFooter, Select, MenuItem } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TableFooter, Select, MenuItem } from '@material-ui/core'
import { makeStyles, ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles'
import { GlobalContextTable } from '../TemplateTable'

const Content = () => {
    const {
        data,
        columns,
        selectedRows, setSelectedRows,
        clickSelectedRows,
        rowsPerPage,
        tableRef,
        classes,

    } = useContext(GlobalContextTable)
    const theme = useTheme()
    // שומר אלמנטים
    const rowsRef = useRef([])
    // מפעיל סלקט אישי
    const [focusedRowId, setFocusedRowId] = useState(null);

    // בודק אם הערך קיים ברשימת ערכי הצ׳קבוקס 
    const isSelectedCheckbox = (name) => selectedRows.indexOf(name) !== -1

    // מפעיל סלקט אישי
    const handleSelectClickCheckbox = (event, name) => {
        const selectedIndex = selectedRows.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1),
            );
        }
        setSelectedRows(newSelected)
    }

    const handleCheckboxFocus = (event) => {
        const row = event.currentTarget.closest('tr');
        const isNotHeaderOrFooter = !row.classList.contains('MuiTableRow-head') &&
            !row.classList.contains('MuiTableRow-footer');

        if (isNotHeaderOrFooter) {
            const handleTabPress = (event) => {
                if (event.key === 'Tab') {
                    setTimeout(() => {
                        const nextElement = document.activeElement

                        let parentRow = nextElement
                        while (parentRow && parentRow.nodeName !== 'TR') {
                            parentRow = parentRow.parentNode
                        }

                        let nextNodeName = parentRow?.parentNode?.nodeName
                        if (nextNodeName === 'TBODY') {

                            if (parentRow && parentRow.contains(nextElement)) {
                                // הסרת הקלאס 'activeRow' מכל השורות האחרות
                                const rows = tableRef.current.getElementsByTagName('tr')

                                for (let row of rows) {
                                    row.classList.remove(classes.activeRow);
                                }

                                // הוספת הקלאס 'activeRow' לשורה הנוכחית
                                parentRow.classList.add(classes.activeRow);
                            }
                        }

                    }, 0);
                }
            };

            const table = tableRef.current;
            if (table) {
                table.addEventListener('keydown', handleTabPress);
            }

            return () => {
                if (table) {
                    table.removeEventListener('keydown', handleTabPress);
                }
            };
        };
    }

    const handleCheckboxBlur = () => {
        setFocusedRowId(null);
    }

    const handleRowClick = (id) => {
        const selectedIndex = selectedRows.indexOf(id)
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex >= 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1),
            );
        }
        setSelectedRows(newSelected)
    }

    const getSelectedRowsData = () => data.filter(row => selectedRows.includes(row.id));


    const handleRowDoubleClick = (id) => {
        const selectedIndex = selectedRows.indexOf(id)
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex >= 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1),
            );
        }

        setSelectedRows(newSelected)
        // יצירת מערך של אובייקטים מתוך הנתונים עבור ה-ID שנבחרו
        const selectedData = data.filter(row => newSelected.includes(row.id));
        clickSelectedRows(selectedData)
        
    }

    return (
        <TableBody>
            {data
                .slice(0, rowsPerPage) // Take only the number of rows specified by rowsPerPage
                .map((row, index) => (
                    <TableRow
                        key={index}
                        tabIndex={-1}
                        className={`${classes.focusedRow} ${focusedRowId === row.id ? classes.focusedCheckboxRow : ''}`}
                        ref={el => rowsRef.current[index] = el}
                        // מגדיר כסלקט את כל הרשומים במערך
                        selected={selectedRows.includes(row.id)}
                        onClick={() => handleRowClick(row.id)}
                        onDoubleClick={() => handleRowDoubleClick(row.id)}
                    >
                        <TableCell padding="checkbox" style={{ width: 0 }}>
                            <Checkbox
                                className={classes.checkbox}
                                // style={{width: 0}}
                                checked={isSelectedCheckbox(row.id)}
                                onClick={(event) => handleSelectClickCheckbox(event, row.id)}
                                onFocus={(event) => handleCheckboxFocus(event, row.id)}
                                onBlur={handleCheckboxBlur}
                            />
                        </TableCell>
                        {columns.filter(column => column.show).map((column) => (
                            <TableCell key={column.id} style={column.id === 6 ? theme?.fontSmall : undefined}>
                                {row[column.field]}
                            </TableCell>
                        ))}
                        {/* <TableCell>{row.col1}</TableCell> */}
                        {/* <TableCell style={theme?.fontSmall}>{row.col2}</TableCell>
                        <TableCell>{row.col3}</TableCell>
                        <TableCell>{row.col4}</TableCell> */}
                    </TableRow>
                ))}
        </TableBody>
    );
}

export default Content;
