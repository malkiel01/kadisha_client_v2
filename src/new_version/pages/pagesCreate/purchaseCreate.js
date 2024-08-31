import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import FormTemplate from '../../template/form/FormTemplate';
import LoadingOverlay from '../pagesMains/LoadingOverlay';
import { useIndexedDBSyncV2 } from '../../../database/dataLocal/indexedDBHooks';
import CommponentOptions, { formatPriceIL, getFieldOptions } from '../plagins/data/commponentOptions';
import useCalculatePrice from '../plagins/useCalculatePrice';
import useQueries from '../../../database/useQueries';
import { format } from 'date-fns';
import SignatureForm from '../plagins/signs/SignatureForm';
import CryptoJS from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'
import { useContext } from 'react';
import { GlobalContext } from '../../../App';

const NAME_ENTITY = 'רכישה'

function PurchaseCreate() {
  const { permission } = useContext(GlobalContext)
  const myPermissions = []

  // קבלת ערכים מהסטור
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data);
  const columns = useSelector((state) => state.columnsFormPurchases.data);

  // טעינת היוזים לפונקציות עזר
  const { getEntityByAttr, getEntitiesByAttr, addOrUpdateDataPurchase, addOrUpdateDataGrave, addOrUpdateDataCustomer, addOrUpdateDataSignature, AllDataSignatures } = useQueries();
  // לוגיקה לטיפול בתשלומים
  const calculatePrice = useCalculatePrice();

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
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingAreaGraves || loadingGraves || loadingRows || loadingCustomers || loadingPurchases;
  // ערכי הראוטר
  const location = useLocation()
  const navigate = useNavigate()
  const { grave } = location.state || {};

  // דרישה לפניה לשרת
  // כרגע לא פעיל
  // const dataKeysAsync = ['dataPayments'];
  // const loadingAsync = useDataLoader(dataKeysAsync);

  // איזור המשתנים והסטייטים
  // משתנים לטופס
  const [fieldsWithDynamicDisabled, setFieldsWithDynamicDisabled] = useState([]); // השדות
  const [formValues, setFormValues] = useState({}); // ערכי השדות
  const [errors, setErrors] = useState({}); // שגיאת השדות
  const [recordChild, setRecordChild] = useState(-1);
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

  // פונקציה לטעינת השדות מתוך הסטור
  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map((field, index) => {
      const tempPermission = ((permission === 0) || (myPermissions.includes(permission)))
      let lock = false
      if (!tempPermission) {
        lock = (
          field.name === 'BookkeepingApproval'
        ) ? true : false
      }
      return ({
        ...field,
        // disabled: field.disabled && (grave !== undefined),
        disabled: lock ? lock : field.disabled && (grave !== undefined),
        required: (field.name === 'spouse' && formValues.maritalStatus === 2) ? true : (field.required || false),
        show: field?.show || false,
      })
    });
  };

  // טעינת ערכים אוטומטית לשדות
  const fieldAuto = (grave, newFormValues) => {

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

    newFormValues = { ...newFormValues, cemeteryId, blockId, plotId, lineId, areaGraveId };

    newFormValues = { ...newFormValues, purchaseStatus: 1 }

    let graves = getEntitiesByAttr(localGraves, 'areaGraveId', areaGrave?.gravesList);
    let areaGraves = getEntitiesByAttr(localAreaGraves, 'gravesList', areaGrave?.gravesList);
    let rows = getEntitiesByAttr(localRows, 'plotId', plotId);
    let plots = getEntitiesByAttr(localPlots, 'blockId', blockId);
    let blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', cemeteryId);
    console.log();
    
    let customers = localCustomers?.filter(cust => (cust?.statusCustomer === 1))

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
      localCustomers.map(cust => {
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

    return {
      newFormValues,
    };
  };

  // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => { !loading && handleAllDataLoaded() }, [loading]);

  const handleAllDataLoaded = () => {
    if (grave?.id) {
      setFieldsWithDynamicDisabled(myColumns())
      let data = getEntityByAttr(localGraves, 'id', grave?.id) || {};
      data = { graveId: grave?.id, areaGraveId: data?.areaGraveId, graveName: data?.graveName, }

      let initialFormValues = myColumns().filter(field => field?.name).reduce((acc, field) => {
        // console.log(field.name);
        let fieldValue = data[field.name] || '';
        // כיון שזהוא טופס חדש, אין תאריך וזה רק משמש לתאריך דיפולטיבי
        if (field.input === 'date') {
          fieldValue = format(new Date(), 'yyyy-MM-dd')
        }
        if (field.name === 'BookkeepingApproval') {
          fieldValue = 1
        }
        return {
          ...acc,
          [field.name]: fieldValue,
        };
      }, { id: data.id });

      let res = fieldAuto(data, initialFormValues)
      initialFormValues = res?.newFormValues

      if (initialFormValues?.price !== undefined) {
        initialFormValues = { ...initialFormValues, price: formatPriceIL({ value: initialFormValues?.price }) }
      }

      setFormValues(initialFormValues);
    }
  };

  // פונקציה לשינוי בשדות הטופס
  const handleChange = (event) => {

    let newFormValues = { ...formValues }

    newFormValues = { ...newFormValues, [event.target.name]: event.target.value }
    if (
      newFormValues?.clientId &&
      newFormValues?.buyerStatus &&
      newFormValues?.cemeteryId &&
      newFormValues?.blockId &&
      newFormValues?.plotId &&
      newFormValues?.lineId &&
      newFormValues?.areaGraveId &&
      newFormValues?.graveId
    ) {
      const resPrices = calculatePrice(newFormValues);

      // המערך test המכיל את הערכים שבהם נרצה להתמקד
      const tempListPrices = newFormValues?.paymentsList || [];

      // עדכון ה-listPrices בהתאם לערכים החדשים
      const updatedListPrices = paymentsList.map(item => {
        const matchingPrice = resPrices.find(price => price.name === item.value);
        return matchingPrice ? { ...item, price: matchingPrice.value } : item;
      });
      // עדכון הערך בסטייט
      setPaymentsList(updatedListPrices);

      // חישוב הסכום של המחירים מתוך הסטייט prices רק עבור ה-IDs שנמצאים במערך test
      const tempTotalPrice = updatedListPrices
        .filter(item => tempListPrices.includes(item.value))
        .reduce((sum, item) => sum + item.price, 0);

      setTotalPrice(tempTotalPrice)
      newFormValues = { ...newFormValues, price: formatPriceIL(tempTotalPrice) }
    }

    setFormValues(newFormValues);
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
      handleOpenForm()
    }
  };

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

  const handleOpenForm = () => {
    setIsFormOpen(true);
  }

  const handleCloseForm = () => {
    setIsFormOpen(false);
  }

  const handleFormSubmit = (submittedSignatures) => {

    const hashPurchase = generateHash()

    setLoadingData(true)
    let newFormValues = { ...formValues, hashPurchase, price: totalPrice, paymentsList : JSON.stringify(formValues?.paymentsList) };
    delete newFormValues?.cemeteryId;
    delete newFormValues?.blockId;
    delete newFormValues?.plotId;
    delete newFormValues?.lineId;
    delete newFormValues?.areaGraveId;

    console.log(newFormValues);

    async function executeQueries(newFormValues) {
      try {
        setLoadingData(true);
    
        // הכנת הנתונים לשרת
        let updateClient = getEntityByAttr(localCustomers, 'id', newFormValues?.clientId);
        let updateGrave = getEntityByAttr(localGraves, 'id', grave?.id);
        
        // הוספת נתוני הקבר, הלקוח, והחתימות למבנה הנתונים שנשלח לשרת
        const requestData = {
          ...newFormValues,
          updateGrave: { ...updateGrave, graveStatus: 2 },
          updateCustomer: { ...updateClient, statusCustomer: 2, graveId: grave?.id },
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
  }

  if (loading || loadingData) { return <LoadingOverlay /> }

  return (
    <>
      <FormTemplate
        title={`הוספת ${NAME_ENTITY}`}
        btn={`שמור`}
        fields={fieldsWithDynamicDisabled}
        columns={columns}
        formValues={{ ...formValues }}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        lockUpdate={false}
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
          paymentsList: paymentsList,
          association: getFieldOptions('association', optionsFields),
          buyerStatus: getFieldOptions('buyerStatus', optionsFields),
          isFuneralPayments: getFieldOptions('isFuneralPayments', optionsFields),
          numOfPayments: getFieldOptions('numOfPayments', optionsFields),
          BookkeepingApproval: getFieldOptions('BookkeepingApproval', optionsFields),
          diesSpouse: getFieldOptions('diesSpouse', optionsFields),
          purchaseStatus: getFieldOptions('purchaseStatus', optionsFields),
        }}
      />
      <div>

        <SignatureForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          signatures={signatures} setSignatures={setSignatures}
        />
      </div>
      <p><span style={{ fontFamily: "'Courier New', Courier, monospace" }}>יצירת לקוח</span></p>
    </>
  );
}

const generateHash = () => {
  const randomValue = uuidv4();
  const hash = CryptoJS.SHA1(randomValue).toString(CryptoJS.enc.Hex);
  return hash;
}

export default PurchaseCreate;
