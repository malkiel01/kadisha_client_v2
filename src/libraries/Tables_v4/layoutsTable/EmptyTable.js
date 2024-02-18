import React, { useContext } from 'react';
import { GlobalContextTable } from '../TemplateTable';
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import CloudOffIcon from '@mui/icons-material/CloudOff'

// לבדוק מה עדיף
import { makeStyles } from '@material-ui/styles'
// import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    focused: {
      border: '10px solid red',
      transition: 'background-color 0.3s',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(214, 246, 255, 0.3)', // רקע כחול חצי-שקוף
        cursor: 'pointer',
        border: '3px solid rgba(0, 0, 255, 0.2)', // שינוי צבע הבורדר לכחול ושקוף
      },
      '&:active': {
        backgroundColor: '#97E6FD',
      }
    },
    active: {
      backgroundColor: '#D6F6eF',
      '&:hover': {
        backgroundColor: '#97E6FD',
      }
    }
  })

const EmptyTable = () => {
    const { columns } = useContext(GlobalContextTable)
    const classes = useStyles()
    return (
      <TableRow className="container" 
      style={{border: '10px #D6F6FF solid', minWidth: '100%',}}
      >
        <TableCell colSpan={columns.length + 1} 
        style={{border: '1px #D6F6FF solid', minWidth: '100%', width: '100%'}}
        >
            <Typography variant="body1" style={{border: '1px #D6F6FF solid', minWidth: '100%', width: '100%'}} className={`${classes.iconTypographyEmptyTableStyle} material-icons`}>
            <CloudOffIcon className={`${classes.iconEmptyTableStyle}`} style={{ fontSize: '150px' }} />
            </Typography>
        </TableCell>
        </TableRow>
    );
  }

export default EmptyTable;
