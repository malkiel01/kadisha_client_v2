import React from 'react';

const DocumentImage = ({ src, fileName = '' }) => {
  const imageStyle = {
    height: '80px',
    width: '60px',
  };

  return (
    <div>
      <img src={src} alt="Document" style={imageStyle} />
      <div>{fileName}</div>
    </div>
  );
};

export default DocumentImage;
