import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useQueries from '../../../database/useQueries';
import { mapFieldValues } from '../plagins/utility';
import { useSelector } from 'react-redux';
import Header from './areaGrave/Header';
import CardContentColumns from './areaGrave/CardContentColumns';
import GraveDetail from './GraveDetail';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import useDataLoader from '../pagesHome/hooks/useDataLoader';
import { useContext } from 'react';
import { GlobalContext } from '../../../App';
import DraggableList from '../pagesTesting/handleToggleExpand';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import ConfirmationDialog from '../plagins/dialogs/ConfirmationDialog';


const AreaGraveDetail = () => {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data);
  const properties = useSelector((state) => state.columnsPropertiesAreaGraves.data);

  // טעינת היוזים לפונקציות עזר
  const { getEntitiesByAttr, getEntityByAttr, AllDataGraves, AllDataAreaGraves, removeAreaGrave } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');
  const { data: localBurials, loading: loadingBurials } = useIndexedDBSyncV2('myStore', 'dataBurials');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingAreaGraves || loadingGraves || loadingPlots || loadingBlocks || loadingCemeteries || loadingPurchases || loadingBurials

  // ערכי הראוטר
  const location = useLocation()
  const navigate = useNavigate()
  const { value } = location.state || {};

  // דרישה לפניה לשרת
  const dataKeys = ['dataCemeteries', 'dataBlocks', 'dataPlots'];
  const dataKeysAsync = ['dataGraves', 'dataAreaGraves'];
  const loadingAsync = useDataLoader(dataKeysAsync, dataKeys);

  // עוקב אחר שליחת נתונים לשרת דרך פונקציית סבמיט
  const [loadingData, setLoadingData] = useState(loadingAsync);

  const getNmeImage = (id) => {

    const areaGrave = getEntityByAttr(localAreaGraves, 'id', value?.id)
    const plot = getEntityByAttr(localPlots, 'id', areaGrave?.plotId)
    const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

    return `${cemetery?.id}-${block?.id}-${plot?.id}-${value?.id}`
  }

  const { setBreadcrumbs, breadcrumbs, setTitle, permission } = useContext(GlobalContext);

  // useEffect לביצוע פעולות טעינת נתונים מהדאטה בייס המקומי במידת הצורך
  useEffect(() => {
    if (!loading) { // בדיקה אם הטעינה הסתיימה
      const fetchData = async () => {
        let countGraves = 5; // הגדרת משתנה ספירה עבור קברים
        let countAreaGraves = 5; // הגדרת משתנה ספירה עבור אזורי קברים

        do {
          if (localGraves?.length === 0) { // בדיקה אם נתוני הקברים ריקים
            countGraves += 1; // הגדלת משתנה הספירה
            setLoadingData(true); // הגדרת מצב טעינה ל-true
            await AllDataGraves(); // קריאה אסינכרונית לטעינת נתוני קברים מהדאטה בייס
            setLoadingData(false); // הגדרת מצב טעינה ל-false לאחר סיום הטעינה
          } else {
            setLoadingData(false); // הגדרת מצב טעינה ל-false אם הנתונים לא ריקים
            countGraves = 0; // איפוס ספירת הנסיונות אם הנתונים נטענו בהצלחה
          }
          // getNmeImage()
        } while (countGraves > 0); // חזרה על הלולאה עד שהנתונים נטענו או שהספירה נגמרה

        do {
          if (localAreaGraves?.length === 0) { // בדיקה אם נתוני אזורי הקברים ריקים
            countAreaGraves += 1; // הגדלת משתנה הספירה
            setLoadingData(true); // הגדרת מצב טעינה ל-true
            await AllDataAreaGraves(); // קריאה אסינכרונית לטעינת נתוני אזורי קברים מהדאטה בייס
            setLoadingData(false); // הגדרת מצב טעינה ל-false לאחר סיום הטעינה
          } else {
            setLoadingData(false); // הגדרת מצב טעינה ל-false אם הנתונים לא ריקים
            countAreaGraves = 0; // איפוס ספירת הנסיונות אם הנתונים נטענו בהצלחה
          }
        } while (countAreaGraves > 0); // חזרה על הלולאה עד שהנתונים נטענו או שהספירה נגמרה
      };

      fetchData(); // קריאת הפונקציה fetchData
    }
  }, [loading, localGraves]); // תלות היחידה ב-loading, הפונקציה תתבצע מחדש כל פעם ש-loading יתעדכן


  useEffect(() => {
    if (!loading) {
      const pathSegments = location.pathname.split('/').filter(Boolean); // חילוץ המקטעים מה-URL

      // ביצוע פעולות על פי המקטעים
      if (pathSegments.length > 0) {
        const subSegments = pathSegments.slice(1); // לדוגמה, ['4', '3', '2']

        const areaGrave = getEntityByAttr(localAreaGraves, 'id', value?.id);

        let temp = breadcrumbs
        // שמירת האיברים הראשונים עד לאורך של subSegments
        temp = temp.slice(0, subSegments.length);
        temp = [...temp,
        {
          id: (temp.length > 0 ? temp[temp.length - 1].id : 0) + 1,
          name: `אחוזת קבר ${areaGrave?.nameGrave}`,
          url: location.pathname,
          state: location.state
        }
        ]

        setBreadcrumbs(temp)
        setTitle(`אחוזת קבר ${areaGrave?.nameGrave}`)
      }
    }
  }, [loading, location.pathname]);

  // סטייט לפופאפ האישור
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  if (loading || loadingData) return <LoadingOverlay />

  // מסדר את הקברים
  const mappedFloors = mapFieldValues(getEntitiesByAttr(localGraves, 'areaGraveId', value?.gravesList), optionsFields)
    .sort((a, b) => {
      if (a.graveName < b.graveName) return -1;
      if (a.graveName > b.graveName) return 1;
      return 0;
    });

  // השדות
  const columns = properties
    .filter(prop => prop.show)
    .map(prop => {
      let fieldValue = value[prop?.field] || '';

      return { id: prop?.id, name: prop?.field, title: prop?.headerName, value: fieldValue }
    });

  const handleButtonUpdate = () => {
    navigate('/areaGraveUpdate', { state: { value: value } });
  };


  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  // כאשר המשתמש עונה בדיאלוג
  const handleAnswer = (answer) => {
    setOpenConfirmDialog(false);
    if (answer) {
      // כאן מבצעים את פעולת המחיקה
      const areaGrave = getEntityByAttr(localAreaGraves, 'id', value?.id)
      removeAreaGrave({ id: areaGrave?.id });
      navigate(-1);
    }
  };

  // הסרת אחוזת קבר
  const deleteItem = () => {
    const areaGrave = getEntityByAttr(localAreaGraves, 'id', value?.id)
    const graves = getEntitiesByAttr(localGraves, 'areaGraveId', areaGrave?.gravesList)

    let checkEntity = []
    graves.forEach(grave => {
      let temp = getEntityByAttr(localBurials, 'graveId', grave?.id) ||
        getEntityByAttr(localPurchases, 'graveId', grave?.id) || null
      if (temp !== null) {
        checkEntity = [...checkEntity, temp]
      }
    });
    if (checkEntity?.length > 0) {
      alert('לא ניתן להסיר, קיים תיק מקושר')
    } else {
      handleOpenConfirmDialog(); // פותח את הדיאלוג לאישור המחיקה
    }
  };

  return (
    <Card raised style={{ background: '#f8f9fa' }}>
      <CardContent>
        <Header columns={columns} value={value} handleButtonUpdate={handleButtonUpdate} handleDelete={deleteItem} permission={(permission === 0) ? false : (permission !== 1)}/>
        <CardContentColumns columns={columns} value={value} image={getNmeImage()} />
        <Divider sx={{
          marginTop: '15px',
          marginBottom: 0,
          width: '100%',
          height: '0.5px',
          bgcolor: 'grey.700', // אפור כהה
          boxShadow: '0px 0px 4px 4px rgba(0,0,0,0.3)',
        }} />
        {/* כרטיסים פנימיים */}
        {

          <DraggableList items={
            mappedFloors?.map((grave, index) => {
              return (
                {
                  id: index,
                  name: `קבר : ${grave?.graveName}`,
                  status: grave?.graveStatus,
                  description: <GraveDetail key={index} grave={grave} />
                }
              )
            })

          } />
        }
      </CardContent>

      {/* דיאלוג לאישור מחיקה */}
      <ConfirmationDialog
        open={openConfirmDialog}
        title="אישור מחיקה"
        content="האם את/ה בטוח שברצונך להסיר את אחוזת הקבר?"
        onAnswer={handleAnswer}
      />

      <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/AreaGraveDetail</span></p>
    </Card>
  );
};

export default AreaGraveDetail;
