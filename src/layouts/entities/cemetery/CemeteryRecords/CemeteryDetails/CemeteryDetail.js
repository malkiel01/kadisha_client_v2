import React, { useContext, useEffect } from 'react'
import FullWidthTabs from '../../../../tabs/Tabs'
import CemeteryDetailTables from './CemeteryDetailTables'
import useQueries from '../../../../../database/useQueries'
import CemeteryDetailDefinitions from './CemeteryDetailDefinitions'
import CemeteryDetailDocuments from './CemeteryDetailDocuments'
import { GlobalContextCemetery } from '../../Cemetery'

const tabChip = [
  { id: 0, name: 'פרטי בית העלמין', data: <CemeteryDetailTables  /> },
  { id: 1, name: 'מסמכים', data: <CemeteryDetailDocuments /> },
  { id: 2, name: 'הגדרות בית העלמין', data: <CemeteryDetailDefinitions /> },
]

const CemeteryDetail = () => {

  const { dataDetail } = useContext(GlobalContextCemetery)
  const { getBlocksByCemetery } = useQueries()

  useEffect(() => {
    console.log(dataDetail);
    getBlocksByCemetery(dataDetail?.[0]?.id)
  }, []);

  return (
    <FullWidthTabs data={tabChip} />
  )
}

export default CemeteryDetail;
