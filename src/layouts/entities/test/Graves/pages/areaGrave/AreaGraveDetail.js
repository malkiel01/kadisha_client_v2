import React, { useState } from 'react'
import useQueries from '../../../../../../database/useQueries'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AreaGraveCard from './card/AreaGraveCard'
import AreaGraveHeader from './AreaGraveHeader'
import AreaGraveTable from './AreaGraveTable'

const AreaGraveTestDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { value, data } = location.state || {}
  const name = 'תא קבר ' + value?.plotNameHe
  const {  getAreaGravesByPlot } = useQueries()

  const [dataChildren, setDataChildren] = useState(value)

  const onClickRowPlot = (row) => {
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
          <AreaGraveHeader title={name} />
          <AreaGraveCard plot={value} />
          <AreaGraveTable data={data} onClickRow={onClickRowPlot} />

          <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/areaGrave/:areaGraveId</span></p>
        </>
        :
        <Outlet />
      }
    </>
  );
}

export default AreaGraveTestDetail;
