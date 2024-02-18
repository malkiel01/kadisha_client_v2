import React, { useState } from 'react'
import useQueries from '../../../../../../database/useQueries'
import BlockTable from './BlockTable'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BlockCard from './card/BlockCard'
import PlotTable from '../plot/PlotTable'
import PlotHeader from '../plot/PlotHeader'

const BlockTestDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { value, data } = location.state || {}
  const name = 'גוש ' + value?.blockNameHe
  const {  getAreaGravesByPlot } = useQueries()

  const [dataChildren, setDataChildren] = useState(value)

  const onClickRowBlock = (row) => {
    if (row) {
      navigate(`${row[0]?.id}`, {
        state: {
          value: row[0],
          data: getAreaGravesByPlot(row[0]?.id)
        }
      })
      setDataChildren(null)
    }
  }

  return (
    <>
      {dataChildren ?
        <>
          <PlotHeader title={name} />
          <BlockCard block={value} />
          <PlotTable data={data} onClickRow={onClickRowBlock} />

          <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/block/:blockId</span></p>
        </>
        :
        <Outlet />
      }
    </>
  );
}

export default BlockTestDetail;
