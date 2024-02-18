// דף הבית לבתי העלמין
// מציג את דף הראשי לבתי עלמין
// ואת רשומות ילדיו,
// בתחילה מציג הטבלה או טופס הרשמה בהתאם לכפתור


import React, { createContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Card, Typography, makeStyles } from '@material-ui/core'
import FullWidthTabs from '../../tabs/Tabs'
import CustemButton from '../../forms/inputs/CustemButton/CustemButton'
import CustemForm from '../../forms/testForm/CustemForm'
import useQueries from '../../../database/useQueries'
import { Outlet, useLocation } from 'react-router-dom'
import Breadcrumbs from '../../../routing/Breadcrumbs'
import useBreadcrumbUpdater from '../../../routing/useBreadcrumbUpdater'

const NAME_ENTITY = 'בתי עלמין'
const NAME_COMPANY = 'ארגון קהילות יהודי צפון אפריקה בירושלים'
const NAME_BUTTON_NEW_ENTITY = 'בית עלמין חדש'

const initialFormState = {
    cemeteryNameHe: '',
    cemeteryNameEn: '',
    nationalInsuranceCode: '',
    cemeteryCode: '',
    coordinates: '',
    address: '',
    documents: '',
    contactName: '',
    contactPhoneName: ''
}


const formSectionsCemetery = [
    [
        { name: 'cemeteryNameHe', label: 'שם בית העלמין (עברית)', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
        { name: 'cemeteryNameEn', label: 'שם בית העלמין (אנגלית)', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
        { name: 'nationalInsuranceCode', label: 'קוד ביטוח לאומי', gridSizes: { xs: 12, sm: 6, md: 4, xl: 2 }, type: 'input' },
        { name: 'cemeteryCode', label: 'קוד בית העלמין', gridSizes: { xs: 12, sm: 6, md: 4, xl: 2 }, type: 'input' },
        { name: 'coordinates', label: 'קואורדינטות', gridSizes: { xs: 12, sm: 12, md: 8, xl: 4 }, type: 'input' },
        { name: 'address', label: 'כתובת', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
        { name: 'documents', label: 'מסמכים', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' }, // או type: 'file' אם זה קובץ
        { name: 'contactName', label: 'שם איש קשר', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
        { name: 'contactPhoneName', label: 'טלפון איש קשר', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' }
    ],
    [
        { name: 'submitButton', label: 'עדכן', gridSizes: { xs: 1 }, type: 'submit' },
    ],
]
const formSectionsBlock = [
    [
        { name: 'cemeteryId', label: 'בית העלמין', gridSizes: { xs: 12, sm: 12, md: 6, xl: 4 }, type: 'select', options: [] }
    ],
    [
        { name: 'blockNameHe', label: 'שם הגוש', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input',
        errors: {
            notNull: process.env.REACT_APP_NAME_HEADER_CEMETERY_HEB,
            notRepeat: process.env.REACT_APP_NAME_HEADER_BLOCK_HEB,
        }
        },
        { name: 'blockNameEn', label: 'שם הגוש באנגלית', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input',
        errors: {
            notNull: process.env.REACT_APP_NAME_HEADER_CEMETERY_HEB,
            notRepeat: process.env.REACT_APP_NAME_HEADER_BLOCK_HEB,
        }
        },
        { name: 'blockLocation', label: 'מיקום הגוש', gridSizes: { xs: 12, sm: 12, md: 8, xl: 4 }, type: 'input' },
        { name: 'nationalInsuranceCode', label: 'קוד ביטוח לאומי', gridSizes: { xs: 12, sm: 6, md: 4, xl: 2 }, type: 'input' },
        { name: 'blockCode', label: 'קוד הגוש', gridSizes: { xs: 12, sm: 6, md: 4, xl: 2 }, type: 'input' },
        { name: 'coordinates', label: 'קואורדינטות', gridSizes: { xs: 12, sm: 12, md: 8, xl: 4 }, type: 'input' },
        { name: 'comments', label: 'הערות', gridSizes: { xs: 12, sm: 12, md: 6, xl: 6 }, type: 'input' },
    ],
    [
        { name: 'testButton', label: 'כפתור', gridSizes: { xs: 1 }, type: 'button',  },
        { name: 'submitButton', label: 'עדכן', gridSizes: { xs: 1 }, type: 'submit',  },
    ],
    ]


const repeat = {
    'blockNameHe': ['test1', 'test2', 'test3', 'test4']
}
const dataChip = [{name: 'סינון בתי עלמין'},{name: 'סינון טסט'}]


const useStyles = makeStyles(() => (
    {
      outerContainer: {
        minWidth: '100%',
        maxWidth: '5vw',
        minHeight: '100%',
        maxHeight: '100vh',
        // paddingLeft: 150,
        position: 'relative', // הוספת פוזישן רלטיב
        overflowY: 'auto', overflowX: 'auto',
        overscrollBehavior: 'none',
      }
    }
  ))

const GlobalContextCemetery = createContext()

const Cemetery = () => {
    const [newEntity, setNewEntity] = useState(false)
    const [dataDetail, setDataDetail] = useState() 
    const [dataDetailBlocks, setDataDetailBlocks] = useState([]) 


    const { addOrUpdateDataCemetery } = useQueries()
    const classes = useStyles()

    const { pathname } = useLocation()
    const isMainCemeteryRoute = pathname === '/cemetery'

    useBreadcrumbUpdater('בתי עלמין', isMainCemeteryRoute)

    useEffect(() => {
        setNewEntity(false)
    }, []);

    const heandleEntity = () => {
        setNewEntity(true)
    }

    const heandleSubmit = (e) => {
        addOrUpdateDataCemetery(e)
    }

    const gridContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '16px',
    }

    const varibleGlobalCemetery = {
        formSectionsCemetery,
        formSectionsBlock,
        dataDetail, setDataDetail,
        dataDetailBlocks, setDataDetailBlocks,
        dataChip,
    }

    return (
        <GlobalContextCemetery.Provider value={varibleGlobalCemetery}>
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
            <Grid item xs={12}>
                <div className={classes.outerContainer}>
                    {newEntity ?
                        <>
                            <CustemForm initialFormState={initialFormState} formSections={formSectionsCemetery} repeat={repeat} onSubmit={heandleSubmit} />
                        </> :
                        // ניתוב הנמצא ב
                        <Outlet /> 
                    }
                </div>
            </Grid>
            </GlobalContextCemetery.Provider>
    )
}

export default Cemetery
export {
    GlobalContextCemetery
  }

