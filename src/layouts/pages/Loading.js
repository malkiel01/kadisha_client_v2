import React, { useEffect, useContext } from 'react'

// import { SunspotLoader } from "react-awesome-loaders";
import { GlobalContext } from "../../App"

import { makeStyles } from '@mui/styles'



const Loading = () => {
    const useStyles = makeStyles((theme) => ({
          imageContainer: {
            textAlign: 'center',
          },
          responsiveImage: {
            maxWidth: '100%',
            maxHeight: '100%',
            minWidth: '50%',
            minHeight: '50%',
            display: 'inline-block',
            verticalAlign: 'middle',
          },
          loaderContainer: {
            // position: 'relative',
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            // background: 'rgba(0, 0, 0, 0)',
            background: 'rgba(255, 255, 255, 0.5)', // לדוג', רקע לבן שקוף
  
            zIndex: 1,
          },
          spinner: {
            top: '50%',
            right: '50%',
            transform: 'translate(-50%, -50%)', // מרכז הספינר יהיה באמצע האלמנט המכיל
            position: 'absolute',
            width: '94px',
            height: '94px',
            border: '12px solid',
            borderColor: '#3d5af1 transparent #3d5af1 transparent',
            borderRadius: '50%',
            animation: '$spinAnim 1.2s linear infinite',
            zIndex: 1,
          },
          '@keyframes spinAnim': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
      }));

    const classes = useStyles()
    const { token, setToken } = useContext(GlobalContext)

    return (
      <div className={classes.imageContainer}>
        {/* // <div className={classes.loaderContainer}> */}
            <div className={classes.spinner}></div>
        {/* // </div> */}
      </div>
    )
}

export default Loading
