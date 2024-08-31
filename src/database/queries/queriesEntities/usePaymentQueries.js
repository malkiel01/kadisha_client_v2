import { useContext } from 'react';
import useCURD_Queries from '../queryGenerals/useCURD_Queries'
import { GlobalContext } from '../../../App';
import { useAddData, useGetData, useGetDataByName, useUpdateData } from '../../dataLocal/indexedDBHooks';

const usePaymentQueries = () => {
  const { setDataPayments, db } = useContext(GlobalContext)
  const { AllDataEntities, addOrUpdateDataEntity } = useCURD_Queries()

  const addData = useAddData(db, 'myStore');
  const updateData = useUpdateData(db, 'myStore');
  const getData = useGetData(db, 'myStore');
  const getDataByName = useGetDataByName(db, 'myStore');

  const AllDataPayments = async () => {
    try {
      let query = `api/payments/getPayments`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataPayments'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      setDataPayments(data?.resData || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 12, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 12, name: nameEntity, value: data?.resData || [] })
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

  const addOrUpdateDataPayment = async (data) => {
    let create = `api/payments/addPayment`
    let update = `api/payments/updatePayment`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
    try {
      let res = await addOrUpdateDataEntity(data, url);
      if (res) {
        await AllDataPayments()
        console.log('התוצאה הצליחה...')
        return res
      }
    } catch (error) {
      console.error('שגיאה בתהליך העדכון/הוספה:', error);
    }
  }

 

  return {
    AllDataPayments,
    addOrUpdateDataPayment,
  }
}

export default usePaymentQueries
