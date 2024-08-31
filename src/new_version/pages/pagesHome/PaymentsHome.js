import React, { useContext } from 'react'
import useQueries from '../../../database/useQueries'
import { useLocation, useNavigate } from 'react-router-dom'
import { TemplateContext } from '../pagesMains/GravesManagers/Graves'
import { useSelector } from 'react-redux'
import ColumnOrderingGrid from '../../template/table'
import { format } from 'date-fns'
import { mapFieldValues, onClickRow } from '../plagins/utility'
import LoadingOverlay from '../pagesMains/LoadingOverlay'
import useDataLoader from './hooks/useDataLoader'
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks'
import { GlobalContext } from '../../../App'
import { useEffect } from 'react'

const PaymentsHome = () => {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsTablePayments.data)

  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr } = useQueries()

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localPayments, loading: loadingPayments } = useIndexedDBSyncV2('myStore', 'dataPayments');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingRows || loadingPayments

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
    setTitle(`מחירים`)
  }, [location.pathname])

  if (loading || loadingAsync) return <LoadingOverlay />

  const formatPrice = (price) => {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(price);
  };

  const mappedData = mapFieldValues(localPayments, optionsFields).map(payment => {

    const cemeteryName = payment?.cemeteryId && payment?.cemeteryId !== -1
      ? getEntityByAttr(localCemeteries, 'id', payment.cemeteryId)?.cemeteryNameHe
      : 'הכל';
    const blockName = payment?.blockId && payment?.blockId !== -1
      ? getEntityByAttr(localBlocks, 'id', payment.blockId)?.blockNameHe
      : 'הכל';
    const plotName = payment?.plotId && payment?.plotId !== -1
      ? getEntityByAttr(localPlots, 'id', payment.plotId)?.plotNameHe
      : 'הכל';
    const lineName = payment?.lineId && payment?.lineId !== -1
      ? getEntityByAttr(localRows, 'id', payment.lineId)?.lineNameHe
      : 'הכל';

    const graveType = payment.graveType === -1 ? 'הכל' : payment.graveType
    const plotType = payment.graveType === -1 ? 'הכל' : payment.plotType
    const buyerStatus = payment.buyerStatus === -1 ? 'הכל' : payment.buyerStatus

    const startPayment = payment.startPayment
      ? format(new Date(payment.startPayment), 'dd/MM/yyyy')
      : '00/00/0000';
    const createDate = payment.createDate
      ? format(new Date(payment.createDate), 'dd/MM/yyyy')
      : '00/00/0000';

    const price = payment.price
      ? formatPrice(payment.price)
      : formatPrice(0);
    return {
      ...payment,
      graveType,
      plotType,
      buyerStatus,
      cemeteryName,
      blockName,
      plotName,
      lineName,
      startPayment,
      createDate,
      price
    };
  });

  return (
    <>
      <ColumnOrderingGrid
        rows={mappedData}
        columns={columns.filter(prop => prop.show)}
        searchText={searchText}
        onRowSelect={(row) => onClickRow(row, () => { }, navigate)}
      />
      <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/PaymentsHome</span></p>
    </>
  )
}

export default PaymentsHome
