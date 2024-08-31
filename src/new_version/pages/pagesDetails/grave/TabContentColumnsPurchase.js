import { useNavigate } from "react-router-dom";
import { useIndexedDBSyncV2 } from "../../../../database/dataLocal/indexedDBHooks";
import useQueries from "../../../../database/useQueries";
import { Box, Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { BtnCreatePurchase, GroupSizesColors } from "./accessoriesStyles";
import ConfirmationDialog from "../../plagins/dialogs/ConfirmationDialog";
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationDialogOnlyOk from "../../plagins/dialogs/ConfirmationDialogOnlyOk";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDialog from "../../plagins/dialogs/customDialog";
import PurchaseUpdatePer2 from "../../pagesUpdate/perrmision2/purchaseUpdate2";
import { useContext } from "react";
import { GlobalContext } from "../../../../App";
import PurchaseTransfer from "../../pagesUpdate/perrmision2/purchaseTransfer";

export const TabContentColumnsPurchase = ({ grave, purchase, burial, columns }) => {

  const { permission } = useContext(GlobalContext)
  const myPermissions = [1]
  const myPermissionsTransfer = [1]
  const myPermissionsCertificate = [1]


  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr, addOrUpdateDataCustomer, addOrUpdateDataGrave, removePurchase } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');

  const navigate = useNavigate();

  const myPurchase = getEntityByAttr(localPurchases, 'id', purchase?.id)

  const editItem = () => {
    navigate('/purchaseUpdate', { state: { grave: grave, value: purchase } });
  };

  // הסרת אחוזת קבר
  const deleteItem = () => {
    function isObjectEmpty(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    let checkEntity = []

    if (!isObjectEmpty(burial)) {
      checkEntity = [...checkEntity, true]
    }

    if (checkEntity?.length > 0) {
      alert('לא ניתן להסיר, קיים תיק מקושר')
    } else {
      setOpenAnswer(true)
      setTitle('מחיקת רכישה')
      setContent('האם את/ה בטוח/ה למחוק את הרכישה?')
    }
  };

  const handleAnswer = (answer) => {
    setOpenAnswer(false)

    if (answer) {
      async function executeQueries() {

        try {
          
          // עדכון נתונים מקומיים
          let updatePurchase = getEntityByAttr(localPurchases, 'id', purchase?.id);
          let updateClient = getEntityByAttr(localCustomers, 'id', purchase?.clientId);
          let updateGrave = getEntityByAttr(localGraves, 'id', purchase?.graveId);
          
          let resAddOrUpdateDataPurchase = removePurchase({
            ...updatePurchase,
            updateGrave: { ...updateGrave, graveStatus: 1 },
            updateClient: { ...updateClient, statusCustomer: 1, graveId: null }
          });


          // מחכה לכל השאילתות ביחד
          let results = await Promise.all([
            resAddOrUpdateDataPurchase,
          ]);

          // בודק אם כל התשובות הן 200
          if (results.every(res => res === 200)) {
            // פעולות לאחר הצלחה
            navigate(-1);
          } else {
            // טיפול במקרה של כישלון
            console.error("אחת או יותר מהשאילתות נכשלה");
          }
        } catch (error) {
          console.error("שגיאה בביצוע השאילתות:", error);
        }
      }

      executeQueries()


    }

  }

  const [openPurchase, setOpenPurchase] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);

  const [openAnswer, setOpenAnswer] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (columns?.length > 0) {
    return (
      <Grid
        container
        direction="column"
        style={{
          height: '100%',
          position: 'relative', // כדי לאפשר מיקום אבסולוטי של האייקונים
        }}
      >
        {/* גריד עליון */}
        <Grid
          item
          style={{
            flex: 1,
          }}
        >
          <Grid container spacing={2}>
            {columns.map((column, index) => (
              <Grid item xs={4} key={index}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography color="textSecondary">
                    <span style={{ fontWeight: 'bold' }}>{column?.title}</span>
                    <span>{`: `}</span>
                    <span>{column?.value}</span>
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* אייקונים של עריכה ומחיקה בפינה העליונה השמאלית */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            display: 'flex',
            gap: 1,
          }}
        >
          {
            ((permission === 0) || (myPermissions.includes(permission)))
            &&
            <>
              <Tooltip title="עריכה">
                <IconButton onClick={editItem} sx={{ color: 'lightblue' }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="מחיקה">
                <IconButton onClick={deleteItem} sx={{ color: 'lightcoral' }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          }
        </Box>

        {/* גריד תחתון */}
        <Grid item>
          <GroupSizesColors buttons={
            [
              <Button
                key="one"
                onClick={() => setOpenPurchase(true)}
                disabled={(permission === 0) ? false : (permission === 3 ? (myPurchase?.purchaseStatus === 3) : true)}
              >
                אישור הנה״ח
              </Button>,
              <Button
                key="three"
                onClick={() => setOpenCertificate(true)}
                disabled={(permission === 0) ? false : !(myPermissionsCertificate.includes(permission) && myPurchase?.BookkeepingApproval === 2)}
              >
                הפקת שטר קבורה
              </Button>,
              <Button
                key="four"
                onClick={() => setOpenTransfer(true)}
                disabled={(permission === 0) ? false : !(myPermissionsTransfer.includes(permission) && myPurchase?.BookkeepingApproval === 2)}
              >
                העברת בעלות
              </Button>,
            ]
          } />
        </Grid>

        {/* דיאלוג לאישור מחיקה */}
        <CustomDialog open={openPurchase} handleClose={() => setOpenPurchase(false)} title={'רכישת קבר'}>
          <PurchaseUpdatePer2 plotId={1} value={myPurchase} handleClose={() => setOpenPurchase(false)} />
        </CustomDialog>

        {/* דיאלוג להנפקת שטר */}
        <CustomDialog open={openCertificate} handleClose={() => setOpenCertificate(false)} title={'הפקת שטר'}>
          {/* <PurchaseUpdatePer2 plotId={1} value={myPurchase} /> */}
        </CustomDialog>

        {/* דיאלוג להעברת בעלות */}
        <CustomDialog open={openTransfer} handleClose={() => setOpenTransfer(false)} title={'העברת בעלות'}>
          <PurchaseTransfer plotId={1} value={myPurchase} handleClose={() => setOpenTransfer(false)}  />
        </CustomDialog>

        {/* דיאלוג מחיקה */}
        <ConfirmationDialogOnlyOk open={openAnswer} title={title} content={content} onAnswer={handleAnswer} />

      </Grid>
    );
  } else {
    return <BtnCreatePurchase graveId={grave} content={burial} />;
  }
};