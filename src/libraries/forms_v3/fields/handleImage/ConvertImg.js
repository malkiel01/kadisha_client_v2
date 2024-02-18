import React from 'react';

const convertToJpgBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            resolve(base64String);
          };
          reader.readAsDataURL(blob);
        }, 'image/jpeg', 1);
      };
      img.src = event.target.result;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

const ImageConverter = () => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'application/pdf') {
        console.log('1');
      try {
        const base64String = await convertToJpgBase64(file);
        const imageDataUrl = `data:image/jpeg;base64, ${base64String}`;
        console.log(imageDataUrl);
      } catch (error) {
        console.error('Error converting file:', error);
      }
    } else {
      console.log('Invalid file format. Please select an image or PDF file.');
    }
  };

  return (
    <div>
      <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileUpload} />
    </div>
  );
};

export default ImageConverter;
