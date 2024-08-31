import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useQueries from '../../../database/useQueries'
import { useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { getFieldOptions, CommponentOptions } from '../plagins/data/commponentOptions'
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks'
import FormTemplate from '../../template/form/FormTemplate';
import LoadingOverlay from '../pagesMains/LoadingOverlay';

const NAME_ENTITY = ' מחירון'

function PaymentCreate() {

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
    let initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
      let fieldValue = '';
      if (field.input === 'date') {
        fieldValue = format(new Date(), 'yyyy-MM-dd')
      }
      return {
        ...acc,
        [field.name]: fieldValue,
      };
    }, {});
          fieldAuto(initialFormValues)

      setFormValues(initialFormValues)
  }
  
  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (newFormValues) => {
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

  const fieldChangeCemeteryId = (event, newFormValues) => {
    let blocks = localBlocks
    let plots = localPlots
    let res = {}
    if (event.target.value !== -1) {
      delete newFormValues?.blockId;
      delete newFormValues?.plotId;
      delete newFormValues?.lineId;
      blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', event.target.value)
      plots = localPlots.filter(plot =>
        blocks.some(block => block.id === plot.blockId)
      )
    }
    else {
      res = { plotId: -1, blockId: -1, lineId: -1 }
      setRows([CommponentOptions({ value: '', label: '' })])
    }
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
    return res
  }
  const fieldChangeBlockId = (event, newFormValues) => {
    let res = {}
    if (event.target.value !== -1) {
      delete newFormValues?.plotId;
      delete newFormValues?.lineId;

      const block = getEntityByAttr(localBlocks, 'id', event.target.value)
      const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

      const plots = getEntitiesByAttr(localPlots, 'blockId', event.target.value)

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

      res = { cemeteryId: cemetery?.id }
    }
    else {
      res = { plotId: -1, lineId: -1 }
      setRows([CommponentOptions({ value: '', label: '' })])
    }
    return res
  }
  const fieldChangePlotId = (event, newFormValues) => {
    let res = {}
    if (event.target.value !== -1) {
      delete newFormValues?.lineId;

      const plot = getEntityByAttr(localPlots, 'id', event.target.value)
      const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
      const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

      const rows = getEntitiesByAttr(localRows, 'plotId', event.target.value)

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
      res = { blockId: block?.id, cemeteryId: cemetery?.id }
    }
    else {
      res = { lineId: -1 }
      setRows([CommponentOptions({ value: '', label: '' })])
    }
    return res
  }
  const handleChange = (event) => {
    let newFormValues = formValues
    let value = event.target.value
    if (event.target.name === 'cemeteryId') {
      const res = fieldChangeCemeteryId(event, newFormValues)
      newFormValues = { ...newFormValues, ...res }
    }
    if (event?.target?.name === 'blockId') {
      const res = fieldChangeBlockId(event, newFormValues)
      newFormValues = { ...newFormValues, ...res }
    }
    if (event?.target?.name === 'plotId') {
      const res = fieldChangePlotId(event, newFormValues)
      newFormValues = { ...newFormValues, ...res }
      // if (event.target.value !== -1) {
      //   newFormValues = { ...newFormValues, blockId: res?.blockId, cemeteryId: res?.cemeteryId }
      // }
    }
    // if (event?.target?.name === 'price') {
    //   console.log('before: ', value);
    
    //   // Remove the currency formatting and .00 from the initial value
    //   const valueWithoutCurrency = value.replace(/[^0-9.]/g, '').replace(/(\.\d{2})$/, '');
    
    //   // Extract the numeric value before the last character
    //   const valueBefore = valueWithoutCurrency.slice(0, -1).split('.')[0];
    
    //   // Extract the last character which should be a digit
    //   const valueAfter = valueWithoutCurrency.slice(-1);
    
    //   // Extract the decimal part
    //   const decimalMatch = value.match(/\.([0-9]+)/);
    //   const decimalPart = decimalMatch ? decimalMatch[1] : '00';

    //   console.log('valueBefore: ', valueBefore);
    //   console.log('decimalPart: ', decimalPart);
    //   console.log('valueAfter: ', valueAfter);
    
    //   let numericValue;
    
    //   if (valueBefore === '') {
    //     numericValue = valueAfter; // If there is no value before, use valueAfter
    //   } else {
    //     numericValue = valueBefore + valueAfter; // Combine both parts
    //   }
    
    //   // Combine all parts to form the final value
    //   const finalValue = numericValue + '.' + decimalPart;
    
    //   console.log('finalValue: ', finalValue);
    
    //   setPrice(finalValue); // Set the numeric value without formatting
    //   value = formatPriceIL(finalValue); // Format the value for display
    // }
    // if (event?.target?.name === 'price') {
    //   console.log('before: ', value);
    
    //   // Remove the currency formatting and .00 from the initial value
    //   let valueWithoutCurrency = value.replace(/[^0-9.]/g, '').replace(/(\.\d{2})$/, '');
    
    //   // Extract the numeric value before the last character
    //   const valueBefore = valueWithoutCurrency.slice(0, -1).split('.')[0];
    
    //   // Extract the last character which should be a digit
    //   const valueAfter = valueWithoutCurrency.slice(-1);
    
    //   // Extract the decimal part
    //   const decimalMatch = value.match(/\.([0-9]+)/);
    //   const decimalPart = decimalMatch ? decimalMatch[1] : '00';
    
    //   console.log('valueBefore: ', valueBefore);
    //   console.log('decimalPart: ', decimalPart);
    //   console.log('valueAfter: ', valueAfter);
    
    //   let numericValue;
    
    //   if (valueBefore === '') {
    //     numericValue = valueAfter; // If there is no value before, use valueAfter
    //   } else {
    //     numericValue = valueBefore + valueAfter; // Combine both parts
    //   }
    
    //   // Combine all parts to form the final value
    //   let finalValue = numericValue + '.' + decimalPart;
    
    //   console.log('finalValue: ', finalValue);
    
    //   // Handle case of deletion
    //   if (event.inputType === 'deleteContentBackward') {
    //     if (finalValue.endsWith('.00')) {
    //       finalValue = finalValue.slice(0, -3);
    //     } else if (finalValue.endsWith('0')) {
    //       finalValue = finalValue.slice(0, -1);
    //     }
    //   }
    
    //   console.log('after deletion handling: ', finalValue);
    
    //   setPrice(finalValue); // Set the numeric value without formatting
    //   value = formatPriceIL(finalValue); // Format the value for display
    // }
    
    
    
    
    
    
    
    
    
    
    


    if (event?.target?.name === 'test') {

      setFormValues({ ...newFormValues, [event.target.name]: format(parseISO(event.target.value), 'yyyy-MM-dd') });
    }
    else {
      setFormValues({ ...newFormValues, [event.target.name]: value });
    }
  }
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoadingData(true);
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
      title={`הוספת ${NAME_ENTITY}`}
      btn={`שמור`}
        fields={fieldsWithDynamicDisabled}
        columns={columns}
        formValues={formValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        // lockUpdate={value !== undefined}
        options={{
          cemeteryId: cemeteries,
          blockId: blocks,
          plotId: plots,
          lineId: rows,
          plotType: getFieldOptions('plotType', optionsFields, true),
          graveType: getFieldOptions('graveType', optionsFields, true),
          resident: getFieldOptions('resident', optionsFields, true),
          priceDefinition: getFieldOptions('priceDefinition', optionsFields, true),
          buyerStatus: getFieldOptions('buyerStatus', optionsFields, true),
        }}
      />
      <p><span style={{ fontFamily: "'Courier New', Courier, monospace" }}>יצירת מחירון</span></p>
    </>
  );
}

export default PaymentCreate;
