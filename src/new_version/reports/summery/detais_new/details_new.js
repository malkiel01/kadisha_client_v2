import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Tooltip } from '@mui/material';
import Summary from './Summary';
import { useContext } from 'react';
import { GlobalContext } from '../../../../App';

const CustomCard = ({ data = [], summaries, edit = () => { }, del = () => { }, value }) => {

  const { permission } = useContext(GlobalContext);
  const myPermissions = [1]

  const columns = data
    .filter(prop => prop.show === true)
    .map(prop => ({ id: prop.id, name: prop.field, title: prop.headerName, value: value ? value[prop.field] : '-----' }));

  return (
    <Card sx={{ minWidth: 275, margin: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ textAlign: 'left' }}>
            {columns.map((row, index) => (
              <Typography key={index} color={index === 0 ? 'textPrimary' : 'textSecondary'} variant={index === 0 ? 'h6' : 'body1'} component="p" sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                <span style={{ fontWeight: 'bold' }}>{row.title + ': '}</span>
                <span>{row.value}</span>
              </Typography>
            ))}
          </Box>
          <Box sx={{ maxWidth: 550 }}>
            <Summary summaries={summaries} />
          </Box>
        </CardContent>
        <Box sx={{ p: 2 }}>
          {
            ((permission === 0) ? true : (myPermissions.includes(permission)))
            &&
            <>
              <Tooltip title="עריכה">
                <IconButton onClick={edit} sx={{ color: 'lightblue' }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="מחיקה">
                <IconButton onClick={del} sx={{ color: 'lightcoral' }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          }
        </Box>
      </Box>
    </Card>
  );
};

export default CustomCard;
