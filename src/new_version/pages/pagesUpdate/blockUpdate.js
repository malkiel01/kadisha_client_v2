import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQueries from '../../../database/useQueries';
import FormTemplate from '../../template/form/FormTemplate';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import CommponentOptions from '../plagins/data/commponentOptions';
import { format } from 'date-fns';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';

const NAME_ENTITY = 'גוש';

function BlockUpdate() {
  // קבלת ערכים מהסטור
  const columns = useSelector((state) => state.columnsFormBlocks.data)

  // טעינת היוזים לפונקציות עזר
  const { addOrUpdateDataBlock, getEntitiesByAttr, getEntityByAttr } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
 
  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks 

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
  // משתנים לערכי סלקט של השדות
  const [cemeteries, setCemeteries] = useState([])
  const [blocks, setBlocks] = useState([])

  const myColumns = () => {
    return columns.map(field => {
      let lock = false
      return ({
        ...field,
        disabled: lock ? lock : field.disabled && (value !== undefined),
        required: (field.required || false),
        show: field?.show || false,
      })
    });
  };

  // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => { !loading && handleAllDataLoaded() }, [loading]);

  // טעינת הנתונים לאחר קבלת הערכים מהדאטה בייס הלוקלי
  const handleAllDataLoaded = () => {
    setFieldsWithDynamicDisabled(myColumns())
    if (value?.id) {
      const data = getEntityByAttr(localBlocks, 'id', value?.id)

      const initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        let fieldValue = data[field.name] || '';
        return {
          ...acc,
          [field.name]: fieldValue,
        };
      }, { id: data.id });

      setCemeteries(
        localCemeteries.map(cemetery => CommponentOptions({ value: cemetery?.id, label: cemetery?.cemeteryNameHe }))
      )
      const blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', data?.cemeteryId)
      ?.filter(block => block?.id !== data?.id)
      
      setBlocks(blocks)

      setFormValues(initialFormValues);
    }
  }
  //לוגיקת הזנה בשדות הטופס
  const handleChange = (event) => {
    let newFormValues = formValues
    setFormValues({ ...newFormValues, [event.target.name]: event.target.value });
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
        if (blocks.some(item => item[field.name] === formValues[field.name])) {
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
      setLoadingData(true);
      let res = await addOrUpdateDataBlock(formValues);
      if (res === 200) {
        setLoadingData(false);
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
      options={{ cemeteryId: cemeteries }}
    />
  );
}

export default BlockUpdate;