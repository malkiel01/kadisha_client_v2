import React, { useState, useEffect } from 'react';
import useQueries from '../../../database/useQueries';
import FormTemplate from '../../template/form/FormTemplate';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';

const NAME_ENTITY = 'בית עלמין';

function CemeteryUpdate() {
  // קבלת ערכים מהסטור
  const columns = useSelector((state) => state.columnsFormCemeteries.data);

  // טעינת היוזים לפונקציות עזר
  const { addOrUpdateDataCemetery, getEntityByAttr } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
 
  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries 

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
      const data = getEntityByAttr(localCemeteries, 'id', value?.id)

      const initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        let fieldValue = data[field.name] || '';
        return {
          ...acc,
          [field.name]: fieldValue,
        };
      }, { id: data.id });

      setFormValues(initialFormValues);
    }
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    let cemeteries = localCemeteries
      ?.filter(cemetery => cemetery?.id !== formValues?.id)

    columns.forEach(field => {
      if (field?.required && !formValues[field.name]) {
        tempErrors[field.name] = 'שדה חובה';
        formIsValid = false;
      }
      if (field.notRepeat && formValues[field.name]) {
        if (cemeteries.some(item => item[field.name] === formValues[field.name])) {
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
      setLoadingData(true);
      let res = await addOrUpdateDataCemetery(formValues);
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
      />
  );
}

export default CemeteryUpdate;
