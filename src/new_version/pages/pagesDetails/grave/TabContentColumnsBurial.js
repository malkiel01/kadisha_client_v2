import { useNavigate } from "react-router-dom";
import { useIndexedDBSyncV2 } from "../../../../database/dataLocal/indexedDBHooks";
import useQueries from "../../../../database/useQueries";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { BtnCreateBurial } from "./accessoriesStyles";
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationDialogOnlyOk from "../../plagins/dialogs/ConfirmationDialogOnlyOk";
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from "react";
import { GlobalContext } from "../../../../App";

export const TabContentColumnsBurial = ({ grave, purchase, burial, columns }) => {
  const navigate = useNavigate()

  const { permission } = useContext(GlobalContext)
  const myPermissions = [1]

  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr, removeBurial } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');

  const [openAnswer, setOpenAnswer] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const editItem = () => {
    navigate('/burialUpdate', { state: { grave: grave, value: burial } });
  };

  const deleteItem = () => {
    setOpenAnswer(true)
    setTitle('מחיקת קבורה')
    setContent('האם את/ה בטוח/ה למחוק את הקבורה?')
  }

  const handleAnswer = (answer) => {
    setOpenAnswer(false)

    if (answer) {
      async function executeQueries() {

        function isObjectEmpty(obj) {
          return obj === undefined || Object.keys(obj).length === 0 && obj.constructor === Object;
        }

        try {
          navigate(-1);


          // עדכון נתונים מקומיים
          let updatePurchase = getEntityByAttr(localPurchases, 'graveId', burial?.graveId);
          let updateClient = getEntityByAttr(localCustomers, 'id', burial?.clientId);
          let updateGrave = getEntityByAttr(localGraves, 'id', burial?.graveId);

          // הוספת נתוני הקבר, הלקוח, והחתימות למבנה הנתונים שנשלח לשרת
          const requestData = {
            ...burial,

          };

          if (!isObjectEmpty(updatePurchase)) {
            // יש רכישה
            updateGrave = { ...updateGrave, graveStatus: 2 }
            updateClient = { ...updateClient, statusCustomer: 2 }

          } else {
            // אין רכישה
            updateGrave = { ...updateGrave, graveStatus: 1 }
            updateClient = { ...updateClient, statusCustomer: 1, graveId: null }
          }

          // שאילתה ראשונה
          let resAddOrUpdateDataBurial = removeBurial({
            ...burial,
            updateGrave,
            updateClient
          });

          // מחכה לכל השאילתות ביחד
          let results = await Promise.all([
            resAddOrUpdateDataBurial,
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
            flex: 1, // תופס את כל הגובה הפנוי
          }}
        >
          <Grid container spacing={2}>
            {columns.map((column, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <Box sx={{ textAlign: 'left' }}>
                    {
                      column &&
                      <Typography color="textSecondary">
                        <span style={{ fontWeight: 'bold' }}>{column?.title}</span>
                        <span>{`: `}</span>
                        <span>{column?.value}</span>
                      </Typography>
                    }
                  </Box>
                </Grid>
              )
            })}
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
            ((permission === 0) ? true : (myPermissions.includes(permission)))
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
        </Grid>

        {/* דיאלוג להעברת בעלות */}
        <ConfirmationDialogOnlyOk open={openAnswer} content={content} onAnswer={handleAnswer} />

      </Grid>
    );
  } else {
    return <BtnCreateBurial graveId={grave} />
  }
};