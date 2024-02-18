import { useContext } from 'react'
import { GlobalContext } from '../../../App'
import useGeneralQueries from './useGeneralQueries'

const URL = `http://localhost:3001/`

// איזור בידול

const URL_SET = `api/plots/addPlot`
const URL_GET = `api/plots/getPlots`
const URL_UPDATE = `api/plots/updatePlot`
const URL_REMOVE = `api/plots/removePlot`

const NAME_DATA = 'dataPolts'
const NAME_ENTITY = 'plotNameHe'

const usePlotQueries = () => {
  const { token, setLoading, setNamePlots, dataPlots ,setDataPlots } = useContext(GlobalContext)

  const setNameEntities = (filterName) => {
    setNamePlots(filterName)
  }

  const setDataEntities = (response) => {
    setDataPlots(response)
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
    console.log(102, id, dataPlots, dataPlots.length);
    if (dataPlots.length) {
      return dataPlots.filter(item => item?.blockId === id);
    }
    return [];
  }


  return { AllDataPlots: AllDataEntities, 
          addOrUpdateDataPlot: addOrUpdateDataEntity, 
          removePlot: removeEntity,
          getPlotsByBlock: getChildrensByFather
        }
};

export default usePlotQueries;
