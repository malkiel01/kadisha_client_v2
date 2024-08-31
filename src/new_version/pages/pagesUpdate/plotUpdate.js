import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQueries from '../../../database/useQueries';
import FormTemplate from '../../template/form/FormTemplate';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import CommponentOptions from '../plagins/data/commponentOptions';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';

const NAME_ENTITY = 'חלקה'

function PlotUpdate() {
  // קבלת ערכים מהסטור
  const columns = useSelector((state) => state.columnsFormPlots.data)

  // טעינת היוזים לפונקציות עזר
  const { addOrUpdateDataPlot, getEntitiesByAttr, getEntityByAttr } = useQueries()

   // קבלת נתוני דאטה בייס
   const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
   const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
   const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
   // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
   const loading = loadingCemeteries || loadingBlocks || loadingPlots;
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
  const [loadingData, setloadingData] = useState(false);

  // משתנים לערכי סלקט של השדות
  const [cemeteries, setCemeteries] = useState([])
  const [blocks, setBlocks] = useState([])
  const [plots, setPlots] = useState([])
  
   // פונקציה לטעינת השדות מתוך הסטור
  const myColumns = () => {
    return columns.map(field => {
      return ({
        ...field,
        disabled: field.disabled && (value !== undefined),
        required: field.required || false,
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
    let data = getEntityByAttr(localPlots, 'id', value?.id) || {};

    const initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
      let fieldValue = data[field.name] || '';

      return {
        ...acc,
        [field.name]: fieldValue,
      };
    }, { id: data.id });

    let res = fieldAuto(data, initialFormValues)

    setFormValues(res);
   }
 }

  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (data, newFormValues) => {

    const block = getEntityByAttr(localBlocks, 'id', data?.blockId)
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)
    const cemeteryId = cemetery?.id
    const blockId = block?.id;

    let blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', cemeteryId);
    let plots = getEntitiesByAttr(localPlots, 'blockId', blockId);

    newFormValues = { ...newFormValues, cemeteryId, blockId };

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

  const fieldChangeCemeteryId = (event, newFormValues) => {
    delete newFormValues?.blockId;

    if (event.target.value === '') {
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
    }
    else {
      const blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', event.target.value)
      const plots = localPlots.filter(plot =>
        blocks.some(block => block.id === plot.blockId)
      );
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
      setPlots(plots)
    }

  }
  const fieldChangeBlockId = (event, newFormValues) => {

    const plots = getEntitiesByAttr(localPlots, 'blockId', event.target.value)
    const block = getEntityByAttr(localBlocks, 'id', event.target.value)
    const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

    setPlots(plots)
    return { cemeteryId: cemetery?.id }
  }
  const handleChange = (event) => {
    let newFormValues = formValues

    if (event.target.name === 'cemeteryId') {
      fieldChangeCemeteryId(event, newFormValues)
    }
    if (event?.target?.name === 'blockId') {
      const res = fieldChangeBlockId(event, newFormValues)
      if (event.target.value !== '') {
        newFormValues = { ...newFormValues, cemeteryId: res?.cemeteryId }
      }
    }
    setFormValues({ ...newFormValues, [event.target.name]: event.target.value });
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
    const newFormValues = { ...formValues }
    delete newFormValues.cemeteryId
    if (validateForm()) {
      setloadingData(true);
      let res = await addOrUpdateDataPlot(newFormValues);
      if (res === 200) {
        setloadingData(false);
        navigate(-1);
      }
    }
  };

  if (loading || loadingData) return <LoadingOverlay />

  return (
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
        blockId: blocks
      }}
    />
  )
}

export default PlotUpdate;