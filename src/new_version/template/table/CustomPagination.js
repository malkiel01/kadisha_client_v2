import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { GridToolbarContainer, useGridApiContext } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// קומפוננטה לשורת הפוטר של הטבלה
const MyPagination = ({pageSizeOptions = [5, 25, 50, 100],
pageSize = 0, setPageSize = () => {},
page = 0, setPage = () => {}
}) => {

  return (
    <CustomPagination pageSizeOptions={pageSizeOptions} 
    pageSize={pageSize} setPageSize={setPageSize}
    page={page} setPage={setPage}/>
  );
}
function CustomPagination({ pageSizeOptions = [5, 25, 50, 100],
  pageSize = 0, setPageSize = () => {},
  page = 0, setPage = () => {}
}) {
  const apiRef = useGridApiContext()
  
  const [btnStart, setBtnStart] = useState(true)
  const [btnEnd, setBtnEnd] = useState(false)

  useEffect(() => {
    apiRef.current.setPageSize(pageSizeOptions[0])
  }, [])
  useEffect(() => {
    setPageSize(apiRef.current.state.pagination.paginationModel.pageSize)
  }, [])
  // מאזין ל pageSize
  useEffect(() => {
    apiRef.current.setPageSize(pageSize);
  }, [pageSize])
  // מאזין ל page
  useEffect(() => {
    apiRef.current.setPage(page);
  }, [page])

  const handlePageSizeChange = (event) => {
    console.log(event.target.value);
    apiRef.current.setPageSize(Number(event.target.value))
    setPageSize(Number(event.target.value))
    goToFirstPage()
  }

  const goToFirstPage = () => {
    apiRef.current.setPage(0)
    setBtnStart(true)
    setBtnEnd(false)
  }

  const goToPreviousPage = () => {
    if (apiRef.current.state.pagination.paginationModel.page >= 1) {
      apiRef.current.setPage(apiRef.current.state.pagination.paginationModel.page - 1)
      setBtnEnd(false)
    }
    if (apiRef.current.state.pagination.paginationModel.page === 0) {
      setBtnStart(true)
    }
  }

  const goToNextPage = () => {
    let page = apiRef.current.state.pagination.paginationModel.page
    let pageSize = apiRef.current.state.pagination.paginationModel.pageSize
    let totalRowCount = apiRef.current.state.rows.totalRowCount
    let countPage = Math.ceil(totalRowCount / pageSize)
    setBtnStart(false)
    if (page + 1 < countPage) {
      apiRef.current.setPage(page + 1)
    }
    if (page + 1 === countPage - 1) {
      setBtnEnd(true)
    }
  }

  const goToLastPage = () => {
    let pageSize = apiRef.current.state.pagination.paginationModel.pageSize;
    let totalRowCount = apiRef.current.state.rows.totalRowCount;
    let lastPage = Math.ceil(totalRowCount / pageSize) - 1;
    apiRef.current.setPage(lastPage);
    setBtnStart(false)
    setBtnEnd(true)
  };


  const titleFooter = () => {
    let page = apiRef.current.state.pagination.paginationModel.page
    let pageSize = apiRef.current.state.pagination.paginationModel.pageSize
    let totalRowCount = apiRef.current.state.rows.totalRowCount
    // let countPage = Math.ceil(totalRowCount / pageSize)


    
    let first = (pageSize * (page+1)) - pageSize+1
    let last = totalRowCount > (first + pageSize - 1) ? (first + pageSize - 1) : totalRowCount
    return `${first} - ${last} מתוך ${totalRowCount}`
  }


  return (
    <GridToolbarContainer>
      <div>מס׳ שורות לדף:</div>
      <select
        onChange={handlePageSizeChange}
        value={apiRef.current.state.pagination.paginationModel.pageSize}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <Typography sx={{ fontSize: '0.86rem' }}>
        {titleFooter()}
      </Typography>
      <IconButton aria-label="first page" onClick={goToFirstPage} style={{margin: -5}}
      disabled={btnStart} 
      >
        <KeyboardDoubleArrowRightIcon  />
      </IconButton>
      <IconButton aria-label="previous page" onClick={goToPreviousPage} style={{margin: -5}}
      disabled={btnStart} 
      >
        <NavigateNextIcon  />
      </IconButton>
      <IconButton aria-label="next page" onClick={goToNextPage} style={{margin: -5}}
      disabled={btnEnd} 
      >
        <NavigateBeforeIcon   />
      </IconButton>
      <IconButton aria-label="last page" onClick={goToLastPage} style={{margin: -5}}
      disabled={btnEnd} 
      >
        <KeyboardDoubleArrowLeftIcon  />
      </IconButton>
    </GridToolbarContainer>
  );
}


