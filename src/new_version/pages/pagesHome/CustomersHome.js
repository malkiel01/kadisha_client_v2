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
import { GlobalContext } from '../../../App'
import { useEffect } from 'react'

const CustomersHome = () => {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsTableCustomers.data)

  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr } = useQueries()

  // קבלת נתוני דאטה בייס
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localCountries, loading: loadingCountries } = useIndexedDBSyncV2('myStore', 'dataCountries');
  const { data: localCities, loading: loadinlCities } = useIndexedDBSyncV2('myStore', 'dataCities');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCustomers || loadingCountries || loadinlCities

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
    setTitle(`לקוחות`)
  }, [location.pathname])

  if (loading || loadingAsync) return <LoadingOverlay />

  const mappedData = mapFieldValues(localCustomers, optionsFields).map(item => {
    const cityId = getEntityByAttr(localCities, 'id', item?.cityId)?.cityNameHe
    const countryId = getEntityByAttr(localCountries, 'id', item?.countryId)?.countryNameHe
    const dateBirth = format(new Date(item?.createDate), 'dd/MM/yyyy')
    return {
      ...item,
      cityId,
      countryId,
      dateBirth
    };
  })

  return (
    <>
      <ColumnOrderingGrid
        rows={mappedData}
        columns={columns.filter(prop => prop.show)}
        searchText={searchText}
        onRowSelect={(row) => onClickRow(row, () => {}, navigate)}
      />
      <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/CustomersHome</span></p>
    </>
  )
}

export default CustomersHome