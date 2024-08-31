import { useContext } from 'react'
import useCURD_Queries from '../queryGenerals/useCURD_Queries'
import { GlobalContext } from '../../../App'
import { useAddData, useGetData, useGetDataByName, useUpdateData } from '../../dataLocal/indexedDBHooks';

const useBurialQueries = () => {
  const { dataBurials, setNameBurials, setDataBurials, db } = useContext(GlobalContext)
  const { AllDataEntities, addOrUpdateDataEntity, removeEntity } = useCURD_Queries()

  const addData = useAddData(db, 'myStore');
  const updateData = useUpdateData(db, 'myStore');
  const getData = useGetData(db, 'myStore');
  const getDataByName = useGetDataByName(db, 'myStore');

  const AllDataBurials = async () => {
    try {
      let query = `api/burials/getBurials`;
      let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`;
      let nameEntity = 'dataBurials'

      const data = await AllDataEntities(url); // המתנה לתוצאה

      setDataBurials(data?.resData || [])
      localStorage.setItem(nameEntity, JSON.stringify(data?.resData || []))
      if (db) {
        getDataByName(nameEntity)
          .then((existingData) => {
            if (existingData.length > 0) {
              // אם הנתונים קיימים, עדכן אותם
              updateData({ id: 9, name: nameEntity, value: data?.resData || [] })
                .then(() => getDataByName(nameEntity))
                .then((data) => {
                  // console.log('Updated Data:', data);
                })
                .catch((error) => console.error('Error updating data:', error));
            } else {
              // אם הנתונים לא קיימים, הוסף אותם
              addData({ id: 9, name: nameEntity, value: data?.resData || [] })
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

  const addOrUpdateDataBurial = async (data) => {
    let create = `api/burials/addBurial`
    let update = `api/burials/updateBurial`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${(data?.id) ? update : create}`
    try {
      let res = await addOrUpdateDataEntity(data, url);
      if (res) {
        await AllDataBurials()
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

  // const getBurialByGrave = (attr) => {
  //   return getEntityByAttr(attr.toString(), dataBurials, 'graveId')
  // }

  const removeBurial = async (data) => {
    let query = `api/burials/removeBurial`
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${query}`
    // removeEntity(id, url)

    try {
      let res = await removeEntity(data, url)
      await AllDataBurials()
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
    AllDataBurials,
    addOrUpdateDataBurial,
    // getBurialByGrave,
    removeBurial
  }
};

export default useBurialQueries;
