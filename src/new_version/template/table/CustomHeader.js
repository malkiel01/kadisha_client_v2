import { useGridApiContext } from '@mui/x-data-grid';
import React, { useEffect } from 'react';

export function CustomHeader({ colDef, onResize }) {
  const apiRef = useGridApiContext()

  useEffect(() => {
    // מוצא את אלמנט הכותרת
    const headerCell = document.querySelector(`.MuiDataGrid-columnHeader[data-field="${colDef.field}"]`);
    // מוצא את אלמנט הפרידה (הקו המפריד)
    const separator = headerCell?.querySelector('.MuiDataGrid-columnSeparator--sideRight');

    let startWidth = 0;
    let startX = 0;

    const handleMouseOver = (event) => {
      // זהיתי האלמנט עליו העכבר נמצא
      const target = event.target;
      // בדוק אם האלמנט הוא חלק מהתפריט או הקו המפריד (נניח שיש להם class מסוים)
      if (target.classList.contains('MuiDataGrid-menuIconButton')) {
      } else if (target.classList.contains('MuiDataGrid-columnSeparator') || target.classList.contains('MuiDataGrid-iconSeparator')) {
        target.style.cursor = 'col-resize'; // הוסף זאת כדי לשנות את צורת הסמן
     }
    }

    document.addEventListener('mouseover', handleMouseOver);


    const handleMouseMove = (event) => {
      // הוספת פיקסלים לרוחב הנוכחי
      const newWidth1 = startX - event.clientX

      headerCell.style.width = `${startWidth + newWidth1}px`;

            // קריאה ל-callback עדכון הרוחב, אם נתון
            if (typeof onResize === 'function') {
              onResize(colDef.field, startWidth + newWidth1, apiRef);
            }
    }

    const handleMouseMove2 = (event) => {
      let field = colDef.field
      let newWidth = startX - event.clientX
      apiRef.current.setColumnWidth(field, newWidth);
    }
    const handleMouseUp = () => {
      // הסרת מאזיני אירועים בסיום הגרירה
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (event) => {

      startX = event.clientX;
      // קבלת הרוחב הנוכחי של הכותרת
      startWidth = headerCell.getBoundingClientRect().width;
      //   // קביעת מאזיני אירועים לגרירה
      document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

      // הוספת 5 פיקסלים לרוחב הנוכחי
      const newWidth = startWidth + 0;
      // עדכון הרוחב של הכותרת
      headerCell.style.width = `${newWidth}px`;

      // קריאה ל-callback עדכון הרוחב, אם נתון
      if (typeof onResize === 'function') {
        onResize(colDef.field, newWidth, apiRef);
      }
    };

    const handleMouseDown2 = (event) => {
      let field = colDef.field

      startX = event.clientX;
      // קבלת הרוחב הנוכחי של הכותרת
      startWidth = headerCell.getBoundingClientRect().width;
      //   // קביעת מאזיני אירועים לגרירה
      document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

      // הוספת 5 פיקסלים לרוחב הנוכחי
      const newWidth = startWidth + 0;
      
    }


    // מציב מאזין ללחיצה על הפרידה
    separator?.addEventListener('mousedown', handleMouseDown);

    // ניקוי אחרי פירוק הקומפוננטה
    return () => {
      separator?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [colDef.field, onResize]);

  return (
    <div>
      {colDef.headerName}
    </div>
  );
}