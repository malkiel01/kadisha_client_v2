import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

export const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
});

export const StyledCircularProgress = styled(CircularProgress)({
  width: '100px !important',
  height: '100px !important',
});

const LoadingOverlay = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {  
    return (
      <Overlay>
        <StyledCircularProgress />
      </Overlay>
    );
  } else {
    return null;
  }
};

export default LoadingOverlay;