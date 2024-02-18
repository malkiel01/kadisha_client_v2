import React, { useState } from 'react';
import { Grid, IconButton, Tooltip, Dialog, DialogContent, DialogTitle, Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'

const ImageGallery = () => {
  const images = [
    'https://hahacanvas.co.il/wp-content/uploads/2021/11/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%99%D7%A4%D7%95%D7%AA-%D7%9C%D7%94%D7%93%D7%A4%D7%A1%D7%94-12.jpg',
    'https://i.pinimg.com/236x/3f/27/73/3f277353ade5922fcb562f14f835b69d.jpg',
    'https://img.lovepik.com/free-png/20211105/lovepik-dreamlike-cloud-adornment-png-image_400318896_wh1200.png',
    'https://img.lovepik.com/original_origin_pic/18/12/23/056f027b02050f411479b1a6964c2673.png_wh300.png',
    'https://img.lovepik.com/free-png/20211215/lovepik-old-couple-looking-at-photos-on-the-sofa-png-image_401627609_wh300.png',
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [openModal, setOpenModal] = useState(false);

  const handlePreviousImage = () => {
    const currentIndex = images.indexOf(currentImage);
    if (currentIndex > 0) {
      setCurrentImage(images[currentIndex - 1]);
    }
  };

  const handleNextImage = () => {
    const currentIndex = images.indexOf(currentImage);
    if (currentIndex < images.length - 1) {
      setCurrentImage(images[currentIndex + 1]);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddImage = () => {
    // Logic to add image to the array
  };

  const handleDeleteImage = () => {
    // Logic to delete image from the array
  };

  

  return (
    <Grid container item  md={12} direction="column" justify="center" alignItems="center">
      <Box sx={{ minWidth: 100,maxWidth: 300, height: 300 , maxHeight: 300 , border: 'red solid 1px', padding: 0, margin: 0}}> 
        <Grid container 
          sx={{ minWidth: 100,maxWidth: 300, height: 300 , maxHeight: 300 }}
          style={{ flexGrow: 1, borderRadius: '5px', border: '0.5px solid gray', boxShadow: 'inset 0 0 5px rgba(0, 0, 2, 2)', padding: 3 }}>
          {/* מצג התמונות */}
        <Grid item xs={12} 
        sx={{ flexGrow: 1 , maxHeight: 230, minHeight: 230,
        borderBottom: '1px solid gray'
        }}>
        <img src={currentImage} alt="תמונה" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        </Grid>
          {/* כפתורי ניהול תמונות */}
        <Grid container 
        style={{justifyContent: "center"}}
        sx={{  marginTop: '1px' }}>
        <Tooltip title="הקודם" placement="top">
        <IconButton onClick={handlePreviousImage}>
          <ArrowBackIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title="הבא" placement="top">
        <IconButton onClick={handleNextImage}>
          <ArrowForwardIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title="הגדלה" placement="top">
        <IconButton onClick={handleOpenModal}>
          <ZoomInIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title="הוסף תמונה" placement="top">
        <IconButton onClick={handleAddImage}>
          <AddPhotoAlternateIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title="מחק תמונה" placement="top">
        <IconButton onClick={handleDeleteImage}>
          <DeleteIcon />
        </IconButton>
        </Tooltip>
        </Grid>
          {/* דיאלוג לתמונה בהגדלה */}
        <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>תמונה מוגדלת</DialogTitle>
        <DialogContent>
        <img src={currentImage} alt="תמונה" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
        </Dialog>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ImageGallery;
