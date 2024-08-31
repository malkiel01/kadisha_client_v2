// cemeteryCreate.js
import React, { useState } from 'react';
import useQueries from '../../../database/useQueries';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { GlobalContext } from '../../../App'
import FormTemplate from '../../template/form/FormTemplate';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';

const NAME_ENTITY = 'מדינה'

function CountryCreate() {

  // קבלת ערכים מהסטור
  const columns = useSelector((state) => state.columnsFormCountries.data)

  // טעינת היוזים לפונקציות עזר
  const { addOrUpdateDataCountry, getEntityByAttr } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCountries, loading: loadingCountries } = useIndexedDBSyncV2('myStore', 'dataCountries');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCountries

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
  }


  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let tempErrors = {}
    let formIsValid = true

    columns.forEach(field => {
      if (field?.required && !formValues[field.name]) {
        tempErrors[field.name] = 'שדה חובה'
        formIsValid = false
      }
      if (field.notRepeat && formValues[field.name]) {
        if (localCountries.some(item => item[field.name] === formValues[field.name])) {
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
      setLoadingData(true)
      let res = await addOrUpdateDataCountry(formValues)
      if (res === 200) {
        setLoadingData(false)
        navigate(-1)
      }
    }
  };

  if (loading || loadingData) return <LoadingOverlay />
  
  return (
      <FormTemplate
      title={`הוספת ${NAME_ENTITY}`}
      btn={`שמור`}
        fields={columns}
        columns={columns}
        formValues={formValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
  );
}

export default CountryCreate;
