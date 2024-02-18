import React, { useContext, useEffect, useState } from 'react';
import CemeteryHeader from './CemeteryHeader'
import { GlobalContext } from '../../../../../../App'
import useQueries from '../../../../../../database/useQueries'
import CemeteryTable from './CemeteryTable'
import { Outlet, useNavigate } from 'react-router-dom';


const CemeteryHome = () => {
  const { dataCemeteries } = useContext(GlobalContext)
  const { getBlocksByCemetery } = useQueries()

  const navigate = useNavigate()

  const [selected, setSelected] = useState(null)

  const onClickRow = (row) => {
    setSelected(row[0])
    if (row) {
      navigate(`${row[0]?.id}`, {
        state: {
          value: row[0],
          data: getBlocksByCemetery(row[0]?.id)
        }
      })
    }
  }

  // useEffect(() => {
  //   console.log(dataCemeteries)
  // }, [])

  return (
    <>
      {selected ?
        <>
          <Outlet />
        </>
        :
        <>
          <CemeteryHeader />
          <CemeteryTable data={dataCemeteries} onClickRow={onClickRow} />

          <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/cemetery</span></p>
        </>
      }
    </>
  );
}

export default CemeteryHome;
