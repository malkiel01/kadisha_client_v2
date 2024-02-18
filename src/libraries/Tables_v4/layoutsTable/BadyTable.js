import React, { useContext } from 'react'

import { TableBody } from '@material-ui/core'
import { GlobalContextTable } from '../TemplateTable'
import EmptyTable from './EmptyTable'
import RowTable from './RowTable'

const BadyTable = () => {
  const { data } = useContext(GlobalContextTable)

  return ( 
    <TableBody onContextMenu={(event) => {event.preventDefault()}} >
      {
        data.length ? 
        <RowTable /> 
        : 
        <EmptyTable/>
      }
    </TableBody>
  )  
}
  
export default BadyTable


  
  
  
  
  