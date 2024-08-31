import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, DialogContentText } from '@mui/material';
import SignatureCanvas from './SignatureCanvas';

const SignatureForm = ({ open, onClose, onSubmit, signatures = [], setSignatures }) => {
  // const [signatures, setSignatures] = useState(signers);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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

    // הדפסת התמונה לקונסול
    console.log("Updated Signature Image:", signatureImage);
  };

  const handleClearSignature = (index) => {
    const newSignatures = [...signatures];
    newSignatures[index].signatureImage = null;
    newSignatures[index].timestamp = null;
    setSignatures(newSignatures);
  };

  const handleSubmit = () => {
    const updatedSignatures = signatures.map((signer, index) => {
      if (!signer.signatureImage) {
        return {
          ...signer,
          signatureImage: null, // ערך ברירת מחדל לחתימה לא חתומה
          timestamp: null,
        };
      }
      return signer;
    });

    onSubmit(updatedSignatures);
    onClose();
  };


  const handleAlertClose = (confirm) => {
    setAlertOpen(false);
    if (confirm) {
      onSubmit(signatures);
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
                permission={signer.permission}
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
