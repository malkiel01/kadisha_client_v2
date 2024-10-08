import React, { useEffect, useContext } from 'react'
import { GlobalContext } from "../../../App"

import { makeStyles } from '@mui/material/styles'

const NotFoundLayouts = () => {
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
      }));

    const classes = useStyles()
    const { token, setToken } = useContext(GlobalContext)

    return (
      <div className={classes.imageContainer}>
        <img className={classes.responsiveImage} 
        src={`http://172.31.94.135:3000//SiteUnderConstruction2.jpeg`} alt="תיאור תמונה" />
      </div>
    )
}

export default NotFoundLayouts
