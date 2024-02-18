import React, { createContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Card, Typography, makeStyles } from '@material-ui/core'
import CustemButton from '../../../../forms/inputs/CustemButton/CustemButton'
import { Outlet, useLocation } from 'react-router-dom'
import Breadcrumbs from '../../../../../routing/Breadcrumbs'
import useBreadcrumbUpdater from '../../../../../routing/useBreadcrumbUpdater'

const NAME_ENTITY = 'בתי עלמין'
const NAME_COMPANY = 'ארגון קהילות יהודי צפון אפריקה בירושלים'
const NAME_BUTTON_NEW_ENTITY = 'בית עלמין חדש'

const Header = () => {
    const [newEntity, setNewEntity] = useState(false)
    const [dataDetail, setDataDetail] = useState() 
    const [dataDetailBlocks, setDataDetailBlocks] = useState([]) 


    // const { addOrUpdateDataCemetery } = useQueries()
    // const classes = useStyles()

    const { pathname } = useLocation()
    const isMainCemeteryRoute = pathname === '/cemetery'

    useBreadcrumbUpdater('בתי עלמין', isMainCemeteryRoute)

    useEffect(() => {
        setNewEntity(false)
    }, []);

    const heandleEntity = () => {
        setNewEntity(true)
    }

    // const heandleSubmit = (e) => {
    //     addOrUpdateDataCemetery(e)
    // }

    const gridContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '16px',
    }
    return (
        <>
                    {/* דיב כותרת וכפתור יצירת רשומה */}
                    <Grid container style={gridContainerStyle}>
                {/* דיב כותרת */}
                <Grid item xs={4} style={{ marginBottom: '16px' }}>
                    <h2>{NAME_ENTITY}</h2>
                    <Typography>{NAME_COMPANY}</Typography>
                </Grid>
                {/* כפתור יצירת רשומה */}
                <Grid item xs={3} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CustemButton name={NAME_BUTTON_NEW_ENTITY} onClick={heandleEntity} />
                </Grid>
            </Grid>
            <Breadcrumbs />
        </>
    );
}

export default Header;
