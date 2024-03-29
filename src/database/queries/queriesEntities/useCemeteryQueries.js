import { useContext } from 'react'
import { GlobalContext } from '../../../App'
import useGeneralQueries from './useGeneralQueries'

const URL = `${process.env.REACT_APP_API_URL}:3001/`
const URL_SET = `api/cemeteries/addCemetery`
const URL_GET = `api/cemeteries/getCemeteries`
const URL_UPDATE = `api/cemeteries/updateCemetery`
const URL_REMOVE = `api/cemeteries/removeCemetery`

const NAME_DATA = 'dataCemeteries'
const NAME_ENTITY = 'cemeteryNameHe'

const useBlockQueries = () => {
  const { token, setLoading, setDataCemeteries, setNameCemeteries  } = useContext(GlobalContext)

  const setNameEntities = (filterName) => {
    setNameCemeteries(filterName)
  }

  const setDataEntities = (response) => {
    setDataCemeteries(response)
  }

  const { extractAndSaveData, AllData, GetAllItems, AddItem, RemoveItem } = useGeneralQueries();

  // Block -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --

  // קבלת כל הגושים
  const AllDataEntities = () => {
    let url = URL + URL_GET
    let isError = (err) => {
      if (err) {
        console.log('שגיאה: ', err);
      }
    }
    let isPending = (pending) => {
      ((localStorage.getItem(NAME_DATA) === null) || !pending) && setLoading(pending)
      console.log(pending ? 'בטעינה...' : 'סיים טעינה');

    }
    let getData = (response) => {
      localStorage.setItem(NAME_DATA, JSON.stringify(response))
      setDataEntities(response)

      console.log(response);
      let filterName = extractAndSaveData(NAME_ENTITY, response)
      localStorage.setItem(NAME_DATA, JSON.stringify(filterName))
      setNameEntities(filterName)

    }
    GetAllItems(url, { token },
      isPending,
      getData, isError
    )
  }

  // הוספת גוש
  const addOrUpdateDataEntity = (data) => {
    let url = null

    if (data?.id) {
      url = URL + URL_UPDATE
    } else {
      url = URL + URL_SET
    }
    let isErorr = (err) => {
      if (err) {
        console.log('שגיאה: ', err);
      }
    }
    let isPending = (pending) => {
      !pending && AllDataEntities(url)
      console.log(pending ? 'בטעינה...' : 'סיים טעינה')
    }

    AddItem(url, data, { token },
      isPending, isErorr
    )
  }

  // מחיקת בית עלמין
  const removeEntity = (id) => {
    let url = URL + URL_REMOVE

    let isErorr = (err) => {
      if (err) {
        console.log('שגיאה: ', err);
      }
    }
    let isPending = (pending) => {
      !pending && AllDataEntities()
      console.log(pending ? 'בטעינה...' : 'סיים טעינה')
    }

    RemoveItem(url, id, { token }, isPending, isErorr)
  }

  return { AllDataCemeteries: AllDataEntities, 
    addOrUpdateDataCemetery: addOrUpdateDataEntity, 
    removeCemetery: removeEntity }
};

export default useBlockQueries;
