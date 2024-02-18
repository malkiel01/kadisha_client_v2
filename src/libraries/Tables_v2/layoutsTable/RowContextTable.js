import React, { useRef, useState, useEffect, useContext } from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import CheckboxTable from '../plaginTable/CheckboxTable'
import { makeStyles } from '@material-ui/styles'
import MenuRowTable from '../plaginTable/MenuRowTable'
import { GlobalContextTable } from '../TemplateTable'
import useFormComponent from '../../forms_v3/useFormComponent'

const useStyles2 = makeStyles((theme) => ({
    focused: {
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
      backgroundColor: '#D6F6FF',
      '&:hover': {
        backgroundColor: '#97E6FD',
      }
    }
  }));

const RowContextTable = (props) => {
    const { row, indexRow,  setRowRef, handleKey } = props
    const {  
      items, 
      columns, 
      checkboxSelection, disableSelectionOnClick, menuOptions, 
      totalPage,
      count, 
      setSelectedRows, selectedRows,
     } = useContext(GlobalContextTable)

    const classes = useStyles2()


 // בחירת שורה
 const handleRowSelect = (rowId) => {
    if (rowId !== null) {
        if (checkboxSelection) {
            if (selectedRows.includes(rowId)) {
                // selectedRows.slice
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


// ---------------------------------------------------------------------------------- Start Menu
const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 })
const [menuHandle, setMenuHandle] = useState(null)
const [anchorEl, setAnchorEl] = React.useState(null)


    // Open the menu on click
    const handleMenuOpen = (event, val) => {

        // console.log(event.currentTarget, val);
        
        setAnchorEl(event.currentTarget)
        setMenuHandle(val)
        };
    
    // Close the menu on selecting an option
    const handleMenuClose = () => {
    setMenuHandle()
    setAnchorEl(null)
    };

const handleMenu = (event, valueId) => {
    event.preventDefault()
    const rect = event.currentTarget.getBoundingClientRect()

    const top = -rect.height + event.clientY - rect.top
    const left = event.clientX - rect.left
    console.log(- (event.clientX - rect.left))

    setMenuPosition({ left: left , top: top })
    menuOptions && handleMenuOpen(event, valueId); // פתיחת התפריט במיקום הנוכחי של העכבר
}


// ---------------------------------------------------------------------------------- End Menu

    // ---------------------------------------------------------------------------------- Start Key

    const [currentIndex, setCurrentIndex] = useState(-1); // האינדקס הנוכחי של הדיב שנבחר
    // const [myRef, setMyRef] = useState([]); // האינדקס הנוכחי של הדיב שנבחר
    const divRefs = useRef([]); // מערך שמשמר את ה-Ref של כל דיב

  const handleRowClick = (index) => {
    // console.log(divRefs.current)

    // ודא שהאינדקס קיים במערך ושהרכיב אינו null
    if (divRefs.current[currentIndex] && divRefs.current[index].currentIndex) {
      // הסר את הקלאס הנוכחי
      divRefs.current[currentIndex].current.classList.remove(classes.focused);
    }      
    // עדכן את האינדקס הנוכחי
    setCurrentIndex(index)
    // פקק את הקלאס החדש
    divRefs.current[index].current && divRefs.current[index].current.classList.add(classes.focused);
  }

  const onMouseLeave = () => {
    if (divRefs.current[currentIndex]) {
      divRefs.current[currentIndex].current && divRefs.current[currentIndex].current.classList.remove(classes.focused);
    } 
  }

  const handleKeyDown = (event) => {
    event.preventDefault()
    handleKey(event)
    // switch (event.key) {
    //   case 'ArrowUp':
        
        // break;
      // case value:
        
      //   break;
      // case value:
        
      //   break;
      // case value:
        
      //   break;
      // case value:
        
      //   break;
      // case value:
        
      //   break;
    
    //   default:
    //     break;
    // }
    
    // let temp = -1
    // if (event.key === 'ArrowDown') {
    //     temp = 0
    // }
    // if (event.key === 'ArrowUp') {
    //     temp = 1
    // }
    // if (event.key === 'ArrowDown' && event.shiftKey) {
    //     temp = 2
    // }
    // if (event.key === 'ArrowUp' && event.shiftKey) {
    //     temp = 3
    // }
    // if (event.ctrlKey && event.key === 'a') {
    //     temp = 4
    // }
    // if (event.key === ' ') {
    //     temp = 5
    // }
    // if (event.key === 'Enter') {
    //     temp = 6
    // }


    // switch (temp) {
    //     case 0:
    //         console.log('ArrowDown');
    //          // בעת לחיצה על החץ למטה
    //          ClickKeyArrowDown()
    //         break;
    //     case 1:
    //         console.log('ArrowUp');
    //         // בעת לחיצה על החץ למעלה
    //         ClickKeyArrowUp()
    //         break;
    //     // case 2:
    //     //     // בעת לחיצה על חץ למטה ושיפט
    //     //     ClickKeyArrowDownAndShift()
    //     //     break;
    //     // case 3:
    //     //     // בעת לחיצה על חץ למטה ושיפט
    //     //     ClickKeyArrowUpAndShift()
    //     //     break;
    //     // case 4:
    //     //     // אם לחצו על Ctrl + A
    //     //     ClickKeyCtrlAndA()
    //     //     break;
    //     // case 5:
    //     //     // בעת לחיצה על מקש הרווח
    //     //     ClickKeySpace(data[currentIndex].id)
    //     //     break;
    //     // case 6:
    //         // // אם לחצו על Enter
    //         // ClickKeyEnter()
    //         // break;
    //     default:
    //         break;
    // }
    }
// ---------------------------------------------------------------------------------- End Key

const { openFormComponent } = useFormComponent()

    return (
        // מציג תוכן טבלה
          (indexRow < count && indexRow >= (count - totalPage)) && 
          <TableRow
          key={indexRow}
          style={{ maxWidth: '100%'}}
              className={`${classes.focused}
            ${selectedRows.includes(row.id) && classes.active}`}
          ref={(row) => setRowRef(row)}
          onKeyDown={(event) => handleKeyDown(event)}
          onDoubleClick={() => openFormComponent(row)}
          onClick={() => disableSelectionOnClick || handleRowSelect(row.id)}
          tabIndex={0}
          >
            {disableSelectionOnClick || <CheckboxTable row={row} />}
            {columns.map(( column, index1 ) => {
                return <TableCell key={index1}
                style={{border: '1px #D6F6FF solid'   ,paddingTop: 5, paddingBottom: 5, 
                overflow: 'hidden',
                maxWidth: 150
              }}
                  aria-controls={`three-dots-menu-${row.id}`} aria-haspopup="true"
                  // onClick={() => handleRowSelect(row.id)}
                  // onDoubleClick={() => checkboxSelection ? console.log('open -> ',row.id) : handleRowSelect(row.id)}
                  onContextMenu={(event) => handleMenu(event, row.id)}>
                  <div style={{maxHeight: 30}}>
                    <p
                      style={{
                        margin: 0,
                        textAlign: 'right',
                        fontSize: 24,
                        whiteSpace: 'nowrap', // למנוע שבירת שורות
                        overflow: 'hidden', // להסתיר חלק מהטקסט שחורג מהרוחב
                        textOverflow: 'ellipsis', // הצגת נקודות אלכסוניות
                        }}>
                          {row[column.field]}
                        </p>
                  </div>
              </TableCell>
          })}
          <MenuRowTable 
          value={row}
          items={items}
          menuPosition={menuPosition} menuHandle={menuHandle} anchorEl={anchorEl} handleMenuClose={handleMenuClose}
          ></MenuRowTable>
          </TableRow>
    )

}

export default RowContextTable;
