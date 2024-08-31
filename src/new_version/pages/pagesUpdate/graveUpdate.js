import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useQueries from '../../../database/useQueries'
import FormTemplate from '../../template/form/FormTemplate'
import { useSelector } from 'react-redux'
import LoadingOverlay from '../pagesMains/LoadingOverlay'
import { CommponentOptions, getFieldOptions } from '../plagins/data/commponentOptions'
import { Button } from '@mui/material'
import RowCreate from '../pagesCreate/rowCreate'
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks'
import CustomDialog from '../plagins/dialogs/customDialog'

const NAME_ENTITY = 'אחוזת קבר'

function GraveUpdate() {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsFormAreaGraves.data)

  // טעינת היוזים לפונקציות עזר
  const { addOrUpdateDataAreaGrave, addOrUpdateDataGrave, getEntitiesByAttr, getEntityByAttr, removeGrave } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localBurials, loading: loadingBurials } = useIndexedDBSyncV2('myStore', 'dataBurials');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');
  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingAreaGraves || loadingGraves || loadingRows || loadingBurials || loadingPurchases;
  // ערכי הראוטר
  const location = useLocation()
  const navigate = useNavigate()
  const { value } = location.state || {};

  // דרישה לפניה לשרת
  // כרגע לא פעיל
  // const dataKeysAsync = ['dataPayments'];
  // const loadingAsync = useDataLoader(dataKeysAsync);

  // איזור המשתנים והסטייטים
  // משתנים לטופס
  const [fieldsWithDynamicDisabled, setFieldsWithDynamicDisabled] = useState([]); // השדות
  const [formValues, setFormValues] = useState({}); // ערכי השדות
  const [errors, setErrors] = useState({}); // שגיאת השדות
  // עוקב אחר שליחת נתונים לשרת דרך פונקציית סבמיט
  const [loadingData, setLoadingData] = useState(false);

  const [cemeteries, setCemeteries] = useState([])
  const [blocks, setBlocks] = useState([])
  const [plots, setPlots] = useState([])
  const [rows, setRows] = useState([])

  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map((field, index) => {
      return ({
        ...field,
        disabled: field.disabled && (value !== undefined),
        required: (field.required || false),
        show: field?.show || false,
      })
    });
  };

  // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => { !loading && handleAllDataLoaded() }, [loading]);

  // טעינת הנתונים לאחר קבלת הערכים מהדאטה בייס הלוקלי
  const handleAllDataLoaded = () => {
    if (value?.id) {
      let data = getEntityByAttr(localAreaGraves, 'id', value?.id)
      // פונקציה להשוואת ערכים לפי קוד ה-UTF-16 של האותיות העבריות עם בדיקה מקדימה
      const compareHebrewLetters = (a, b) => {
        return (a.graveName ? a.graveName.charCodeAt(0) : 0) - (b.graveName ? b.graveName.charCodeAt(0) : 0);
      };
      // השדות של הקברים שמתווספים
      let columnsGraves = []
      let graves = getEntitiesByAttr(localGraves, 'areaGraveId', value?.gravesList);
      // מיון המערך לפי האטריביוט nameGrave
      graves?.sort(compareHebrewLetters);

      graves?.map((grave, index) => {
        const newColumn = {
          id: grave?.id,
          name: `floor${index}`,
          nameGrave: grave?.graveName,
          required: true,
          width: 800,
          show: true,
          input: 'floors',
          notRepeat: true
        };
        columnsGraves = [...columnsGraves, newColumn]
        data = {
          ...data,
          [`floor${index}`]: { id: grave?.id, plotType: grave?.plotType, nameGrave: grave?.graveName }
        }
      })

      const allColumns = [...columns, ...columnsGraves]

      setFieldsWithDynamicDisabled(myColumns(allColumns))

      let initialFormValues = myColumns(allColumns).filter(field => field?.name).reduce((acc, field) => {
        let fieldValue = data[field.name] || '';

        return {
          ...acc,
          [field.name]: fieldValue,
        };
      }, { id: data.id });

      let res = fieldAuto(data, initialFormValues)

      setFormValues(res)
    }
  }

  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (data, newFormValues) => {

    const row = getEntityByAttr(localRows, 'id', parseInt(data?.lineId));
    const plot = getEntityByAttr(localPlots, 'id', parseInt(data?.plotId));
    const block = getEntityByAttr(localBlocks, 'id', parseInt(plot?.blockId));
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

    const cemeteryId = cemetery?.id
    const blockId = block?.id;
    const plotId = plot?.id;
    const lineId = row?.id;

    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId, lineId };


    let rows = getEntitiesByAttr(localRows, 'plotId', plotId);
    let plots = getEntitiesByAttr(localPlots, 'blockId', blockId);
    let blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', cemeteryId);

    setCemeteries(
      localCemeteries.map(cemetery => CommponentOptions({ value: cemetery?.id, label: cemetery?.cemeteryNameHe }))
    )
    setBlocks(
      blocks.map(block => {
        return CommponentOptions({
          value: block?.id, label: block?.blockNameHe, dataUnderRigth: {
            title: 'בית עלמין: ',
            value: cemetery?.cemeteryNameHe
          }
        })
      })
    )
    setPlots(
      plots.map(plot => {
        return CommponentOptions({
          value: plot?.id, label: plot?.plotNameHe,
          dataUnderRigth: { title: 'גושים: ', value: block?.blockNameHe },
          dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
        })
      })
    )
    setRows([
      ...rows.map(row => {
        return CommponentOptions({
          value: row?.id, label: row?.lineNameHe,
          dataUnderRigth: { title: 'חלקה: ', value: plot?.plotNameHe },
          dataUnderLeft: { title: 'גוש: ', value: block?.blockNameHe },
        })
      }),
      {
        value: 'add',
        label: '',
        list: (
          <Button
            onClick={() => setOpen(true)}
          >הוספת שורה</Button>
        ),
        searchFields: ''
      }
    ])
    return { ...newFormValues }
  };

  // פתיחת וסגירת פופאפ של Rows
  const [open, setOpen] = useState(false)

  //לוגיקת הזנה ב cemetery
  const fieldChangeCemeteryId = (event, newFormValues) => {
    delete newFormValues?.blockId;
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave

    let tempPlots = []
    let tempBlocks = []

    if (event.target.value !== '') {
      tempBlocks = getEntitiesByAttr(localBlocks, 'cemeteryId', event.target.value)
      tempPlots = localPlots.filter(plot =>
        tempBlocks.some(block => block.id === plot.blockId)
      );
    }
    else {
      tempBlocks = localBlocks
      tempPlots = localPlots
    }
    setBlocks(
      tempBlocks.map(block => {
        const cemetery = localCemeteries.find(cemetery => cemetery?.id === block?.cemeteryId)
        return CommponentOptions({
          value: block?.id, label: block?.blockNameHe, dataUnderRigth: {
            title: 'בית עלמין: ',
            value: cemetery?.cemeteryNameHe
          }
        })
      })
    )

    setPlots(
      tempPlots.map(plot => {
        const block = localBlocks.find(block => block?.id === plot?.blockId)
        const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
        return CommponentOptions({
          value: plot?.id, label: plot?.plotNameHe,
          dataUnderRigth: { title: 'גושים: ', value: block?.blockNameHe },
          dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
        })
      })
    )
    setRows([])
  }
  //לוגיקת הזנה ב block
  const fieldChangeBlockId = (event, newFormValues) => {
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave

    let cemeteryId = newFormValues?.cemeteryId

    let tempPlots = []
    let tempBlocks = []

    if (event.target.value !== '') {
      tempPlots = getEntitiesByAttr(localPlots, 'blockId', event.target.value)
      tempBlocks = getEntitiesByAttr(localBlocks, 'id', event.target.value)

      const block = getEntityByAttr(localBlocks, 'id', event.target.value)
      const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

      cemeteryId = cemetery?.id
    }
    else {
      tempBlocks = getEntitiesByAttr(localBlocks, 'cemeteryId', newFormValues?.cemeteryId)
      tempPlots = localPlots.filter(plot =>
        tempBlocks.some(block => block.id === plot.blockId)
      );
    }
    setPlots(
      tempPlots.map(plot => {
        const block = localBlocks.find(block => block?.id === plot?.blockId)
        const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
        return CommponentOptions({
          value: plot?.id, label: plot?.plotNameHe,
          dataUnderRigth: { title: 'גושים: ', value: block?.blockNameHe },
          dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
        })
      })
    )
    setRows([])
    return { cemeteryId }
  }
  //לוגיקת הזנה ב plot
  const fieldChangePlotId = (event, newFormValues) => {
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave

    let cemeteryId = newFormValues?.cemeteryId
    let blockId = newFormValues?.blockId

    let tempRows = []
    let tempPlots = []
    let tempBlocks = []
    let temp = []
    let addRow = []

    if (event.target.value !== '') {
      const plot = getEntityByAttr(localPlots, 'id', event.target.value)
      const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
      const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

      tempBlocks = getEntitiesByAttr(localBlocks, 'id', plot?.blockId)
      tempPlots = getEntitiesByAttr(localPlots, 'id', event.target.value)
      tempRows = getEntitiesByAttr(localRows, 'plotId', event.target.value)
      addRow = [
        {
          value: 'add',
          label: '',
          list: (
            <Button
              onClick={() => setOpen(true)}
            >הוספת שורה</Button>
          ),
          searchFields: ''
        }
      ]

      cemeteryId = cemetery?.id
      blockId = block?.id

    }
    else {
      tempBlocks = getEntitiesByAttr(localBlocks, 'id', newFormValues?.blockId)
      tempPlots = localPlots.filter(plot =>
        tempBlocks.some(block => block.id === plot.blockId)
      );
      cemeteryId = newFormValues?.cemeteryId
      blockId = newFormValues?.blockId
    }
    setBlocks(
      tempBlocks.map(block => {
        const cemetery = localCemeteries.find(cemetery => cemetery?.id === block?.cemeteryId)
        return CommponentOptions({
          value: block?.id, label: block?.blockNameHe, dataUnderRigth: {
            title: 'בית עלמין: ',
            value: cemetery?.cemeteryNameHe
          }
        })
      })
    )
    setPlots(
      tempPlots.map(plot => {
        const block = localBlocks.find(block => block?.id === plot?.blockId)
        const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
        return CommponentOptions({
          value: plot?.id, label: plot?.plotNameHe,
          dataUnderRigth: { title: 'גושים: ', value: block?.blockNameHe },
          dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
        })
      })
    )
    setRows([...temp, ...addRow])

    return { ...newFormValues, blockId, cemeteryId }
  }
  //לוגיקת הזנה ב row
  const fieldChangeLineId = (event, newFormValues) => {
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave

    let cemeteryId = null
    let blockId = null
    let plotId = null

    if (event.target.value === '') {

    }
    else {
      const row = getEntityByAttr(localRows, 'id', parseInt(event.target.value))
      const plot = getEntityByAttr(localPlots, 'id', parseInt(row?.plotId))
      const block = getEntityByAttr(localBlocks, 'id', parseInt(plot?.blockId))
      const cemetery = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))
      cemeteryId = cemetery?.id
      blockId = block?.id
      plotId = plot?.id



    }


    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId }

    let areaGraves = getEntitiesByAttr(localAreaGraves, event.target.name, event.target.value)

    return {
      newFormValues,
      areaGraves
    }
  }

  // קבלת הקומות
  const getFloorAttributes = (obj) => {
    return Object.keys(obj)
      .filter(key => key.startsWith('floor'))
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {});
  };
  // הסרת הקומות
  const removeFloorAttributes = (obj) => {
    const newObj = { ...obj };
    Object.keys(newObj).forEach(key => {
      if (key.startsWith('floor')) {
        delete newObj[key];
      }
    });
    return newObj;
  };
  // הפיכה לאובייקט
  const convertToObjectArray = (obj) => {
    return Object.keys(obj)
      .filter(key => key.startsWith('floor'))
      .map(key => ({
        name: key,
        ...obj[key]
      }));
  };
  // קבלת הקברים המוסרים מהרשימה
  const getUniqueItems = (arr1, arr2) => {
    const idsInArray2 = arr2.map(item => item.id);
    return arr1.filter(item => !idsInArray2.includes(item.id));
  };
  //לוגיקת הזנה בשדות הטופס
  const handleChange = (event) => {
    let newFormValues = formValues
    const { name, value } = event.target;

    if (name === 'addFloor') {
      // השדות של הקברים שמתווספים
      let columnsGraves = []
      let data = getEntityByAttr(localAreaGraves, 'id', formValues?.id)

      // מציאת הערך האחרון של name
      const getLastFloorNumber = (arr) => {
        // Iterate over each item in the array
        const floorNumbers = arr.map(item => {
          // Find the key that starts with 'floor'
          const floorKey = Object.keys(item).find(key => key.startsWith('floor'));

          // Extract the number from the key
          if (floorKey) {
            const match = floorKey.match(/^floor(\d+)$/);
            return match ? parseInt(match[1], 10) : 0;
          }
          return 0;
        });

        // Return the maximum number found
        return Math.max(...floorNumbers);
      };

      // // פונקציה למציאת האות העברית האחרונה לפי יוניקוד
      const getLastHebrewLetter = (arr) => {
        const hebrewLetters = arr.map(item => {
          const key = Object.keys(item).find(k => k.startsWith('floor'));
          return key ? item[key].nameGrave.charCodeAt(item[key].nameGrave.length - 1) : 0;
        });

        const maxUnicode = Math.max(...hebrewLetters);
        const nextLetter = String.fromCharCode(maxUnicode + 1);

        return nextLetter;
      };

      let temp = Object.keys(formValues)
        .filter(key => key.startsWith('floor'))
        .map(key => ({ [key]: formValues[key] }));

      const lastFloorNumber = getLastFloorNumber(temp);
      const lastHebrewLetterCode = getLastHebrewLetter(temp);

      // פונקציה להוספת הערך החדש
      const addNewFloor = () => {
        const newFloor = {
          id: Date.now(), // או כל דרך אחרת לייצר id ייחודי
          name: `floor${lastFloorNumber + 1}`,
          nameGrave: lastHebrewLetterCode,
          required: true,
          width: 800,
          show: true,
          input: 'floors',
          notRepeat: true
        };
        data = {
          ...data,
          [`floor${lastFloorNumber + 1}`]: { plotType: 1, nameGrave: lastHebrewLetterCode }
        }
        columnsGraves = [...columnsGraves, newFloor]
      };

      // הוספת הערך החדש למערך
      addNewFloor();

      setFieldsWithDynamicDisabled(myColumns([...fieldsWithDynamicDisabled, ...columnsGraves]))

      setFormValues({ ...formValues, [`floor${lastFloorNumber + 1}`]: { plotType: 1, nameGrave: lastHebrewLetterCode } })
      return
    }
    if (name === 'cemeteryId') {
      let res = fieldChangeCemeteryId(event, newFormValues)
    }
    if (name === 'blockId') {
      let res = fieldChangeBlockId(event, newFormValues)
      if (event.target.value !== '') {
        newFormValues = { ...newFormValues, cemeteryId: res?.cemeteryId }
      }
    }
    if (name === 'plotId') {
      let res = fieldChangePlotId(event, newFormValues)
      newFormValues = { ...newFormValues, cemeteryId: res?.cemeteryId, blockId: res?.blockId }
    }
    if (name === 'lineId') {
      let res = fieldChangeLineId(event, newFormValues)
    }
    setFormValues({ ...newFormValues, [name]: value });
  }
  // אימות ערכים
  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    let areaGraves = localCemeteries
      ?.filter(areaGrave => areaGrave?.id !== formValues?.id)

    columns.forEach(field => {
      if (field.required && !formValues[field.name]) {
        if (field.name !== 'areaLocation' && field.name !== 'addFloor') {
          tempErrors[field.name] = 'שדה חובה';
          formIsValid = false;
        }
        if (field.name === 'addFloor') {
          if (!Object.keys(getFloorAttributes(formValues)).length > 0) {
            tempErrors[field.name] = 'חובה להקים קומה אחת לפחות';
            formIsValid = false;
          }
        }
      }

      if (field.notRepeat && formValues[field.name]) {
        if (areaGraves.some(item => item[field.name] === formValues[field.name])) {
          tempErrors[field.name] = `הערך ${formValues[field.name]} כבר קיים`;
          formIsValid = false;
        }
      }
    });

    setErrors(tempErrors);
    return formIsValid;
  };
  // שליחת הטופס
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoadingData(true);
  
      // קבלת הקוד של areaGrave
      let tempGravesList = value?.gravesList;
  
      // הסרת הקומות מתוך מערך areGrave
      let newFormValues = { ...formValues, gravesList: tempGravesList };
      delete newFormValues?.addFloor
      delete newFormValues?.cemeteryId
      delete newFormValues?.blockId

      newFormValues = removeFloorAttributes(newFormValues);
  
      // קבלת מערך כל הקברים המקושרים - לפני העדכון
      let graves = getEntitiesByAttr(localGraves, 'areaGraveId', value?.gravesList);
  
      // קבלת כל הקברים המקורים - אחרי העדכון
      let floorsValues = convertToObjectArray({ ...formValues });
  
      // חילוץ הקברים שהוסרו מתוך הקברים המקוריים
      const uniqueItems = getUniqueItems(graves, floorsValues).map(grave => ({ ...grave, isActive: false }));
  
      // עדכון ויצירת קומות הקבר
      let updatedFloorsValues = floorsValues.map(floor => {
        if (floor?.id) {
          // עדכון קבר קיים
          return {
            id: floor.id,
            graveName: floor.nameGrave,
            graveStatus: 1,
            areaGraveId: tempGravesList,
            plotType: floor.plotType
          };
        } else {
          // יצירת קבר חדש
          return {
            graveName: floor.nameGrave,
            graveStatus: 1,
            areaGraveId: tempGravesList,
            plotType: floor.plotType
          };
        }
      });
  
      // הוספת הקומות לערך שנשלח לשרת
      const requestData = {
        ...newFormValues,
        floors: updatedFloorsValues,
        removeGraves: uniqueItems
      };
  
      // שליחת הבקשה לשרת
      let res = await addOrUpdateDataAreaGrave(requestData);
  
      if (res === 200) {
        setLoadingData(false);
        navigate(-1);
      } else {
        console.error('Error updating area grave');
      }
    }
  };
  
  // הסרת קומת קבר
  const deleteItem = (item) => {
    const tempColumns = fieldsWithDynamicDisabled.filter(p => p?.name !== item?.name)

    let checkEntity = getEntityByAttr(localBurials, 'graveId', item?.id) || getEntityByAttr(localPurchases, 'graveId', item?.id)

    if (checkEntity) {
      alert('לא ניתן להסיר, קיים תיק מקושר')
    } else {
      setFieldsWithDynamicDisabled(myColumns(tempColumns))
      setFormValues(prev => {
        let temp = { ...prev };
        delete temp[item.name];
        return temp;
      });
    }
  };

  if (loading || loadingData) return <LoadingOverlay />

  return (
    <>
      <FormTemplate
        title={`עריכת ${NAME_ENTITY}`}
        btn={`עדכן`}
        fields={fieldsWithDynamicDisabled}
        columns={fieldsWithDynamicDisabled}
        formValues={formValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        del={deleteItem}
        errors={errors}
        options={{
          cemeteryId: cemeteries,
          blockId: blocks,
          plotId: plots,
          lineId: rows,
          graveType: getFieldOptions('graveType', optionsFields),
        }}
      />
      <CustomDialog open={open} handleClose={() => setOpen(false)} title={'הוספת שורה'}>
        <RowCreate plotId={formValues?.plotId || ''} />
      </CustomDialog>
      <p><span style={{ fontFamily: "'Courier New', Courier, monospace" }}>עדכון קבר</span></p>
    </>
  )
}

export default GraveUpdate

