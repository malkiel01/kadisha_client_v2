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
import './printStyles.css';
import { useRef } from 'react';
import ReactDOMServer from 'react-dom/server';



const SummaryTable = ({ data, setCategory = () => {
  console.log('step 1')
}, buttons }) => {
  const sections = [
    { title: 'שדה', rows: ['פטורה', 'חריגה', 'סגורה'] },
    { title: 'רוויה', rows: ['פטורה', 'חריגה', 'סגורה'] },
    { title: 'סנהדרין', rows: ['פטורה', 'חריגה', 'סגורה'] },
  ];
  const [localData, setLocalData] = useState(data);
  useEffect(() => { setLocalData(data) }, [data]);

  const formTableRef = useRef(null);


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

  // כחלון קופץ
  const handlePrint2 = () => {
    const printableTable = document.getElementById('printableTable'); // קבלת תוכן הטבלה
    const formTable = formTableRef.current; // קבלת תוכן הטופס

    const originalContent = document.body.innerHTML; // שכפול תוכן העמוד למשתנה גיבוי

    // יצירת HTML חדש להדפסה
    const printWindow = window.open('', '', 'height=600,width=800');

    const printArea = document.createElement('div'); // דיב מעטפת

    const title = document.createElement('h2'); // כותרת
    title.style.textAlign = 'center'; // יישור כותרת למרכז
    title.innerText = 'כותרת להדפסה'; // תוכן הכותרת
    printArea.appendChild(title); // הוספת הכותרת כאלמנט ראשון

    const imgDiv = document.createElement('div'); // יצירת אלמט מעטפת ללוגו העליון
    imgDiv.style.textAlign = 'center'; // יישור התוכן למרכז
    imgDiv.style.marginBottom = '20px'; // הוספת מרווחים מלמטה לדיב של הלוגו

    const img = document.createElement('img'); // יצירת אלמנט תמונה
    img.src = './logo.webp'; // החלף ב-URL של הלוגו שלך
    img.style.maxWidth = '200px'; // רוחב התמונה

    img.onload = () => {
      imgDiv.appendChild(img); // התמונה נכנסת לאלמנט הדיב מעטפת לתמונה
      printArea.appendChild(imgDiv); // אלמנט דיב המעטפת נכנס כאלמנט שני לדיב מעטפת הראשי

      // עטיפת הטופס ויצירת דיב ממורכז
      const centeredFormDiv = document.createElement('div');
      centeredFormDiv.style.display = 'flex';
      centeredFormDiv.style.justifyContent = 'center';
      centeredFormDiv.style.width = '100%'; // רוחב מלא

      const formClone = formTable.cloneNode(true); // שכפול הטופס
      formClone.style.zoom = '0.5'; // הקטנת הטופס ב-50% באמצעות zoom
      centeredFormDiv.appendChild(formClone); // הוספת הטופס המוקטן לדיב הממורכז

      printArea.appendChild(centeredFormDiv); // הוספת הדיב הממורכז לדיב הראשי

      // הקטנת התוכן של הטבלה ב-50%
      const tableClone = printableTable.cloneNode(true); // שכפול הטבלה
      tableClone.style.zoom = '0.5'; // הקטנת הטבלה ב-50% באמצעות zoom
      printArea.appendChild(tableClone); // הוספת הטבלה המוקטנת לדיב הראשי


      // הוספת תמונה שתהיה בתחתית הדף באופן קבוע
      const footerImg = document.createElement('img');
      footerImg.src = './logo.webp'; // החלף ב-URL של התמונה שאתה רוצה בתחתית
      footerImg.style.position = 'fixed';
      footerImg.style.bottom = '0';
      footerImg.style.left = '50%';
      footerImg.style.transform = 'translateX(-50%)'; // מרכז את התמונה אופקית
      footerImg.style.width = '80%'; // מתאים לרוחב העמוד
      footerImg.style.height = '100px'; // שומר על היחס הנכון של התמונה

      printArea.appendChild(footerImg); // הוספת התמונה לדיב הראשי

      // העתקת כל הסטיילים מהעמוד המקורי לחלון החדש
      const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
      styles.forEach(style => {
        printWindow.document.head.appendChild(style.cloneNode(true));
      });

      // הגדרת כיוון הטקסט ל-RTL
      printWindow.document.body.setAttribute('dir', 'rtl');

      // הוספת כותרת לחלון החדש
      const titleElement = document.createElement('title');
      titleElement.innerText = 'דוח מלאי קברים הכולל פעילות לתווך תאריכים מבוקש';
      printWindow.document.head.appendChild(titleElement);

      printWindow.document.body.innerHTML = printArea.outerHTML; // החלפת התוכן המלא של העמוד בתוכן שיצרנו
      printWindow.document.close(); // סגירת הכתיבה למסמך החדש
      printWindow.focus(); // התמקדות בחלון ההדפסה
      printWindow.print(); // הדפסת הדפדפן

      // document.body.innerHTML = printArea.outerHTML; // החלפת התוכן המלא של העמוד בתוכן שיצרנו
      // window.print(); // הדפסת הדפדפן
      // document.body.innerHTML = originalContent; // החזרת התוכן המקורי לעמוד שלנו
      // window.location.reload(); // טעינת העמוד מחדש בסיום
    };
  };  
  // כחלון מקומי
  const handlePrint = () => {
    const printableTable = document.getElementById('printableTable'); // קבלת תוכן הטבלה
    const formTable = formTableRef.current; // קבלת תוכן הטופס

    const originalContent = document.body.innerHTML; // שכפול תוכן העמוד למשתנה גיבוי

    const printArea = document.createElement('div'); // דיב מעטפת

    const title = document.createElement('h2'); // כותרת
    title.style.textAlign = 'center'; // יישור כותרת למרכז
    title.innerText = 'כותרת להדפסה'; // תוכן הכותרת
    printArea.appendChild(title); // הוספת הכותרת כאלמנט ראשון

    const imgDiv = document.createElement('div'); // יצירת אלמט מעטפת ללוגו העליון
    imgDiv.style.textAlign = 'center'; // יישור התוכן למרכז
    imgDiv.style.marginBottom = '20px'; // הוספת מרווחים מלמטה לדיב של הלוגו

    const img = document.createElement('img'); // יצירת אלמנט תמונה
    img.src = './logo.webp'; // החלף ב-URL של הלוגו שלך
    img.style.maxWidth = '200px'; // רוחב התמונה

    img.onload = () => {
      imgDiv.appendChild(img); // התמונה נכנסת לאלמנט הדיב מעטפת לתמונה
      printArea.appendChild(imgDiv); // אלמנט דיב המעטפת נכנס כאלמנט שני לדיב מעטפת הראשי

      // עטיפת הטופס ויצירת דיב ממורכז
      const centeredFormDiv = document.createElement('div');
      centeredFormDiv.style.display = 'flex';
      centeredFormDiv.style.justifyContent = 'center';
      centeredFormDiv.style.width = '100%'; // רוחב מלא

      const formClone = formTable.cloneNode(true); // שכפול הטופס
      formClone.style.zoom = '0.5'; // הקטנת הטופס ב-50% באמצעות zoom
      centeredFormDiv.appendChild(formClone); // הוספת הטופס המוקטן לדיב הממורכז

      printArea.appendChild(centeredFormDiv); // הוספת הדיב הממורכז לדיב הראשי

      // הקטנת התוכן של הטבלה ב-50%
      const tableClone = printableTable.cloneNode(true); // שכפול הטבלה
      tableClone.style.zoom = '0.5'; // הקטנת הטבלה ב-50% באמצעות zoom
      printArea.appendChild(tableClone); // הוספת הטבלה המוקטנת לדיב הראשי


      // הוספת תמונה שתהיה בתחתית הדף באופן קבוע
      const footerImg = document.createElement('img');
      footerImg.src = './logo.webp'; // החלף ב-URL של התמונה שאתה רוצה בתחתית
      footerImg.style.position = 'fixed';
      footerImg.style.bottom = '0';
      footerImg.style.left = '50%';
      footerImg.style.transform = 'translateX(-50%)'; // מרכז את התמונה אופקית
      footerImg.style.width = '80%'; // מתאים לרוחב העמוד
      footerImg.style.height = '100px'; // שומר על היחס הנכון של התמונה

      printArea.appendChild(footerImg); // הוספת התמונה לדיב הראשי

      document.body.innerHTML = printArea.outerHTML; // החלפת התוכן המלא של העמוד בתוכן שיצרנו
      window.print(); // הדפסת הדפדפן
      document.body.innerHTML = originalContent; // החזרת התוכן המקורי לעמוד שלנו
      window.location.reload(); // טעינת העמוד מחדש בסיום
    };
  };


  // const handleExportPDFOrginal = () => {
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

  const handleExportPDF2 = () => {
    const printableTable = document.getElementById('printableTable'); // קבלת תוכן הטבלה
    const formTable = formTableRef.current; // קבלת תוכן הטופס
  
    const printArea = document.createElement('div'); // דיב מעטפת
  
    const title = document.createElement('h2'); // כותרת
    title.style.textAlign = 'center'; // יישור כותרת למרכז
    title.innerText = 'כותרת להדפסה'; // תוכן הכותרת
    printArea.appendChild(title); // הוספת הכותרת כאלמנט ראשון
  
    const imgDiv = document.createElement('div'); // יצירת אלמט מעטפת ללוגו העליון
    imgDiv.style.textAlign = 'center'; // יישור התוכן למרכז
    imgDiv.style.marginBottom = '20px'; // הוספת מרווחים מלמטה לדיב של הלוגו
  
    const img = document.createElement('img'); // יצירת אלמנט תמונה
    img.src = './logo.webp'; // החלף ב-URL של הלוגו שלך
    img.style.maxWidth = '200px'; // רוחב התמונה
    imgDiv.appendChild(img); // התמונה נכנסת לאלמנט הדיב מעטפת לתמונה
    printArea.appendChild(imgDiv); // אלמנט דיב המעטפת נכנס כאלמנט שני לדיב מעטפת הראשי
  
    // עטיפת הטופס ויצירת דיב ממורכז
    const centeredFormDiv = document.createElement('div');
    centeredFormDiv.style.display = 'flex';
    centeredFormDiv.style.justifyContent = 'center';
    centeredFormDiv.style.width = '100%'; // רוחב מלא
  
    const formClone = formTable.cloneNode(true); // שכפול הטופס
    formClone.style.zoom = '0.5'; // הקטנת הטופס ב-50% באמצעות zoom
    centeredFormDiv.appendChild(formClone); // הוספת הטופס המוקטן לדיב הממורכז
  
    printArea.appendChild(centeredFormDiv); // הוספת הדיב הממורכז לדיב הראשי
  
    // הקטנת התוכן של הטבלה ב-50%
    const tableClone = printableTable.cloneNode(true); // שכפול הטבלה
    tableClone.style.zoom = '0.5'; // הקטנת הטבלה ב-50% באמצעות zoom
    printArea.appendChild(tableClone); // הוספת הטבלה המוקטנת לדיב הראשי
  
    // הוספת תמונה שתהיה בתחתית הדף באופן קבוע
    const footerImg = document.createElement('img');
    footerImg.src = './logo.webp'; // החלף ב-URL של התמונה שאתה רוצה בתחתית
    footerImg.style.position = 'fixed';
    footerImg.style.bottom = '0';
    footerImg.style.left = '50%';
    footerImg.style.transform = 'translateX(-50%)'; // מרכז את התמונה אופקית
    footerImg.style.width = '80%'; // מתאים לרוחב העמוד
    footerImg.style.height = '100px'; // שומר על היחס הנכון של התמונה
  
    printArea.appendChild(footerImg); // הוספת התמונה לדיב הראשי
  
    html2canvas(printArea).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   const imgProps = pdf.getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   pdf.autoPrint(); // מגדיר את הקובץ להדפסה אוטומטית כאשר הוא נפתח
    //   window.open(pdf.output('bloburl'), '_blank');
    });
  };
  const handleExportPDF3 = () => {
    const printableTable = document.getElementById('printableTable'); // קבלת תוכן הטבלה
    const formTable = formTableRef.current; // קבלת תוכן הטופס
  
    const printArea = document.createElement('div'); // דיב מעטפת להדפסה
  
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
    imgDiv.appendChild(img);
    printArea.appendChild(imgDiv);
  
    const formClone = formTable.cloneNode(true);
    formClone.style.zoom = '0.5';
    printArea.appendChild(formClone);
  
    const tableClone = printableTable.cloneNode(true);
    tableClone.style.zoom = '0.5';
    printArea.appendChild(tableClone);
  
    const footerImg = document.createElement('img');
    footerImg.src = './logo.webp'; // החלף ב-URL של התמונה שאתה רוצה בתחתית
    footerImg.style.position = 'fixed';
    footerImg.style.bottom = '0';
    footerImg.style.left = '50%';
    footerImg.style.transform = 'translateX(-50%)';
    footerImg.style.width = '80%';
    footerImg.style.height = '100px';
    printArea.appendChild(footerImg);
  
    // המרת ה-div ל-Canvas והפיכת ה-Canvas לתמונה
    html2canvas(printArea).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.autoPrint(); // הגדרת ה-PDF להדפסה אוטומטית כאשר הוא נפתח
      window.open(pdf.output('bloburl'), '_blank'); // פתיחה בחלון חדש
    }).catch(error => {
      console.error("Error generating PDF:", error);
    });
  };
  const handleExportPDF4 = () => {
    // הסתרת iframe
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => iframe.style.display = 'none');
  
    const printableTable = document.getElementById('printableTable'); // קבלת תוכן הטבלה
    const formTable = formTableRef.current; // קבלת תוכן הטופס
  
    const printArea = document.createElement('div'); // דיב מעטפת להדפסה
  
    // הוספת אלמנטים ל-printArea כמו קודם
  
    html2canvas(printableTable).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.autoPrint(); // הגדרת ה-PDF להדפסה אוטומטית כאשר הוא נפתח
      window.open(pdf.output('bloburl'), '_blank'); // פתיחה בחלון חדש
  
      // החזרת ה-iframe למצב גלוי
      iframes.forEach(iframe => iframe.style.display = '');
    }).catch(error => {
      console.error("Error generating PDF:", error);
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
          onExportPDF={handleExportPDF4}
          onExportExcel={handleExportExcel}
          buttons={buttons}
        />
      </Box>
      <h2>סיכום קברים כללי</h2>
      {/* <ReportDialog setCategory={setCategory} ref={formTableRef} /> */}
      <div ref={formTableRef}>
        <ReportDialog setCategory={setCategory} />
      </div>
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
