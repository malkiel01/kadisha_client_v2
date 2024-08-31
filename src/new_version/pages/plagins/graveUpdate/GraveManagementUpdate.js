import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Button, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ManagementPortfolio from './ManagementPortfolio';
import useQueries from '../../../../../database/useQueries';
import { useSelector } from 'react-redux';
import BtnCreatePurchase from './btnPurchaseAndBurial/BtnCreatePurchase';
import BtnCreateBurial from './btnPurchaseAndBurial/BtnCreateBurial';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mapFieldValues } from '../utility';
import SelectComponent from '../../pagesUpdate/components/fields/SelectComponent';
import { getFieldOptions } from '../../pagesUpdate/data/commponentOptions';
// import useStyles from '../../../';

function GraveManagementUpdate({
  grave = {},
  field = {},
  handleChange = () => { },
  edit = (v) => { console.log('חסרה פעולת עריכה') },
  del = (v) => { console.log('חסרה פעולת מחיקה') },
}) {
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)

  const handleChangeType = (event) => {
    const updatedEvent = {
      ...event,
      target: {
        ...event.target,
        value: { ...grave, plotType: event.target.value }
      }
    };
    handleChange(updatedEvent)
  }


  return (
    <Card raised style={{ marginTop: '10px' }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <Typography variant="h6" component="div" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{`קבר : ${field?.nameGrave}`}

              </div>
              <div>
                <IconButton onClick={() => del(field)}><DeleteIcon /></IconButton>
              </div>
            </Typography>
            <TextField
              name={field.name}
              label={'שם הקבר'}
              value={grave['name'] || ''}
            // onChange={handleChange}
            // error={!!error}
            // className={classes.textField}
            // fullWidth
            // disabled={isDisabled}
            />
            <SelectComponent field={field} value={grave['plotType']} handleChange={handleChangeType} error={'error'}
              options={{
                [field.name]: getFieldOptions('plotType', optionsFields)
              }}
            />
          </Grid>

        </Grid>

        <Grid container spacing={2} style={{ marginTop: '-20px' }}>
          <Grid item md={12} xs={12}>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default GraveManagementUpdate;
