import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useQueries from '../../../database/useQueries'
import { useSelector } from 'react-redux'
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { format, parseISO } from 'date-fns'
import CommponentOptions, { getFieldOptions } from '../plagins/data/commponentOptions'
import FormTemplate from '../../template/form/FormTemplate';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks'

const NAME_ENTITY = ' מחירון'

function PaymentUpdate() {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsFormPayments.data)

  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr, getEntitiesByAttr, addOrUpdateDataPayment } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localPayments, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPayments');
  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingRows || loadingPurchases;
  // ערכי הראוטר
  const location = useLocation()
  const navigate = useNavigate()
  const { value, grave } = location.state || {};

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

  // משתנים לערכי סלקט של השדות
  const [cemeteries, setCemeteries] = useState([])
  const [blocks, setBlocks] = useState([])
  const [plots, setPlots] = useState([])
  const [rows, setRows] = useState([])
  
  // פונקציה לטעינת השדות מתוך הסטור
  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map(field => {
      return ({
        ...field,
        // כאן ניתן להוסיף חוקים לנעילת שדה או להיפך
        disabled: field.disabled && (grave !== undefined),
        // כאן ניתן להוסיף חוקים לחובת שדה או להיפך
        required: (field.required || false),
        // כאן ניתן להוסיף חוקים להסתרת שדה או להיפך
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
      const payment = getEntityByAttr(localPayments, 'id', value?.id)

      let initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        let fieldValue = payment[field.name] || '';
        if (field.input === 'date') {
          fieldValue = format(payment[field.name], 'yyyy-MM-dd')
        }
        return {
          ...acc,
          [field.name]: fieldValue,
        };
      }, { id: payment.id });

      fieldAuto(payment, initialFormValues)

      setFormValues(initialFormValues)
    }
  }
  
  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (payment, newFormValues) => {
    setCemeteries(
      [
        CommponentOptions({ value: '', label: '' }),
        ...localCemeteries.map(cemetery => CommponentOptions({ value: cemetery?.id, label: cemetery?.cemeteryNameHe }))
      ]
    )
    setBlocks(
      [
        CommponentOptions({ value: '', label: '' }),
        ...localBlocks.map(block => {
          const cemetery = localCemeteries.find(cemetery => cemetery?.id === block?.cemeteryId)
          return CommponentOptions({
            value: block?.id, label: block?.blockNameHe, dataUnderRigth: {
              title: 'בית עלמין: ',
              value: cemetery?.cemeteryNameHe
            }
          })
        })
      ]
    )
    setPlots(
      [
        CommponentOptions({ value: '', label: '' }),
        ...localPlots.map(plot => {
          const block = localBlocks.find(block => block?.id === plot?.blockId)
          const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
          return CommponentOptions({
            value: plot?.id, label: plot?.plotNameHe,
            dataUnderRigth: { title: 'גושים: ', value: block?.blockNameHe },
            dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
          })
        })
      ]
    )
    setRows(
      [CommponentOptions({ value: '', label: '' })]
    )
    return newFormValues
  };

  //לוגיקת הזנה ב cemetery
  const fieldChangeCemeteryId = (event, newFormValues) => {

    delete newFormValues?.blockId;
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    if (event.target.value === -1) {
      setBlocks(
        [
          CommponentOptions({ value: '', label: '' }),
          ...localBlocks.map(block => {
            const cemetery = localCemeteries.find(cemetery => cemetery?.id === block?.cemeteryId)
            return CommponentOptions({
              value: block?.id, label: block?.blockNameHe, dataUnderRigth: {
                title: 'בית עלמין: ',
                value: cemetery?.cemeteryNameHe
              }
            })
          })
        ]
      )
    } else {
      const blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', event.target.value)
      const plots = localPlots.filter(plot =>
        blocks.some(block => block.id === plot.blockId)
      );
      setBlocks(
        [
          CommponentOptions({ value: '', label: '' }),
          ...blocks.map(block => {
            const cemetery = localCemeteries.find(cemetery => cemetery?.id === block?.cemeteryId)
            return CommponentOptions({
              value: block?.id, label: block?.blockNameHe, dataUnderRigth: {
                title: 'בית עלמין: ',
                value: cemetery?.cemeteryNameHe
              }
            })
          })
        ]
      )
      setPlots(
        [
          CommponentOptions({ value: '', label: '' }),
          ...plots.map(plot => {
            const block = localBlocks.find(block => block?.id === plot?.blockId)
            const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
            console.log(plot);
            return CommponentOptions({
              value: plot?.id, label: plot?.plotNameHe,
              dataUnderRigth: { title: 'גוש: ', value: block?.blockNameHe },
              dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
            })
          })
        ]
      )
    }
  }
  //לוגיקת הזנה ב block
  const fieldChangeBlockId = (event, newFormValues) => {
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;

    const plots = getEntitiesByAttr(localPlots, 'blockId', event.target.value)
    const block = getEntityByAttr(localBlocks, 'id', event.target.value)
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

    setPlots(
      [
        CommponentOptions({ value: '', label: '' }),
        ...plots.map(plot => {
          const block = localBlocks.find(block => block?.id === plot?.blockId)
          const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
          return CommponentOptions({
            value: plot?.id, label: plot?.plotNameHe,
            dataUnderRigth: { title: 'גוש: ', value: block?.blockNameHe },
            dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
          })
        })
      ]
    )
    return { cemeteryId: cemetery?.id }
  }
  //לוגיקת הזנה ב plot
  const fieldChangePlotId = (event, newFormValues) => {
    delete newFormValues?.lineId;

    const plot = getEntityByAttr(localPlots, 'id', event.target.value)
    const rows = getEntitiesByAttr(localRows, 'plotId', event.target.value)
    const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

    setRows(
      [
        CommponentOptions({ value: '', label: '' }),
        ...rows.map(row => {
          return CommponentOptions({
            value: row?.id, label: row?.lineNameHe,
            dataUnderRigth: { title: 'חלקה: ', value: plot?.plotNameHe },
            dataUnderLeft: { title: 'גוש: ', value: block?.blockNameHe },
          })
        })
      ]
    )
    return { blockId: block?.id, cemeteryId: cemetery?.id }
  }
  //לוגיקת הזנה בשדות הטופס
  const handleChange = (event) => {
    let newFormValues = formValues

    if (event.target.name === 'cemeteryId') {
      fieldChangeCemeteryId(event, newFormValues)
    }
    if (event?.target?.name === 'blockId') {
      const res = fieldChangeBlockId(event, newFormValues)
      console.log(res);
      newFormValues = { ...newFormValues, cemeteryId: res?.cemeteryId }
    }
    if (event?.target?.name === 'plotId') {
      const res = fieldChangePlotId(event, newFormValues)
      newFormValues = { ...newFormValues, blockId: res?.blockId, cemeteryId: res?.cemeteryId }
    }
    if (event?.target?.name === 'test') {

      setFormValues({ ...newFormValues, [event.target.name]: format(parseISO(event.target.value), 'yyyy-MM-dd') });
    }
    else {
      setFormValues({ ...newFormValues, [event.target.name]: event.target.value });
    }
  }
  // אימות ערכים
  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    columns.forEach(field => {
      if (field.required && !formValues[field.name]) {
        tempErrors[field.name] = 'שדה חובה';
        formIsValid = false;
      }
      if (field.notRepeat && formValues[field.name]) {
        if (plots.some(item => item[field.name] === formValues[field.name])) {
          tempErrors[field.name] = `הערך ${formValues[field.name]} כבר קיים`;
          formIsValid = false;
        }
      }
    });

    setErrors(tempErrors);
    return formIsValid;
  }
  // שליחת הטופס
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoadingData(true)
      let newFormValues = formValues

      console.log(newFormValues)

      let res = await addOrUpdateDataPayment(newFormValues);
      if (res === 200) {
        setLoadingData(false);
        navigate(-1);
      }
    }
  };

  if (loading || loadingData) return <LoadingOverlay />

  return (
    <>
      <FormTemplate
        title={`עריכת ${NAME_ENTITY}`}
        btn={`עדכן`}
        fields={fieldsWithDynamicDisabled}
        columns={columns}
        formValues={formValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        options={{
          cemeteryId: cemeteries,
          blockId: blocks,
          plotId: plots,
          lineId: rows,
          plotType: getFieldOptions('plotType', optionsFields, true),
          graveType: getFieldOptions('graveType', optionsFields, true),
          resident: getFieldOptions('resident', optionsFields, true),
          priceDefinition: getFieldOptions('priceDefinition', optionsFields, true),
          buyerStatus: getFieldOptions('buyerStatus', optionsFields, true)
        }}
      />
      <p><span style={{ fontFamily: "'Courier New', Courier, monospace" }}>עדכון מחירון</span></p>
    </>
  );
}

export default PaymentUpdate;
