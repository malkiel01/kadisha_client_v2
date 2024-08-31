import { Box, Button, Card, CardContent, CardMedia, Typography, CardActions, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = ({ onChange }) => (
  <input
    type="file"
    style={{ display: 'none' }}
    onChange={onChange}
  />
);

const ImageUpload = ({ url }) => {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/events`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.progress) {
        if (data.progress === '100%') {
          setUploading(false);
          setMessage('File uploaded successfully!');
        } else {
          setProgress(parseFloat(data.progress));
          setMessage(`Uploading: ${data.progress}`);
        }
      }
      if (data.error) {
        setUploading(false);
        setMessage(`Error: ${data.error}`);
      }
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setPreview(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('directory', url);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/documents/uploadFile`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setMessage('File upload failed!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('An error occurred during file upload.');
      setUploading(false);
    }
  };

  return (
    <Card sx={{ height: '100%', width: 250, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: '1 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
        {uploading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress variant="determinate" value={progress} />
            <Typography variant="body2" color="textSecondary">
              {`${progress}%`}
            </Typography>
          </Box>
        ) : (
          preview ? (
            <CardMedia
              component="img"
              sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}
              image={preview}
              alt="Preview"
            />
          ) : (
            <Typography variant="body2" color="textSecondary" align="center">
              אין תצוגה מקדימה זמינה
            </Typography>
          )
        )}
      </Box>
      <CardContent sx={{ p: 0.4, flex: '0 1 auto' }}>
        <Typography variant="body2" color="textSecondary" align="center">
          {message}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 1, justifyContent: 'space-between', mt: 'auto' }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          העלאת קובץ
          <VisuallyHiddenInput onChange={handleFileChange} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={uploading}
        >
          טעינת הקובץ
        </Button>
      </CardActions>
    </Card>
  );
};

export default ImageUpload;
