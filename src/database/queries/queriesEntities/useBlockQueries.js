import { useContext } from 'react'
import { GlobalContext } from '../../../App'
import useGeneralQueries from './useGeneralQueries'

const URL = `http://localhost:3001/`

const URL_SET = `api/blocks/addBlock`;
const URL_GET = `api/blocks/getBlocks`;
const URL_GET_BY_CEMETERY = `api/blocks/getBlocksByCemetery`
const URL_UPDATE = `api/blocks/updateBlock`;
const URL_REMOVE = `api/blocks/removeBlock`;

const NAME_DATA = 'dataBlocks'
const NAME_ENTITY = 'blockNameHe'

const useBlockQueries = () => {
  const { token, setLoading, setNameBlocks, dataBlocks ,setDataBlocks } = useContext(GlobalContext)

  const setNameEntities = (filterName) => {
    setNameBlocks(filterName)
  }

  const setDataEntities = (response) => {
    setDataBlocks(response)
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

  const getChildrensByFather = (id) => {
    console.log(102, id, dataBlocks, dataBlocks.length);
    if (dataBlocks.length) {
      return dataBlocks.filter(item => item?.cemeteryId === id);
    }
    return [];
  }


  return { AllDataBlocks: AllDataEntities, 
          addOrUpdateDataBlock: addOrUpdateDataEntity, 
          removeBlock: removeEntity,
          getBlocksByCemetery: getChildrensByFather
        }
};

export default useBlockQueries;
