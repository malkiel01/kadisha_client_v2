import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQueries from '../../../database/useQueries';
import { useSelector } from 'react-redux';
import CommponentOptions from './data/commponentOptions';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import FormTemplate from '../../template/form/FormTemplate';
import LoadingOverlay from '../pagesMains/LoadingOverlay';

const NAME_ENTITY = 'גוש';

function BlockCreate() {
  // קבלת ערכים מהסטור
  const columns = useSelector((state) => state.columnsFormBlocks.data)

  // טעינת היוזים לפונקציות עזר
  const { addOrUpdateDataBlock, getEntitiesByAttr, getEntityByAttr } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks

  const location = useLocation()
  const navigate = useNavigate()
  const { data, value, grave } = location.state || {};

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

  const [cemeteries, setCemeteries] = useState([]);
  const [blocks, setBlocks] = useState([])

  // פונקציה לטעינת השדות מתוך הסטור
  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map((field, index) => {
      let lock = false
      if (value?.id) {
        lock = (
          field.name === 'cemeteryId'
        )
      }
      return ({
        ...field,
        disabled: lock ? lock : field.disabled,
        required: field.required || false,
        show: field?.show || false,
      })
    });
  };

  // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => { !loading && handleAllDataLoaded() }, [loading]);

  // טעינת הנתונים לאחר קבלת הערכים מהדאטה בייס הלוקלי
  const handleAllDataLoaded = () => {
    setCemeteries(
      localCemeteries.map(cemetery => CommponentOptions({ value: cemetery?.id, label: cemetery?.cemeteryNameHe }))
    )
    if (value?.id) {
      setFieldsWithDynamicDisabled(myColumns())
      const data = getEntityByAttr(localCemeteries, 'id', value?.id)
      
      
      
      let initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        return {
          ...acc,
        };
      },{});
      
      
      
      let res = fieldAuto(data, initialFormValues)
      initialFormValues = res
      
      setFormValues(initialFormValues);
    }
    else {
      setFieldsWithDynamicDisabled(myColumns())
    }
  }

  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (data, newFormValues) => {

    let blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', data?.id);

    setBlocks(blocks)

    return { ...newFormValues, cemeteryId: data?.id }
  };





  // --------------

  const fieldChangeCemeteryId = (event) => {
    const blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', event.target.value)
    setBlocks(blocks)
  }
  const handleChange = (event) => {
    let newFormValues = formValues
    if (event.target.name === 'cemeteryId') {
      fieldChangeCemeteryId(event)
    }
    setFormValues({ ...newFormValues, [event.target.name]: event.target.value });
    
  }
  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    console.log(blocks);
    

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(formValues);
      
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
        options={{ cemeteryId: cemeteries }}
      />
    </>
  );
}

export default BlockCreate;