import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core';
import BlockDiv from './BlockDiv';


const BlockCard = ({ block }) => {

  const items = [
    { type: 0, label: 'פנויים', value: 3 },
    { type: 0, label: 'רכישות', value: 28 },
    { type: 0, label: 'שמורים', value: 32 },
    { type: 0, label: 'קבורים', value: 33 },
    { type: 1, label: 'סה"כ', value: 96 },
  ]

  return (
    <Card sx={{ minWidth: 275, marginTop: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
           {block?.blockNameHe} ({block?.blockNameEn})
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          קוד ביטוח לאומי: {block?.nationalInsuranceCode || '----'}
        </Typography>
        <Typography variant="body2">
          <Grid container>
            <Grid item xs={4}>
            כתובת: {block?.address || '----'}
            </Grid>
            <Grid item xs={4}>
            קואורדינטות: {block?.coordinates || '----'}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
            תאריך יצירה: {block?.createDate || '----'}
            </Grid>
            <Grid item xs={4}>
            תאריך עדכון אחרון: {block?.inactiveDate || '----'}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
            איש קשר: {block?.contactName || '----'} טלפון: {block?.contactPhoneName || '----'}
            </Grid>
            <Grid item xs={4}>
            פעיל: {block?.isActive ? 'כן' : 'לא'}
            </Grid>
          </Grid>
        </Typography>
          <Typography variant="h6" component="div">
            מלאי קברים
          </Typography>
          <Typography variant="body2">
          <Grid container>
            <BlockDiv exemption = {items} unusual = {items} closed = {items}/>
            </Grid>
          </Typography>
      </CardContent>
    </Card>
  )
}

export default BlockCard;
