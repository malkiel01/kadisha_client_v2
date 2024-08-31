import React, { useContext } from 'react'
import useQueries from '../../../database/useQueries'
import { useLocation, useNavigate } from 'react-router-dom'
import { TemplateContext } from '../pagesMains/GravesManagers/Graves'
import { useSelector } from 'react-redux'
import ColumnOrderingGrid from '../../template/table'
import { mapFieldValues, onClickRow } from '../plagins/utility'
import { format } from 'date-fns'
import useDataLoader from './hooks/useDataLoader'
import LoadingOverlay from '../pagesMains/LoadingOverlay'
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks'
import { useEffect } from 'react'
import { GlobalContext } from '../../../App'

const PurchasesHome = () => {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsTablePurchases.data)  

  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr } = useQueries()

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingAreaGraves
   || loadingGraves || loadingRows || loadingCustomers || loadingPurchases 

  // ערכי הראוטר
  const navigate = useNavigate()
  const location = useLocation()
  
  // דרישה לפניה לשרת
  // const dataKeys = [];
  const dataKeysAsync = ['dataPurchases'];
  const loadingAsync = useDataLoader(dataKeysAsync);
  
  // עוקב אחר שליחת נתונים לשרת דרך פונקציית סבמיט
  // const [loadingData, setLoadingData] = useState(loadingAsync);
  
  const { searchText } = useContext(TemplateContext)
  const { setBreadcrumbs, setTitle } = useContext(GlobalContext);
  
  useEffect(() => {
    setBreadcrumbs([])
    setTitle(`רכישות`)
  }, [location.pathname])

  if (loading || loadingAsync) return <LoadingOverlay />

  const mappedData = mapFieldValues(localPurchases, optionsFields).map(item => {
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
        rows={mappedData}
        columns={columns.filter(prop => prop.show)}
        searchText={searchText}
        onRowSelect={(row) => onClickRow(row, () => {}, navigate)}
      />
      <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/PurchasesHome</span></p>
    </>
  )
}

export default PurchasesHome
