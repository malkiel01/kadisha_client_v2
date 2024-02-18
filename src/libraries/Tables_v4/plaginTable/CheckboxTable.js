import React, { useEffect, useState, useContext } from 'react'
import { TableCell, Checkbox } from '@material-ui/core'
import { GlobalContextTable } from '../TemplateTable'
import { useTheme } from '@mui/styles'


function CheckboxTable({row = null}) {    
    const {  
        data, 
        checkboxSelection,
        setSelectedRows, selectedRows,
   } = useContext(GlobalContextTable)

   const theme = useTheme() 

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(data.length === selectedRows.length && data.length > 0)
    }, [selectedRows])

    // בחירת שורה
    const handleRowSelect = (rowId) => {
        if (rowId !== null) {
            if (checkboxSelection) {
                if (selectedRows.includes(rowId)) {
                    setSelectedRows(selectedRows.filter((id) => id !== rowId))
                    return selectedRows.filter((id) => id !== rowId)
                  } else {
                    setSelectedRows([...selectedRows, rowId])
                    return [...selectedRows, rowId]
                  }
            } else {
                setSelectedRows([rowId])
                return [rowId]
            }
        } else {
            return selectedRows
        }
        }

    


    return (
        checkboxSelection && <TableCell style={{
                                backgroundColor: row === null ? theme?.titleTable?.backgroundColor : undefined,
                                direction: 'rtl', textAlign: 'right' , padding: 0}}>
                            <Checkbox
                    style={{right: 0, direction: 'rtl', textAlign: 'right' ,
                    color: `${row !== null  ? "primary" : 'default'}`
                }}
                color = {`default`}
                    checked={row === null ? checked : selectedRows.includes(row.id)}
                    onChange={() => {
                        // כפתור לפי שורה
                        if (row !== null) {
                            handleRowSelect(row.id)
                        } 
                        // כפתור כללי
                        else {
                            if (checked) {
                                setSelectedRows([])
                            } else {
                                let items = []
                                data.forEach(row => {
                                    items.push(row.id)
                                })
                                setSelectedRows(items)
                            } 
                            setChecked(!checked) 
                        }
                    }}/>
        </TableCell>
    )
}

export default CheckboxTable