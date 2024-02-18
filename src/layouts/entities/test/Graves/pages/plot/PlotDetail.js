import React, { useState } from 'react'
import useQueries from '../../../../../../database/useQueries'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PlotTable from '../plot/PlotTable'
import PlotCard from './card/PlotCard'
import PlotHeader from './PlotHeader'
import AreaGraveHeader from '../areaGrave/AreaGraveHeader'
import AreaGraveTable from '../areaGrave/AreaGraveTable'

const PlotTestDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { value, data } = location.state || {}
  const name = 'חלקה ' + value?.plotNameHe
  const {  getAreaGravesByPlot } = useQueries()

  const [dataChildren, setDataChildren] = useState(value)

  const onClickRowAreaGrave = (row) => {
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
          <PlotCard plot={value} />
          <AreaGraveTable data={data} onClickRow={onClickRowAreaGrave} />

          <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/plot/:plotId</span></p>
        </>
        :
        <Outlet />
      }
    </>
  );
}

export default PlotTestDetail;
