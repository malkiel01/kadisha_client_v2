import useQueries from '../../../database/useQueries';
import { useIndexedDBSync } from '../../../database/dataLocal/indexedDBHooks';
import { formatPriceIL } from './data/commponentOptions';

const useCalculatePrice = () => {
  const { getEntityByAttr } = useQueries();

  const localCemeteries = useIndexedDBSync('myStore', 'dataCemeteries');
  const localBlocks = useIndexedDBSync('myStore', 'dataBlocks');
  const localPlots = useIndexedDBSync('myStore', 'dataPlots');
  const localAreaGraves = useIndexedDBSync('myStore', 'dataAreaGraves');
  const localGraves = useIndexedDBSync('myStore', 'dataGraves');
  const localRows = useIndexedDBSync('myStore', 'dataRows');
  const localPayments = useIndexedDBSync('myStore', 'dataPayments');
  const localCustomers = useIndexedDBSync('myStore', 'dataCustomers');


  const calculatePrice = (values) => {
    let tempType = [];
    const { clientId, buyerStatus, cemeteryId, blockId, plotId, lineId, graveId } = values;

    let customer = getEntityByAttr(localCustomers, 'id', clientId);
    let grave = getEntityByAttr(localGraves, 'id', graveId);
    let areaGrave = getEntityByAttr(localAreaGraves, 'plotId', plotId);
    let line = getEntityByAttr(localRows, 'id', lineId);
    let plot = getEntityByAttr(localPlots, 'id', plotId);
    let block = getEntityByAttr(localBlocks, 'id', blockId);
    let cemetery = getEntityByAttr(localCemeteries, 'id', cemeteryId);

    const today = new Date();

    // יוצר עותק של המערך, ממיין אותו לפי תאריך, ומסנן תאריכים אחרי היום הנוכחי
    const sortedPayments = localPayments.slice()
      .filter(pay => new Date(pay.startPayment) <= today)
      .sort((a, b) => new Date(a.startPayment) - new Date(b.startPayment));

    // console.log(sortedPayments);
    // עובר על המערך הממויין ומדפיס לקונסול
    sortedPayments.forEach(pay => {
      // בדיקת מיקום
      if (pay?.cemeteryId === -1 || pay?.cemeteryId === cemetery?.id) {
        // console.log('step cemetery: ', pay?.cemeteryId)
        if (pay?.blockId === -1 || pay?.blockId === block?.id) {
          // console.log('step block: ', pay?.blockId)
          if (pay?.plotId === -1 || pay?.plotId === plot?.id) {
            // console.log('step plot: ', pay?.plotId)
            if (pay?.lineId === -1 || pay?.lineId === line?.id) {
              // console.log('step row: ', pay?.lineId)
              // בדיקת סוג הקבר
              if (pay?.graveType === -1 || pay?.graveType === areaGrave?.graveType) {
                // console.log('step graveType: ',pay?.graveType)
                // בדיקת סוג החלקה
                if (pay?.plotType === -1 || pay?.plotType === grave?.plotType) {
                  // console.log('step plotType: ',pay?.plotType)
                  // בדיקת כתובת
                  if (pay?.resident === -1 || pay?.resident === customer?.resident) {
                    // console.log('step resident:',pay?.resident)
                    // בדיקת סטטוס רוכש
                    if (pay?.buyerStatus === -1 || pay?.buyerStatus === buyerStatus) {
                      // console.log('step buyerStatus: ',pay?.buyerStatus)
                      // בדיקת סוג תשלום
                        const index = tempType.findIndex(item => item.name === pay?.priceDefinition);
                        if (index === -1) {
                          tempType.push({ name: pay?.priceDefinition, value: pay?.price });
                        } else {
                          tempType[index] = { name: pay?.priceDefinition, value: pay?.price };
                        }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    // חישוב המחיר הכולל על ידי סכימת כל ה-value ב-tempType
    let price = tempType.reduce((total, item) => total + item.value, 0);
    return tempType
  }

  const calculatePrice2 = (values) => {
    let tempType = [];
    const { clientId, isFuneralPayments, buyerStatus, cemeteryId, blockId, plotId, lineId, graveId } = values;

    console.log(clientId, isFuneralPayments, buyerStatus, cemeteryId, blockId, plotId, lineId, graveId);

    let customer = getEntityByAttr(localCustomers, 'id', clientId);
    let grave = getEntityByAttr(localGraves, 'id', graveId);
    let areaGrave = getEntityByAttr(localAreaGraves, 'plotId', plotId);
    let line = getEntityByAttr(localRows, 'id', lineId);
    let plot = getEntityByAttr(localPlots, 'id', plotId);
    let block = getEntityByAttr(localBlocks, 'id', blockId);
    let cemetery = getEntityByAttr(localCemeteries, 'id', cemeteryId);

    const today = new Date();

    // יוצר עותק של המערך, ממיין אותו לפי תאריך, ומסנן תאריכים אחרי היום הנוכחי
    const sortedPayments = localPayments.slice()
      .filter(pay => new Date(pay.startPayment) <= today)
      .sort((a, b) => new Date(a.startPayment) - new Date(b.startPayment));

    console.log(sortedPayments);
    // עובר על המערך הממויין ומדפיס לקונסול
    sortedPayments.forEach(pay => {
      // בדיקת מיקום
      if (pay?.cemeteryId === -1 || pay?.cemeteryId === cemetery?.id) {
        // console.log('step cemetery: ', pay?.cemeteryId)
        if (pay?.blockId === -1 || pay?.blockId === block?.id) {
          // console.log('step block: ', pay?.blockId)
          if (pay?.plotId === -1 || pay?.plotId === plot?.id) {
            // console.log('step plot: ', pay?.plotId)
            if (pay?.lineId === -1 || pay?.lineId === line?.id) {
              // console.log('step row: ', pay?.lineId)
              // בדיקת סוג הקבר
              if (pay?.graveType === -1 || pay?.graveType === areaGrave?.graveType) {
                // console.log('step graveType: ',pay?.graveType)
                // בדיקת סוג החלקה
                if (pay?.plotType === -1 || pay?.plotType === grave?.plotType) {
                  // console.log('step plotType: ',pay?.plotType)
                  // בדיקת כתובת
                  if (pay?.resident === -1 || pay?.resident === customer?.resident) {
                    // console.log('step resident:',pay?.resident)
                    // בדיקת סטטוס רוכש
                    if (pay?.buyerStatus === -1 || pay?.buyerStatus === buyerStatus) {
                      // console.log('step buyerStatus: ',pay?.buyerStatus)
                      // בדיקת סוג תשלום
                      if ((pay?.priceDefinition === 'שירותי לוויה' && isFuneralPayments === 1) || pay?.priceDefinition !== 'שירותי לוויה') {
                        const index = tempType.findIndex(item => item.name === pay?.priceDefinition);
                        // console.log('step 9',index)
                        if (index === -1) {
                          tempType.push({ name: pay?.priceDefinition, value: pay?.price });
                        } else {
                          tempType[index] = { name: pay?.priceDefinition, value: pay?.price };
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    // חישוב המחיר הכולל על ידי סכימת כל ה-value ב-tempType
    let price = tempType.reduce((total, item) => total + item.value, 0);
    return formatPriceIL(price)
  }

  return calculatePrice;
};

const useCalculatePrice2 = () => {
  const { getEntityByAttr } = useQueries();

  const localCemeteries = useIndexedDBSync('myStore', 'dataCemeteries');
  const localBlocks = useIndexedDBSync('myStore', 'dataBlocks');
  const localPlots = useIndexedDBSync('myStore', 'dataPlots');
  const localAreaGraves = useIndexedDBSync('myStore', 'dataAreaGraves');
  const localGraves = useIndexedDBSync('myStore', 'dataGraves');
  const localRows = useIndexedDBSync('myStore', 'dataRows');
  const localPayments = useIndexedDBSync('myStore', 'dataPayments');
  const localCustomers = useIndexedDBSync('myStore', 'dataCustomers');


  const calculatePrice = (values) => {
    let tempType = [];
    const { clientId, isFuneralPayments, buyerStatus, cemeteryId, blockId, plotId, lineId, graveId } = values;

    console.log(clientId, isFuneralPayments, buyerStatus, cemeteryId, blockId, plotId, lineId, graveId);

    let customer = getEntityByAttr(localCustomers, 'id', clientId);
    let grave = getEntityByAttr(localGraves, 'id', graveId);
    let areaGrave = getEntityByAttr(localAreaGraves, 'plotId', plotId);
    let line = getEntityByAttr(localRows, 'id', lineId);
    let plot = getEntityByAttr(localPlots, 'id', plotId);
    let block = getEntityByAttr(localBlocks, 'id', blockId);
    let cemetery = getEntityByAttr(localCemeteries, 'id', cemeteryId);

    const today = new Date();

    // יוצר עותק של המערך, ממיין אותו לפי תאריך, ומסנן תאריכים אחרי היום הנוכחי
    const sortedPayments = localPayments.slice()
      .filter(pay => new Date(pay.startPayment) <= today)
      .sort((a, b) => new Date(a.startPayment) - new Date(b.startPayment));

    console.log(sortedPayments);
    // עובר על המערך הממויין ומדפיס לקונסול
    sortedPayments.forEach(pay => {
      // בדיקת מיקום
      if (pay?.cemeteryId === -1 || pay?.cemeteryId === cemetery?.id) {
        // console.log('step cemetery: ', pay?.cemeteryId)
        if (pay?.blockId === -1 || pay?.blockId === block?.id) {
          // console.log('step block: ', pay?.blockId)
          if (pay?.plotId === -1 || pay?.plotId === plot?.id) {
            // console.log('step plot: ', pay?.plotId)
            if (pay?.lineId === -1 || pay?.lineId === line?.id) {
              // console.log('step row: ', pay?.lineId)
              // בדיקת סוג הקבר
              if (pay?.graveType === -1 || pay?.graveType === areaGrave?.graveType) {
                // console.log('step graveType: ',pay?.graveType)
                // בדיקת סוג החלקה
                if (pay?.plotType === -1 || pay?.plotType === grave?.plotType) {
                  // console.log('step plotType: ',pay?.plotType)
                  // בדיקת כתובת
                  if (pay?.resident === -1 || pay?.resident === customer?.resident) {
                    // console.log('step resident:',pay?.resident)
                    // בדיקת סטטוס רוכש
                    if (pay?.buyerStatus === -1 || pay?.buyerStatus === buyerStatus) {
                      // console.log('step buyerStatus: ',pay?.buyerStatus)
                      // בדיקת סוג תשלום
                      if ((pay?.priceDefinition === 'שירותי לוויה' && isFuneralPayments === 1) || pay?.priceDefinition !== 'שירותי לוויה') {
                        const index = tempType.findIndex(item => item.name === pay?.priceDefinition);
                        // console.log('step 9',index)
                        if (index === -1) {
                          tempType.push({ name: pay?.priceDefinition, value: pay?.price });
                        } else {
                          tempType[index] = { name: pay?.priceDefinition, value: pay?.price };
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    // חישוב המחיר הכולל על ידי סכימת כל ה-value ב-tempType
    let price = tempType.reduce((total, item) => total + item.value, 0);
    return formatPriceIL(price)
  }

  return calculatePrice;
};

export default useCalculatePrice;
