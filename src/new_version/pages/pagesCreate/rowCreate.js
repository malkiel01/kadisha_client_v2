import React, { useEffect, useState } from 'react';
import useQueries from '../../../database/useQueries';
import FormTemplate from '../../template/form/FormTemplate';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import CommponentOptions from '../plagins/data/commponentOptions';
import { useLocation } from 'react-router-dom';

function RowCreate({ plotId }) {
  // קבלת ערכים מהסטור
  const columns = useSelector((state) => state.columnsFormRows.data);

  // טעינת היוזים לפונקציות עזר
  const { AllDataRows, addOrUpdateDataRow, getEntityByAttr, getEntitiesByAttr } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingRows;
  // ערכי הראוטר
  const location = useLocation()
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
  const [loadingData, setloadingData] = useState(false);

  // משתנים לערכי סלקט של השדות
  const [cemeteries, setCemeteries] = useState([])
  const [blocks, setBlocks] = useState([])
  const [plots, setPlots] = useState([])

  // פונקציה לטעינת השדות מתוך הסטור
  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map((field, index) => {
      let lock = false
      lock = (
        field.name === 'cemeteryId' || field.name === 'blockId' || field.name === 'plotId' 
      ) ? true : false
      return ({
        ...field,
        disabled: lock ? lock : field.disabled,
        required: (field.name === 'spouse' && formValues.maritalStatus === 2) ? true : (field.required || false),
        show: field?.show || false,
      })
    });
  };

  // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => {!loading && handleAllDataLoaded()}, [loading]);

  // טעינת הנתונים לאחר קבלת הערכים מהדאטה בייס הלוקלי
  const handleAllDataLoaded = () => {
    setFieldsWithDynamicDisabled(myColumns())
    if (value?.id) {
      // const purchase = getEntityByAttr(localPurchases, 'id', value?.id)
      // const grave = getEntityByAttr(localGraves, 'id', purchase?.graveId)

      // let initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
      //   let fieldValue = purchase[field.name] || '';

      //   if (field.name === 'clientId') {
      //     console.log([field.name],': ', fieldValue);
      //   }

      //   // // כיון שזהוא טופס חדש, אין תאריך וזה רק משמש לתאריך דיפולטיבי
      //   if (field.input === 'date') {
      //     fieldValue = format(purchase[field.name], 'yyyy-MM-dd')
      //   }
      //   if (field.name === 'price') {
      //     console.log('price: ', purchase[field.name]);
      //   }
      //   return {
      //     ...acc,
      //     [field.name]: fieldValue,
      //   };
      // }, { id: purchase.id });

      // let res = fieldAuto(grave, purchase, initialFormValues)

      // setFormValues(res)
    }
    if (plotId) {
      const data = getEntityByAttr(localPlots, 'id', plotId)


      let res = fieldAuto(data, {...formValues})

      setFormValues(res)
    }
  }

  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (data , newFormValues) => {

    const block = getEntityByAttr(localBlocks, 'id', parseInt(data?.blockId));

    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id;
    const blockId = block?.id;
    const plotId = data?.id;

    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId };

    let plots = getEntitiesByAttr(localPlots, 'blockId', blockId);
    let blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', cemeteryId);


    setCemeteries(
      localCemeteries.map(cemetery => CommponentOptions({ value: cemetery?.id, label: cemetery?.cemeteryNameHe }))
    )
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

    return newFormValues
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    let rows = localRows
    ?.filter(row => row?.plotId === formValues?.plotId)
    ?.filter(row => row?.id !== formValues?.id)

    columns.forEach(field => {
      if (field.required && !formValues[field.name]) {
        tempErrors[field.name] = 'שדה חובה';
        formIsValid = false;
      }

      if (field.notRepeat && formValues[field.name]) {
        if (rows.some(item => item[field.name] === formValues[field.name])) {
          tempErrors[field.name] = `הערך ${formValues[field.name]} כבר קיים`;
          formIsValid = false;
        }
      }
    });

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setloadingData(true);
      let newFormValues = { ...formValues }
      delete newFormValues.cemeteryId
      delete newFormValues.blockId
      console.log(newFormValues);
      let res = await addOrUpdateDataRow(newFormValues);
      if (res === 200) {
        setloadingData(false);
        AllDataRows()
        const submitEvent = new CustomEvent('rowCreateSubmit');
        window.dispatchEvent(submitEvent);
      }
    }
  };

  // if (loading || loadingData) return <LoadingOverlay />

  return (
    <>
    <FormTemplate
          btn={'שמור'}
          fields={fieldsWithDynamicDisabled}
          columns={columns}
          formValues={formValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          local={true}
          options={{
            cemeteryId: cemeteries,
            blockId: blocks,
            plotId: plots,
          }}
        />
        {(loading || loadingData) && <LoadingOverlay />}
    </>
  )
}

export default RowCreate;
