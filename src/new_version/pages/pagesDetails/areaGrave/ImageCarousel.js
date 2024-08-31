import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CarouselContainer = styled(Box)({
  border: '1px solid red',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%', // גובה כולל כולל חצים
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

const CarouselWrapper = styled(Box)(({ carouselHeight }) => ({
  border: '1px solid green',
  display: 'flex',
  alignItems: 'center',
  width: `${carouselHeight * 0.8}px`, // רוחב כולל 80% מהגובה
  height: `${carouselHeight}px`, // גובה כולל
}));

const CarouselContentWrapper = styled(Box)({
  overflow: 'hidden',
  width: '100%',
  height: '100%',
});

const CarouselContent = styled(Box)({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  height: '100%',
});

const CarouselImage = styled('img')(({ carouselHeight }) => ({
  height: '100%', // גובה תמונה
  width: `${carouselHeight * 0.8}px`, // רוחב תמונה 80% מהגובה
  objectFit: 'cover',
}));

const ArrowButton = styled(IconButton)({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  '&:first-of-type': {
    left: 0,
  },
  '&:last-of-type': {
    right: 0,
  },
});

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselHeight(carouselRef.current.clientHeight);
    }
  }, [carouselRef]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <CarouselContainer ref={carouselRef}>
      <CarouselWrapper carouselHeight={carouselHeight}>
        <ArrowButton onClick={goToPrevious}>
          <ArrowBackIosNewIcon />
        </ArrowButton>
        <CarouselContentWrapper>
          <CarouselContent style={{ transform: `translateX(-${currentIndex * carouselHeight * 0.8}px)` }}>
            {images.map((image, index) => (
              <CarouselImage key={index} src={image} alt={`Slide ${index}`} carouselHeight={carouselHeight} />
            ))}
          </CarouselContent>
        </CarouselContentWrapper>
        <ArrowButton onClick={goToNext}>
          <ArrowForwardIosIcon />
        </ArrowButton>
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default ImageCarousel;
