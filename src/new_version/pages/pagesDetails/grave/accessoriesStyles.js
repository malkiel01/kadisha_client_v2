import { styled } from '@mui/system';
import { Box, ButtonGroup, Fab, Grid, Paper, Typography } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../../App';
import ImageUpload from '../../plagins/documents/ImageUpload';
import { fetchFiles } from '../../plagins/documents/GravesImagesList';
import LoadingOverlay from '../../pagesMains/LoadingOverlay';
import useQueries from '../../../../database/useQueries';
import { useIndexedDBSyncV2 } from '../../../../database/dataLocal/indexedDBHooks';

// Styled components using @mui/system

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));

const ContainerBtn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

const AnimatedLockIcon = styled(ErrorOutlineOutlinedIcon)(({ theme }) => ({
  fontSize: 98,
  color: 'red',
  animation: 'shake 0.8s infinite',
  '@keyframes shake': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' },
  },
}));

const GridContainer = styled(Grid)({
  height: '100%', // תופס את מלוא הגובה של הדיב האב
  width: '100%', // תופס את מלוא הרוחב של הדיב האב
});

const GridItem = styled(Grid)(({ fullWidth }) => ({
  height: '100%',
  flex: fullWidth ? 1 : undefined,
  overflow: 'hidden',
  width: fullWidth ? undefined : 250, // רוחב של 250 פיקסלים אם לא fullWidth
}));

const ImageContainer = styled(Box)({
  height: 350, // גובה מלא בתוך הגריד
  overflowY: 'auto', // מאפשר גלילה של התוכן בתוך ה-Box
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});

const ImageGridContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  minWidth: '200px',
  maxWidth: '100%',
  direction: 'rtl',
});

const ImagePaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  width: 128,
  height: 128,
}));

const Image = styled('img')(({ isClicked }) => ({
  height: '80px',
  width: '60px',
  cursor: 'pointer',
  filter: isClicked ? 'brightness(50%)' : 'none',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', // צל מכל הכיוונים
  borderRadius: '4px', // פינות עגולות
  transition: 'transform 0.3s ease',
}));

const ImageTextContainer = styled('div')({
  margin: 0,
  textAlign: 'center',
  width: '150px', // רוחב קבוע של 100 פיקסלים
});

const ImageText = styled(Typography)({
  filter: 'blur(0.1px)', // טשטוש עדין
  fontWeight: 'bold', // טקסט מודגש
  marginTop: '8px', // רווח בין התמונה לטקסט
  textAlign: 'center', // יישור טקסט למרכז
});


// Components

export function GroupSizesColors({ buttons }) {
  return (
    <Container>
      <ButtonGroup size="large" aria-label="Large button group">
        {buttons}
      </ButtonGroup>
    </Container>
  );
}

export const BtnCreatePurchase = ({ graveId = -1, content = null }) => {
  const navigate = useNavigate();
  const { permission } = useContext(GlobalContext);
  const myPermissions = [1, 2];

  const handleButtonClick = () => {
    navigate('/purchaseCreate', { state: { grave: graveId, burialContent: content } });
  };

  return (
    <Container>
      {content && Object.keys(content).length !== 0 ? (
        <ContainerBtn>
          <AnimatedLockIcon />
          <Typography>לא ניתן ליצור תיק רכישה, קיים תיק קבורה</Typography>
        </ContainerBtn>
      ) : (
        <ContainerBtn>
          <Fab variant="extended" onClick={handleButtonClick} disabled={(permission !== 0 && !myPermissions.includes(permission))}>
            <AddIcon sx={{ mr: 1 }} />
            צור תיק רכישה
          </Fab>
        </ContainerBtn>
      )}
    </Container>
  );
};

export const BtnCreateBurial = ({ graveId = -1, content = null }) => {
  const navigate = useNavigate();
  const { permission } = useContext(GlobalContext);
  const myPermissions = [1, 2];

  const handleButtonClick = () => {
    navigate('/burialCreate', { state: { grave: graveId, content } });
  };

  return (
    <Container>
      <ContainerBtn>
        <Fab variant="extended" onClick={handleButtonClick} disabled={(permission !== 0 && !myPermissions.includes(permission))}>
          <AddIcon sx={{ mr: 1 }} />
          צור תיק קבורה
        </Fab>
      </ContainerBtn>
    </Container>
  );
};

export function AttachedDocuments({ grave }) {
  const { token } = useContext(GlobalContext);
  const { getEntityByAttr } = useQueries();
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const loading = loadingAreaGraves || loadingGraves || loadingCemeteries || loadingBlocks || loadingPlots;
  const [documents, setDocuments] = useState([]);

  const getNmeImage = (id) => {
    const grave = getEntityByAttr(localGraves, 'id', id);
    const areaGrave = getEntityByAttr(localAreaGraves, 'gravesList', grave?.areaGraveId);
    const plot = getEntityByAttr(localPlots, 'id', areaGrave?.plotId);
    const block = getEntityByAttr(localBlocks, 'id', plot?.blockId);
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId);

    return `/${cemetery?.id}/${block?.id}/${plot?.id}/${areaGrave?.id}/${id}`;
  };

  useEffect(() => {
    const loadDocuments = async () => {
      if (!loading && grave?.id) {
        const fetchedDocuments = await fetchFiles(`/gravesImages${getNmeImage(grave?.id)}`);
        setDocuments(fetchedDocuments);
      }
    };
    loadDocuments();
  }, [loading]);

  if (loading) return <LoadingOverlay />;

  return (
    <GridContainer container>
      <GridItem item fullWidth>
        <ImageContainer>
          <ImageGrid images={documents} />
        </ImageContainer>
      </GridItem>
      <GridItem item>
        <Box sx={{ height: '100%' }}>
          <ImageUpload url={`/gravesImages${getNmeImage(grave?.id)}`} />
        </Box>
      </GridItem>
    </GridContainer>
  );
}

const ImageGrid = ({ images }) => {
  return (
    <ImageGridContainer>
      {images?.map((image, index) => (
        <ImagePaper key={index} elevation={0}>
          <DocumentImage
            id={image.id}
            src={image.src}
            fileName={image.fileName}
            handleClick={image.handleClick}
          />
        </ImagePaper>
      ))}
    </ImageGridContainer>
  );
};

const DocumentImage = ({ id, src, fileName, handleClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <ImageTextContainer>
      <Image
        src={src}
        alt="Document"
        isClicked={isClicked}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onClick={() => handleClick(id, fileName, setIsClicked)}
        onError={(e) => (e.currentTarget.src = `../images/docConsular.png`)}
      />
      <ImageText variant="body2">{fileName}</ImageText>
    </ImageTextContainer>
  );
};

export default DocumentImage;
