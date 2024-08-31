import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, DialogContentText } from '@mui/material';
import SignatureCanvas from './SignatureCanvas';

const SignatureForm = ({ open, onClose, onSubmit, signatures = [], setSignatures }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [localSignatures, setLocalSignatures] = useState([]);
  const [incompleteSignatureIndex, setIncompleteSignatureIndex] = useState(null);

  const handleSaveSignature = (index, signature) => {

 // המרת Buffer למחרוזת base64 אם נדרש
 let signatureImage = signature.signatureImage;
 
 if (signatureImage && Array.isArray(signatureImage.data)) {
   const base64String = btoa(String.fromCharCode(...new Uint8Array(signatureImage.data)));
   signatureImage = `data:image/png;base64,${base64String}`;
 }

    const newSignatures = [...signatures];
    newSignatures[index] = {
      ...newSignatures[index],
      signatureImage: signature.signatureImage,
      timestamp: signature.timestamp,
    };
    setSignatures(newSignatures);
  };

  const handleClearSignature = (index) => {
    const newSignatures = [...signatures];
    newSignatures[index].signatureImage = null;
    newSignatures[index].timestamp = null;
    setSignatures(newSignatures);
  };

  const handleSubmit = () => {
    const chechSigns = []
    const tempSigner = signatures.map((signer, index) => {
      if (!signer.signatureImage) {
        chechSigns.push(signer?.signerName)
        return {
          ...signer,
          signatureImage: null, // ערך ברירת מחדל לחתימה לא חתומה
          timestamp: null,
        };
      }
      return signer;
    })
    setLocalSignatures(tempSigner)  

    if (chechSigns?.length > 0) {
      let question = '';
      
      if (chechSigns?.length === 1) {
        question = `שים לב! החתימה של ${chechSigns[0]} לא נחתמה!`;
      } else if (chechSigns?.length > 1) {
        const signsText = chechSigns.map((sign, index) => {
          if (index === chechSigns.length - 1) {
            return `${sign}`;
          } else {
            return `${sign} ו`;
          }
        }).join('');
    
        question = `שים לב! החתימות של ${signsText} לא נחתמו!`;
      }
    
      setAlertMessage(question)
      setAlertOpen(true)
    }
    else{
      onSubmit(tempSigner);
      onClose();
    }
  };

  const handleAlertClose = (confirm) => {
    setAlertOpen(false);
    if (confirm) {
      onSubmit(localSignatures);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        חתימות מורשי החתימה
        <Button onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}>X</Button>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {signatures.map((signer, index) => (
            <Grid item xs={6} key={index}>
              <h3>{signer.signerTitle}</h3>
              
              <SignatureCanvas
                label={signer.signerTitle}
                onSave={(signature) => handleSaveSignature(index, signature)}
                onClear={() => handleClearSignature(index)}
                initialSignature={signer.signatureImage ? { signatureImage: signer.signatureImage, timestamp: signer.timestamp } : null}
                myPermission={signer.permission}
                status={signer.status}
                borderColor={incompleteSignatureIndex && incompleteSignatureIndex.includes(index) ? 'lightcoral' : '#ccc'}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          שמירה
        </Button>
      </DialogActions>

      {/* דיאלוג שאלה */}
      <Dialog open={alertOpen} onClose={() => handleAlertClose(false)}>
        <DialogContent>
          <DialogContentText>
            {alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAlertClose(false)} color="secondary">
            לא
          </Button>
          <Button onClick={() => handleAlertClose(true)} color="primary">
            כן
          </Button>
        </DialogActions>
      </Dialog>

    </Dialog>
  );
};

export default SignatureForm;
