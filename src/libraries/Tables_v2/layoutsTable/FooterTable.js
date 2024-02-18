import React, { useContext, useEffect } from 'react'

import Select from '@mui/material/Select'
import { IconButton, Menu, MenuItem, useTheme } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { GlobalContextTable } from '../TemplateTable'

    {/* שורת סיכום טבלה */}
    function FooterTable() {
        const { 
            data, columns,
            selectedRows, pageSize,
            setTotalPage, totalPage, 
            count, setCount, 
            focusPage, setFocusPage, 
            countPage, setCountPage,
            styleFooter
        } = useContext(GlobalContextTable)

        useEffect(() => {
            let temp = Math.floor((data.length - 1) / (pageSize || data.length)) + 1
            !temp && (temp = Math.floor(data.length / (pageSize || data.length)) + 1)
            setCountPage(temp)
        }, [data]);
    
        const handleChangePage = (event) => {
            console.log(event);
            setCount(event.target.value)
            setTotalPage(event.target.value)
            setCountPage(Math.floor(data.length / (event.target.value)) + 1)
            setFocusPage(1)
        }

    const reductionTotalPage = () => {
        setCount(totalPage)
        setFocusPage(1)
  }
  const reductionPage = () => {
    if (count > totalPage) {
        setCount(count - totalPage)
        setFocusPage(focusPage - 1)
    }
  }
  const addPage = () => {
    if (count < data.length) {
        setCount(count + totalPage)
        setFocusPage(focusPage + 1)
    }
  }
  const addTotalPage = () => {
        const modulu = Math.floor((data.length) % (totalPage))
        if (modulu > 0) {
            console.log('גדול')
            const quotient = Math.floor((data.length) / (totalPage))
            console.log('עמוד', quotient)

            const a = (quotient + 1) * totalPage
            setCount(a)
            console.log('aעמוד', a)

            const b = Math.floor(quotient) + 1
            setFocusPage(b)  
            console.log('bעמוד', b) 
        } else {
            console.log('שווה')
            const quotient = Math.floor((data.length) / (totalPage))
            console.log('עמוד', quotient)

            const a = (quotient) * totalPage
            setCount(a)
            console.log('aעמוד', a)

            const b = Math.floor(quotient)
            setFocusPage(b)  
            console.log('bעמוד', b)
        }
  }
        
const theme = useTheme()

// 2 האופציות טובות - צריך לבדוק

        return (
            <tbody>
                <TableRow>
                    <TableCell
                    sx={{...theme.header}}
                    style={{width: 10, ...styleFooter}} colSpan={columns.length + 1} align="right"
                    >
                        <div style={{ alignItems: 'center', width: '100%', display: 'flex', textAlign: 'right', justifyContent: 'space-between', fontSize: 26, fontWeight: 'bold', }}>
                            <span style={{ width: '30%', minWidth: 110}}>
                                {selectedRows.length > 0 && <>
                                    <span>{`\t` + 'נבחרו' + `\t`}</span>
                                    <span>{selectedRows.length}</span>
                                    <span>{`\t` + 'מתוך' + `\t`}</span>
                                </>}
                                <span>{data.length}</span>
                                <span>{`\t` + 'רשומות' + `\t`}</span>
                            </span>
                            <span style={{ width: '50%', minWidth: 380, textAlign: 'left' }}>
                                <div  style={{ display: 'inline-block' }}>
                                    <Select 
                                        style={{
                                            backgroundColor: '#F0F8FF',
                                            margin: 10, 
                                            padding: 10 , 
                                            minWidth: 100, 
                                            maxWidth: 100, 
                                            height: 40
                                        }} 
                                        defaultValue={pageSize} 
                                        onChange={handleChangePage}
                                        >
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={25}>25</MenuItem>
                                        <MenuItem value={50}>50</MenuItem>
                                        <MenuItem value={100}>100</MenuItem>
                                        <MenuItem value={data.length > 5000 ? data.length : 5000}>הכל</MenuItem>
                                    </Select> 
                                </div>
                                <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
                                        onClick={reductionTotalPage} disabled={pageSize === 0 || (count - totalPage) === 0}>
                                    <KeyboardDoubleArrowRightIcon />
                                </IconButton>
                                <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
                                        onClick={reductionPage} disabled={pageSize === 0 || (count - totalPage) === 0}>
                                    <NavigateNextIcon />
                                </IconButton>
                                <span>{focusPage}</span>
                                <span>{`\t` + `מתוך` + `\t`}</span>
                                <span>{countPage}</span>

                            
                            
                                <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
                                        onClick={addPage} disabled={pageSize === 0 || (data.length - count) <= 0}>
                                    <NavigateBeforeIcon />
                                </IconButton>
                                <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
                                        onClick={addTotalPage} disabled={pageSize === 0 || (data.length - count) <= 0}>
                                    <KeyboardDoubleArrowLeftIcon />
                                </IconButton>
                            </span>
                        </div>
                    </TableCell>
                </TableRow>
            </tbody>
        )
    }

    export default FooterTable