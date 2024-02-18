import React, { useContext } from 'react'
import ColumnTable from "./ColumnTable"

import { GlobalContextTable } from '../TemplateTable'
import CheckboxTable from '../plaginTable/CheckboxTable'
// import { TableCell, TableHead, TableRow } from '@material-ui/core'
import { useTheme } from '@mui/styles'
import { TableCell, TableHead, TableRow } from '@mui/material'
// import { useTheme } from '@mui/material'



const HeaderTable = () => {
    const { columns, disableSelectionOnClick } = useContext(GlobalContextTable)


    const theme = useTheme()   


    // style={{
    //     display: 'flex',
    //   position: 'sticky',
    //   top: 0,
    // //   backgroundColor: '#ffffff',
    //   borderBottom: '1px solid #ccc',
    //   zIndex: 2000
    // }}

    return (
        <TableHead >
            <TableRow style={{ position: 'sticky', top: 0, zIndex: 10000}}>
                <TableCell style={{ borderRadius: '0 14px 0 0', backgroundColor: theme?.titleTable?.backgroundColor}} />
                {disableSelectionOnClick || <CheckboxTable/>}
                {columns.map((column, index) => {
                        return <ColumnTable key={index} column={column}/>
                    })}
                    <TableCell style={{borderRadius: '14px 0 0 0', backgroundColor: theme?.titleTable?.backgroundColor}} />

            </TableRow>
        </TableHead>
    )
}

export default HeaderTable;
