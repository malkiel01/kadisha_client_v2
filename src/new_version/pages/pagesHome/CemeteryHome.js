import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ColumnOrderingGrid from '../../template/table';
import useQueries from '../../../database/useQueries';
import useQueryGraves from '../../../database/filters/queriesGrave';
import { TemplateContext } from '../pagesMains/GravesManagers/Graves';
import { mapFieldValues, onClickRow } from '../plagins/utility';
import { useDataLoader } from './hooks/useDataLoader';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import { GlobalContext } from '../../../App';
import { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';

const CemeteryHome = () => {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsTableCemeteries.data);

  // טעינת היוזים לפונקציות עזר
  const { getEntitiesByAttr } = useQueries();
  const { getSummaryByCemetery } = useQueryGraves();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingAreaGraves || loadingGraves

  // ערכי הראוטר
  const navigate = useNavigate()
  const location = useLocation();

  // דרישה לפניה לשרת
  // const dataKeys = [];
  const dataKeysAsync = ['dataCemeteries'];
  const loadingAsync = useDataLoader(dataKeysAsync)

  const { searchText, setTotalWidthContainer } = useContext(TemplateContext);
  const { setBreadcrumbs, setTitle } = useContext(GlobalContext);
  
    useEffect(() => {
      setTotalWidthContainer(1400)
      setBreadcrumbs([{ id: 0, name: `בתי עלמין`, icon: <HomeIcon fontSize="small" /> , url: '/cemetery' }])
      setTitle(`בתי עלמין`)
    }, [location.pathname]);

  if (loading || loadingAsync) return <LoadingOverlay />

  const addValuesToCemeteries = () => {
    return localCemeteries.map(cemetery => {
      const blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', cemetery?.id);
      const plots = localPlots.filter(plot => blocks.some(block => block?.id === plot?.blockId));
      const areaGraves = localAreaGraves.filter(areaGrave => plots.some(plot => plot?.id === areaGrave?.plotId));
      const graves = localGraves.filter(grave => areaGraves.some(areaGrave => areaGrave?.gravesList === grave?.areaGraveId));

      let aggregatedSummaries = graves.reduce((acc, grave) => {
        
        // סיכום ערכי graveStatus
        if (grave.graveStatus === 1) acc.available += 1;
        if (grave.graveStatus === 2) acc.purchased += 1;
        if (grave.graveStatus === 3) acc.buried += 1;
        if (grave.graveStatus === 4) acc.saved += 1;
        if (grave.graveStatus || grave.graveStatus === 1) acc.graveSum += 1;

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
        ...cemetery,
        ...aggregatedSummaries
      };
    });
  };

  const updatedCemeteries = addValuesToCemeteries(localCemeteries);

  const mappedData = mapFieldValues(updatedCemeteries, optionsFields);

  return (
    <>
      <ColumnOrderingGrid
        rows={mappedData}
        columns={columns.filter(prop => prop.show)}
        searchText={searchText}
        onRowSelect={(row) => onClickRow(row, getSummaryByCemetery, navigate)}
      />
      <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/CemeteryHome</span></p>
    </>
  );
};

export default CemeteryHome;
