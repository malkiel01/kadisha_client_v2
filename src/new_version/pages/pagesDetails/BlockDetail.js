import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../App';
import { useSelector } from 'react-redux';
import { TemplateContext } from '../pagesMains/GravesManagers/Graves';
import CustomCard from '../../reports/summery/detais_new/details_new';
import useQueryGraves from '../../../database/filters/queriesGrave';
import useQueries from '../../../database/useQueries';
import ColumnOrderingGrid from '../../template/table';
import { onClickRow, mapFieldValues } from '../plagins/utility';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import useDataLoader from '../pagesHome/hooks/useDataLoader';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { useEffect } from 'react';
import { useState } from 'react';
import ConfirmationDialog from '../plagins/dialogs/ConfirmationDialog';

const BlockDetail = () => {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsTablePlots.data)
  const properties = useSelector((state) => state.columnsPropertiesBlocks.data)

  // טעינת היוזים לפונקציות עזר
  const { getSummaryByPlot } = useQueryGraves();
  const { getEntitiesByAttr, getEntityByAttr, removeAreaGrave, removePlot, removeBlock } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');
  const { data: localBurials, loading: loadingBurials } = useIndexedDBSyncV2('myStore', 'dataBurials');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingAreaGraves || loadingGraves ||
    loadingPurchases || loadingBurials

  // ערכי הראוטר
  const navigate = useNavigate();
  const location = useLocation();
  const { value, data, summaries } = location.state || {};

  // דרישה לפניה לשרת
  const dataKeys = ['dataCemeteries'];
  const dataKeysAsync = ['dataBlocks', 'dataPlots', 'dataGraves', 'dataAreaGraves'];
  const loadingAsync = useDataLoader(dataKeysAsync, dataKeys);

  // עוקב אחר שליחת נתונים לשרת דרך פונקציית סבמיט
  // const [loadingData, setLoadingData] = useState(loadingAsync);

  const { searchText } = useContext(TemplateContext);
  const { setBreadcrumbs, breadcrumbs, setTitle } = useContext(GlobalContext);

  useEffect(() => {
    if (!loading) {
      console.log(localPlots);

      const pathSegments = location.pathname.split('/').filter(Boolean); // חילוץ המקטעים מה-URL

      // ביצוע פעולות על פי המקטעים
      if (pathSegments.length > 0) {
        const subSegments = pathSegments.slice(1); // לדוגמה, ['4', '3', '2']

        const block = getEntityByAttr(localBlocks, 'id', value?.id);

        let temp = breadcrumbs
        // שמירת האיברים הראשונים עד לאורך של subSegments
        temp = temp.slice(0, subSegments.length);
        temp = [...temp,
        {
          id: (temp.length > 0 ? temp[temp.length - 1].id : 0) + 1,
          name: block?.blockNameHe,
          url: location.pathname,
          state: location.state
        }
        ]

        setBreadcrumbs(temp)
        setTitle(`גוש ${block?.blockNameHe}`)
      }
    }
  }, [loading, location.pathname]);

  // סטייט לפופאפ האישור
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  if (loading || loadingAsync) return <LoadingOverlay />

  const handleButtonUpdate = () => {
    navigate('/blockUpdate', { state: { value: value } });
  };


  const addValuesToPlots = (plots) => {
    return plots.map(plot => {
      const areaGraves = getEntitiesByAttr(localAreaGraves, 'plotId', plot?.id)
      const graves = localGraves.filter(grave => areaGraves.some(areaGrave => areaGrave?.gravesList === grave?.areaGraveId));

      let aggregatedSummaries = graves.reduce((acc, grave) => {
        // סיכום ערכי graveStatus
        if (grave.graveStatus === 1) acc.available += 1;
        if (grave.graveStatus === 2) acc.purchased += 1;
        if (grave.graveStatus === 3) acc.buried += 1;
        if (grave.graveStatus === 4) acc.saved += 1;
        if (grave.graveStatus || grave.graveStatus === 3) acc.graveSum += 1;

        // סיכום ערכי plotType
        if (grave.plotType === 1) acc.plotExempt += 1;
        if (grave.plotType === 2) acc.plotUnusual += 1;
        if (grave.plotType === 3) acc.plotClose += 1;

        return acc;
      }, {
        plotClose: 0,
        plotUnusual: 0,
        plotExempt: 0,
        available: 0,
        purchased: 0,
        buried: 0,
        saved: 0,
        graveSum: 0
      });

      return {
        ...plot,
        ...aggregatedSummaries
      };
    });
  };

  // דוגמה לשימוש בפונקציה
  const updatedPlots = addValuesToPlots(getEntitiesByAttr(localPlots, 'blockId', value?.id)).map(item => {
    const block = getEntityByAttr(localBlocks, 'id', item?.blockId)
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

    const cemeteryId = cemetery?.cemeteryNameHe
    const blockId = block?.blockNameHe

    return {
      ...item,
      cemeteryId,
      blockId
    }
  })

  const mappedData = mapFieldValues(updatedPlots, optionsFields);

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  // כאשר המשתמש עונה בדיאלוג
  const handleAnswer = (answer) => {
    setOpenConfirmDialog(false);
    if (answer) {
      // כאן מבצעים את פעולת המחיקה
      const block = getEntityByAttr(localBlocks, 'id', value?.id)
      const plots = getEntitiesByAttr(localPlots, 'blockId', block?.id)
      const areaGraves = localAreaGraves.filter(areaGrave =>
        plots.some(plot => plot.id === areaGrave.plotId)
      );

      areaGraves.forEach(item => { removeAreaGrave({ id: item?.id }) });
      plots.forEach(item => { removePlot({ id: item?.id }) });
      removeBlock({ id: block?.id });
      navigate(-1);
    }
  };


  // הסרת אחוזת קבר
  const deleteItem = () => {

    const block = getEntityByAttr(localBlocks, 'id', value?.id)
    const plots = getEntitiesByAttr(localPlots, 'blockId', block?.id)
    const areaGraves = localAreaGraves.filter(areaGrave =>
      plots.some(plot => plot.id === areaGrave.plotId)
    );
    const graves = localGraves.filter(grave =>
      areaGraves.some(areaGrave => areaGrave.gravesList.includes(grave.areaGraveId))
    );

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
    <>
      <CustomCard data={properties} value={value} summaries={summaries} edit={handleButtonUpdate} handleDelete={deleteItem} />
      <ColumnOrderingGrid
        rows={mappedData}
        columns={columns.filter(prop => prop.show)}
        searchText={searchText}
        onRowSelect={(row) => onClickRow(row, getSummaryByPlot, navigate)}
      />

      {/* דיאלוג לאישור מחיקה */}
      <ConfirmationDialog
        open={openConfirmDialog}
        title="אישור מחיקה"
        content="האם את/ה בטוח שברצונך להסיר את הגוש?"
        onAnswer={handleAnswer}
      />

      <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/BlockDetail</span></p>
    </>
  );
};

export default BlockDetail;
