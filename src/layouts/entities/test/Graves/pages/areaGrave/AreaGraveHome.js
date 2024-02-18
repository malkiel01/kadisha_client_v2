import React, { useContext, useState } from 'react';
import PlotHeader from './AreaGraveHeader'
import { GlobalContext } from '../../../../../../App'
import useQueries from '../../../../../../database/useQueries'
import AreaGraveTable from './AreaGraveTable'
import { Outlet, useNavigate } from 'react-router-dom';


const AreaGraveHome = () => {
  const { dataAreaGraves } = useContext(GlobalContext)
  const { getAreaGravesByPlot } = useQueries()

  const navigate = useNavigate()

  const [selected, setSelected] = useState(null)

  const onClickRow = (row) => {
    setSelected(row[0])
    if (row) {
      navigate(`${row[0]?.id}`, {
        state: {
          value: row[0],
          data: getAreaGravesByPlot(row[0]?.id)
        }
      })
    }
  }

  return (
    <>
      {selected ?
        <>
          <Outlet />
        </>
        :
        <>
          <PlotHeader />
          <AreaGraveTable data={dataAreaGraves} onClickRow={onClickRow} />

          <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/areaGrave</span></p>
        </>
      }
    </>
  );
}

export default AreaGraveHome;
