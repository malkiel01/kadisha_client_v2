import React from 'react'
import { Grid } from '@mui/material'
import { Typography } from '@material-ui/core'
import CustemButton from '../../../../../forms/inputs/CustemButton/CustemButton'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../../../../routing/Breadcrumbs'
import useBreadcrumbUpdater from '../../../../../../routing/useBreadcrumbUpdater'

const NAME_ENTITY = 'גושים'
const NAME_COMPANY = 'ארגון קהילות יהודי צפון אפריקה בירושלים'
const NAME_BUTTON_NEW_ENTITY = 'גוש חדש'
const URL = 'Block'

const BlockHeader = ({title = null}) => {

    const navigate = useNavigate()

    const { pathname } = useLocation()
    const isMainCemeteryRoute = pathname === `/${URL}`

    useBreadcrumbUpdater('גושים', isMainCemeteryRoute)

 

    const heandleEntity = () => {
            navigate(`/create${URL}`)
    }


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
                    <h2>{title ? title : NAME_ENTITY}</h2>
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

export default BlockHeader;
