import { useContext } from 'react'
import useCURD_Queries from '../queryGenerals/useCURD_Queries'
import { GlobalContext } from '../../../App'
import { useAddData, useGetData, useGetDataByName, useUpdateData } from '../../dataLocal/indexedDBHooks';

const useSignatureQueries = () => {
  const { dataSignatures, setDataSignatures, db } = useContext(GlobalContext)
  const { AllDataEntities, addOrUpdateDataEntity,  removeEntity } = useCURD_Queries()

  const addData = useAddData(db, 'myStore');
  const updateData = useUpdateData(db, 'myStore');
  const getData = useGetData(db, 'myStore');
  const getDataByName = useGetDataByName(db, 'myStore');

  const AllDataSignatures = async () => {
    try {
      let query = `api/signatures/getSignatures`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataSignatures'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      setDataSignatures(data?.resData || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 13, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                  return data
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 13, name: nameEntity, value: data?.resData || [] })
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

  const addOrUpdateDataSignature = async (data) => {
    let create = `api/signatures/addSignature`
    let update = `api/signatures/updateSignature`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
    console.log(url);
    try {
      let res = await addOrUpdateDataEntity(data, url);
      if (res) {
        await AllDataSignatures()
        console.log('התוצאה הצליחה...')
        return res
      }
    } catch (error) {
      console.error('שגיאה בתהליך העדכון/הוספה:', error);
    }
  }

  const removeSignature = (id) => {
    let query = `api/signatures/removeSignature`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`
    removeEntity(id, url)
  }

  return {
    AllDataSignatures,
    addOrUpdateDataSignature,
    removeSignature
  }
};

export default useSignatureQueries;
