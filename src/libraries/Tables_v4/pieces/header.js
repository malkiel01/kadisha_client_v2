import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TableFooter, Select, MenuItem } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TableFooter, Select, MenuItem } from '@material-ui/core'
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles'
import { GlobalContextTable } from '../TemplateTable';
import ColumnTable from '../layoutsTable/ColumnTable';

const Header = () => {
    const {
        data, columns,
        selectedRows, setSelectedRows,
        tableRef,
        classes,

    } = useContext(GlobalContextTable)

    // מפעיל סלקט על כולם
    const handleSelectAllClickChecboxs = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.id); // שנה את 'name' ל'id' או לשם התכונה הנכונה
            setSelectedRows(newSelecteds);
            return;
        }
        setSelectedRows([]);
    }

    const handleCheckboxFocusHeader = () => {
        const handleTabPress = (event) => {
            if (event.key === 'Tab') {
                setTimeout(() => {
                    const nextElement = document.activeElement

                    let parentRow = nextElement
                    while (parentRow && parentRow?.nodeName !== 'TR') {
                        parentRow = parentRow?.parentNode
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
                    else if (nextNodeName === 'THEAD' || nextNodeName === 'TFOOT') {
                        if (parentRow && parentRow.contains(nextElement)) {
                            // הסרת הקלאס 'activeRow' מכל השורות האחרות
                            const rows = tableRef.current.getElementsByTagName('tr')

                            for (let row of rows) {
                                row.classList.remove(classes.activeRow);
                            }
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
        }
    }

    // return (<>4</>)

    return (
        <TableHead style={{ fontSize: '27px' }}>
            <TableRow
                tabIndex={-1}>
                <TableCell padding="checkbox" xs={{ width: 0 }}>
                    <Checkbox
                        className={classes.checkbox}
                        onClick={handleSelectAllClickChecboxs}
                        // בודק אם סימון צ׳קבוקס מלא
                        checked={selectedRows.length === data.length}
                        // סימון חלקי בצ׳קבוקס
                        indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                        onFocus={(event) => handleCheckboxFocusHeader(event)}
                    />
                </TableCell>
                {columns.filter(column => column.show).map((column, index) => (       
                    <ColumnTable key={index} column={column}/>
                    // <TableCell key={column.id} style={{ minWidth: column?.width, maxWidth: column?.width, border: '1px solid red' }}>
                    //     <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                    //         <span style={{ border: '1px solid red', minWidth: '10px', justifySelf: 'start' }}></span>
                    //         <span style={{
                    //             justifySelf: 'center',
                    //             overflow: 'hidden',
                    //             whiteSpace: 'nowrap',
                    //             textOverflow: 'ellipsis',
                    //             maxWidth: '100%' // או רוחב מקסימלי אחר שתרצה להגדיר
                    //         }}>
                    //             {column.headerName}
                    //         </span>
                    //         <span style={{ border: '1px solid red', minWidth: 30, position: 'relative', justifySelf: 'end',  left: -8 }}>
                    //             <span style={{ border: '1px solid blue', minWidth: 17, minHeight: 70, position: 'absolute', top: -20, left: -18}}></span>
                    //         </span>
                    //     </div>
                    // </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default Header;
