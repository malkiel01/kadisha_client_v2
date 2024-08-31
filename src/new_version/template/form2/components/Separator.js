import React from 'react';
import { styled } from '@mui/system';

export const SeparatorContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '98%',
  padding: '5px',
  backgroundColor: '#f0f0f0',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  minWidth: '100%', // כדי להבטיח שהרכיב יהיה מינימום ברוחב של 100%
}));

export const SeparatorTitle = styled('span')(({ theme }) => ({
  position: 'absolute',
  right: '50px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)', // 50% שקיפות
  padding: '10px 10px',
  fontSize: '1.2em',
}));

const Separator = ({ title }) => {

  return (
    <SeparatorContainer>
      <SeparatorTitle>{title}</SeparatorTitle>
    </SeparatorContainer>
  );
};

export default Separator;
