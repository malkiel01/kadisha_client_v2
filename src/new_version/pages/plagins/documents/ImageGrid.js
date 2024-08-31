import React from 'react';
import DocumentImage from './DocumentImage';

const ImageGrid = ({ images }) => {
  const gridStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    minWidth: '200px',
    maxWidth: '100%',
    direction: 'rtl',
  };

  return (
    <div style={gridStyle}>
      {images.map((image, index) => (
        <DocumentImage 
          key={index} 
          id={image.id}
          src={image.src} 
          fileName={image.fileName} 
          handleClick={image.handleClick} 
        />
      ))}
    </div>
  );
};

export default ImageGrid;