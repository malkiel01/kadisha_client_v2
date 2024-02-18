import React, { useState } from 'react'
import useQueries from '../../../../../../database/useQueries'
import BlockTable from '../block/BlockTable'
import CemeteryCard from './card/CemeteryCard'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BlockHeader from '../block/BlockHeader'


const CemeteryTestDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { value, data } = location.state || {}
  const name = 'בית העלמין ' + value?.cemeteryNameHe
  const { getPlotsByBlock } = useQueries()

  const [dataChildren, setDataChildren] = useState(value)

  const onClickRowBlock = (row) => {
    if (row) {
      navigate(`${row[0]?.id}`, {
        state: {
          value: row[0],
          data: getPlotsByBlock(row[0]?.id)
        }
      })
      setDataChildren(null)
    }
  }

  return (
    <>
      {dataChildren ?
        <>
          <BlockHeader title={name}/>
          <CemeteryCard cemetery={value} />
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
