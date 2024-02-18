import React, { useEffect } from 'react';
import Sidebar from '../menuSide/Sidebar'
import useQueries from '../../database/useQueries'

import { makeStyles } from '@mui/styles'

const Graves = () => {
    const { AllDataCemeteries, AllDataBlocks, AllDataPlots, AllDataAreaGraves } = useQueries()
    
    const useStyles = makeStyles({
        bady: {
            fontSize: '28px',
          position: 'fixed',
          height: '100vh', // 100% של גובה המסך (viewport height)
          width: '100vw',  // 100% של רוחב המסך (viewport width)
          color: 'green'
        }
      })

    const classes = useStyles()

    useEffect(() => {
        AllDataCemeteries()
        AllDataBlocks()
        AllDataPlots()
        AllDataAreaGraves()
      }, [])
      
    return (
        <>
            {/* <FloatingForm/> */}
            <div className={`${classes.bady}`}>
                    <Sidebar />
            </div>
        </>
    );
}

export default Graves

