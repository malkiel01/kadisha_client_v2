import React, { useState } from 'react'
import useQueries from '../../../../../../database/useQueries'
import BlockTable from '../block/BlockTable'
import CemeteryCard from './card/CemeteryCard'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BlockHeader from '../block/BlockHeader'
import { Grid } from '@mui/material'


const CemeteryTestDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { value, data, summaries } = location.state || {}
  const name = 'בית העלמין ' + value?.cemeteryNameHe
  const { getPlotsByBlock } = useQueries()

  const [dataChildren, setDataChildren] = useState(value)

  const getSummaries = (item) => {
    return [
      { type: 0, label: 'פנויים', value: 3 },
      { type: 1, label: 'רכישות', value: 28 },
      { type: 2, label: 'שמורים', value: 32 },
      { type: 3, label: 'קבורים', value: 33 },
      { type: 4, label: 'סה"כ', value: 96 },
    ]
  }

  const onClickRowBlock = (row) => {
    if (row) {
      let id = row[0]?.id
      let item = getPlotsByBlock(id)
      let summaries = getSummaries(item)

      navigate(`${id}`, {
        state: {
          value: row[0],
          data: item,
          summaries: summaries
        }
      })
      setDataChildren(null)
    }
  }

  return (
    <>
      {dataChildren ?
        <>
          <BlockHeader title={name} />
          {/* <Grid item xs={12} sm={12} md={4} lg={4}> */}
          <CemeteryCard item={value} data={data} summaries={summaries} />
          <BlockTable data={data} onClickRow={onClickRowBlock} />

          <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/cemetery/:cemeteryId</span></p>
        </>
        :
        <Outlet />
      }
    </>
  );
}

export default CemeteryTestDetail;
