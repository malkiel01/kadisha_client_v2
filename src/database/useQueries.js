import { useContext } from 'react'
import { GlobalContext } from '../App'

import useCemeteryQueries from './queries/queriesEntities/useCemeteryQueries';
import useGeneralQueries from './queries/queriesEntities/useGeneralQueries';
import useBlockQueries from './queries/queriesEntities/useBlockQueries';
import usePlotQueries from './queries/queriesEntities/usePlotQueries';
import useAreaGraveQueries from './queries/queriesEntities/useAreaGraveQueries';
// import usePlotQueries from './queries/queriesEntities/usePlotQueries';

const URL = `http://localhost:3001/`

const URL_SET_PLOT = `api/blocks/addPolts`;
const URL_SET_AREAGRAVE = `api/areaGrave/addAreaGrave`;

const URL_GET_PLOT = `api/plots/getPlots`;
const URL_GET_AREAGRAVE = `api/areaGrave/getAreaGraves`;

const URL_UPDATE_PLOT = `api/blocks/updatePlot`;
const URL_UPDATE_AREAGRAVE = `api/areaGrave/updateAreaGrave`;

const URL_REMOVE_PLOT = `api/blocks/removePlot`;
const URL_REMOVE_AREAGRAVE = `api/areaGrave/removeAreaGrave`;


const useQueries = () => {
  const { token, setLoading,
    setNamePlots, setDataPlots, 
  } = useContext(GlobalContext)


  
  const { extractAndSaveData, AllData, AddItem, GetAllItems, RemoveItem } = useGeneralQueries()

  const { AllDataCemeteries, addOrUpdateDataCemetery, removeCemetery } = useCemeteryQueries()
  const { AllDataBlocks, addOrUpdateDataBlock, removeBlock, getBlocksByCemetery } = useBlockQueries()
  const { AllDataPlots, addOrUpdateDataPlot, removePlot, getPlotsByBlock } = usePlotQueries()
  const { AllDataAreaGraves, addOrUpdateDataAreaGrave, removeAreaGrave, getAreaGravesByPlot } = useAreaGraveQueries()
 // Polts -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --


  // הוספת חלקה
  const addOrUpdateDataPolt = (data) => {
    let url = null
    let nameData = 'dataPlots'
    let nameColume = 'plotNameHe'
    
    if (data?.id) {
      url = URL + URL_UPDATE_PLOT
    } else {
      url = URL + URL_SET_PLOT
    }
    let isError = (err) => {
      if (err) {
        console.log('שגיאה: ',err);
      }
    }
    let isPending = (pending) => {
      !pending && AllData(url,nameData, nameColume)
      console.log(pending ? 'בטעינה...' : 'סיים טעינה')
    }

    AddItem(url, data,{ token }, 
      isPending, isError
       )
  }

//   // Polts -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --
//   // קבלת כל הנתונים מטבלת areaGrave
// const AllDataAreaGraves = () => {
//   let url = URL + URL_GET_AREAGRAVE
//   let isError = (err) => {
//     if (err) {
//       console.log('שגיאה: ',err);
//     }
//   }
//   let isPending = (pending) => {
//     ((localStorage.getItem('dataAreaGraves') === null) || !pending) && setLoading(pending)
//     console.log(pending ? 'בטעינה...' : 'סיים טעינה');

//   }
//   let getData = (response) => {
//       localStorage.setItem('dataAreaGraves', JSON.stringify(response))
//       setDataPlots(response)

//       let filterName = extractAndSaveData('id',response)
//       localStorage.setItem('dataAreaGraves', JSON.stringify(filterName))
//       setNamePlots(filterName)

//   }
//   GetAllItems(url, { token }, 
//     isPending,
//     getData, isError
//   )
// }

// // הוספת או עדכון נתוני areaGrave
// const addOrUpdateDataAreaGrave = (data) => {
//   let url = null
//   let nameData = 'dataAreaGraves'
//   let nameColume = 'id'
  
//   if (data?.id) {
//     url = URL + URL_UPDATE_PLOT
//   } else {
//     url = URL + URL_SET_PLOT
//   }
//   let isErorr = (err) => {
//     if (err) {
//       console.log('שגיאה: ',err);
//     }
//   }
//   let isPending = (pending) => {
//     !pending && AllData(url,nameData, nameColume)
//     console.log(pending ? 'בטעינה...' : 'סיים טעינה')
//   }

//   AddItem(url, data,{ token }, 
//     isPending, isErorr
//      )
// }


  return { 
    AllDataCemeteries,
    AllDataBlocks,
    AllDataPlots,
    AllDataAreaGraves,

    getBlocksByCemetery,
    getPlotsByBlock,
    getAreaGravesByPlot,

    addOrUpdateDataCemetery,
    addOrUpdateDataBlock,
    addOrUpdateDataPlot,
    addOrUpdateDataAreaGrave,

    removeCemetery, 
    removeBlock,
    removePlot,
    removeAreaGrave,
  }
}

export default useQueries;
