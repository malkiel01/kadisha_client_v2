import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useQueries from '../../../database/useQueries'
import FormTemplate from '../../template/form/FormTemplate'
import { useSelector } from 'react-redux'
import CryptoJS from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'
import LoadingOverlay from '../pagesMains/LoadingOverlay'
import { CommponentOptions, getFieldOptions } from '../plagins/data/commponentOptions'
import { Button } from '@mui/material'
import RowCreate from './rowCreate'
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks'
import CustomDialog from '../plagins/dialogs/customDialog'

const NAME_ENTITY = 'אחוזת קבר'

function GraveCreate() {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columnStore = useSelector((state) => state.columnsFormAreaGraves.data)
  const columns = useSelector((state) => state.columnsFormAreaGraves.data)

  // טעינת היוזים לפונקציות עזר
  const { AllDataRows, addOrUpdateDataAreaGrave, addOrUpdateDataGrave, getEntitiesByAttr, getEntityByAttr, removeGrave } = useQueries();

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
  const [open, setOpen] = useState(false)
  // עוקב אחר שליחת נתונים לשרת דרך פונקציית סבמיט
  const [loadingData, setLoadingData] = useState(false);

  const [cemeteries, setCemeteries] = useState([])
  const [blocks, setBlocks] = useState([])
  const [plots, setPlots] = useState([])
  const [rows, setRows] = useState([])

  const [areaGraves, setAreaGraves] = useState([])

  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map((field, index) => {
      return ({
        ...field,
        disabled: field.disabled && (value !== undefined),
        required: field.required || false,
        show: field?.show || false,
      })
    });
  };

  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (data, newFormValues) => {

    const plot = getEntityByAttr(localPlots, 'id', parseInt(data?.id));
    const block = getEntityByAttr(localBlocks, 'id', parseInt(plot?.blockId));
    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id;

    const areaGrave = getEntityByAttr(localAreaGraves, 'plotId', plot?.id);
    const row = getEntityByAttr(localRows, 'plotId', plot?.id);

    const blockId = block?.id;
    const plotId = plot?.id;
    const lineId = row?.id;

    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId, lineId };

    let areaGraves = getEntitiesByAttr(localAreaGraves, 'gravesList', areaGrave?.gravesList);
    let rows = getEntitiesByAttr(localRows, 'plotId', plotId);
    let plots = getEntitiesByAttr(localPlots, 'blockId', blockId);
    let blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', cemeteryId);

    setBlocks(
      blocks.map(block => {
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
      plots.map(plot => {
        const block = localBlocks.find(block => block?.id === plot?.blockId)
        const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
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
    setAreaGraves(
      areaGraves.map(areaGrave => {
        const row = localRows.find(row => row?.id === areaGrave?.lineId)
        const plot = localPlots.find(plot => plot?.id === areaGrave?.plotId)
        return CommponentOptions({
          value: areaGrave?.id, label: areaGrave?.nameGrave,
          dataUnderRigth: { title: 'שורה: ', value: row?.lineNameHe },
          dataUnderLeft: { title: 'חלקה: ', value: plot?.plotNameHe },
        })
      })
    )

    return { ...newFormValues }
  };

  const handleAllDataLoaded = () => {
    setFieldsWithDynamicDisabled(myColumns(columnStore))
    setCemeteries(
      localCemeteries.map(cemetery => CommponentOptions({ value: cemetery?.id, label: cemetery?.cemeteryNameHe }))
    )
    if (value?.id) {
      let data = getEntityByAttr(localPlots, 'id', value?.id);
      const initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        // let fieldValue = data[field.name] || '';
        return {
          ...acc,
          // [field.name]: fieldValue,
        };
      }, {});

      let res = fieldAuto(data, initialFormValues)

      console.log(res);


      setFormValues(res);
    }
    else {
      setFieldsWithDynamicDisabled(myColumns())
      setBlocks(
        localBlocks.map(block => {
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
        localPlots.map(plot => {
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
  }

  // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => { !loading && handleAllDataLoaded() }, [loading]);

  const fieldChangeCemeteryId = (event, newFormValues) => {
    delete newFormValues?.blockId;
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave
    // delete newFormValues?.graveType

    let tempPlots = []
    let tempBlocks = []

    if (event.target.value !== '') {
      tempBlocks = getEntitiesByAttr(localBlocks, 'cemeteryId', event.target.value)
      tempPlots = localPlots.filter(plot =>
        tempBlocks.some(block => block.id === plot.blockId)
      );
      console.log(tempPlots);
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
  const fieldChangeBlockId = (event, newFormValues) => {
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave
    // delete newFormValues?.graveType

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
  const fieldChangePlotId = (event, newFormValues) => {
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave

    let cemeteryId = newFormValues?.cemeteryId
    let blockId = newFormValues?.blockId

    let tempRows = []
    let tempAreaGraves = []
    let tempPlots = []
    let tempBlocks = []
    let temp = []

    if (event.target.value !== '') {
      const plot = getEntityByAttr(localPlots, 'id', event.target.value)
      const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
      const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

      tempBlocks = getEntitiesByAttr(localBlocks, 'id', plot?.blockId)
      tempPlots = getEntitiesByAttr(localPlots, 'id', event.target.value)
      tempRows = getEntitiesByAttr(localRows, 'plotId', event.target.value)
      tempAreaGraves = getEntitiesByAttr(localAreaGraves, 'plotId', event.target.value)

      cemeteryId = cemetery?.id
      blockId = block?.id
      temp = tempRows.map(row => {
        const plot = localPlots.find(plot => plot?.id === row?.plotId)
        const block = localBlocks.find(block => block?.id === row?.blockId)
        return CommponentOptions({
          value: row?.id, label: row?.lineNameHe,
          dataUnderRigth: { title: 'חלקה: ', value: plot?.plotNameHe },
          dataUnderLeft: { title: 'גוש: ', value: block?.blockNameHe },
        })
      })
      temp = [...temp,
      {
        value: 'add',
        label: '',
        list: (
          <Button onClick={() => setOpen(true)}>הוספת שורה</Button>
        ),
        searchFields: ''
      },
      ]
    }
    else {
      tempBlocks = getEntitiesByAttr(localBlocks, 'id', newFormValues?.blockId)
      tempPlots = localPlots.filter(plot =>
        tempBlocks.some(block => block.id === plot.blockId)
      );
      cemeteryId = newFormValues?.cemeteryId
      blockId = newFormValues?.blockId
    }
    setCemeteries(
      localCemeteries.map(cemetery => {
        return CommponentOptions({
          value: cemetery?.id, label: cemetery?.cemeteryNameHe
        })
      })
    )
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
    setRows(
      temp
    )
    setAreaGraves(
      tempAreaGraves.map(areaGrave => {
        const row = localRows.find(row => row?.id === areaGrave?.lineId)
        const plot = localPlots.find(plot => plot?.id === areaGrave?.plotId)
        return CommponentOptions({
          value: areaGrave?.id, label: areaGrave?.areaGraveNameHe,
          dataUnderRigth: { title: 'שורה: ', value: row?.lineNameHe },
          dataUnderLeft: { title: 'חלקה: ', value: plot?.plotNameHe },
        })
      })
    )
    return { ...newFormValues, blockId, cemeteryId }
  }
  const fieldChangeLineId = (event, newFormValues) => {
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave
    // delete newFormValues?.graveType

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

  const handleChange = (event) => {
    let newFormValues = formValues
    const { name, value } = event.target;

    if (name.startsWith('floor')) {
      setFormValues({ ...formValues, [name]: value })
      return
    }

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
          return key ? item[key].nameGrave.charCodeAt(item[key].nameGrave.length - 1) : 1487;
        });



        const maxUnicode = Math.max(...hebrewLetters);
        const nextLetter = String.fromCharCode(maxUnicode + 1);

        return nextLetter;
      };

      let temp = Object.keys(formValues)
        .filter(key => key.startsWith('floor'))
        .map(key => ({ [key]: formValues[key] }));

      temp = (temp?.length > 0) ? temp : [{}]


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

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

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

      const tempGravesList = generateHash();
      let newFormValues = { ...formValues, ['gravesList']: tempGravesList };
      newFormValues = removeFloorAttributes(newFormValues);

      let floorsValues = convertToObjectArray(formValues);

      delete newFormValues.cemeteryId
      delete newFormValues.blockId
      delete newFormValues.addFloor

      let updatedFloorsValues = floorsValues.map((floor, index) => {
        return {
          graveName: floor.nameGrave,
          graveStatus: 1,
          areaGraveId: tempGravesList,
          plotType: floor.plotType
        };
      });
      
      console.log(updatedFloorsValues);
      
      // הוספת הקומות לערך שנשלח לשרת
      const requestData = {
        ...newFormValues,
        floors: updatedFloorsValues
      };

      // שליחת הבקשה לשרת
      let res = await addOrUpdateDataAreaGrave(requestData);

      if (res === 200) {
        setLoadingData(false);
        navigate(-1);
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

  const handleClose = async () => {
    setOpen(false)
    const tempRows = await AllDataRows()
    console.log(tempRows);

  }

  if (loading || loadingData) return <LoadingOverlay />


  return (
    <>
      <FormTemplate
        title={`הוספת ${NAME_ENTITY}`}
        btn={`שמור`}
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
          areaGraves,
        }}
      />
      <CustomDialog open={open} handleClose={() => setOpen(false)} title={'הוספת שורה'}>
        <RowCreate plotId={formValues?.plotId || ''} />
      </CustomDialog>
      <p><span style={{ fontFamily: "'Courier New', Courier, monospace" }}>יצירת קבר</span></p>
    </>
  )
}

export default GraveCreate

const generateHash = () => {
  const randomValue = uuidv4();
  const hash = CryptoJS.SHA1(randomValue).toString(CryptoJS.enc.Hex);
  return hash;
}
