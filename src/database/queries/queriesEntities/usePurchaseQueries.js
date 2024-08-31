import { useContext } from 'react'
import useCURD_Queries from '../queryGenerals/useCURD_Queries'
import { GlobalContext } from '../../../App'
import { useAddData, useGetData, useGetDataByName, useUpdateData } from '../../dataLocal/indexedDBHooks';
import useSignatureQueries from './useSignatureQueries';
import useGraveQueries from './useGraveQueries';

const usePurchaseQueries = () => {
  const { dataPurchases, setDataPurchases, db } = useContext(GlobalContext)
  const { AllDataEntities, addOrUpdateDataEntity,  getEntityByAttr, removeEntity } = useCURD_Queries()
  const { AllDataSignatures } = useSignatureQueries()
  const { AllDataGraves } = useGraveQueries()

  const addData = useAddData(db, 'myStore');
  const updateData = useUpdateData(db, 'myStore');
  const getData = useGetData(db, 'myStore');
  const getDataByName = useGetDataByName(db, 'myStore');

  const AllDataPurchases = async () => {
    try {
      let query = `api/purchases/getPurchases`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataPurchases'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      setDataPurchases(data?.resData || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 8, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 8, name: nameEntity, value: data?.resData || [] })
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

  const AllDataPurchasesOld = async () => {
    try {
      let query = `api/purchases/getPurchasesOld`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataPurchasesOld'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      setDataPurchases(data?.resData || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 14, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 14, name: nameEntity, value: data?.resData || [] })
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

  const addOrUpdateDataPurchase2 = async (data) => {
    let create = `api/purchases/addPurchase`
    let update = `api/purchases/updatePurchase`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
    console.log(url);
    try {
      let res = await addOrUpdateDataEntity(data, url);
      if (res) {
        await AllDataPurchases()
        console.log('התוצאה הצליחה...')
        return res
      }
    } catch (error) {
      console.error('שגיאה בתהליך העדכון/הוספה:', error);
    }
  }

  const addOrUpdateDataPurchase = async (data) => {
    let create = `api/purchases/addPurchase`;
    let update = `api/purchases/updatePurchase`;
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`;
    console.log(url);
    try {
      let res = await addOrUpdateDataEntity(data, url);
      if (res) {
        await AllDataPurchases();
        await AllDataSignatures();
        await AllDataGraves()
        console.log('התוצאה הצליחה...');
        return res;
      }
    } catch (error) {
      console.error('שגיאה בתהליך העדכון/הוספה:', error);
    }
  };
  

  const duplicateAndUpdatePurchase = async (data) => {
    let update = `api/purchases/transferPurchase`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${update}`
    console.log(url);
    try {
      let res = await addOrUpdateDataEntity(data, url);
      if (res) {
        await AllDataPurchases()
        console.log('התוצאה הצליחה...')
        return res
      }
    } catch (error) {
      console.error('שגיאה בתהליך העדכון/הוספה:', error);
    }
  }

  const getPurchaseByGrave = (attr) => {
    return getEntityByAttr(attr.toString(), dataPurchases, 'graveId')
  }

  const removePurchase = async (data) => {
    let query = `api/purchases/removePurchase`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`
    // removeEntity(id, url)

    try {
      let res = await removeEntity(data, url)
      await AllDataPurchases()
      if (res) {
        console.log('התוצאה הצליחה...')
        return res
      } else {
        console.log(res);
        
        return false
      }
    } catch (error) {
      console.error('שגיאה בתהליך העדכון/הוספה:', error);
      return false
    }
  }


  return {
    AllDataPurchases,
    AllDataPurchasesOld,
    addOrUpdateDataPurchase,
    duplicateAndUpdatePurchase,
    getPurchaseByGrave,
    removePurchase
  }
};

export default usePurchaseQueries;
