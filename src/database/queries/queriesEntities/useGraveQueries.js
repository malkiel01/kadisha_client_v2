import { useContext } from 'react'
import useCURD_Queries from '../queryGenerals/useCURD_Queries'
import { GlobalContext } from '../../../App'
import { useAddData, useGetData, useGetDataByName, useUpdateData } from '../../dataLocal/indexedDBHooks';

const useGraveQueries = () => {
  const { setDataGraves, db } = useContext(GlobalContext)
  const { AllDataEntities, addOrUpdateDataEntity, getChildrensByFather, getEntityById, removeEntity } = useCURD_Queries()

  const addData = useAddData(db, 'myStore');
  const updateData = useUpdateData(db, 'myStore');
  const getData = useGetData(db, 'myStore');
  const getDataByName = useGetDataByName(db, 'myStore');

  const AllDataGraves = async () => {
    try {
      let query = `api/graves/getGraves`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataGraves'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      setDataGraves(data?.resData || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 6, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 6, name: nameEntity, value: data?.resData || [] })
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

  const addOrUpdateDataGrave = async (data) => {
    let create = `api/graves/addGrave`
    let update = `api/graves/updateGrave`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
    try {
      let res = await addOrUpdateDataEntity(data, url)
      if (res) {
        await AllDataGraves()
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
  

  const removeGrave = async (data) => {
    let query = `api/graves/removeGrave`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`

   
    // removeEntity(id, url)
    try {
      let res = await removeEntity(data, url)
      await AllDataGraves()
      if (res) {
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

  return {
    AllDataGraves,
    addOrUpdateDataGrave,
    removeGrave
  }
}

export default useGraveQueries
