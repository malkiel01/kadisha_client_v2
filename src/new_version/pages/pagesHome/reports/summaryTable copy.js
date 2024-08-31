import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import TableControls from './tableControls'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import { useEffect } from 'react';
import ReportDialog from './reportDialog';

const SummaryTable = ({ data, setCategory = () => {console.log('step 1')
}, buttons }) => {
  const sections = [
    { title: 'שדה', rows: ['פטורה', 'חריגה', 'סגורה'] },
    { title: 'רוויה', rows: ['פטורה', 'חריגה', 'סגורה'] },
    { title: 'סנהדרין', rows: ['פטורה', 'חריגה', 'סגורה'] },
  ];
  const [localData, setLocalData] = useState(data);
  useEffect(() => {setLocalData(data)}, [data]);
  

  const columns = [
    'קברים פנויים',
    'קברים שרכשו בתקופת הדוח',
    'קברים שנרכשו ונקברו לתקופת הדוח',
    'קברי רכישה שנקברו לתקופת הדוח',
    'קברי ב״ל שנקברו לתקופת הדוח',
  ];

  const calculateSectionColumnSum = (sectionIndex, colIndex) => {
    return localData
      .slice(sectionIndex * 3, (sectionIndex + 1) * 3)
      .reduce((sum, row) => sum + (row && row[colIndex] ? row[colIndex] : 0), 0);
  };

  const calculateSectionRowSum = (sectionIndex) => {
    return localData
      .slice(sectionIndex * 3, (sectionIndex + 1) * 3)
      .reduce((sum, row) => sum + calculateRowSum(row), 0);
  };

  const calculateRowSum = (row) => {
    if (!row || row.length === 0) return 0;
    return row.reduce((sum, value) => sum + (value || 0), 0);
  };

  const calculateTotalColumnSum = (colIndex) => {
    return localData.reduce((sum, row) => sum + (row && row[colIndex] ? row[colIndex] : 0), 0);
  };

  const calculateTotalRowSum = () => {
    return localData.reduce((sum, row) => sum + calculateRowSum(row), 0);
  };

  const handlePrint = () => {
    const printableTable = document.getElementById('printableTable');
    const originalContent = document.body.innerHTML;
  
    const printArea = document.createElement('div');
    const title = document.createElement('h2');
    title.style.textAlign = 'center';
    title.innerText = 'כותרת להדפסה';
    printArea.appendChild(title);

    const imgDiv = document.createElement('div');
    imgDiv.style.textAlign = 'center';
    imgDiv.style.marginBottom = '20px';
    const img = document.createElement('img');
    img.src = './logo.webp'; // החלף ב-URL של הלוגו שלך
    img.style.maxWidth = '200px';
    
    img.onload = () => {
      imgDiv.appendChild(img);
      printArea.appendChild(imgDiv);
      printArea.innerHTML += printableTable.innerHTML;
      document.body.innerHTML = printArea.outerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    };
  };
  
  const handleExportPDF = () => {
    const input = document.getElementById('printableTable');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("table.pdf");
    });
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(localData.map((row, rowIndex) => {
      const rowObj = { 'סוג קבר': sections[Math.floor(rowIndex / 3)].rows[rowIndex % 3] };
      columns.forEach((col, colIndex) => {
        rowObj[col] = row[colIndex] || '-';
      });
      rowObj['סיכום שורה'] = calculateRowSum(row);
      return rowObj;
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'טבלה');
    XLSX.writeFile(workbook, 'table.xlsx');
  };

  return (
    <Box sx={{ padding: 2, maxWidth: '1000px', margin: 'auto' }}>
      <Box sx={{ marginBottom: 2, textAlign: 'right' }}>
        <TableControls 
          onPrint={handlePrint}
          onExportPDF={handleExportPDF}
          onExportExcel={handleExportExcel}
          buttons={buttons}
        />
      </Box>
      <h2>סיכום קברים כללי</h2>
      <ReportDialog setCategory={setCategory} />
      <TableContainer component={Paper} id="printableTable">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                >
                  {col}
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
              >
                <b>סה״כ</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {section.rows.map((rowLabel, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {rowIndex === 0 && (
                      <TableCell
                        rowSpan={3}
                        align="center"
                        sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0', verticalAlign: 'middle' }}
                      >
                        {section.title}
                      </TableCell>
                    )}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                    >
                      {rowLabel}
                    </TableCell>
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex} align="center">
                        {localData[sectionIndex * 3 + rowIndex] && localData[sectionIndex * 3 + rowIndex][colIndex] !== undefined
                          ? localData[sectionIndex * 3 + rowIndex][colIndex]
                          : '-'}
                      </TableCell>
                    ))}
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                    >
                      {calculateRowSum(localData[sectionIndex * 3 + rowIndex])}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                    sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', p: 0.8 }}
                  >
                    סיכום {section.title}
                  </TableCell>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      align="center"
                      sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', p: 0.8 }}
                    >
                      {calculateSectionColumnSum(sectionIndex, colIndex)}
                    </TableCell>
                  ))}
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', p: 0.8 }}
                  >
                    {calculateSectionRowSum(sectionIndex)}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell
                colSpan={2}
                align="center"
                sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}
              >
                סה״כ כללי
              </TableCell>
              {columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  align="center"
                  sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}
                >
                  {calculateTotalColumnSum(colIndex)}
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}
              >
                {calculateTotalRowSum()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

SummaryTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired
  ).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SummaryTable;
