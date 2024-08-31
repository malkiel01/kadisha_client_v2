import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ManagementPortfolio from './ManagementPortfolio';
import useQueries from '../../../../../database/useQueries';
import { useSelector } from 'react-redux';
import BtnCreatePurchase from './btnPurchaseAndBurial/BtnCreatePurchase';
import BtnCreateBurial from './btnPurchaseAndBurial/BtnCreateBurial';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mapFieldValues } from '../utility';

const optionsFields = [
  {
    field: 'priceDefinition',
    values: [
      { value: 1, name: 'מחיר עלות הקבר' },
      { value: 2, name: 'שירות' },
      { value: 3, name: 'מצבה' },
      { value: 4, name: 'העברת בעלות' },
    ]
  },
  {
    field: 'plotType',
    values: [
      { value: null, name: 'הכל' },
      { value: 1, name: 'פטורה' },
      { value: 2, name: 'חריגה' },
      { value: 3, name: 'סגורה' },
    ]
  },
  {
    field: 'graveType',
    values: [
      { value: null, name: 'הכל' },
      { value: 1, name: 'שדה' },
      { value: 2, name: 'רוויה' },
      { value: 3, name: 'סנהדרין' },
    ]
  },
  {
    field: 'resident',
    values: [
      { value: null, name: 'הכל' },
      { value: 1, name: 'תושב ירושלים והסביבה' },
      { value: 2, name: 'תושב ישראל' },
      { value: 3, name: 'תושב חו״ל' },
    ]
  },
  {
    field: 'buyerStatus',
    values: [
      { value: null, name: 'הכל' },
      { value: 1, name: 'בחיים' },
      { value: 2, name: 'לאחר פטירה' },
    ]
  },
  {
    field: 'isActive',
    values: [
      { value: null, name: 'לא פעיל' },
      { value: 1, name: 'פעיל' }, ,
    ]
  },
  {
    field: 'typeId',
    values: [
      { value: 1, name: 'ת.ז' },
      { value: 2, name: 'דרכון' },
      { value: 3, name: 'אלמוני' }
    ]
  },  
  {
    field: 'graveStatus',
    values: [
      { value: 0, name: 'פנוי' },
      { value: 1, name: 'נרכש' },
      { value: 2, name: 'קבור' },
    ]
  },  
  {
    field: 'purchaseStatus',
    values: [
      { value: 1, name: 'פתוח' },
      { value: 2, name: 'שולם' },
      { value: 3, name: 'סגור' },
      { value: 4, name: 'בוטל' },
    ]
  },  
  {
    field: 'BookkeepingApproval',
    values: [
      { value: null, name: 'לא' },
      { value: 0, name: 'לא' },
      { value: 1, name: 'כן' },
    ]
  },  
  {
    field: 'isFuneralPayments',
    values: [
      { value: null, name: 'לא' },
      { value: 0, name: 'לא' },
      { value: 1, name: 'כן' },
    ]
  },
];

function GraveManagement({
  grave = {},
  edit = (v) => { console.log('חסרה פעולת עריכה') },
  del = (v) => { console.log('חסרה פעולת מחיקה') },
}) {
  const { dataRefresh, getEntityByAttr } = useQueries();
  const navigate = useNavigate();

  useEffect(() => {
    dataRefresh()
  }, [])

  const localBurials = JSON.parse(localStorage.getItem('dataBurials'));
  const localPurchases = JSON.parse(localStorage.getItem('dataPurchases'));
  const localCustomers = JSON.parse(localStorage.getItem('dataCustomers'));

  const columnsPurchase = useSelector((state) => state.columnsPropertiesPurchases.data);
  const columnsBurial = useSelector((state) => state.columnsPropertiesBurials.data);

  const purchase = mapFieldValues([getEntityByAttr(localPurchases, 'graveId', grave?.id)], optionsFields)[0]
  const burial = mapFieldValues([getEntityByAttr(localBurials, 'graveId', grave?.id)], optionsFields)[0]
  const documents = [];

  const handleButtonClick = async (data) => {
    navigate('/purchaseUpdate', { state: { value: grave, data: purchase } });
  };

  const generateColumns = (data, columns) => {
    return columns.filter(column => data.hasOwnProperty(column.field)).map(column => {
      let value = data[column.field];
      if (column.field === 'clientId') {
        const client = getEntityByAttr(localCustomers, 'id', parseInt(value));
        value = client ? `${client.firstName} ${client.lastName}` : '-----';
      }
      return {
        title: column.headerName,
        value
      };
    });
  };

  const purchaseColumns = purchase ? generateColumns(purchase, columnsPurchase) : [];
  const burialColumns = burial ? generateColumns(burial, columnsBurial) : [];

  const purchaseContent = purchaseColumns.length > 0 ? purchaseColumns : <BtnCreatePurchase graveId={grave} burialContent={burial?.length === 0 ? burial : null } />;
  const burialContent = burialColumns.length > 0 ? burialColumns : <BtnCreateBurial graveId={grave} purchaseContent={purchase?.length === 0 ? purchase : null } />;
  const documentsColumns = documents.length > 0 ? documents : <Typography>אין מסמכים זמינים</Typography>; // Assuming documents is already in the required format

  return (
    <Card raised style={{ marginTop: '10px' }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <Typography variant="h6" component="div" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{`קבר : ${grave?.graveName}`}</div>
              <div>
              <div>{`סטטוס : ${grave?.graveStatus}`}</div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{`סוג חלקה : `}</span>
                  <span >{`${grave?.plotType}`}</span>
                </div>
              </div>
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={edit}><EditIcon /></IconButton>
            <IconButton onClick={del}><DeleteIcon /></IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: '-20px' }}>
          <Grid item md={12} xs={12}>
            <ManagementPortfolio
              purchase={purchaseContent}
              burial={burialContent}
              documents={documentsColumns}
            />
          </Grid>
          <IconButton onClick={() => handleButtonClick({data: purchase})}><EditIcon /></IconButton>
          <IconButton onClick={del}><DeleteIcon /></IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default GraveManagement;
