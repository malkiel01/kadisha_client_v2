import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQueries from '../../../database/useQueries';
import { useSelector } from 'react-redux';
import CommponentOptions, { getFieldOptions } from '../plagins/data/commponentOptions';
import hebrewDate from '../plagins/hebrewDate';
import { useIndexedDBSync, useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import FormTemplate from '../../template/form/FormTemplate';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import useValidateIsraeliId from '../../template/form/components/validate/useValidateIsraeliId';

// הגדרת שם הישות כקבוע
const NAME_ENTITY = 'לקוח';

function CustomerCreate() {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsFormCustomers.data);

  // טעינת היוזים לפונקציות עזר
  const { AllDataCustomers, addOrUpdateDataCustomer, getEntitiesByAttr, getEntityByAttr } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localCountries, loading: loadingCountries } = useIndexedDBSyncV2('myStore', 'dataCountries');
  const { data: localCities, loading: loadingCities } = useIndexedDBSyncV2('myStore', 'dataCities');
  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCustomers || loadingCountries || loadingCities;
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

  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])
  const [spouse, setSpouse] = useState([]);
  const [showSpouseField, setShowSpouseField] = useState(false);

  // פונקציה לטעינת השדות מתוך הסטור
  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map((field, index) => {
      let lock = false
      let required = true
      let show = true
      required = (
        (field.name === 'spouse' && formValues.maritalStatus === 2) ?
          true : field?.required || false
      )
      show = (
        (field.name === 'spouse' && formValues.maritalStatus !== 2) ?
          false : field?.show || false
      )
      return ({
        ...field,
        disabled: lock ? lock : field.disabled,
        required: required,
        show: show,
      })
    });
  };

  // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => { !loading && handleAllDataLoaded() }, [loading]);

  // טעינת הנתונים לאחר קבלת הערכים מהדאטה בייס הלוקלי
  const handleAllDataLoaded = () => {
    setFieldsWithDynamicDisabled(myColumns())

    let initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
      // console.log(field.name);
      let fieldValue = '';
      // // כיון שזהוא טופס חדש, אין תאריך וזה רק משמש לתאריך דיפולטיבי
      // if (field.input === 'date') {
      //   fieldValue = format(new Date(), 'yyyy-MM-dd')
      // }
      if (field.name === 'maritalStatus' || field.name === 'association' || field.name === 'statusCustomer') {
        fieldValue = 1
      }
      return {
        ...acc,
        [field.name]: fieldValue,
      };
    }, {});

    setFormValues(initialFormValues);

    setCountries(
      localCountries.map(item => {
        return CommponentOptions({
          value: item?.id, label: item?.countryNameHe
        })
      })
    )
    setCities(
      localCities.map(item => {
        const country = localCountries.find(country => country?.id === item?.countryId)
        return CommponentOptions({
          value: item?.id, label: item?.cityNameHe, dataUnderRigth: {
            title: 'מדינה: ',
            value: country?.countryNameHe
          }
        })
      })
    )
    setSpouse(localCustomers
      .filter(cust => cust?.maritalStatus !== 2)
      .map(cust => {
        return CommponentOptions({
          value: cust?.id, label: `${cust?.firstName} ${cust?.lastName}`,
          dataUnderRigth: { title: 'זיהוי: ', value: cust?.numId },
        })
      })
    )

  }

  const [id, setId] = useState('');
  const isValidId = useValidateIsraeliId(id);

  const updateResident = (formValues) => {
    const { typeId, countryId, cityId } = formValues;
    let resident = formValues.resident;

    if (typeId === 2 || typeId === 3) {
      resident = 3;
    } else if (typeId === 1) {
      if (countryId == 1) {
        if (cityId == 1) {
          resident = 1;
        } else {
          resident = 2;
        }
      }
    }

    return { ...formValues, resident };
  };

  const fieldChangeCountryId = (event, newFormValues) => {
    delete newFormValues?.cityId;
    let tempCities = []

    if (event.target.value !== '') {
      tempCities = getEntitiesByAttr(localCities, event.target.name, event.target.value);
    }
    else {
      tempCities = localCities
    }
    setCities(
      tempCities.map(city => {
        const country = localCountries.find(country => country?.id === city?.countryId)
        return CommponentOptions({
          value: city?.id, label: city?.cityNameHe, dataUnderRigth: {
            title: 'מדינה: ',
            value: country?.countryNameHe
          }
        })
      })
    )
  };

  const fieldChangeCityId = (event, newFormValues) => {

    let countryId = newFormValues?.countryId

    let tempCities = []

    if (event.target.value !== '') {
      tempCities = getEntitiesByAttr(localCities, 'id', event.target.value);
      const city = getEntityByAttr(localCities, 'id', parseInt(event.target.value));
      const country = getEntityByAttr(localCountries, 'id', parseInt(city?.countryId))

      countryId = country?.id
    }
    else {
      tempCities = getEntitiesByAttr(localCities, 'countryId', newFormValues?.countryId)
    }
    console.log(countryId);

    return { countryId };
  };

  useEffect(() => {
    setFieldsWithDynamicDisabled(myColumns())
  }, [showSpouseField, formValues.maritalStatus, formValues.spouse]);

  const validateForm = () => {

    let tempErrors = {};
    let formIsValid = true;

    // בדיקה ראשונית אם השדה comment שווה ל-'טעינה'
    if (formValues['comment'] === '888') {
      setErrors({});
      return true;
    }

    fieldsWithDynamicDisabled.forEach(field => {
      if (field.required && !formValues[field.name]) {
        tempErrors[field.name] = 'שדה חובה';
        formIsValid = false;
      }
      if (field.name === 'numId' && field.notRepeat && formValues[field.name]) {
        if (localCustomers.some(item => item[field.name] === formValues[field.name])) {
          if (!value?.id) {
            tempErrors[field.name] = `הערך ${formValues[field.name]} כבר קיים`;
            formIsValid = false;
          }
        }
      }
      if (field.name === 'numId' && formValues[field.name]) {
        if (formValues['typeId'] === 1) {
          if (!isValidId) {
            tempErrors[field.name] = `מספר זהוי ${formValues[field.name]} לא תקין`;
            formIsValid = false;
          }
        }
      }
    });

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleChange = (event) => {
    console.log(event?.target?.name);

    let newFormValues = formValues;
    if (event?.target?.name === 'countryId') {
      fieldChangeCountryId(event, newFormValues);
    }
    if (event?.target?.name === 'cityId') {
      let res = fieldChangeCityId(event, newFormValues);
      if (event.target.value !== '') {
        newFormValues = { ...newFormValues, countryId: res?.countryId }
      }
    }
    if (event?.target?.name === 'numId') {
      setId(event?.target?.value);
    }
    if (event?.target?.name === 'maritalStatus') {
      if (event.target.value === 2) {
        setShowSpouseField(true);
      } else {
        setShowSpouseField(false);
      }
    }
    if (event?.target?.name === 'numId') {
      setId(event?.target?.value);
    }
    if (event?.target?.name === 'dateBirth') {
      let hebrewDateString = ''
      const inputDate = new Date(event.target.value);

      if (!isNaN(inputDate)) {
        hebrewDateString = hebrewDate(inputDate);
      }
      newFormValues = { ...newFormValues, ['dateBirthHe']: hebrewDateString }
    }
    newFormValues = { ...newFormValues, [event.target.name]: event.target.value }
    newFormValues = updateResident(newFormValues);
    setFormValues(newFormValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoadingData(true);
      let newFormValues = { ...formValues };
      // בדיקה ראשונית אם השדה comment שווה ל-'טעינה'
      if (formValues['comment'] === '888') {
        newFormValues = { ...newFormValues, comment: '' };
      }
      if (formValues['typeId'] === '') {
        newFormValues = { ...newFormValues, typeId: 3 };
      }
      if (formValues['gender'] === '') {
        newFormValues = { ...newFormValues, gender: null };
      }

      console.log(newFormValues);
      

      let res = await addOrUpdateDataCustomer(newFormValues);

      if (res === 200) {
          setLoadingData(false);
          navigate(-1);
        await AllDataCustomers()
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
        lockUpdate={value !== undefined}
        options={{
          typeId: getFieldOptions('typeId', optionsFields),
          gender: getFieldOptions('gender', optionsFields),
          resident: getFieldOptions('resident', optionsFields),
          maritalStatus: getFieldOptions('maritalStatus', optionsFields),
          association: getFieldOptions('association', optionsFields),
          spouse,
          countryId: countries,
          cityId: cities
        }}
      />
    </>
  )
}

export default CustomerCreate;
