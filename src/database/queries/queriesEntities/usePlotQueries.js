import { useContext } from 'react'
import useCURD_Queries from '../queryGenerals/useCURD_Queries'
import { GlobalContext } from '../../../App'
import { useAddData, useGetData, useGetDataByName, useUpdateData } from '../../dataLocal/indexedDBHooks';

const usePlotQueries = () => {
  const { setDataPlots, db } = useContext(GlobalContext)
  const { AllDataEntities, addOrUpdateDataEntity, removeEntity } = useCURD_Queries()

  const addData = useAddData(db, 'myStore');
  const updateData = useUpdateData(db, 'myStore');
  const getData = useGetData(db, 'myStore');
  const getDataByName = useGetDataByName(db, 'myStore');

  const AllDataPlots = async () => {
    try {
      let query = `api/plots/getPlots`
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`
      let nameEntity = 'dataPlots'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      setDataPlots(data?.resData || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 3, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 3, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Added Data:', data);
                })
                .catch((error) => console.error('Error adding data:', error));
            }
          })
          .catch((error) => console.error('Error getting data by name:', error));
      }
      
    } catch (error) {
      console.error("שגיאה בטעינת נתונים: ", error);
    }
  }

  const addOrUpdateDataPlot = async (data) => {
    let create = `api/plots/addPlot`
    let update = `api/plots/updatePlot`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
    try {
      let res = await addOrUpdateDataEntity(data, url);
      if (res) {
        await AllDataPlots()
        console.log('התוצאה הצליחה...')
        return res
      } else {
        return false
      }
    } catch (error) {
      console.error('שגיאה בתהליך העדכון/הוספה:', error);
      return false
    }
  }

  const removePlot = (id) => {
    let query = `api/plots/removePlot`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`
    removeEntity(id, url)
  }

  return {
    AllDataPlots,
    addOrUpdateDataPlot,
    removePlot
  }
};

export default usePlotQueries;
