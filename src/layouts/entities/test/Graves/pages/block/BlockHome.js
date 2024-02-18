import React, { useContext, useState } from 'react';
import BlockHeader from './BlockHeader'
import { GlobalContext } from '../../../../../../App'
import useQueries from '../../../../../../database/useQueries'
import BlockTable from './BlockTable'
import { Outlet, useNavigate } from 'react-router-dom';


const BlockHome = () => {
  const { dataBlocks } = useContext(GlobalContext)
  const { getPlotsByBlock } = useQueries()

  const navigate = useNavigate()

  const [selected, setSelected] = useState(null)

  const onClickRow = (row) => {
    setSelected(row[0])
    if (row) {
      navigate(`${row[0]?.id}`, {
        state: {
          value: row[0],
          data: getPlotsByBlock(row[0]?.id)
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
          <BlockHeader />
          <BlockTable data={dataBlocks} onClickRow={onClickRow} />

          <p>Location: <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>/block</span></p>
        </>
      }
    </>
  );
}

export default BlockHome;
