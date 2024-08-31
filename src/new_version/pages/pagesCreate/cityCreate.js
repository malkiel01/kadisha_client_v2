import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQueries from '../../../database/useQueries';
import CommponentOptions from './data/commponentOptions';
import { useSelector } from 'react-redux';
import FormTemplate from '../../template/form/FormTemplate';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';

const NAME_ENTITY = 'עיר'

function CityCreate() {

 // קבלת ערכים מהסטור
 const columns = useSelector((state) => state.columnsFormCities.data)
 
 // טעינת היוזים לפונקציות עזר
 const { addOrUpdateDataCity, getEntitiesByAttr, getEntityByAttr } = useQueries()

 // קבלת נתוני דאטה בייס
 const { data: localCountries, loading: loadingCountries } = useIndexedDBSyncV2('myStore', 'dataCountries');
 const { data: localCities, loading: loadingCities } = useIndexedDBSyncV2('myStore', 'dataCities');
 
 // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
 const loading = loadingCountries || loadingCities 

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
 const [countries, setCountries] = useState([])
 const [cities, setCities] = useState([])

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
    setCountries(
      localCountries.map(country => CommponentOptions({ value: country?.id, label: country?.countryNameHe }))
    )
    if (value?.id) {
      const data = getEntityByAttr(localCountries, 'id', value?.id)

      const initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        return {
          ...acc,
        };
      }, { id: data.id });

      const cities = getEntitiesByAttr(localCities, 'countryId', data?.countryId)
      
      setCities(cities)

      setFormValues(initialFormValues);
    }
  }

  const fieldChangeCountryId = (event) => {
    const cities = getEntitiesByAttr(localCities, 'countryId', event.target.value)
    console.log(localCities);
    
    setCities(cities)
  }

  const handleChange = (event) => {
    let newFormValues = formValues
    console.log(event.target.name);
    
    if (event.target.name === 'countryId') {
      fieldChangeCountryId(event)
    }
    setFormValues({ ...newFormValues, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    columns.forEach(field => {
      if (field.required && !formValues[field.name]) {
        tempErrors[field.name] = 'שדה חובה';
        formIsValid = false;
      }
      if (field.notRepeat && formValues[field.name]) {
        console.log(cities);
        
        if (cities.some(item => item[field.name] === formValues[field.name])) {
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
      let res = await addOrUpdateDataCity(formValues)
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
        fields={fieldsWithDynamicDisabled}
        columns={columns}
        formValues={formValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        options={{ countryId: countries }}
      />
  )
}

export default CityCreate;