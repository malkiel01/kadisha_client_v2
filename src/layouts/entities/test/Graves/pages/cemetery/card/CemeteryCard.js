import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core';
import CemeteryDiv from './CemeteryDiv';


const CemeteryCard = ({ cemetery }) => {

  const items = [
    { type: 0, label: 'פנויים', value: 3 },
    { type: 0, label: 'רכישות', value: 28 },
    { type: 0, label: 'שמורים', value: 32 },
    { type: 0, label: 'קבורים', value: 33 },
    { type: 1, label: 'סה"כ', value: 96 },
  ];

  const textStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '25px',
    marginBottom: '0.3',
  };

  const dividerStyle = {
    borderTop: '1px dashed #ddd', // קו מקווקו
    margin: '10px 0',
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
           {cemetery?.cemeteryNameHe} ({cemetery?.cemeteryNameEn})
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          קוד ביטוח לאומי: {cemetery?.nationalInsuranceCode || '----'}
        </Typography>
        <Typography variant="body2">
          <Grid container>
            <Grid item xs={4}>
            כתובת: {cemetery?.address || '----'}
            </Grid>
            <Grid item xs={4}>
            קואורדינטות: {cemetery?.coordinates || '----'}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
            תאריך יצירה: {cemetery?.createDate}
            </Grid>
            <Grid item xs={4}>
            תאריך עדכון אחרון: {cemetery?.inactiveDate || '----'}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
            איש קשר: {cemetery?.contactName || '----'} טלפון: {cemetery?.contactPhoneName || '----'}
            </Grid>
            <Grid item xs={4}>
            פעיל: {cemetery?.isActive ? 'כן' : 'לא'}
            </Grid>
          </Grid>
        </Typography>
          <Typography variant="h6" component="div">
            מלאי קברים
          </Typography>
          <Typography variant="body2">
          <Grid container>
            <CemeteryDiv exemption = {items} unusual = {items} closed = {items}/>
            </Grid>
          </Typography>
      </CardContent>
    </Card>
  );
};

export default CemeteryCard;
