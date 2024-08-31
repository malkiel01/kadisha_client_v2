import React, { useContext } from 'react'
import useQueries from '../../../database/useQueries'
import { useLocation, useNavigate } from 'react-router-dom'
import { TemplateContext } from '../pagesMains/GravesManagers/Graves'
import { useSelector } from 'react-redux'
import ColumnOrderingGrid from '../../template/table'
import { format } from 'date-fns'
import { mapFieldValues, onClickRow } from '../plagins/utility'
import useDataLoader from './hooks/useDataLoader'
import LoadingOverlay from '../pagesMains/LoadingOverlay'
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks'
import { GlobalContext } from '../../../App'
import { useEffect } from 'react'

const BurialsHome = () => {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsTableBurials.data)

  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr } = useQueries()

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localBurials, loading: loadingBurials } = useIndexedDBSyncV2('myStore', 'dataBurials');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingRows ||
    loadingAreaGraves || loadingGraves || loadingCustomers || loadingBurials

  // ערכי הראוטר
  const navigate = useNavigate()
  const location = useLocation()

  // דרישה לפניה לשרת
  // const dataKeys = [];
  const dataKeysAsync = ['dataBlocks'];
  const loadingAsync = useDataLoader(dataKeysAsync);

  // עוקב אחר שליחת נתונים לשרת דרך פונקציית סבמיט
  // const [loadingData, setLoadingData] = useState(loadingAsync);

  const { searchText } = useContext(TemplateContext)
  const { setBreadcrumbs, setTitle } = useContext(GlobalContext);
  
  useEffect(() => {
    setBreadcrumbs([])
    setTitle(`נפטרים`)
  }, [location.pathname])

  if (loading || loadingAsync) return <LoadingOverlay />

  const mappedData = mapFieldValues(localBurials, optionsFields).map(item => {
    const client = getEntityByAttr(localCustomers, 'id', item?.clientId)
    const grave = getEntityByAttr(localGraves, 'id', item?.graveId)
    const areaGrave = getEntityByAttr(localAreaGraves, 'gravesList', grave?.areaGraveId)
    const line = getEntityByAttr(localRows, 'id', areaGrave?.lineId)
    const plot = getEntityByAttr(localPlots, 'id', areaGrave?.plotId)
    const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

    const clientId = `${client?.firstName} ${client?.lastName}`
    const dataOpening = item?.dataOpening ? format(new Date(item?.dataOpening), 'dd/MM/yyyy') : ''
    const dateDeath = item?.DateDeath ? format(new Date(item?.DateDeath), 'dd/MM/yyyy') : ''
    const dateBurial = item?.DateBurial ? format(new Date(item?.DateBurial), 'dd/MM/yyyy') : ''
    const timeBurial = item?.timeBurial ? format(new Date(`1970-01-01T${item.timeBurial}`), 'HH:mm') : ''
    const timeDeath = item?.timeDeath ? format(new Date(`1970-01-01T${item.timeDeath}`), 'HH:mm') : ''

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
      dataOpening,
      dateDeath,
      dateBurial,
      timeDeath,
      timeBurial,
    }
  })

  return (
    <>
      <ColumnOrderingGrid
        rows={mappedData}
        columns={columns.filter(prop => prop.show)}
        searchText={searchText}
        onRowSelect={(row) => onClickRow(row, () => { }, navigate)}
      />
      <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/BurialsHome</span></p>
    </>
  )
}

export default BurialsHome
