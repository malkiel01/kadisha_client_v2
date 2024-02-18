import React from 'react';
// import pdfjsLib from 'pdfjs-dist';

// const convertPdfToJpgAndDownload = (file) => {
//   const reader = new FileReader();

//   reader.onload = async () => {
//     const arrayBuffer = reader.result;
//     const typedArray = new Uint8Array(arrayBuffer);
//     const blob = new Blob([typedArray], { type: 'application/pdf' });
//     const pdfUrl = URL.createObjectURL(blob);

//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');

//     const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
//     const page = await pdf.getPage(1);
//     const viewport = page.getViewport({ scale: 1 });

//     canvas.width = viewport.width;
//     canvas.height = viewport.height;

//     const renderContext = {
//       canvasContext: context,
//       viewport: viewport,
//     };

//     await page.render(renderContext).promise;

//     canvas.toBlob((blob) => {
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'converted.jpg';
//       link.click();
//     }, 'image/jpeg', 1);
//   };

//   reader.readAsArrayBuffer(file);
// };

// import { PDFDocument, JPEGImage } from 'pdf-lib';
import { PDFDocument, JPEGStream,PDFImage  } from 'pdf-lib';

const convertPDFToJPGAndDownload = async (file, fileName) => {
  const pdfBytes = await file.arrayBuffer();
  
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const page = pdfDoc.getPage(0);

  const [width, height] = page.getSize();
  const scaleFactor = 2;
  const jpgImage = await pdfDoc.embedPageAsJPEG(page, { width: width * scaleFactor, height: height * scaleFactor });
  const jpgBytes = await jpgImage.save();

  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([jpgBytes], { type: 'image/jpeg' }));
  link.download = `${fileName}.jpg`;
  link.click();
};
 
const FileConverter = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file.type === 'application/pdf') {
      console.log(file);
      convertPDFToJPGAndDownload(file, file.name)
    } else {
      console.log('Invalid file format. Please select a PDF file.');
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
    </div>
  );
};

export default FileConverter;
