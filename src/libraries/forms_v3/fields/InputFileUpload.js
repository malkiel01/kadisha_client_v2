// import React, { useState } from 'react';
// import { Box, Button } from '@mui/material';

// const FileUploader = () => {
//   const [files, setFiles] = useState([]);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const uploadedFiles = event.dataTransfer.files;
//     setFiles(Array.from(uploadedFiles));
//   };

//   const handleFileUpload = (event) => {
//     const uploadedFiles = event.target.files;
//     setFiles(Array.from(uploadedFiles));
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         border: '2px dashed #aaa',
//         borderRadius: '4px',
//         padding: '20px',
//         marginBottom: '20px',
//       }}
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={handleDrop}
//     >
//       <p>גרור ושחרר קבצים מסוג PDF או JPG כאן</p>
//       <input
//         accept=".pdf,.jpg,.jpeg"
//         type="file"
//         id="file-upload"
//         multiple
//         style={{ display: 'none' }}
//         onChange={handleFileUpload}
//       />
//       <label htmlFor="file-upload">
//         <Button variant="contained" component="span">
//           העלאת קבצים
//         </Button>
//       </label>
//       {files.length > 0 && (
//         <ul>
//           {files.map((file, index) => (
//             <li key={index}>{file.name}</li>
//           ))}
//         </ul>
//       )}
//     </Box>
//   );
// };

// export default FileUploader;

import React, { useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFiles = event.dataTransfer.files;
    setFiles(Array.from(uploadedFiles));
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    setFiles(Array.from(uploadedFiles));
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Box
          sx={{
            border: '1px dotted',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f1f1f1',
            backgroundImage: "url('upload-cloud-image.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <p>גרור ושחרר קבצים מסוג PDF או JPG כאן</p>
          {files.length > 0 && (
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <input
            accept=".pdf,.jpg,.jpeg"
            type="file"
            id="file-upload"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
              העלאת קבצים
            </Button>
          </label>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FileUploader;
