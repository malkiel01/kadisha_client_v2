import React, { useState } from 'react';
import { CardContent, Typography, Grid } from '@mui/material';
import ManagementPortfolio from './grave/ManagementPortfolio';
import useQueries from '../../../database/useQueries';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { mapFieldValues } from '../plagins/utility';
import GraveDocuments from '../plagins/documents/GraveDocuments';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import useDataLoader from '../pagesHome/hooks/useDataLoader';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { format, parseISO } from 'date-fns';
import { AttachedDocuments } from './grave/accessoriesStyles';
import { TabContentColumnsPurchase } from './grave/TabContentColumnsPurchase';
import { useContext } from 'react';
import { GlobalContext } from '../../../App';
import { TabContentColumnsBurial } from './grave/TabContentColumnsBurial';
import TabContentColumnsHistory from './grave/TabContentColumnsHistory';
import { formatPriceIL } from '../plagins/data/commponentOptions';

function GraveDetail({ grave = {} }) {
  const { permission } = useContext(GlobalContext);
  
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columnsPurchase = useSelector((state) => state.columnsPropertiesPurchases.data);
  const columnsBurial = useSelector((state) => state.columnsPropertiesBurials.data);

  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');
  const { data: localBurials, loading: loadingBurials } = useIndexedDBSyncV2('myStore', 'dataBurials');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCustomers || loadingPurchases || loadingBurials


  const dataKeys = ['dataCustomers', 'dataPurchases', 'dataBurials']
  const dataKeysAsync = []
  const loadingAsync = useDataLoader([], dataKeys);

  // שמירה על מצב העמודות
  const [purchaseContent, setPurchaseContent] = useState(null);
  const [burialContent, setBurialContent] = useState(null);

  const [purchase, setPurchase] = useState(null);
  const [burial, setBurial] = useState(null);

  useEffect(() => {
    if (!loading) {

      const purchase = mapFieldValues([getEntityByAttr(localPurchases, 'graveId', grave?.id)], optionsFields)[0];
      const burial = mapFieldValues([getEntityByAttr(localBurials, 'graveId', grave?.id)], optionsFields)[0];

      // console.log('purchase: ',purchase);
      // console.log('burial: ',burial);
      

      setPurchase(purchase)
      setBurial(burial)

      const generateColumns = (data, columns) => {
        if (Object.keys(data).length !== 0) {
          return columns
            .map((column) => {
              let value = data[column.field];
              if (column.field === 'clientId') {
                const client = getEntityByAttr(localCustomers, 'id', parseInt(value));
                value = client ? `${client.firstName} ${client.lastName}` : '-----';
              }
              if (column.field === 'dateOpening' || column.field === 'PaymentEndDate' || column.field === 'reportingBL' || column.field === 'dateBurial') {
                try {
                  const date = parseISO(value);
                  value = format(date, 'dd/MM/yyyy');
                } catch (error) {
                  value = ''; // ערך לא תקין, אפשר להחזיר ערך ריק או מה שמתאים לך
                }
              }
              if (column.field === 'numOfPayments') {
                if (data[column.field] === 0 || data[column.field] === null || data[column.field] === undefined || data[column.field] === '') {
                  value = 1
                }
              }
              if (column.field === 'spacious') {
                return null
              }
              if (column.field === 'price') {
                value = formatPriceIL(data[column.field])
              }
              return {
                title: column.headerName,
                value
              };
            });
        }

      };

      setPurchaseContent(purchase ? generateColumns(purchase, columnsPurchase) : [])

      setBurialContent(burial ? generateColumns(burial, columnsBurial) : [])
    }
  }, [loading, localPurchases, localBurials]);


  if (loading || loadingAsync) return <LoadingOverlay />

  const myPermissionsPurchase = [1, 3]
  const myPermissionsBurial = [1, 3]
  const myPermissionsDocuments = [1]
  const myPermissionsAttachedDocuments = [1]

  const tabsData = [
    {
      label: 'רכישה', content: <TabContentColumnsPurchase grave={grave} purchase={purchase} burial={burial} columns={purchaseContent} />,
      disabled: (permission === 0) ? false : !myPermissionsPurchase.includes(permission)
    },
    {
      label: 'קבורה', content: <TabContentColumnsBurial grave={grave} purchase={purchase} burial={burial} columns={burialContent} />,
      disabled: (permission === 0) ? false : !myPermissionsBurial.includes(permission)
    },
    {
      label: 'מסמכים', content: <GraveDocuments grave={grave} purchaseContent={purchaseContent} burialContent={burialContent} />,
      disabled: (permission === 0) ? false : !myPermissionsDocuments.includes(permission)
    },
    {
      label: 'צרופות', content: <AttachedDocuments grave={grave} />,
      disabled: (permission === 0) ? false : !myPermissionsAttachedDocuments.includes(permission)
    }, // ניתן להוסיף עוד טאבים כאן
    {
      label: 'הסטורית התנהלות', content: <TabContentColumnsHistory grave={grave} />,
      disabled: (permission === 0) ? false : !myPermissionsAttachedDocuments.includes(permission)
    }, // ניתן להוסיף עוד טאבים כאן
  ];

  return (
    <>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <Typography variant="h6" component="div" style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'right' }}
            >
              <div>{`קבר : ${grave?.graveName}`}</div>
              <div>
                <span style={{ fontWeight: 'bold' }}>{`סטטוס : `}</span>
                <span>{`${grave?.graveStatus}`}</span>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{`סוג חלקה : `}</span>
                  <span >{`${grave?.plotType}`}</span>
                </div>
              </div>
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" >
          <ManagementPortfolio tabs={tabsData} />
        </Grid>
      </CardContent>
    </>
  );
}

export default GraveDetail;
