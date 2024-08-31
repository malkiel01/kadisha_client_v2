import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import CustomFooter, { MyPagination } from './CustomPagination';
import { CustomHeader } from './CustomHeader';
import { mapFieldValues } from '../../pages/plagins/utility';
import noContentIcon from './no-data.png'; // תחליף את הנתיב עם הנתיב הנכון לאייקון שלך

// כמות שורות לעמוד
const customPageSizeOptions = [10, 50, 100];

function NoRowsOverlay({ gridHeight }) {
  return (
    <GridOverlay>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: `${(gridHeight - 100) / 2}px`, // assuming icon height is 100px
          left: 0,
          backgroundColor: 'white',
        }}
      >
        <img src={noContentIcon} alt="No Content" style={{ maxWidth: '100px', maxHeight: '100px' }} />
      </Box>
    </GridOverlay>
  );
}

export default function ColumnOrderingGrid({ gridHeight = 500, rows = [], columns = [], searchText = '', onRowSelect = () => {}, optionsFields = [] }) {
  const [widthAllColumns, setWidthAllColumns] = useState(100);
  const [selectRowsActive, setSelectRowsActive] = useState([]);
  const containerRef = useRef(null);
  // const gridHeight = heightTable; // הגדרת גובה הטבלה

  // מיפוי ערכים של שדות לפי optionsFields
  const mappedRows = useMemo(() => mapFieldValues(rows, optionsFields), [rows, optionsFields]);

  // פונקציה שתפעל בעת קליק על שורה
  const handleSelectionModelChange = (newSelectionModel) => {
    // מציאת הנתונים של השורות הנבחרות הנוכחיות מתוך ה-rows בהתבסס על ה-IDs ב-newSelectionModel
    const selectedRowsData = newSelectionModel.map(id => mappedRows.find(row => row.id === id));
    setSelectRowsActive(selectedRowsData); // עדכון המצב עם השורות הנבחרות הנוכחיות
  };

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width;
      }
    };

    // Update the container width initially and when the columns change
    updateContainerWidth();

    let widths = 0;
    columns.forEach(col => {
      widths += col.width;
    });

    if (widths < containerRef.current.getBoundingClientRect().width) {
      setWidthAllColumns(containerRef.current.getBoundingClientRect().width - 1);
    } else {
      setWidthAllColumns(widths + 100);
    }

    // Add event listener to update container width on window resize
    window.addEventListener('resize', updateContainerWidth);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, [columns]);

  // פונקציה שתפעל בעת דאבל קליק על שורה
  const handleRowDoubleClick = (params) => {
    const rowData = mappedRows.find((row) => row.id === params.id);
    if (onRowSelect) {
      onRowSelect([rowData]);
    }
  };

  // פונקציית החיפוש
  const searchTextRegex = useMemo(() => {
    // ראשית, נבצע אסקייפ לתווים מיוחדים בביטוי רגולרי פרט לכוכבית
    let pattern = searchText.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
    // אז נחליף כל כוכבית ב.* לציין כל סדרת תווים
    pattern = pattern.replace(/\*/g, '.*');
    // יצירת הביטוי הרגולרי עם דגל לא רגיש לרישיות
    return new RegExp(pattern, 'i');
  }, [searchText]);

  // סינון השורות על פי הביטוי הרגולרי
  const filteredRows = useMemo(() => {
    let temp = mappedRows.filter((row) => {
      return Object.keys(row).some((key) => {
        const value = row[key];
        if (typeof value === 'string') {
          return searchTextRegex.test(value);
        }
        return false;
      });
    });
    return temp;
  }, [mappedRows, searchTextRegex]);

  // ניהול רוחב העמודה
  const [columnWidths, setColumnWidths] = useState(() =>
    columns.reduce((widths, column) => ({ ...widths, [column.field]: column.width }), {})
  );

  const handleResize = useCallback((field, newWidth, apiRef) => {
    apiRef.current.setColumnWidth(field, newWidth);
    setColumnWidths((prevWidths) => ({ ...prevWidths, [field]: newWidth }));
    let widths = 0;
    apiRef.current.getAllColumns().forEach((col) => {
      widths += col.width;
    });

    if (widths < containerRef.current.getBoundingClientRect().width) {
      setWidthAllColumns(containerRef.current.getBoundingClientRect().width);
    } else {
      setWidthAllColumns(widths + 100);
    }
  }, []);

  const modifiedColumns = columns.map((col) => ({
    ...col,
    width: columnWidths[col.field],
    renderHeader: (params) => (
      <CustomHeader {...params} column={params.colDef} onResize={handleResize} />
    ),
  }));

  const [paginationInfo, setPaginationInfo] = useState({
    page: 0,
    pageSize: customPageSizeOptions[0],
    rowCount: 0,
  });

  const [pageSize, setPageSize] = useState(0);
  const [page, setPage] = useState(0);

  const handlePageSizeChange = (event) => {
    setPageSize(event);
  };
  const handlePageChange = (event) => {
    setPage(event);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{ width: '100%', overflow: 'auto' }}>
        <Box
          sx={{
            height: gridHeight,
            width: widthAllColumns,
            overflow: 'auto',
            '& .MuiDataGrid-columnHeaders': {
              display: 'flex',
              position: 'sticky',
              top: 0,
              zIndex: 2,
            },
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={modifiedColumns}
            rowHeight={35}
            checkboxSelection
            onRowDoubleClick={handleRowDoubleClick}
            onRowSelectionModelChange={handleSelectionModelChange}
            slots={{
              pagination: MyPagination,
              noRowsOverlay: () => <NoRowsOverlay gridHeight={gridHeight} />,
            }}
            slotProps={{
              pagination: {
                pageSizeOptions: customPageSizeOptions,
                pageSize: pageSize,
                setPageSize: setPageSize,
                page: page,
                setPage: setPage,
              },
            }}
            onPageChange={(newPage) =>
              setPaginationInfo((prev) => ({ ...prev, page: newPage }))
            }
            onPageSizeChange={(newPageSize) =>
              setPaginationInfo((prev) => ({ ...prev, pageSize: newPageSize }))
            }
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              width: '100%',
              position: 'absolute',
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 2,
              padding: '6px',
              borderTop: '1px solid rgba(224, 224, 224, 1)',
              backgroundColor: 'background.paper',
            }}
          >
            <Box
              sx={{
                maxWidth: '380px',
                width: '100%',
                '& > *': {
                  display: 'inline-flex',
                },
              }}
            >
              <CustomFooter
                pageSizeOptions={customPageSizeOptions}
                paginationInfo={paginationInfo}
                setPaginationInfo={setPaginationInfo}
                rowsCount={rows.length}
                pageSize={pageSize}
                setPageSize={handlePageSizeChange}
                page={page}
                setPage={handlePageChange}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '0.86rem' }}>
                {selectRowsActive.length > 0
                  ? selectRowsActive.length === 1
                    ? `שורה אחת נבחרה`
                    : `${selectRowsActive.length} שורות נבחרו`
                  : null}
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}
