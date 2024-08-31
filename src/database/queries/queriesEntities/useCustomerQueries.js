import { useContext } from 'react';
import useCURD_Queries from '../queryGenerals/useCURD_Queries'
import { GlobalContext } from '../../../App';
import { useAddData, useGetData, useGetDataByName, useUpdateData } from '../../dataLocal/indexedDBHooks';

const useCustomerQueries = () => {
  const { setDataCustomers, db } = useContext(GlobalContext)
  const { AllDataEntities, addOrUpdateDataEntity, removeEntity } = useCURD_Queries()

  const addData = useAddData(db, 'myStore');
  const updateData = useUpdateData(db, 'myStore');
  const getData = useGetData(db, 'myStore');
  const getDataByName = useGetDataByName(db, 'myStore');

  const AllDataCustomers = async () => {
    try {
      let query = `api/customers/getCustomers`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataCustomers'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      setDataCustomers(data?.resData || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 7, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 7, name: nameEntity, value: data?.resData || [] })
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
      console.error("שגיאה בטעינת נתונים: ", error)
    }
  }

  const addOrUpdateDataCustomer = async (data) => {
    let create = `api/customers/addCustomer`
    let update = `api/customers/updateCustomer`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
    try {
      console.log('step 2',data);
      let res = await addOrUpdateDataEntity(data, url);
      console.log('step 3');
      if (res) {
        await AllDataCustomers()
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

  const removeCustomer = (id) => {
    let query = `api/areaGraves/removeCustomer`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`
    removeEntity(id, url)
  }

  return {
    AllDataCustomers,
    addOrUpdateDataCustomer,
    removeCustomer
  }
}

export default useCustomerQueries
