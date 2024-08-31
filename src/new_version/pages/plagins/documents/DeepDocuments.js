import React from 'react';
import useQueries from '../../../../../database/useQueries';
import { useIndexedDBSync } from '../../../../../database/dataLocal/indexedDBHooks';
import PageDocumentsGrave from './PageDocumentsGrave';
import useDocConsular from '../../../../../database/documents/docConsular';

const GraveDocuments = ({ graveId, purchaseContent, burialContent }) => {
  const { getEntityByAttr } = useQueries();

  const { docConsular } = useDocConsular()
  const localCustomers = useIndexedDBSync('myStore', 'dataCustomers');
  const localPurchases = useIndexedDBSync('myStore', 'dataPurchases');
  const localAreaGraves = useIndexedDBSync('myStore', 'dataAreaGraves');
  const localRows = useIndexedDBSync('myStore', 'dataRows');
  const localPlots = useIndexedDBSync('myStore', 'dataPlots');
  const localBlocks = useIndexedDBSync('myStore', 'dataBlocks');
  const localCemeteries = useIndexedDBSync('myStore', 'dataCemeteries');

  const areaGrave = getEntityByAttr(localAreaGraves, 'gravesList', graveId?.areaGraveId);
  const row = getEntityByAttr(localRows, 'id', areaGrave?.lineId);
  const plot = getEntityByAttr(localPlots, 'id', areaGrave?.plotId);
  const block = getEntityByAttr(localBlocks, 'id', plot?.blockId);
  const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId);

  const burial = burialContent?.length !== 0;
  const purchases = getEntityByAttr(localPurchases, 'graveId', graveId?.id);
  const customer = getEntityByAttr(localCustomers, 'id', purchases?.clientId);
  const resident = customer?.resident;

  const handleClick = (id, fileName, setIsClicked) => {
    console.log(id);
    console.log(fileName);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100); // העמעום יישאר למשך 100 מילישניות

    const data = {
      serialNumber: purchases?.serialPurchaseId || '1234',
      name: `${customer?.nom}`,
      cemetery: cemetery?.cemeteryNameEn,
      block: block?.blockNameEn,
      plot: plot?.plotNameEn,
      row: row?.lineNameEn,
      grave:  `${areaGrave?.nameGrave}-${graveId?.graveName}`,
      deep: purchases?.serialPurchaseId,
    }

    docConsular(data)
  }

  const documents = [
    { id: 1, src: '../images/document3.png', fileName: 'אישור קונסולרי.pdf', handleClick },
    // הוסף עוד תמונות לפי הצורך
  ];

  return (
    <div>
      {JSON.stringify(customer)}
      {`${customer?.firstName} ${customer?.lastName}`}
      {/* {resident === 3 && <PageDocumentsGrave documents={documents} />} */}
      {<PageDocumentsGrave documents={documents} />}
    </div>
  );
};

export default GraveDocuments;
