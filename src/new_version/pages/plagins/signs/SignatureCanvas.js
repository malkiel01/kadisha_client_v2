import React, { useRef, useState, useEffect } from 'react';
import { Button, Paper } from '@mui/material';
import { useContext } from 'react';
import { GlobalContext } from '../../../../App';

const SignatureCanvas = ({ onSave, label, onClear, initialSignature, myPermission, status, borderColor }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!initialSignature);
  const [currentBorderColor, setCurrentBorderColor] = useState(borderColor || '#ccc'); // אפור עדין בהתחלה

  const { permission } = useContext(GlobalContext)

  const canModifySignature = () => {
    if (permission === 0) {
      return true
    }
    else if (permission === 1 || permission === 2 || permission === 3) {
      if (status === 0 || status === 1) {
        
        return myPermission === permission
      }
      else {
        return false
      }
    }
    else {
      return false
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
    onClear(); // עדכון הסטייט בקומפוננטת האב
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500; // רוחב הקנבס
    canvas.height = 300; // גובה הקנבס
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black'; // צבע הקו
    ctx.lineWidth = 2; // רוחב הקו
    ctxRef.current = ctx;

    if (initialSignature) {
      const img = new Image();
      img.src = initialSignature.signatureImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setIsEmpty(false);
      };
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
        style={{ border: `2px solid ${currentBorderColor}`, cursor: canModifySignature() ? 'crosshair' : 'not-allowed', width: '100%', height: 'auto' }}
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
};

export default SignatureCanvas;
