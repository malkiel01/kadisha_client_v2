import jsPDF from 'jspdf';
import 'jspdf-autotable';
import hebrewFont from './hebrewFontBase64.js'; // נתיב לפונט בעברית בפורמט base64

const createPDFConsular = (data) => {
  const doc = new jsPDF();

  // הוסף את הפונט עברית
  doc.addFileToVFS("hebrewFont.ttf", hebrewFont);
  doc.addFont("hebrewFont.ttf", "hebrew", "normal");
  doc.setFont("hebrew");

  data.forEach(item => {
    doc.text(item.content, item.x, item.y);
  });

  doc.save(`אישור קונסולרי ${data[0].content}.pdf`);
};

// קריאה לפונקציה עם הנתונים
createPDFConsular([
  { fieldName: 'Serial Number', content: '6219', x: 255, y: 705 },
  { fieldName: 'date', content: '15/07/2024', x: 35, y: 690 },
  { fieldName: 'Attention', content: ' ', x: 120, y: 639 },
  { fieldName: 'Deceased Name', content: 'SABAH GOTTFRIED MARIE', x: 182, y: 511 },
  { fieldName: 'Block', content: 'TAMIR', x: 125, y: 470 },
  { fieldName: 'Plot', content: 'TAMIR RASHI', x: 118, y: 448 },
  { fieldName: 'Row', content: '10', x: 128, y: 428 },
  { fieldName: 'Grave', content: '29', x: 120, y: 407 },
  { fieldName: 'Cemetery', content: 'Givat Shaull', x: 117, y: 385 },
  { fieldName: 'Deed', content: '-----', x: 180, y: 343 }
]);
