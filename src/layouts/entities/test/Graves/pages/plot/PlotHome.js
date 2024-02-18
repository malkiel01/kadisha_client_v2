import React, { useContext, useState } from 'react';
import PlotHeader from './PlotHeader'
import { GlobalContext } from '../../../../../../App'
import useQueries from '../../../../../../database/useQueries'
import PlotTable from './PlotTable'
import { Outlet, useNavigate } from 'react-router-dom';


const PlotHome = () => {
  const { dataPlots } = useContext(GlobalContext)
  const { getAreaGravesByPlot } = useQueries()

  const navigate = useNavigate()

  const [selected, setSelected] = useState(null)

  const onClickRow = (row) => {
    console.log('erertrerertrertrer',dataPlots);
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
          <PlotTable data={dataPlots} onClickRow={onClickRow} />

          <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/plot</span></p>
        </>
      }
    </>
  );
}

export default PlotHome;
