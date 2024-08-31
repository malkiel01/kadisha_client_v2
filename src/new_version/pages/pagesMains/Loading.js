import { styled, keyframes } from '@mui/system';
import React from 'react';
import { ImageContainer, LoaderContainer, Spinner } from './newLoadingStyles'; // ייבוא העיצובים החדשים

export const ImageContainer = styled('div')({
  textAlign: 'center',
});

export const LoaderContainer = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  background: 'rgba(255, 255, 255, 0.5)', // לדוג', רקע לבן שקוף
  zIndex: 1,
});

const spinAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled('div')({
  top: '50%',
  right: '50%',
  transform: 'translate(-50%, -50%)', // מרכז הספינר יהיה באמצע האלמנט המכיל
  position: 'absolute',
  width: '94px',
  height: '94px',
  border: '12px solid',
  borderColor: '#3d5af1 transparent #3d5af1 transparent',
  borderRadius: '50%',
  animation: `${spinAnim} 1.2s linear infinite`,
  zIndex: 1,
});

const Loading = () => {

  return (
    <ImageContainer>
      <LoaderContainer>
        <Spinner />
      </LoaderContainer>
    </ImageContainer>
  );
};

export default Loading;