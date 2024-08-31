import React, { useRef, useState, useEffect } from 'react';
import { Button, Paper } from '@mui/material';

const SignatureCanvas = ({ onSave, label, onClear, initialSignature, permission, status, borderColor }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!initialSignature);
  const [currentBorderColor, setCurrentBorderColor] = useState(borderColor || '#ccc'); // אפור עדין בהתחלה

  const canModifySignature = () => {
    if (permission === 0) {
      return true;
    } else {
      if (status === 0 || status === 1) {
        return permission === 0 || permission === 1 || permission === 2;
      } else {
        return false;
      }
    }
  };

  const getMousePos = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = ({ nativeEvent }) => {
    if (!canModifySignature()) return;
    const pos = getMousePos(canvasRef.current, nativeEvent);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !canModifySignature()) return;
    const pos = getMousePos(canvasRef.current, nativeEvent);
    ctxRef.current.lineTo(pos.x, pos.y);
    ctxRef.current.stroke();
    setIsEmpty(false);
  };

  const stopDrawing = () => {
    if (!canModifySignature()) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const saveSignature = () => {
    if (!canModifySignature()) return;
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    onSave({
      name: label,
      signatureImage: dataURL,
      timestamp: new Date().toISOString(),
    });
    setCurrentBorderColor('lightgreen'); // מסגרת ירוקה בהירה בעת שמירת החתימה
  };

  const clearCanvas = () => {
    if (!canModifySignature()) return;
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    setCurrentBorderColor('lightcoral'); // מסגרת אדומה בהירה בעת ניקוי החתימה
    drawPlaceholderCircle(); // ציור העיגול לאחר ניקוי הקנבס
    onClear(); // עדכון הסטייט בקומפוננטת האב
  };

  const drawPlaceholderCircle = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // ניקוי הקנבס
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI); // ציור עיגול במרכז הקנבס
    ctx.fillStyle = 'lightgray';
    ctx.fill();
    ctx.strokeStyle = 'gray';
    ctx.stroke();
    ctx.closePath();
  };




  // ----------

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');
  //   canvas.width = 500; // רוחב הקנבס
  //   canvas.height = 300; // גובה הקנבס
  //   ctx.strokeStyle = 'black'; // צבע הקו
  //   ctx.lineWidth = 2; // רוחב הקו
  //   ctxRef.current = ctx;

  //   console.log('step 1: ',initialSignature.signatureImage);

  //   // if (initialSignature && initialSignature.signatureImage) {
  //   //     console.log("Signature Image Base64:", initialSignature.signatureImage); // בדוק שהמחרוזת תקינה
  //   //     const img = new Image();
  //   //     img.src = initialSignature.signatureImage;
        
  //   //     img.onload = () => {
  //   //         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  //   //         setIsEmpty(false);
  //   //     };
  //   //     img.onerror = (err) => {
  //   //         console.error('Error loading signature image:', err);
  //   //     };
  //   // } else {
  //   //     drawPlaceholderCircle(); // ציור עיגול אם אין חתימה
  //   // }
  // }, [initialSignature]);


    // ----------

    useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
          const ctx = canvas.getContext('2d');
          canvas.width = 500; // רוחב הקנבס
          canvas.height = 300; // גובה הקנבס
          ctx.strokeStyle = 'black'; // צבע הקו
          ctx.lineWidth = 2; // רוחב הקו
          ctxRef.current = ctx;
  
          
          if (initialSignature?.signatureImage) {
            const img = new Image();
            img.src = initialSignature.signatureImage;
            console.log('step 1: ', initialSignature?.signatureImage);
              
              img.onload = () => {
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                  setIsEmpty(false);
              };
              img.onerror = (err) => {
                  console.error('Error loading signature image:', err);
              };
          } else {
              drawPlaceholderCircle(); // ציור עיגול אם אין חתימה
          }
      }
  }, [initialSignature]);

  return (
    <Paper
        elevation={3}
        sx={{
            padding: 2,
            textAlign: 'center',
            border: `2px solid ${currentBorderColor}`,
            boxShadow: `0 0 10px ${currentBorderColor}`,
        }}
    >
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{
                border: `2px solid ${currentBorderColor}`,
                cursor: canModifySignature() ? 'crosshair' : 'not-allowed',
                width: '100%',
                height: 'auto'
            }}
        />
        <div style={{ marginTop: 10 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={saveSignature}
                disabled={isEmpty || !canModifySignature()} // הכפתור דייסבלד אם לא נרשם כלום או אם אין הרשאה
                sx={{ marginRight: 1 }}
            >
                שמור חתימה
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={clearCanvas}
                disabled={!canModifySignature()} // הכפתור דייסבלד אם אין הרשאה
            >
                נקה
            </Button>
        </div>
    </Paper>
);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        textAlign: 'center',
        border: `2px solid ${currentBorderColor}`,
        boxShadow: `0 0 10px ${currentBorderColor}`,
      }}
    >
      {/* <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          border: `2px solid ${currentBorderColor}`,
          cursor: canModifySignature() ? 'crosshair' : 'not-allowed',
          width: '100%',
          height: 'auto'
        }}
      /> */}
      <div style={{ marginTop: 10 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={saveSignature}
          disabled={isEmpty || !canModifySignature()} // הכפתור דייסבלד אם לא נרשם כלום או אם אין הרשאה
          sx={{ marginRight: 1 }}
        >
          שמור חתימה
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearCanvas}
          disabled={!canModifySignature()} // הכפתור דייסבלד אם אין הרשאה
        >
          נקה
        </Button>
      </div>
    </Paper>
  );
};

export default SignatureCanvas;
