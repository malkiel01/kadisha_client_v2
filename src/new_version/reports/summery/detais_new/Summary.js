import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

const Summary = ({ summaries }) => {
  const align = 'left'
  
  let sumTemp = 0
  let sumFree = 0
  let sumPurchases = 0
  let sumReserved = 0
  let sumBuried = 0

  const summery = (sum) => {
    if (sum.label === 'פנויים') {
      sumFree += sum.value
    }
    if (sum.label === 'רכישות') {
      sumPurchases += sum.value
    }
    if (sum.label === 'שמורים') {
      sumReserved += sum.value
    }
    if (sum.label === 'קבורים') {
      sumBuried += sum.value
    }
  }

  return (
    <Paper>
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
          {['סוג הקבר', 'פנויים', 'רכישות', 'שמורים', 'קבורים', 'סה"כ'].map(header => (
            <TableCell align="right" sx={{ fontWeight: 'bold' }} key={header}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align={align}>פטורה</TableCell>
          {summaries?.exemption.map((sum, index) => {
            if (index === 0) {
              sumTemp = 0
            }
            summery(sum)
            if (sum.type === 0) {
              sumTemp += sum.value
              return <TableCell key={index} align={align}>{sum.value}</TableCell>
            }
          })}
          <TableCell align={align}>{sumTemp}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align={align}>חריגה</TableCell>
          {summaries?.unusual.map((sum, index) => {
            if (index === 0) {
              sumTemp = 0
            }
            summery(sum)
            if (sum.type === 0) {
              sumTemp += sum.value
              return <TableCell key={index} align={align}>{sum.value}</TableCell>
            }
          })}
          <TableCell align={align}>{sumTemp}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align={align}>סגורה</TableCell>
          {summaries?.closed.map((sum, index) => {
            if (index === 0) {
              sumTemp = 0
            }
            summery(sum)
            if (sum.type === 0) {
              sumTemp += sum.value
              return <TableCell key={index} align={align}>{sum.value}</TableCell>
            }
          })}
          <TableCell align={align}>{sumTemp}</TableCell>
        </TableRow>
        <TableRow sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
          <TableCell align={align}></TableCell>
          <TableCell align={align}>{sumFree}</TableCell>
          <TableCell align={align}>{sumPurchases}</TableCell>
          <TableCell align={align}>{sumReserved}</TableCell>
          <TableCell align={align}>{sumBuried}</TableCell>
          <TableCell align={align}>{sumFree + sumPurchases + sumReserved + sumBuried}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>
  );
}

export default Summary;