function CustomFooter({ 
  pageSizeOptions = [5, 25, 50, 100],
  pageSize = 0, setPageSize = () => {},
  page = 0, setPage = () => {},
  rowsCount = 0
  
}) {
  const [btnStart, setBtnStart] = useState(true)
  const [btnEnd, setBtnEnd] = useState(false)

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value))
    goToFirstPage()
  }

  const goToFirstPage = () => {
    setPage(0)
    setBtnStart(true)
    setBtnEnd(false)
  }

  const goToPreviousPage = () => {
    if (page >= 1) {
      setPage(page - 1)
      setBtnEnd(false)
    }
    if (page === 0) {
      setBtnStart(true)
    }
  }

  const goToNextPage = () => {
    let countPage = Math.ceil(rowsCount / pageSize)
    setBtnStart(false)
    if (page + 1 < countPage) {
      setPage(page + 1)
    }
    if (page + 1 === countPage - 1) {
      setBtnEnd(true)
    }
  }

  const goToLastPage = () => {
    let lastPage = Math.ceil(rowsCount / pageSize) - 1;
    setPage(lastPage)
    setBtnStart(false)
    setBtnEnd(true)
  };

  const titleFooter = () => {
    let first = (pageSize * (page+1)) - pageSize+1
    let last = rowsCount > (first + pageSize - 1) ? (first + pageSize - 1) : rowsCount
    return `${first} - ${last} מתוך ${rowsCount}`
  }


  return (
    <Box sx={{
      display: 'flex', // השתמש ב-flex כדי לארגן את האלמנטים בצורה אינליין
      flexWrap: 'wrap', // אם יש צורך, זה יאפשר לאלמנטים לעבור לשורה הבאה במקרה של חוסר מקום
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '2px 0px',
      '& > *': { // יחול על כל הילדים של Box
        display: 'inline-flex', // ישתמש ב-inline-flex כדי לשמור על תכונות ה-flex וגם להציג באופן אינליין
        alignItems: 'center',
        padding: 0
      },
    }}>
      <Typography sx={{ fontSize: '0.86rem' }}>
      מס׳ שורות לדף:
      </Typography>
      <select
        style={{padding: 0, fontSize: '0.86rem'}}
        onChange={handlePageSizeChange}
        value={pageSize}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <Typography sx={{ fontSize: '0.86rem' }}>
        {titleFooter()}
      </Typography>
      <IconButton aria-label="first page" 
      onClick={goToFirstPage}
       style={{margin: -5}}
      disabled={btnStart} 
      >
        <KeyboardDoubleArrowRightIcon  />
      </IconButton>
      <IconButton aria-label="previous page" 
      onClick={goToPreviousPage} 
      style={{margin: -5}}
      disabled={btnStart} 
      >
        <NavigateNextIcon  />
      </IconButton>
      <IconButton aria-label="next page" 
      onClick={goToNextPage} 
      style={{margin: -5}}
      disabled={btnEnd} 
      >
        <NavigateBeforeIcon   />
      </IconButton>
      <IconButton aria-label="last page" 
      onClick={goToLastPage} 
      style={{margin: -5}}
      disabled={btnEnd} 
      >
        <KeyboardDoubleArrowLeftIcon  />
      </IconButton>
    </Box>
  );
}

export default CustomFooter;

export {
  MyPagination
}

