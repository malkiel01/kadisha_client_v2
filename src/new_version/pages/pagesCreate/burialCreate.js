import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQueries from '../../../database/useQueries';
import FormTemplate from '../../template/form/FormTemplate';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { useSelector } from 'react-redux';
import { CommponentOptions, getFieldOptions } from '../plagins/data/commponentOptions';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import { format } from 'date-fns';

const NAME_ENTITY = ' קבורה'

function BurialCreate() {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsFormBurials.data)

  // טעינת היוזים לפונקציות עזר
  const { addOrUpdateDataCustomer, addOrUpdateDataBurial, addOrUpdateDataGrave, getEntitiesByAttr, getEntityByAttr } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');
  const { data: localBurials, loading: loadingBurials } = useIndexedDBSyncV2('myStore', 'dataBurials');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingAreaGraves || loadingGraves || loadingRows
    || loadingCustomers || loadingPurchases || loadingBurials;

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


  const [recordChild, setRecordChild] = useState(-1);
  const [isEdit, setIsEdit] = useState(false);

  const [cemeteries, setCemeteries] = useState([]);
  const [blocks, setBlocks] = useState([])
  const [plots, setPlots] = useState([])
  const [rows, setRows] = useState([])
  const [areaGraves, setAreaGraves] = useState([]);
  const [graves, setGraves] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);

  // פונקציה לטעינת השדות מתוך הסטור
  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map((field, index) => {
      let lock = false
      lock = (
        field.name === 'cemeteryId' || field.name === 'blockId' ||
        field.name === 'plotId' || field.name === 'lineId' ||
        field.name === 'areaGraveId' || field.name === 'graveId'
        || (field.name === 'clientId' && getEntityByAttr(localPurchases, 'graveId', grave?.id)?.id)
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
  useEffect(() => { !loading && handleAllDataLoaded() }, [loading]);

  // טעינת הנתונים לאחר קבלת הערכים מהדאטה בייס הלוקלי
  const handleAllDataLoaded = () => {
    if (grave?.id) {
      setFieldsWithDynamicDisabled(myColumns())



      const purchase = getEntityByAttr(localPurchases, 'graveId', grave?.id)

      console.log(purchase?.serialPurchaseId)

      let data = { graveId: grave?.id, purchaseId: purchase?.serialPurchaseId }


      let initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        let fieldValue = data[field.name] || '';
        // כיון שזהוא טופס חדש, אין תאריך וזה רק משמש לתאריך דיפולטיבי
        if (field.input === 'date') {
          if (field.name === 'dataOpening') {
            fieldValue = format(new Date(), 'yyyy-MM-dd')
          }
        }

        return {
          ...acc,
          [field.name]: fieldValue,
        };
      }, { id: data.id });

      console.log(initialFormValues);


      let res = fieldAuto(data, initialFormValues)
      initialFormValues = res

      setFormValues(initialFormValues);
    }
  }

  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (data, newFormValues) => {

    const grave = getEntityByAttr(localGraves, 'id', data?.graveId);
    const areaGrave = getEntityByAttr(localAreaGraves, 'gravesList', grave?.areaGraveId);
    const row = getEntityByAttr(localRows, 'id', parseInt(areaGrave?.lineId));
    const plot = getEntityByAttr(localPlots, 'id', parseInt(row?.plotId));
    const block = getEntityByAttr(localBlocks, 'id', parseInt(plot?.blockId));

    const purchase = getEntityByAttr(localPurchases, 'graveId', data?.graveId);
    const burial = getEntityByAttr(localBurials, 'graveId', data?.graveId);

    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id;
    const blockId = block?.id;
    const plotId = plot?.id;
    const lineId = row?.id;
    const areaGraveId = areaGrave?.id;
    const graveId = grave?.id;

    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId, lineId, areaGraveId, graveId };

    let graves = getEntitiesByAttr(localGraves, 'areaGraveId', areaGrave?.gravesList);
    let areaGraves = getEntitiesByAttr(localAreaGraves, 'gravesList', areaGrave?.gravesList);
    let rows = getEntitiesByAttr(localRows, 'plotId', plotId);
    let plots = getEntitiesByAttr(localPlots, 'blockId', blockId);
    let blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', cemeteryId);
    let customers = localCustomers?.filter(cust => {
      let mycust = purchase?.clientId || burial?.clientId || null
      if (cust?.id !== mycust) {
        if (cust?.statusCustomer !== 2 && cust?.statusCustomer !== 3) {
          return cust
        }
      }
      else {
        newFormValues = { ...newFormValues, clientId: cust?.id }
        return cust
      }
      return
    })
    let contacts = localCustomers

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
    setRows(
      rows.map(row => {
        const plot = localPlots.find(plot => plot?.id === row?.plotId)
        const block = localBlocks.find(block => block?.id === plot?.blockId)
        const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
        return CommponentOptions({
          value: row?.id, label: row?.lineNameHe,
          dataUnderRigth: { title: 'חלקה: ', value: plot?.plotNameHe },
          dataUnderLeft: { title: 'גוש: ', value: block?.blockNameHe },
        })
      })
    )
    setAreaGraves(
      areaGraves.map(areaGrave => {
        const row = localRows.find(row => row?.id === areaGrave?.lineId)
        const plot = localPlots.find(plot => plot?.id === areaGrave?.plotId)
        return CommponentOptions({
          value: areaGrave?.id, label: areaGrave?.nameGrave,
          dataUnderRigth: { title: 'שורה: ', value: row?.lineNameHe },
          dataUnderLeft: { title: 'חלקה: ', value: plot?.plotNameHe },
        })
      })
    )
    setGraves(
      graves.map(grave => {
        const areaGrave = localAreaGraves.find(areaGrave => areaGrave?.gravesList === grave?.areaGraveId)
        const row = localRows.find(row => row?.id === grave?.lineId)
        const plot = localPlots.find(plot => plot?.id === grave?.plotId)
        return CommponentOptions({
          value: grave?.id, label: `${areaGrave?.nameGrave}${grave?.graveName}`,
          dataUnderRigth: { title: 'שורה: ', value: row?.lineNameHe },
          dataUnderLeft: { title: 'חלקה: ', value: plot?.plotNameHe },
        })
      })
    )
    setClients(
      customers.map(cust => {
        return CommponentOptions({
          value: cust?.id, label: `${cust?.firstName} ${cust?.lastName}`,
          dataUnderRigth: { title: 'זיהוי: ', value: cust?.numId },
        })
      })
    )
    setContacts(
      contacts.map(cust => {
        return CommponentOptions({
          value: cust?.id, label: `${cust?.firstName} ${cust?.lastName}`,
          dataUnderRigth: { title: 'זיהוי: ', value: cust?.numId },
        })
      })
    )

    return newFormValues
  };

  const handleChange = (event) => {
    let newFormValues = formValues
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoadingData(true)
      let newFormValues = { ...formValues };
      delete newFormValues?.cemeteryId;
      delete newFormValues?.blockId;
      delete newFormValues?.plotId;
      delete newFormValues?.lineId;
      delete newFormValues?.areaGraveId;

      async function executeQueries(newFormValues) {
        try {
          setLoadingData(true);

          // עדכון נתונים מקומיים
          let updateClient = getEntityByAttr(localCustomers, 'id', newFormValues?.clientId);
          let updateGrave = getEntityByAttr(localGraves, 'id', grave?.id);

          const requestData = {
            ...newFormValues,
            updateGrave: { ...updateGrave, graveStatus: 3 },
            updateCustomer: { ...updateClient, statusCustomer: 3, graveId: grave?.id },
          };


          // שאילתה ראשונה
          let res = await addOrUpdateDataBurial(requestData);

          // בדיקת התוצאה
          if (res === 200) {
            // פעולות לאחר הצלחה
            setLoadingData(false);
            navigate(-1);
          } else {
            // טיפול במקרה של כישלון
            console.error("השאילתה נכשלה", res);
            setLoadingData(false);
          }
        } catch (error) {
          console.error("שגיאה בביצוע השאילתות:", error);
          setLoadingData(false);
        }
      }
      async function executeQueriesOld(newFormValues) {
        try {
          setLoadingData(true);

          console.log(newFormValues);


          // שאילתה ראשונה
          let resAddOrUpdateDataPurchase = addOrUpdateDataBurial(newFormValues);

          // עדכון נתונים מקומיים
          let updateClient = getEntityByAttr(localCustomers, 'id', newFormValues?.clientId);
          let updateGrave = getEntityByAttr(localGraves, 'id', grave?.id);

          // שאילתה שניה ושלישית
          let resUpdateGrave = addOrUpdateDataGrave({ ...updateGrave, graveStatus: 3 });
          let resUpdateClient = addOrUpdateDataCustomer({ ...updateClient, statusCustomer: 3, graveId: grave?.id });

          // מחכה לכל השאילתות ביחד
          let results = await Promise.all([
            resAddOrUpdateDataPurchase,
            resUpdateGrave,
            resUpdateClient,
          ]);

          // בודק אם כל התשובות הן 200
          if (results.every(res => res === 200)) {
            // פעולות לאחר הצלחה
            setLoadingData(false);
            navigate(-1);
          } else {
            // טיפול במקרה של כישלון
            console.error("אחת או יותר מהשאילתות נכשלה");
            setLoadingData(false);
          }
        } catch (error) {
          console.error("שגיאה בביצוע השאילתות:", error);
          setLoadingData(false);
        }
      }

      executeQueries(newFormValues)
    }
  };

  if (loading || loadingData) return <LoadingOverlay />

  return (
    <FormTemplate
      title={`${isEdit ? 'עריכת' : 'הוספת'} ${NAME_ENTITY}`}
      btn={`${isEdit ? 'עדכן' : 'שמור'}`}
      fields={fieldsWithDynamicDisabled}
      columns={fieldsWithDynamicDisabled}
      formValues={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      lockUpdate={value !== undefined}
      recordChild={recordChild !== -1}
      options={{
        cemeteryId: cemeteries,
        blockId: blocks,
        plotId: plots,
        lineId: rows,
        areaGraveId: areaGraves,
        graveId: graves,
        clientId: clients,
        contactId: contacts,
        plotType: getFieldOptions('plotType', optionsFields, true),
        graveType: getFieldOptions('graveType', optionsFields, true),
        resident: getFieldOptions('resident', optionsFields, true),
        priceDefinition: getFieldOptions('priceDefinition', optionsFields, true),
        buyerStatus: getFieldOptions('buyerStatus', optionsFields, true),
        isFuneralPayments: getFieldOptions('isFuneralPayments', optionsFields, true),
        numOfPayments: getFieldOptions('numOfPayments', optionsFields, true),
      }}
    />
  )
}

export default BurialCreate;
