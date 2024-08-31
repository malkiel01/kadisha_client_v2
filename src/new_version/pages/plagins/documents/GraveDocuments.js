import React from 'react';
import useQueries from '../../../../database/useQueries';
import { useIndexedDBSyncV2 } from '../../../../database/dataLocal/indexedDBHooks';
import PageDocumentsGrave from './PageDocumentsGrave';
import useDocManager from '../../../../database/documents/docManager';
import { format } from 'date-fns';
import { mapFieldValues } from '../utility';
import { useSelector } from 'react-redux';
import MyGenericComponent from './documentsDetails';
import LoadingOverlay from '../../pagesMains/LoadingOverlay';

const GraveDocuments = ({ grave, purchaseContent, burialContent }) => {
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const { getEntityByAttr } = useQueries();

  const { docConsular, docDeep, docPurchase, docBurial, docDeath } = useDocManager();

  // קבלת נתוני דאטה בייס
  const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');
  const { data: localBurials, loading: loadingBurials } = useIndexedDBSyncV2('myStore', 'dataBurials');
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localCountries, loading: loadingCountries } = useIndexedDBSyncV2('myStore', 'dataCountries');
  const { data: localCities, loading: loadingCities } = useIndexedDBSyncV2('myStore', 'dataCities');

  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCustomers || loadingPurchases || loadingBurials ||
    loadingCemeteries || loadingBlocks || loadingPlots || loadingRows ||
    loadingAreaGraves || loadingCountries || loadingCities


  if (loading) return <LoadingOverlay />

  const areaGrave = getEntityByAttr(localAreaGraves, 'gravesList', grave?.areaGraveId);
  const row = getEntityByAttr(localRows, 'id', areaGrave?.lineId);
  const plot = getEntityByAttr(localPlots, 'id', areaGrave?.plotId);
  const block = getEntityByAttr(localBlocks, 'id', plot?.blockId);
  const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId);

  const purchases = getEntityByAttr(localPurchases, 'graveId', grave?.id);
  const customer = mapFieldValues([getEntityByAttr(localCustomers, 'id', purchases?.clientId)], optionsFields)[0]
  const contact = getEntityByAttr(localCustomers, 'id', purchases?.contactId);
  const country = getEntityByAttr(localCountries, 'id', customer?.countryId);
  const city = getEntityByAttr(localCities, 'id', customer?.cityId);
  const resident = customer?.resident;

  const handleClick = (setIsClicked) => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100); // העמעום יישאר למשך 100 מילישניות
  };

  const handleClickConsular = (id, fileName, setIsClicked) => {
    handleClick(setIsClicked);

    const data = {
      serialNumber: purchases?.serialPurchaseId || '----',
      name: `${
        (customer?.nom === '' || customer?.nom === undefined) ?
         `${customer?.firstName || ''} ${customer?.lastName || ''}` : customer?.nom}`,
      cemetery: cemetery?.cemeteryNameEn || '----',
      block: block?.blockNameEn || '----',
      plot: plot?.plotNameEn || '----',
      row: row?.lineNameEn || '----',
      grave: grave?.graveName !== '' ? `${areaGrave?.nameGrave}-${grave?.graveName}` : `${areaGrave?.nameGrave}`,
      deep: purchases?.deedNum || '----',
    };

    const document = 'consular';
    
    docConsular(data, document, fileName);
  };

  const handleClickPurchase = (id, fileName, setIsClicked) => {
    handleClick(setIsClicked);

    console.log('grave: ',grave);
    console.log('customer: ',customer);
    console.log('purchases: ',purchases);
    console.log('======', purchases?.serialPurchaseId);
    
    


      // בדיקה אם dateBirth קיים ואם הוא תאריך תקף
  let formattedDateBirth = '';
  if (customer?.dateBirth) {
    const date = new Date(customer?.dateBirth);
    if (!isNaN(date.getTime())) { // בדיקה אם התאריך תקף
      formattedDateBirth = format(date, 'dd/MM/yyyy');
    }
  }


    const data = {
      serialNumber: purchases?.serialPurchaseId || '1234',

      lastName: customer?.lastName?.toString() || '',
      nameFather: customer?.nameFather?.toString() || '',
      gender: customer?.gender?.toString() || '',

      firstName: customer?.firstName?.toString() || '',
      nameMother: customer?.nameMother?.toString() || '',
      maritalStatus: customer?.maritalStatus?.toString() || '',

      numId: customer?.numId?.toString() || '',
      dateBirth: formattedDateBirth,
      association: customer?.association?.toString() || '',

      oldName: customer?.oldName?.toString() || '',
      dateBirthHe: customer?.dateBirthHe?.toString() || '',

      contactName: contact ? `${contact?.firstName} ${contact?.lastName}` : '',
      contactId: contact?.numId?.toString() || '',

      kinship: purchases?.kinship?.toString() || '',
      contactPhone: contact?.phone?.toString() || '',
      contactPhoneMobile: contact?.phoneMobile?.toString() || '',

      noData: customer?.noData?.toString() || 'noData',


      address: customer?.address?.toString() || '',
      city: city?.cityNameHe?.toString() || '',
      country: country?.countryNameHe?.toString() || '',

      phone: customer?.phone?.toString() || '',
      phoneMobile: customer?.phoneMobile?.toString() || '',

      cemetery: cemetery?.cemeteryNameHe?.toString() || '',
      block: block?.blockNameHe?.toString() || '',
      plot: plot?.plotNameHe?.toString() || '',
      row: row?.lineNameHe?.toString() || '',
      plotType: grave?.plotType?.toString() || '',
      price: purchases?.price?.toString() || '',



      grave: `${areaGrave?.nameGrave}-${grave?.graveName}`?.toString() || '',
      deep: purchases?.serialPurchaseId?.toString() || '',
    };

    const document = 'purchase';
    
    docPurchase(data, document, fileName);
  };

  const handleClickDeep = (id, fileName, setIsClicked) => {
    handleClick(setIsClicked);

    const data = {
      serialNumber: purchases?.serialPurchaseId || '1234',
      name: `${customer?.firstName} ${customer?.lastName} ${customer?.nom}`,
      numId: `${customer?.numId}`,
      address: `${customer?.address} ${country?.countryNameHe} ${city?.cityNameHe}`,
      cemetery: cemetery?.cemeteryNameHe,
      block: block?.blockNameHe,
      plot: plot?.plotNameHe,
      row: row?.lineNameHe,
      grave: grave?.graveName !== '' ? `${areaGrave?.nameGrave}-${grave?.graveName}` : `${areaGrave?.nameGrave}`,
      deep: purchases?.serialPurchaseId,
    };

    const document = 'deep';
    docDeep(data, document, fileName);
  };

  const documentsPurchases = [
    { id: 1, src: '../images/docConsular.png', fileName: 'אישור קונסולרי.pdf', handleClick: handleClickConsular },
    { id: 2, src: '../images/docPurchase.png', fileName: 'טופס רכישה.pdf', handleClick: handleClickPurchase },
    { id: 2, src: '../images/docDeep.png', fileName: 'שטר קבר.pdf', handleClick: handleClickDeep },
  ];

  const handleClickBurial = (id, fileName, setIsClicked) => {
    handleClick(setIsClicked);

    const data = {
      serialNumber: purchases?.serialPurchaseId || '1234',

      lastName: customer?.lastName,
      firstName: customer?.firstName,
      numId: customer?.numId,
      oldName: customer?.oldName,

      nameFather: customer?.nameFather,
      nameMother: customer?.nameMother,
      dateBirth: format(new Date(customer?.dateBirth), 'dd/MM/yyyy'),

      gender: customer?.gender,
      maritalStatus: customer?.maritalStatus,
      dateBirth: customer?.dateBirth,

      address: `${customer?.address} ${country?.countryNameHe} ${city?.cityNameHe}`,
      cemetery: cemetery?.cemeteryNameHe,
      block: block?.blockNameHe,
      plot: plot?.plotNameHe,
      row: row?.lineNameHe,

      grave: `${areaGrave?.nameGrave}-${grave?.graveName}`,
      deep: purchases?.serialPurchaseId,
    };

    const document = 'burial';
    docBurial(data, document, fileName);
  };

  const documentsBurials = [
    { id: 1, src: '../images/document.png', fileName: 'טופס קבורה.pdf', handleClick: handleClickBurial },
    { id: 2, src: '../images/document.png', fileName: 'אישור קבורה.pdf', handleClick: handleClickDeep },
  ];

  const menuItems = [
    {
      key: '1',
      label: 'מסמכי רכישה',
      disabled: !(purchaseContent && purchaseContent?.length > 0),
      content: <PageDocumentsGrave documents={documentsPurchases} />,
    },
    {
      key: '2',
      label: 'מסמכי קבורה',
      disabled: !(burialContent && burialContent?.length > 0),
      content: <PageDocumentsGrave documents={documentsBurials} />,
    },
    {
      key: '3',
      label: 'מסמכים כללים',
      content: <PageDocumentsGrave documents={[]} />,
    },
  ];

  return (
    <>
    <MyGenericComponent menuItems={menuItems} />
    </>
  )
};

export default GraveDocuments;
