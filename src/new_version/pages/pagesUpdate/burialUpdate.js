import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQueries from '../../../database/useQueries';
import FormTemplate from '../../template/form/FormTemplate';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { CommponentOptions, getFieldOptions } from '../plagins/data/commponentOptions';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import { format, isValid, parse, parseISO } from 'date-fns';

const NAME_ENTITY = ' קבורה'

function BurialUpdate() {
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
        field.name === 'areaGraveId' || field.name === 'graveId' ||
        field.name === 'clientId'
      ) ? true : false
      return ({
        ...field,
        disabled: lock ? lock : field.disabled && (grave !== undefined),
        required: (field.name === 'spouse' && formValues.maritalStatus === 2) ? true : (field.required || false),
        show: field?.show || false,
      })
    });
  };

  // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => { !loading && handleAllDataLoaded() }, [loading]);

  // טעינת הנתונים לאחר קבלת הערכים מהדאטה בייס הלוקלי
  const handleAllDataLoaded = () => {
    setFieldsWithDynamicDisabled(myColumns())

    console.log(value, grave);


    if (value?.id) {

      const data = getEntityByAttr(localBurials, 'id', value?.id)

      let initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        let fieldValue = data[field.name] || '';

        if (field.input === 'date') {
          try {
            const date = parseISO(fieldValue);
            fieldValue = format(date, 'yyyy-MM-dd');
          } catch (error) {
            fieldValue = ''; // ערך לא תקין, אפשר להחזיר ערך ריק או מה שמתאים לך
          }
        }

        return {
          ...acc,
          [field.name]: fieldValue,
        };
      }, { id: data.id });

      let res = fieldAuto(data, initialFormValues)

      setFormValues(res)
    }
  }

  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (data, newFormValues) => {

    const burial = getEntityByAttr(localBurials, 'id', data?.id);
    const purchase = getEntityByAttr(localPurchases, 'id', data?.purchaseId);

    const grave = getEntityByAttr(localGraves, 'id', data?.graveId);
    const areaGrave = getEntityByAttr(localAreaGraves, 'gravesList', grave?.areaGraveId);
    const row = getEntityByAttr(localRows, 'id', parseInt(areaGrave?.lineId));
    const plot = getEntityByAttr(localPlots, 'id', parseInt(row?.plotId));
    const block = getEntityByAttr(localBlocks, 'id', parseInt(plot?.blockId));

    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id;
    const blockId = block?.id;
    const plotId = plot?.id;
    const lineId = row?.id;
    const areaGraveId = areaGrave?.id;
    const graveId = grave?.id;
    const clientId = burial?.clientId

    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId, lineId, areaGraveId, graveId, clientId };

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

  const fieldChangeCemeteryId = (event, newFormValues) => {
    delete newFormValues?.blockId;
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave
    delete newFormValues?.graveType

    let blocks = getEntitiesByAttr(localBlocks, event.target.name, event.target.value);
    let plots = [];
    blocks.forEach(block => {
      let tempPlots = getEntitiesByAttr(localPlots, 'blockId', block?.id);
      plots = plots.concat(tempPlots); // איחוד המערכים במקום הוספת מערך בתוך מערך
    });
    let rows = []
    let areaGraves = []

    return {
      blocks,
      plots,
      rows,
      areaGraves
    }
  }
  const fieldChangeBlockId = (event, newFormValues) => {
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave
    delete newFormValues?.graveType

    const block = getEntityByAttr(localBlocks, 'id', parseInt(event.target.value))
    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id

    newFormValues = { ...newFormValues, cemeteryId }

    let plots = getEntitiesByAttr(localPlots, event.target.name, event.target.value)
    let rows = []
    let areaGraves = []

    return {
      newFormValues,
      plots,
      rows,
      areaGraves
    }
  }
  const fieldChangePlotId = (event, newFormValues) => {
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave
    delete newFormValues?.graveType

    const plot = getEntityByAttr(localPlots, 'id', parseInt(event.target.value))
    const block = getEntityByAttr(localBlocks, 'id', parseInt(plot?.blockId))
    const blockId = block?.id
    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id

    newFormValues = { ...newFormValues, cemeteryId, blockId }

    let rows = getEntitiesByAttr(localRows, event.target.name, event.target.value)
    let areaGraves = getEntitiesByAttr(localAreaGraves, event.target.name, event.target.value)

    return {
      newFormValues,
      rows,
      areaGraves
    }
  }

  const handleChange = (event) => {
    let newFormValues = formValues
    if (event.target.name === 'cemeteryId') {
      let res = fieldChangeCemeteryId(event, newFormValues)
      setBlocks(res?.blocks)
      setPlots(res?.plots)
      setRows(res?.rows)
      setAreaGraves(res?.areaGraves)
    }
    if (event?.target?.name === 'blockId') {
      let res = fieldChangeBlockId(event, newFormValues)
      setPlots(res?.plots)
      setRows(res?.rows)
      setAreaGraves(res?.areaGraves)
      newFormValues = res?.newFormValues
    }
    if (event?.target?.name === 'plotId') {
      let res = fieldChangePlotId(event, newFormValues)
      setRows(res?.rows)
      setAreaGraves(res?.areaGraves)
      newFormValues = res?.newFormValues
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
        console.log('hiiii');
        
        try {
          setLoadingData(true);

          // הוספת נתוני הקבר, הלקוח, והחתימות למבנה הנתונים שנשלח לשרת
          const requestData = {
            ...newFormValues,
          };

          console.log(requestData);
          

          // שליחת הנתונים לשרת בפנייה אחת
          let res = await addOrUpdateDataBurial(requestData);

          // בדיקת התוצאה
          if (res === 200) {
            // פעולות לאחר הצלחה
            setLoadingData(false);
            navigate(-1);
          } else {
            // טיפול במקרה של כישלון
            console.error("השאילתה נכשלה");
            setLoadingData(false);
          }
        } catch (error) {
          console.error("שגיאה בביצוע השאילתות:", error);
          setLoadingData(false);
        }
      }

      executeQueries(newFormValues)

      // console.log(newFormValues);

      // let res = await addOrUpdateDataBurial(newFormValues)
      // if (res === 200) {
      //   let updateClient = getEntityByAttr(localCustomers, 'id', newFormValues?.clientId)
      //   let updateGrave = getEntityByAttr(localGraves, 'id', value?.id)

      //   let resUpdateGrave = await addOrUpdateDataGrave({ ...updateGrave, graveStatus: 1 });
      //   let resUpdateClient = await addOrUpdateDataCustomer({ ...updateClient, statusCustomer: 3, graveId: value?.id });

      //   if (resUpdateGrave === 200 && resUpdateClient === 200) {
      //     setloadingData(false);
      //     navigate(-1);
      //   }
      // }
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

export default BurialUpdate;
