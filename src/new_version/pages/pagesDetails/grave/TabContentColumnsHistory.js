import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { TemplateContext } from '../pagesMains/GravesManagers/Graves';
// import CustomCard from '../../reports/summery/detais_new/details_new';
// import useQueryGraves from '../../../database/filters/queriesGrave';
// import useQueries from '../../../database/useQueries';
// import ColumnOrderingGrid from '../../template/table';
// import { onClickRow, mapFieldValues } from '../plagins/utility';
// import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
// import useDataLoader from '../pagesHome/hooks/useDataLoader';
// import LoadingOverlay from '../pagesMains/LoadingOverlay';
// import { GlobalContext } from '../../../App';
import { useEffect } from 'react';
import { useState } from 'react';
import useQueries from '../../../../database/useQueries';
import useQueryGraves from '../../../../database/filters/queriesGrave';
import { useIndexedDBSyncV2 } from '../../../../database/dataLocal/indexedDBHooks';
import useDataLoader from '../../pagesHome/hooks/useDataLoader';
import { TemplateContext } from '../../pagesMains/GravesManagers/Graves';
import { GlobalContext } from '../../../../App';
import ColumnOrderingGrid from '../../../template/table';
import ConfirmationDialog from '../../plagins/dialogs/ConfirmationDialog';
import { mapFieldValues, onClickRow } from '../../plagins/utility';
import LoadingOverlay from '../../pagesMains/LoadingOverlay';
import CustomCard from '../../../reports/summery/detais_new/details_new';
import { format } from 'date-fns';
// import ConfirmationDialog from '../plagins/dialogs/ConfirmationDialog';

const TabContentColumnsHistory = ({grave}) => {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsTablePurchases.data);
  const properties = useSelector((state) => state.columnsPropertiesPurchases.data);

  // טעינת היוזים לפונקציות עזר
  const { getSummaryByAreaGrave } = useQueryGraves();
  const { getEntitiesByAttr, getEntityByAttr, AllDataPurchasesOld, removePlot } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localPurchasesOld, loading: loadingPurchasesOld } = useIndexedDBSyncV2('myStore', 'dataPurchasesOld');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingRows ||
    loadingAreaGraves || loadingGraves || loadingPurchases || loadingCustomers || loadingPurchasesOld


  // ערכי הראוטר
  const navigate = useNavigate();

  // דרישה לפניה לשרת
  const dataKeys = ['dataCemeteries', 'dataBlocks', 'dataRows'];
  const dataKeysAsync = ['dataPlots', 'dataGraves', 'dataAreaGraves'];
  const loadingAsync = useDataLoader(dataKeysAsync, dataKeys);

  // עוקב אחר שליחת נתונים לשרת דרך פונקציית סבמיט
  // const [loadingData, setLoadingData] = useState(loadingAsync);

  const { searchText } = useContext(TemplateContext);

  if (loading || loadingAsync) return <LoadingOverlay />



  const addValuesToAreaGraves = (areaGraves) => {
    return areaGraves.map(areaGrave => {
      const graves = getEntitiesByAttr(localGraves, 'areaGraveId', areaGrave?.gravesList)

      let aggregatedSummaries = graves.reduce((acc, grave) => {
        // סיכום ערכי graveStatus
        if (grave.graveStatus === 1) acc.available += 1;
        if (grave.graveStatus === 2) acc.purchased += 1;
        if (grave.graveStatus === 3) acc.buried += 1;
        if (grave.graveStatus === 4) acc.saved += 1;
        if (grave.graveStatus || grave.graveStatus === 0) acc.graveSum += 1;

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
        ...areaGrave,
        ...aggregatedSummaries
      };
    });
  };

  const updatedAreaGraves = addValuesToAreaGraves(getEntitiesByAttr(localPurchasesOld, 'graveId', grave?.id))
    .map(item => {
      
      const graves = getEntitiesByAttr(localGraves, 'areaGraveId', item?.gravesList)
      const plot = getEntityByAttr(localPlots, 'id', item?.plotId)
      const row = getEntityByAttr(localRows, 'plotId', item?.plotId)
      const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
      const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

      const cemeteryId = cemetery?.cemeteryNameHe
      const blockId = block?.blockNameHe
      const plotId = plot?.plotNameHe
      const lineId = row?.lineNameHe
      const gravesCount = graves?.length


      return {
        ...item,
        cemeteryId,
        blockId,
        plotId,
        lineId,
        gravesCount
      }
    })

  // const mappedData = mapFieldValues(updatedAreaGraves, optionsFields);

  const mappedData = mapFieldValues(localPurchasesOld, optionsFields).map(item => {
    const client = getEntityByAttr(localCustomers, 'id', item?.clientId)
    const grave = getEntityByAttr(localGraves, 'id', item?.graveId)
    const areaGrave = getEntityByAttr(localAreaGraves, 'gravesList', grave?.areaGraveId)
    const line = getEntityByAttr(localRows, 'id', areaGrave?.lineId)
    const plot = getEntityByAttr(localPlots, 'id', areaGrave?.plotId)
    const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

    const clientId = `${client?.firstName} ${client?.lastName}`
    const dateOpening = format(new Date(item?.dateOpening), 'dd/MM/yyyy')

    const graveId = grave?.graveName
    const areaGraveId = areaGrave?.nameGrave
    const lineId = line?.lineNameHe
    const plotId = plot?.plotNameHe
    const blockId = block?.blockNameHe
    const cemeteryId = cemetery?.cemeteryNameHe

    return {
      ...item,
      graveId,
      areaGraveId,
      lineId,
      plotId,
      blockId,
      cemeteryId,
      clientId,
      dateOpening
    }
  })

  return (
    <>
      <ColumnOrderingGrid
        gridHeight={360}
        rows={mappedData}
        columns={columns.filter(prop => prop.show)}
        searchText={searchText}
        onRowSelect={(row) => onClickRow(row, getSummaryByAreaGrave, navigate)}
      />
   </>
  );
};

export default TabContentColumnsHistory;
