import React, { useContext } from 'react'
import useQueries from '../../../database/useQueries'
import { useLocation, useNavigate } from 'react-router-dom'
import useQueryGraves from '../../../database/filters/queriesGrave'
import { TemplateContext } from '../pagesMains/GravesManagers/Graves'
import { useSelector } from 'react-redux'
import ColumnOrderingGrid from '../../template/table'
import { mapFieldValues, onClickRow } from '../plagins/utility'
import LoadingOverlay from '../pagesMains/LoadingOverlay'
import useDataLoader from './hooks/useDataLoader'
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks'
import { GlobalContext } from '../../../App'
import { useEffect } from 'react'

const AreaGraveHome = () => {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsTableAreaGraves.data)

  // טעינת היוזים לפונקציות עזר
  const { getSummaryByAreaGrave } = useQueryGraves()
  const { getEntitiesByAttr, getEntityByAttr } = useQueries()

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingRows || loadingAreaGraves || loadingGraves

  // ערכי הראוטר
  const navigate = useNavigate()
  const location = useLocation()
  
  // דרישה לפניה לשרת
  const dataKeys = ['dataCemeteries','dataBlocks','dataPlots','dataRows'];
  const dataKeysAsync = ['dataGraves', 'dataAreaGraves'];
  const loadingAsync = useDataLoader(dataKeysAsync,dataKeys);
  
  // עוקב אחר שליחת נתונים לשרת דרך פונקציית סבמיט
  // const [loadingData, setLoadingData] = useState(loadingAsync);
  
  const { searchText } = useContext(TemplateContext)
  const { setBreadcrumbs, setTitle } = useContext(GlobalContext);
  
  useEffect(() => {
    setBreadcrumbs([{ id: 0, name: 'אחוזות קבר', url: '/areaGrave' }])
    setTitle(`אחוזות קבר`)
  }, [location.pathname]);

  if (loading || loadingAsync) return <LoadingOverlay />

  const addValuesToAreaGraves = () => {
    return localAreaGraves.map(areaGrave => {
      const graves = getEntitiesByAttr(localGraves, 'areaGraveId', areaGrave?.gravesList)

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
        ...areaGrave,
        ...aggregatedSummaries
      };
    });
  };

  const updatedAreaGraves = addValuesToAreaGraves()
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

  const mappedData = mapFieldValues(updatedAreaGraves, optionsFields);

  return (
    <>
        <ColumnOrderingGrid
        rows={mappedData}
        columns={columns.filter(prop => prop.show)}
        searchText={searchText}
        onRowSelect={(row) => onClickRow(row, getSummaryByAreaGrave, navigate)}
      />
      <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/AreaGraveHome</span></p>
    </>
  )
}

export default AreaGraveHome
