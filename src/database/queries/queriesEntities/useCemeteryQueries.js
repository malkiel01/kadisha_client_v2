import { useContext, useState } from 'react';
import useCURD_Queries from '../queryGenerals/useCURD_Queries'
import { GlobalContext } from '../../../App'
import { useAddData, useGetData, useGetDataByName, useUpdateData } from '../../dataLocal/indexedDBHooks';



const useCemeteryQueries = () => {
  const { setDataCemeteries, db } = useContext(GlobalContext)
  const { AllDataEntities, addOrUpdateDataEntity, removeEntity } = useCURD_Queries()

  const addData = useAddData(db, 'myStore');
  const updateData = useUpdateData(db, 'myStore');
  const getData = useGetData(db, 'myStore');
  const getDataByName = useGetDataByName(db, 'myStore');

  const AllDataCemeteries = async () => {
    try {
      let query = `api/cemeteries/getCemeteries`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataCemeteries'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      // setDataCemeteries(data?.resData || [])
      // localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))

      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 1, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 1, name: nameEntity, value: data?.resData || [] })
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

  const addOrUpdateDataCemetery = async (data) => {
    let create = `api/cemeteries/addCemetery`
    let update = `api/cemeteries/updateCemetery`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
    try {
      let res = await addOrUpdateDataEntity(data, url);
      if (res) {
        await AllDataCemeteries()
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

  const removeCemetery = (id) => {
    let query = `api/cemeteries/removeCemetery`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`
    removeEntity(id, url)
  }

  return {
    AllDataCemeteries,
    addOrUpdateDataCemetery,
    removeCemetery
  }
}

export default useCemeteryQueries;
