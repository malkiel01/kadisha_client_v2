import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useQueries from '../../../../database/useQueries';
import { useIndexedDBSyncV2 } from '../../../../database/dataLocal/indexedDBHooks';
import LoadingOverlay from '../../pagesMains/LoadingOverlay';
import FormTemplate from '../../../template/form/FormTemplate';
import CommponentOptions, { formatPriceIL, getFieldOptions } from '../../plagins/data/commponentOptions';
import SignatureForm from '../../plagins/signs/SignatureForm';

function PurchaseUpdatePer2({ value, grave, handleClose }) {
  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data);
  const columns = useSelector((state) => state.columnsFormPurchases.data);

  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr, getEntitiesByAttr, addOrUpdateDataPurchase, AllDataSignatures, addOrUpdateDataSignature } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');
  const { data: localSignatures, loading: loadingSignatures } = useIndexedDBSyncV2('myStore', 'dataSignatures');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingAreaGraves || loadingGraves || loadingRows || loadingCustomers || loadingPurchases || loadingSignatures
  // ערכי הראוטר
  // const location = useLocation()
  // const navigate = useNavigate()
  // const { value, grave } = location.state || {};

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
  const [areaGraves, setAreaGraves] = useState([]);
  const [graves, setGraves] = useState([]);
  const [clients, setClients] = useState([]);
  const [paymentsList, setPaymentsList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [signatures, setSignatures] = useState([
    {
      signatureImage: null,
      signerName: "מלכיאל בן עזרא מזכיר ח״ק",
      signerTitle: "מלכיאל בן עזרא מזכיר ח״ק",
      permission: 1,
      status: 1,
      timestamp: null,
    },
    {
      signatureImage: null,
      signerName: "רבקה ג׳ורנו הנה״ח",
      signerTitle: "רבקה ג׳ורנו הנה״ח",
      permission: 3,
      status: 1,
      timestamp: null,
    },
  ]);

  // פונקציה לטעינת השדות מתוך הסטור
  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map((field, index) => {
      let lock = false
      lock = (
        field.name !== 'isFuneralPayments' && field.name !== 'BookkeepingApproval' && field.name !== 'paymentsList' &&
        field.name !== 'numOfPayments'
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
    console.log(value);

    if (value?.id) {

      const purchase = getEntityByAttr(localPurchases, 'id', value?.id)
      const grave = getEntityByAttr(localGraves, 'id', purchase?.graveId)
      const mySignatures = getEntitiesByAttr(localSignatures, 'hashPurchase', purchase?.hashPurchase);
      const processSignatures = async (signatures) => {

        const updatedSignatures = await Promise.all(signatures?.map(async (item) => {
          return {
            ...item
          };
        }));

        return updatedSignatures;
      };

      let initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        let fieldValue = purchase[field.name] || '';

        if (field.name === 'paymentsList') {
          fieldValue = JSON.parse(purchase[field.name])
        }
        // if (field.name === 'dateOpening' || field.name === 'PaymentEndDate' || field.name === 'reportingBL' || field.name === 'dateBurial') {
        //   try {
            
        //     const date = parseISO(purchase[field.name]);
        //     fieldValue = format(date, 'yyyy-MM-dd');
        //     console.log(purchase[field.name]);
        //     console.log(date);
        //     console.log(fieldValue);
        //   } catch (error) {
        //     fieldValue = ''; // ערך לא תקין, אפשר להחזיר ערך ריק או מה שמתאים לך
        //   }
        // }
        if (field.name === 'price') {
          setTotalPrice(purchase[field.name])
          fieldValue = formatPriceIL(purchase[field.name])
        }
        return {
          ...acc,
          [field.name]: fieldValue,
        };
      }, { id: purchase.id });

      processSignatures(mySignatures).then(updatedSignatures => {
        setSignatures(updatedSignatures);
      });

      let res = fieldAuto(grave, purchase, initialFormValues)

      setFormValues(res)
    }
  }

  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (grave, purchase, newFormValues) => {

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

    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId, lineId, areaGraveId, graveId };

    let graves = getEntitiesByAttr(localGraves, 'areaGraveId', areaGrave?.gravesList);
    let areaGraves = getEntitiesByAttr(localAreaGraves, 'gravesList', areaGrave?.gravesList);
    let rows = getEntitiesByAttr(localRows, 'plotId', plotId);
    let plots = getEntitiesByAttr(localPlots, 'blockId', blockId);
    let blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', cemeteryId);
    let customers = localCustomers?.filter(cust => (cust?.statusCustomer !== 2) || (cust?.statusCustomer === 2 && cust?.id === purchase?.clientId))
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
    setPaymentsList(
      [
        { value: 1, label: 'תשלום עלות הקבר', price: 0 },
        { value: 2, label: 'תשלום שירותי לוויה', price: 0 },
        { value: 3, label: 'תשלום אגרת מצבה', price: 0 },
      ]
    )

    return newFormValues
  };

  //לוגיקת הזנה ב cemetery
  const fieldChangeCemeteryId = (event, newFormValues) => {
    delete newFormValues?.blockId;
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave;
    delete newFormValues?.graveType;

    let blocks = getEntitiesByAttr(localBlocks, event.target.name, event.target.value);
    let plots = [];
    blocks.forEach(block => {
      let tempPlots = getEntitiesByAttr(localPlots, 'blockId', block?.id);
      plots = plots.concat(tempPlots);
    });
    let rows = [];
    let areaGraves = [];
    let graves = [];

    return {
      blocks,
      plots,
      rows,
      areaGraves,
      graves,
    };
  };
  //לוגיקת הזנה ב block
  const fieldChangeBlockId = (event, newFormValues) => {
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave;
    delete newFormValues?.graveType;

    const block = getEntityByAttr(localBlocks, 'id', parseInt(event.target.value));
    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id;

    newFormValues = { ...newFormValues, cemeteryId };

    let plots = getEntitiesByAttr(localPlots, event.target.name, event.target.value);
    let rows = [];
    let areaGraves = [];
    let graves = [];

    return {
      newFormValues,
      plots,
      rows,
      areaGraves,
      graves,
    };
  };
  //לוגיקת הזנה ב plot
  const fieldChangePlotId = (event, newFormValues) => {
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave;
    delete newFormValues?.graveType;

    const plot = getEntityByAttr(localPlots, 'id', parseInt(event.target.value));
    const block = getEntityByAttr(localBlocks, 'id', parseInt(plot?.blockId));
    const blockId = block?.id;
    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id;

    newFormValues = { ...newFormValues, cemeteryId, blockId };

    let rows = getEntitiesByAttr(localRows, event.target.name, event.target.value);
    let areaGraves = getEntitiesByAttr(localAreaGraves, event.target.name, event.target.value);
    let graves = [];

    return {
      newFormValues,
      rows,
      areaGraves,
      graves,
    };
  };
  //לוגיקת הזנה ב row
  const fieldChangeLineId = (event, newFormValues) => {
    delete newFormValues?.areaGraveId;
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave;
    delete newFormValues?.graveType;

    const row = getEntityByAttr(localRows, 'id', parseInt(event.target.value));
    const plot = getEntityByAttr(localPlots, 'id', parseInt(row?.plotId));
    const block = getEntityByAttr(localBlocks, 'id', parseInt(plot?.blockId));

    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id;
    const blockId = block?.id;
    const plotId = plot?.id;

    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId };

    let areaGraves = getEntitiesByAttr(localAreaGraves, event.target.name, event.target.value);
    let graves = [];

    return {
      newFormValues,
      areaGraves,
      graves,
    };
  };
  //לוגיקת הזנה ב area grave
  const fieldChangeAreaGraveId = (event, newFormValues) => {
    delete newFormValues?.graveId;
    delete newFormValues?.nameGrave;
    delete newFormValues?.graveType;

    const areaGrave = getEntityByAttr(localAreaGraves, 'id', parseInt(event.target.value));
    const row = getEntityByAttr(localRows, 'id', parseInt(areaGrave?.lineId));
    const plot = getEntityByAttr(localPlots, 'id', parseInt(row?.plotId));
    const block = getEntityByAttr(localBlocks, 'id', parseInt(plot?.blockId));

    const cemeteryId = getEntityByAttr(localCemeteries, 'id', parseInt(block?.cemeteryId))?.id;
    const blockId = block?.id;
    const plotId = plot?.id;
    const lineId = row?.id;

    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId, lineId };

    let graves = getEntitiesByAttr(localGraves, event.target.name, areaGrave?.gravesList);

    return {
      newFormValues,
      graves,
    };
  };
  //לוגיקת הזנה בשדות הטופס
  const handleChange = (event) => {
    let newFormValues = { ...formValues };
    if (event.target.name === 'cemeteryId') {
      let res = fieldChangeCemeteryId(event, newFormValues);
      setBlocks(res?.blocks);
      setPlots(res?.plots);
      setRows(res?.rows);
      setAreaGraves(res?.areaGraves);
      setGraves(res?.graves);
    }
    if (event?.target?.name === 'blockId') {
      let res = fieldChangeBlockId(event, newFormValues);
      setPlots(res?.plots);
      setRows(res?.rows);
      setAreaGraves(res?.areaGraves);
      setGraves(res?.graves);
      newFormValues = res?.newFormValues;
    }
    if (event?.target?.name === 'plotId') {
      let res = fieldChangePlotId(event, newFormValues);
      setRows(res?.rows);
      setAreaGraves(res?.areaGraves);
      setGraves(res?.graves);
      newFormValues = res?.newFormValues;
    }
    if (event?.target?.name === 'lineId') {
      let res = fieldChangeLineId(event, newFormValues);
      setAreaGraves(res?.areaGraves);
      setGraves(res?.graves);
      newFormValues = res?.newFormValues;
    }
    if (event?.target?.name === 'areaGraveId') {
      let res = fieldChangeAreaGraveId(event, newFormValues);
      setGraves(res?.graves);
      newFormValues = res?.newFormValues;
    }
    setFormValues({ ...newFormValues, [event.target.name]: event.target.value });
  };
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
        if (plots.some(item => item[field.name] === formValues[field.name])) {
          tempErrors[field.name] = `הערך ${formValues[field.name]} כבר קיים`;
          formIsValid = false;
        }
      }
    });

    setErrors(tempErrors);
    return formIsValid;
  };
  // שליחת הטופס
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleOpenForm()
    }
  };
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (submittedSignatures) => {

    setLoadingData(true)
    let newFormValues = { ...formValues, price: totalPrice, paymentsList: JSON.stringify(formValues?.paymentsList) };
    delete newFormValues?.cemeteryId;
    delete newFormValues?.blockId;
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;

    if (submittedSignatures && submittedSignatures?.length > 0) {
      if (!submittedSignatures.some(signer => signer.signatureImage === null)) {
        newFormValues = { ...newFormValues, purchaseStatus: 3 }
      }
    }

    async function executeQueries(newFormValues) {
      try {
        setLoadingData(true);
        
        // הוספת נתוני הקבר, הלקוח, והחתימות למבנה הנתונים שנשלח לשרת
        const requestData = {
          ...newFormValues,
          signatures: submittedSignatures.map(element => ({
            ...element,
            hashPurchase: newFormValues.hashPurchase
          }))
        };
    
        // שליחת הנתונים לשרת בפנייה אחת
        let res = await addOrUpdateDataPurchase(requestData);
    
        // בדיקת התוצאה
        if (res === 200) {
          // פעולות לאחר הצלחה
          setLoadingData(false);
          AllDataSignatures();
          handleClose()
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
  };

  return (
    <>
      <FormTemplate
        btn={`עדכן`}
        fields={fieldsWithDynamicDisabled}
        columns={columns}
        formValues={{ ...formValues }}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        local={true}
        options={{
          cemeteryId: cemeteries,
          blockId: blocks,
          plotId: plots,
          lineId: rows,
          areaGraveId: areaGraves,
          graveId: graves,
          clientId: clients,
          contactId: contacts,
          paymentsList: paymentsList,
          BookkeepingApproval: getFieldOptions('BookkeepingApproval', optionsFields),
          buyerStatus: getFieldOptions('buyerStatus', optionsFields),
          purchaseStatus: getFieldOptions('purchaseStatus', optionsFields),
          isFuneralPayments: getFieldOptions('isFuneralPayments', optionsFields),
          diesSpouse: getFieldOptions('diesSpouse', optionsFields),
          numOfPayments: getFieldOptions('numOfPayments', optionsFields),
        }}
      />

      <SignatureForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        signatures={signatures}
        setSignatures={setSignatures}
      />

      <p><span style={{ fontFamily: "'Courier New', Courier, monospace" }}>עדכון רכישה</span></p>
      {
        (loading || loadingData) && <LoadingOverlay />
      }
    </>
  );
}


export default PurchaseUpdatePer2;
