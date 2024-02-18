import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core'
import CustomDiv from '../../../plagin/CustomDiv'

const customDivStyle = {
  border: '1px solid #ddd', // מסגרת אפורה
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', // צל קל
  borderRadius: '10px', // פינות מעוגלות
  padding: '20px',
  margin: '20px',
  position: 'relative',
  backgroundColor: 'white', // רקע לבן
};

const customDivHeaderStyle = {
  position: 'absolute',
  top: '-25px', // ממקם את הכותרת מעט מחוץ לדיב
  rigth: '20px',
  background: 'white', // רקע לכותרת שיתאים לרקע של הדיב
  padding: '5px',
  borderRadius: '5px', // פינות מעוגלות לכותרת
};

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

const BlockDiv = ({ exemption = [], unusual = [], closed = [] }) => {
  return (
    <>
        <Grid item xs={3}>
            <CustomDiv title={'חלקה פטורה'}>
            {exemption.map((item, index) => (
                item.type ?
                <>
                <div style={dividerStyle} />
                    <div key={index} style={textStyle}>
                    <Typography sx={{ mb: 0.3, fontSize: '25px' }}  >{item.label}:</Typography>
                    <Typography sx={{ mb: 0.3, fontSize: '25px' }}  ><span>{item.value}</span></Typography>
                </div>
                </>
                :
                <div key={index} style={textStyle}>
                <Typography sx={{ mb: 0.2, fontSize: '25px' }}  color="text.secondary">{item.label}:</Typography>
                <Typography sx={{ mb: 0.2, fontSize: '25px' }}  color="text.secondary"><span>{item.value}</span></Typography>
            </div> 
            ))}
            </CustomDiv>    
        </Grid>
        <Grid item xs={3}>
            <CustomDiv title={'חלקה חריגה'}>
            {unusual.map((item, index) => (
                item.type ?
                <>
                <div style={dividerStyle} />
                    <div key={index} style={textStyle}>
                    <Typography sx={{ mb: 0.3, fontSize: '25px' }}  >{item.label}:</Typography>
                    <Typography sx={{ mb: 0.3, fontSize: '25px' }}  ><span>{item.value}</span></Typography>
                </div>
                </>
                :
                <div key={index} style={textStyle}>
                <Typography sx={{ mb: 0.2, fontSize: '25px' }}  color="text.secondary">{item.label}:</Typography>
                <Typography sx={{ mb: 0.2, fontSize: '25px' }}  color="text.secondary"><span>{item.value}</span></Typography>
            </div> 
            ))}
            </CustomDiv>    
        </Grid>
        <Grid item xs={3}>
            <CustomDiv title={'חלקה סגורה'}>
            {closed.map((item, index) => (
                item.type ?
                <>
                <div style={dividerStyle} />
                    <div key={index} style={textStyle}>
                    <Typography sx={{ mb: 0.3, fontSize: '25px' }}  >{item.label}:</Typography>
                    <Typography sx={{ mb: 0.3, fontSize: '25px' }}  ><span>{item.value}</span></Typography>
                </div>
                </>
                :
                <div key={index} style={textStyle}>
                <Typography sx={{ mb: 0.2, fontSize: '25px' }}  color="text.secondary">{item.label}:</Typography>
                <Typography sx={{ mb: 0.2, fontSize: '25px' }}  color="text.secondary"><span>{item.value}</span></Typography>
            </div> 
            ))}
            </CustomDiv>    
        </Grid>
    </>
  );
};

export default BlockDiv;
