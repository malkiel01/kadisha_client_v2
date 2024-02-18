import React, { useContext, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import { GlobalContext } from '../../../../../App'
import useBreadcrumbUpdater from '../../../../../routing/useBreadcrumbUpdater'
import { Card, Grid, Typography } from '@material-ui/core'
import CustomInput from '../../../../forms/inputs/input/CustomInput'
import FullWidthTabs from '../../../../tabs/Tabs'
import CemeteryDetailTables from './CemeteryDetailTables'
import useQueries from '../../../../../database/useQueries'
import CemeteryDetailDefinitions from './CemeteryDetailDefinitions'
import CemeteryDetailDocuments from './CemeteryDetailDocuments'
import { GlobalContextCemetery } from '../../Block'

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
