import React from 'react';
import styled from '@emotion/styled';
import ImageGrid from './ImageGrid';

const GridContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
`;

const ImageContainer = styled('div')`
  position: relative;
`;

const StyledImage = styled('img')`
  width: 60px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const PageDocumentsGrave = ({ documents }) => {
  return (
    <div>
      <ImageGrid images={documents} />
    </div>
  );
};

export default PageDocumentsGrave;

