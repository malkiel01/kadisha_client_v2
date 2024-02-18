import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../../App'
import useBreadcrumbUpdater from '../../../../../routing/useBreadcrumbUpdater'
import { Card, Grid, Typography } from '@material-ui/core'
import CustomInput from '../../../../forms/inputs/input/CustomInput'
import { GlobalContextCemetery } from '../../Cemetery'
import useQueries from '../../../../../database/useQueries'
import { useSelector } from 'react-redux'
import HomepageCemetery from './CemeteryDetailHomepage/HomepageCemetery'
import ChildrenCemetery from './CemeteryDetailHomepage/ChildrenCemetery'


const CemeteryDetailTables = () => {
  const { dataDetail, setDataDetail, formSectionsCemetery } = useContext(GlobalContextCemetery)

  const columns = useSelector((state) => state.columnsBlocks.data)
  const category = useSelector((state) => state.categoryBlocks.data)

  const [data, setData] = useState([])

  const { getBlocksByCemetery } = useQueries()

  useEffect(() => setData(getBlocksByCemetery(dataDetail?.[0]?.id || -1)), [dataDetail]);





  useBreadcrumbUpdater(dataDetail?.[0]?.['cemeteryNameHe'] || 'null', true)

  return (
    <>
      <Grid container spacing={2}>
        <HomepageCemetery dataDetail={dataDetail} formSectionsCemetery={formSectionsCemetery}/>
        
        <ChildrenCemetery data={data} columns={columns} category={category}
                  setDataDetail={setDataDetail}/>
      </Grid>
    </>
  )
}

export default CemeteryDetailTables;
