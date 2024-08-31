import React from 'react';
import { Grid, Typography, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { GlobalContext } from '../../../../App';

const Header = ({ columns, value, handleButtonUpdate, handleDelete }) => {

  const { permission } = useContext(GlobalContext);
  const myPermissions = [1]

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h5" component="h2" style={{ textAlign: 'right' }}>
          {`${columns[0]?.title} : ${value?.nameGrave}`}
        </Typography>
      </Grid>
      <Grid item>
        {
          ((permission === 0) ? true : (myPermissions.includes(permission)))
          &&
          <>
            <Tooltip title="עריכה">
              <IconButton onClick={handleButtonUpdate} sx={{ color: 'lightblue' }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="מחיקה">
              <IconButton onClick={handleDelete} sx={{ color: 'lightcoral' }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      </Grid>
    </Grid>
  );
};

export default Header;
