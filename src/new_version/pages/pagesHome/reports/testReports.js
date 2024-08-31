import React from 'react';
import SummaryTable from './summaryTable';
import { useIndexedDBSyncV2 } from '../../../../database/dataLocal/indexedDBHooks';
import { useEffect } from 'react';
import useQueryGraves from '../../../../database/filters/queriesGrave';
import { useState } from 'react';

const dataOld = [
  [10, 2, 1, 3, 4], // קברי שדה - פטורה
  [8, 1, 0, 2, 3], // קברי שדה - חריגה
  [8, 1, 0, 2, 3], // קברי שדה - חריגה
  [8, 1, 0, 2, 3], // קברי שדה - חריגה
  // המשך השורות...
];

const TestReports = () => {

  const { getSummaryByAreaGrave } = useQueryGraves()

  const [data, setData] = useState(dataOld);

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


  // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => {
    !loading && handleAllDataLoaded(
      {
        areaGraves: localAreaGraves,
        graves: localGraves
      }
    )
  }, [loading]);

  // קברים פנויים
  const gravesFree = (graves) => {
    return graves?.filter(item => item?.graveStatus === 1 || item?.graveStatus === 4) || []
  }
  // קברים שנרכשו
  const gravesPurchased = (graves) => {
    return graves?.filter(item => item?.graveStatus === 2) || []
  }

  // קברים שנקברו אך לא נרכשו
  const getUnpurchasedBuriedGraves = (graves, purchases) => {
    return graves?.filter(grave => {
      const gravePurchases = purchases.filter(purchase => purchase?.graveId === grave?.id);
      return grave?.graveStatus === 3 && gravePurchases.length === 0;
    }) || [];
  };

  // קברים שנרכשו ונקברו
  const getPurchasedAndBuriedGraves = (graves, purchases) => {
    return graves?.filter(grave => {
      const gravePurchases = purchases.filter(purchase => purchase?.graveId === grave?.id);
      return grave?.graveStatus === 3 && gravePurchases.length > 0;
    }) || [];
  };

  // קברים שנקברו
  const gravesBurial = (graves) => {
    return graves?.filter(item => item?.graveStatus === 3) || []
  }

  // קברים שנרכשו בתווך תאריכים
  function getPurchasedGravesWithinDateRange(graves = [], purchases = [], startDate = new Date(1900, 0, 1), endDate = new Date()) {
    // המרה של התאריכים למופעי Date אם הם מגיעים כמחרוזות
    const start = new Date(startDate);
    const end = new Date(endDate);

    return graves.filter(grave => {
      const gravePurchases = purchases.filter(purchase => purchase?.graveId === grave?.id);
      return gravePurchases.some(purchase => {
        const purchaseDate = new Date(purchase?.dateOpening);
        return purchaseDate >= start && purchaseDate <= end;
      });
    });
  }

  // קברים שנרכשו ונקברו בתווך תאריכים
  function getBuriedGravesWithinDateRangePurchasedAndBuried(graves = [], burials = [], purchases = [], startDate = new Date(1900, 0, 1), endDate = new Date()) {
    // המרה של התאריכים למופעי Date אם הם מגיעים כמחרוזות
    const start = new Date(startDate);
    const end = new Date(endDate);

    return graves.filter(grave => {
      const graveBurials = burials.filter(burial => burial?.graveId === grave?.id);
      const gravePurchases = purchases.filter(purchase => purchase?.graveId === grave?.id);

      // בדיקה אם יש רכישה בתווך התאריכים
      const isPurchasedWithinDateRange = gravePurchases.some(purchase => {
        const purchaseDate = new Date(purchase?.dateOpening);
        return purchaseDate >= start && purchaseDate <= end;
      });

      // בדיקה אם יש קבורה בתווך התאריכים
      const isBuriedWithinDateRange = graveBurials.some(burial => {
        const burialDate = new Date(burial?.dateOpening);
        return burialDate >= start && burialDate <= end;
      });

      // החזרה של הקבר רק אם שני התנאים מתקיימים
      return isPurchasedWithinDateRange && isBuriedWithinDateRange;
    });
  }

  // קברים שנרכשו בעבר ונקברו בתווך תאריכים
  function getBuriedGravesWithinDateRangeOnlyBuried(graves = [], burials = [], purchases = [], startDate = new Date(1900, 0, 1), endDate = new Date()) {
    // המרה של התאריכים למופעי Date אם הם מגיעים כמחרוזות
    const start = new Date(startDate);
    const end = new Date(endDate);

    return graves.filter(grave => {
      const graveBurials = burials.filter(burial => burial?.graveId === grave?.id);
      const gravePurchases = purchases.filter(purchase => purchase?.graveId === grave?.id);

      // בדיקה אם יש רכישה בתווך התאריכים
      const isPurchasedWithinDateRange = gravePurchases.some(purchase => {
        const purchaseDate = new Date(purchase?.dateOpening);
        return purchaseDate >= start && purchaseDate <= end;
      });

      // בדיקה אם יש קבורה בתווך התאריכים
      const isBuriedWithinDateRange = graveBurials.some(burial => {
        const burialDate = new Date(burial?.dateOpening);
        return burialDate >= start && burialDate <= end;
      });

      // החזרה של הקבר רק אם הוא נקבר בתווך התאריכים אך לא נרכש בתווך התאריכים
      return !isPurchasedWithinDateRange && isBuriedWithinDateRange;
    });
  }

  // קברים שנקברו בתווך תאריכים
  function getBuriedGravesWithinDateRange(graves = [], burials = [], startDate = new Date(1900, 0, 1), endDate = new Date()) {
    // המרה של התאריכים למופעי Date אם הם מגיעים כמחרוזות
    const start = new Date(startDate);
    const end = new Date(endDate);

    return graves.filter(grave => {
      const graveBurials = burials.filter(burial => burial?.graveId === grave?.id);
      return graveBurials.some(burial => {
        const burialDate = new Date(burial?.dateOpening);
        return burialDate >= start && burialDate <= end;
      });
    });
  }


  // קברים פטורים
  const gravesExempt = (graves) => {
    return graves?.filter(item => item?.plotType === 1) || []
  }
  // קברים חריגים
  const gravesUnusual = (graves) => {
    return graves?.filter(item => {
      return item?.plotType === 2
    }) || []
  }
  // קברים סגורים
  const gravesClosed = (graves) => {
    return graves?.filter(item => item?.plotType === 3) || []
  }

  // קברי שדה
  const gravesEarth = (areaGraves, graves) => {
    // מסנן את areaGraves כדי לקבל רק את האובייקטים עם graveType שווה ל-1
    let tempAreaGraves = areaGraves?.filter(item => item?.graveType === 1) || [];

    // מסנן את graves לפי האטריביוט areaGraveId שקיים בתוך gravesList של tempAreaGraves
    return graves?.filter(grave =>
      tempAreaGraves.some(area => area.gravesList.includes(grave.areaGraveId))
    ) || [];
  }
  // קברי רוויה
  const gravesMultiple = (areaGraves, graves) => {
    // מסנן את areaGraves כדי לקבל רק את האובייקטים עם graveType שווה ל-1
    let tempAreaGraves = areaGraves?.filter(item => item?.graveType === 2) || [];

    // מסנן את graves לפי האטריביוט areaGraveId שקיים בתוך gravesList של tempAreaGraves
    return graves?.filter(grave =>
      tempAreaGraves.some(area => area.gravesList.includes(grave.areaGraveId))
    ) || [];
  }
  // קברי סנהדרין
  const gravesKoch = (areaGraves, graves) => {
    // מסנן את areaGraves כדי לקבל רק את האובייקטים עם graveType שווה ל-1
    let tempAreaGraves = areaGraves?.filter(item => item?.graveType === 3) || [];

    // מסנן את graves לפי האטריביוט areaGraveId שקיים בתוך gravesList של tempAreaGraves
    return graves?.filter(grave =>
      tempAreaGraves.some(area => area.gravesList.includes(grave.areaGraveId))
    ) || [];
  }

  const calculateGraveStatistics2 = (gravesType, areaGraves, graves, purchases, burials, startDate, endDate) => {
    // קברי שדה / רוויה / סנהדרין
    let specificGraves = gravesType(areaGraves, graves);



    // פטורים
    let exemptGraves = gravesExempt(specificGraves);
    let freeExemptGraves = gravesFree(exemptGraves);
    let purchasedExemptGraves = gravesPurchased(exemptGraves);

    let buriedAllExemptGraves = gravesBurial(exemptGraves); // כל הנפטרים
    let buriedExemptGraves = getPurchasedAndBuriedGraves(buriedAllExemptGraves, purchases); // נרכשו ונקברו
    let unpurchasedBuriedExemptGraves = getUnpurchasedBuriedGraves(exemptGraves, purchases); // קבורת בל

    let purchasedExemptGravesWithDate = getPurchasedGravesWithinDateRange(purchasedExemptGraves, purchases, startDate, endDate);
    let purchasedAndBuriedExemptGravesWithDate = getBuriedGravesWithinDateRange(buriedExemptGraves, burials, startDate, endDate);
    let unpurchasedBuriedExemptGravesWithDate = getBuriedGravesWithinDateRange(unpurchasedBuriedExemptGraves, burials, startDate, endDate);
    let buriedExemptGravesWithDate = getBuriedGravesWithinDateRange(buriedExemptGraves, burials, startDate, endDate);


    // חריגים
    let unusualGraves = gravesUnusual(specificGraves);
    let freeUnusualGraves = gravesFree(unusualGraves);
    let purchasedUnusualGraves = gravesPurchased(unusualGraves);

    let buriedAllUnusualGraves = gravesBurial(unusualGraves); // כל הנפטרים
    let buriedUnusualGraves = getPurchasedAndBuriedGraves(buriedAllUnusualGraves, purchases); // נרכשו ונקברו
    let unpurchasedBuriedUnusualGraves = getUnpurchasedBuriedGraves(unusualGraves, purchases); // קבורת בל

    let purchasedUnusualGravesWithDate = getPurchasedGravesWithinDateRange(purchasedUnusualGraves, purchases, startDate, endDate);
    let purchasedAndBuriedUnusualGravesWithDate = getBuriedGravesWithinDateRange(buriedUnusualGraves, burials, startDate, endDate);
    let unpurchasedBuriedUnusualGravesWithDate = getBuriedGravesWithinDateRange(unpurchasedBuriedUnusualGraves, burials, startDate, endDate);
    let buriedUnusualGravesWithDate = getBuriedGravesWithinDateRange(buriedUnusualGraves, burials, startDate, endDate);

    // סגורים
    let closedGraves = gravesClosed(specificGraves);
    let freeClosedGraves = gravesFree(closedGraves);
    let purchasedClosedGraves = gravesPurchased(closedGraves);

    let buriedAllClosedGraves = gravesBurial(closedGraves);
    let buriedClosedGraves = getPurchasedAndBuriedGraves(buriedAllClosedGraves, purchases);
    let unpurchasedBuriedClosedGraves = getUnpurchasedBuriedGraves(closedGraves, purchases);

    let purchasedClosedGravesWithDate = getPurchasedGravesWithinDateRange(purchasedClosedGraves, purchases, startDate, endDate);
    let purchasedAndBuriedClosedGravesWithDate = getBuriedGravesWithinDateRange(buriedClosedGraves, burials, startDate, endDate);
    let unpurchasedBuriedClosedGravesWithDate = getBuriedGravesWithinDateRange(unpurchasedBuriedClosedGraves, burials, startDate, endDate);
    let buriedClosedGravesWithDate = getBuriedGravesWithinDateRange(buriedClosedGraves, burials, startDate, endDate);

    console.log('buriedAllExemptGraves: ', buriedAllExemptGraves);
    console.log('buriedExemptGraves: ', buriedExemptGraves);
    console.log('buriedExemptGraves: ', buriedExemptGraves);


    return [
      [
        freeExemptGraves?.length,
        purchasedExemptGravesWithDate?.length,
        purchasedAndBuriedExemptGravesWithDate?.length,
        buriedExemptGravesWithDate?.length,
        unpurchasedBuriedExemptGravesWithDate?.length,
      ],
      [
        freeUnusualGraves?.length,
        purchasedUnusualGravesWithDate?.length,
        purchasedAndBuriedUnusualGravesWithDate?.length,
        buriedUnusualGravesWithDate?.length,
        unpurchasedBuriedUnusualGravesWithDate?.length,
      ],
      [
        freeClosedGraves?.length,
        purchasedClosedGravesWithDate?.length,
        purchasedAndBuriedClosedGravesWithDate?.length,
        buriedClosedGravesWithDate?.length,
        unpurchasedBuriedClosedGravesWithDate?.length,
      ],
    ];
  };

  const calculateGraveStatistics = (gravesType, areaGraves, graves, purchases, burials, startDate, endDate) => {
    // קברי שדה / רוויה / סנהדרין
    let specificGraves = gravesType(areaGraves, graves);

    // פטורים
    let exemptGraves = gravesExempt(specificGraves);
    let freeExemptGraves = gravesFree(exemptGraves);
    let purchasedExemptGraves = gravesPurchased(exemptGraves);

    let buriedAllExemptGraves = gravesBurial(exemptGraves); // כל הנפטרים
    let buriedExemptGraves = getPurchasedAndBuriedGraves(buriedAllExemptGraves, purchases); // נרכשו ונקברו
    let unpurchasedBuriedExemptGraves = getUnpurchasedBuriedGraves(exemptGraves, purchases); // קבורת בל

    // רכישות בתקופת הדוח
    let purchasedExemptGravesWithDate = getPurchasedGravesWithinDateRange(purchasedExemptGraves, purchases, startDate, endDate);
    // רכישות בחיים לתקופת הדוח שנפטרו בתקופת הדוח
    let purchasedAndBuriedExemptGravesWithDatePurchasedAndBuried = getBuriedGravesWithinDateRangePurchasedAndBuried(buriedExemptGraves, burials, purchases, startDate, endDate);
    // נרכשו בעבר ונפטרו בתקופת הדוח
    let purchasedAndBuriedExemptGravesWithDateOnlyBuried = getBuriedGravesWithinDateRangeOnlyBuried(buriedExemptGraves, burials, purchases, startDate, endDate);
    // נפטרו בתקופת הדוח ולא רכשו
    let unpurchasedBuriedExemptGravesWithDate = getBuriedGravesWithinDateRange(unpurchasedBuriedExemptGraves, burials, startDate, endDate);

    // חריגים
    let unusualGraves = gravesUnusual(specificGraves);
    let freeUnusualGraves = gravesFree(unusualGraves);
    let purchasedUnusualGraves = gravesPurchased(unusualGraves);

    let buriedAllUnusualGraves = gravesBurial(unusualGraves); // כל הנפטרים
    let buriedUnusualGraves = getPurchasedAndBuriedGraves(buriedAllUnusualGraves, purchases); // נרכשו ונקברו
    let unpurchasedBuriedUnusualGraves = getUnpurchasedBuriedGraves(unusualGraves, purchases); // קבורת בל

    // רכישות בתקופת הדוח
    let purchasedUnusualGravesWithDate = getPurchasedGravesWithinDateRange(purchasedUnusualGraves, purchases, startDate, endDate);
    // רכישות בחיים לתקופת הדוח שנפטרו בתקופת הדוח
    let purchasedAndBuriedUnusualGravesWithDatePurchasedAndBuried = getBuriedGravesWithinDateRangePurchasedAndBuried(buriedUnusualGraves, burials, purchases, startDate, endDate);
    // נרכשו בעבר ונפטרו בתקופת הדוח
    let purchasedAndBuriedUnusualGravesWithDateOnlyBuried = getBuriedGravesWithinDateRangeOnlyBuried(buriedUnusualGraves, burials, purchases, startDate, endDate);
    // נפטרו בתקופת הדוח ולא רכשו
    let unpurchasedBuriedUnusualGravesWithDate = getBuriedGravesWithinDateRange(unpurchasedBuriedUnusualGraves, burials, startDate, endDate);
  



    // סגורים
    let closedGraves = gravesClosed(specificGraves);
    let freeClosedGraves = gravesFree(closedGraves);
    let purchasedClosedGraves = gravesPurchased(closedGraves);

    let buriedAllClosedGraves = gravesBurial(closedGraves);
    let buriedClosedGraves = getPurchasedAndBuriedGraves(buriedAllClosedGraves, purchases);
    let unpurchasedBuriedClosedGraves = getUnpurchasedBuriedGraves(closedGraves, purchases);

    let purchasedAndBuriedClosedGravesWithDate = getBuriedGravesWithinDateRange(buriedClosedGraves, burials, startDate, endDate);
    let buriedClosedGravesWithDate = getBuriedGravesWithinDateRange(buriedClosedGraves, burials, startDate, endDate);
    
    // רכישות בתקופת הדוח
    let purchasedClosedGravesWithDate = getPurchasedGravesWithinDateRange(purchasedClosedGraves, purchases, startDate, endDate);
    // רכישות בחיים לתקופת הדוח שנפטרו בתקופת הדוח
    let purchasedAndBuriedClosedGravesWithDatePurchasedAndBuried = getBuriedGravesWithinDateRangePurchasedAndBuried(buriedClosedGraves, burials, purchases, startDate, endDate);
    // נרכשו בעבר ונפטרו בתקופת הדוח
    let purchasedAndBuriedClosedGravesWithDateOnlyBuried = getBuriedGravesWithinDateRangeOnlyBuried(buriedClosedGraves, burials, purchases, startDate, endDate);
    // נפטרו בתקופת הדוח ולא רכשו
    let unpurchasedBuriedClosedGravesWithDate = getBuriedGravesWithinDateRange(unpurchasedBuriedClosedGraves, burials, startDate, endDate);
 


    return [
      [
        freeExemptGraves?.length, // קברים פנויים
        purchasedExemptGravesWithDate?.length, // רכישות בחיים בתקופת הדוח
        purchasedAndBuriedExemptGravesWithDatePurchasedAndBuried?.length, // רכישות בחיים לתקופת הדוח שנפטרו בתקופת הדוח
        purchasedAndBuriedExemptGravesWithDateOnlyBuried?.length, // נרכשו בעבר ונפטרו בתקופת הדוח
        unpurchasedBuriedExemptGravesWithDate?.length, // נפטרו בתקופת הדוח ולא רכשו
      ],
      [
        freeUnusualGraves?.length,
        purchasedUnusualGravesWithDate?.length,
        purchasedAndBuriedUnusualGravesWithDatePurchasedAndBuried?.length,
        purchasedAndBuriedUnusualGravesWithDateOnlyBuried?.length,
        unpurchasedBuriedUnusualGravesWithDate?.length,
      ],
      [
        freeClosedGraves?.length,
        purchasedClosedGravesWithDate?.length,
        purchasedAndBuriedClosedGravesWithDatePurchasedAndBuried?.length,
        purchasedAndBuriedClosedGravesWithDateOnlyBuried?.length,
        unpurchasedBuriedClosedGravesWithDate?.length,
      ],
    ];
  };

  const handleAllDataLoaded = ({
    areaGraves, graves,
    startDate = new Date(2024, 0, 1), // ערך ברירת מחדל ל-startDate
    endDate = new Date(2024, 10, 1)   // ערך ברירת מחדל ל-endDate
  }) => {

    // חישוב עבור קברי שדה
    let earth = calculateGraveStatistics(gravesEarth, areaGraves, graves, localPurchases, localBurials, startDate, endDate);

    // חישוב עבור קברי רוויה
    let multiple = calculateGraveStatistics(gravesMultiple, areaGraves, graves, localPurchases, localBurials, startDate, endDate);

    // חישוב עבור קברי סנהדרין
    let koch = calculateGraveStatistics(gravesKoch, areaGraves, graves, localPurchases, localBurials, startDate, endDate);

    // setData([...earth]);
    setData([...earth, ...multiple, ...koch]);
  };


  const setCategory = (newData) => {
    handleAllDataLoaded(newData)
  }

  return (
    <div>
      <SummaryTable
        data={data}
        setCategory={setCategory}
        buttons={['print', 'exportExcel', 'exportPDF']}
      />
    </div>
  );
};

export default TestReports;
