import React, { useContext, useEffect, useState } from 'react'
import { Card, Grid, Tooltip } from '@mui/material'
import { Typography } from '@material-ui/core'
import BoltIcon from '@mui/icons-material/Bolt'
import SearchInput from '../../search/SearchInput'
import AreaGraveTable from './AreaGraveTable_v3'
import Chips from '../../accessories/Chips'
import FullWidthTabs from '../../tabs/Tabs'
import CustemButton from '../../forms/inputs/CustemButton/CustemButton'
import CustemForm from '../../forms/testForm/CustemForm'
import { GlobalContext } from '../../../App'
import useQueries from '../../../database/useQueries'

const NAME_ENTITY = 'תאי קבורה'
const NAME_COMPANY = 'ארגון קהילות יהודי צפון אפריקה בירושלים'
const NAME_BUTTON_NEW_ENTITY = 'חלקה חדשה'

const initialFormState = {
    'lineId': '', // הוסף ערך ברירת מחדל כראוי
    'areaLocation': '',
    'coordinates': '',
    'gravesList': '',
    'comments': '',
    'documentsList': '',
    // שדות נוספים על פי הצורך
}

const repeat = {
'blockNameHe' : ['test1','test2','test3','test4']
}

const formSections2 = [
    [
      { name: 'lineId', label: 'מספר שורה', gridSizes: { xs: 12, sm: 6, md: 4, xl: 2 }, type: 'input' },
    ],
    [
      { name: 'areaLocation', label: 'מיקום האזור', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
      { name: 'coordinates', label: 'קואורדינטות', gridSizes: { xs: 12, sm: 12, md: 8, xl: 4 }, type: 'input' },
      { name: 'gravesList', label: 'רשימת קברים', gridSizes: { xs: 12, sm: 12, md: 8, xl: 4 }, type: 'input' },
      { name: 'comments', label: 'הערות', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
      { name: 'documentsList', label: 'רשימת מסמכים', gridSizes: { xs: 12, sm: 12, md: 8, xl: 4 }, type: 'input' }, // או type: 'file' אם זה קובץ
      ],
    [
       { name: 'submitButton', label: 'עדכן', gridSizes: { xs: 1 }, type: 'submit' },
    ],
]

const Record = () => {
    const [chipData, setIsChipData] = useState(dataChip)

    return (
        <>           
            {/* דיב חיפוש ופילטרים ופעולות מרוכזות */}
            <Grid container 
                style={{ marginBottom: '16px' }}
            >
                {/* חיפוש */}
                <Grid item xs={3}>
                    <SearchInput/>
                </Grid>
                {/* פעולות שונות */}
                <Grid item xs={3}>
                    <Grid container>
                        <Tooltip title="פעולות מרוכזות" arrow>
                            <Card style={{
                                maxWidth: '60px',
                                marginLeft: '15px'
                            }}>
                                <button style={{margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none', 
                                backgroundColor: '#fff'
                                }}><BoltIcon sx={{ fontSize: 30 , color: '#1B4C53', backgroundColor: 'none'}}/></button>
                            </Card>
                        </Tooltip>
                        <Card style={{
                            maxWidth: '60px',
                            borderRadius: '0 15px 15px 0',
                        }}>
                            <button style={{margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none', 
                            backgroundColor: '#fff'
                            }}><BoltIcon style={{ fontSize: 30 , color: '#1B4C53', backgroundColor: 'none'}}/></button>
                        </Card>
                        <Card style={{
                            maxWidth: '60px',
                            borderRadius: '0',
                        }}>
                            <button style={{margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none', 
                            backgroundColor: '#fff'
                            }}><BoltIcon sx={{ fontSize: 30 , color: '#1B4C53', backgroundColor: 'none'}}/></button>
                        </Card>
                        <Card style={{
                            maxWidth: '60px',
                            borderRadius: '15px 0 0 15px',
                        }}>
                            <button style={{margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none', 
                            backgroundColor: '#fff'
                            }}><BoltIcon sx={{ fontSize: 30 , color: '#1B4C53', backgroundColor: 'none'}}/></button>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            {/* דיב סננים בטבלה */}
            <Chips data={chipData} setData={setIsChipData} />
            {/* דיב טבלה */}
            <AreaGraveTable />
        </>
    );
}

const dataChip = [
    {id: 0, name: 'פעילים בלבד', status: true},
    {id: 1, name: 'גוש סגור', status: true},
]
const tabChip = [
    {id: 0, name: 'רשומות בתי העלמין', data: <Record />},
    {id: 1, name: 'מסמכים', data: <>
    מסמכים
    </>},
    {id: 2, name: 'הגדרות בתי העלמין', data: <>הגדרות בתי העלמין</>},
]

const AreaGraves = () => {
    const [newEntity, setNewEntity] = useState(false)
    const { nameBlocks } = useContext(GlobalContext)

    // -------------------------------------------------------------------
    const [formSections, setFormSections] = useState(formSections2);

    useEffect(() => {
        // עדכון האופציות לפי השינויים ב-nameCemeteries
        console.log(nameBlocks);
        setFormSections(prevSections => {
            
            // let a = prevSections.map(section => {
            return prevSections.map(section => {
                return section.map(field => {
                    if (field.name === 'blockId') {
                        return { 
                            ...field, 
                            options: nameBlocks 
                        };
                    }
                    return field;
                });
            })
            // return a
        });
    }, [nameBlocks]);

        // --------------------------------------------------------------------------------

    useEffect(() => {
        setNewEntity(false)
    }, []);

    const heandleEntity = () => {
        setNewEntity(true)
    }

    const { addOrUpdateDataPolt } = useQueries()
    
    const heandleSubmit = (e) => {
        addOrUpdateDataPolt(e)  
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
                    <h2>{NAME_ENTITY}</h2>
                    <Typography>{NAME_COMPANY}</Typography>
                </Grid>
                {/* כפתור יצירת רשומה */}
                <Grid item xs={3} style={{ display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
                }}>
                    <CustemButton name={NAME_BUTTON_NEW_ENTITY} onClick={heandleEntity}/>
                </Grid>
            </Grid>
            {newEntity ? 
            <>
            <CustemForm initialFormState={initialFormState} formSections={formSections} repeat={repeat} onSubmit={heandleSubmit} /> 
            </> :
            <FullWidthTabs data={tabChip}/>
            }
        </>
    )
}

export default AreaGraves
