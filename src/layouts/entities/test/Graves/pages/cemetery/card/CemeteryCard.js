import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core';
import CemeteryDiv from './CemeteryDiv';



const CemeteryCard = ({ item, data, summaries = [] }) => {
  useEffect(() => {
    console.log(summaries);
  }, []);

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
        <Grid container xs={12}>
          <Typography variant="h5" component="div">
            {item?.cemeteryNameHe} ({item?.cemeteryNameEn})
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={6}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              קוד ביטוח לאומי: {item?.nationalInsuranceCode || '----'}
            </Typography>
            {/* תוכן נוסף... */}
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Typography variant="body2">
              <Typography variant="body2">
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    כתובת: {item?.address || '----'}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    קואורדינטות: {item?.coordinates || '----'}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    תאריך יצירה: {item?.createDate}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    תאריך עדכון אחרון: {item?.inactiveDate || '----'}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    איש קשר: {item?.contactName || '----'} טלפון: {item?.contactPhoneName || '----'}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    פעיל: {item?.isActive ? 'כן' : 'לא'}
                  </Grid>
                </Grid>
              </Typography>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" component="div">
          מלאי קברים
        </Typography>
        <Typography variant="body2">
          <Grid container>
            <CemeteryDiv exemption={summaries?.exemption} unusual={summaries?.unusual} closed={summaries?.closed} />
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CemeteryCard;
