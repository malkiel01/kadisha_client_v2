import React, { useContext } from 'react'

import { useTheme } from '@mui/system'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ColumnTable from "./ColumnTable"

import { GlobalContextTable } from '../TemplateTable'
import CheckboxTable from '../plaginTable/CheckboxTable'


const HeaderTable = () => {
    const { columns, disableSelectionOnClick } = useContext(GlobalContextTable)

    const theme = useTheme()

    return (<TableHead >
            <TableRow  sx={{ ...theme.header, position: 'sticky', top: 0, zIndex: 1000}}>
            {disableSelectionOnClick || <CheckboxTable/>}
                {columns.map((column, index) => {
                    return <ColumnTable key={index} column={column}/>
                })}
            </TableRow>
        </TableHead>
    );
}

export default HeaderTable;
