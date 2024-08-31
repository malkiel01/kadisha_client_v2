import { useContext } from 'react';
import useCURD_Queries from '../queryGenerals/useCURD_Queries'
import { GlobalContext } from '../../../App';
import { useAddData, useGetData, useGetDataByName, useUpdateData } from '../../dataLocal/indexedDBHooks';

const useRowsQueries = () => {
  const { dataAreaGraves, setNameAreaGraves, setDataAreaGraves, setNameRows, setDataRows, dataRows, db } = useContext(GlobalContext)
  const { AllDataEntities, setAllData, addOrUpdateDataEntity, getChildrensByFather, getEntityById, removeEntity } = useCURD_Queries()

  const addData = useAddData(db, 'myStore');
  const updateData = useUpdateData(db, 'myStore');
  const getData = useGetData(db, 'myStore');
  const getDataByName = useGetDataByName(db, 'myStore');

  const AllDataAreaGraves = async () => {
    try {
      let query = `api/areaGraves/getAreaGraves`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataAreaGraves'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      setDataAreaGraves(data?.resData || [])
      setNameAreaGraves(data?.filterName || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 4, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  console.log('Updated Data:', data);
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 4, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  console.log('Added Data:', data);
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

  const AllDataRows = async () => {
    try {
      let query = `api/rows/getRows`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataRows'
      let entity = 'rowNameHe'

      const data = await AllDataEntities(url, nameEntity, entity); // המתנה לתוצאה

      setDataRows(data?.resData || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 4, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                  return data
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 4, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Added Data:', data);
                  return data
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

  const addOrUpdateDataRow = async (data) => {
    let create = `api/rows/addRow`
    let update = `api/rows/updateRow`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
     try {
      let res = await addOrUpdateDataEntity(data, url);
      if (res) {
        await AllDataRows()
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

  const addOrUpdateDataRows = async (data) => {
    let create = `api/rows/addRow`
    let update = `api/rows/updateRow`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
    let res = false
    data.forEach(async row => {
      try {
        res = await addOrUpdateDataEntity(row, url);
        AllDataRows()
        if (res) {
          console.log('התוצאה הצליחה...')
          res = true
        } else {
          res = false
        }
      } catch (error) {
        console.error('שגיאה בתהליך העדכון/הוספה:', error)
        res = false
      }
    })
  }

  const getRows = async () => {
    try {
      let query = `api/rows/getRows`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`

      const data = await AllDataEntities(url) // המתנה לתוצאה

      setDataRows(data?.resData || [])

      return data?.resData
    } catch (error) {
      console.error("שגיאה בטעינת נתונים: ", error)
    }
  }

  const removeAreaGrave = (id) => {
    let query = `api/areaGraves/removeAreaGrave`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`
    removeEntity(id, url)
  }

  return {
    AllDataAreaGraves,
    AllDataRows,
    // addOrUpdateDataAreaGrave,
    addOrUpdateDataRow,
    // addRow,
    // setRows,
    getRows,
    removeAreaGrave
  }
}

export default useRowsQueries
