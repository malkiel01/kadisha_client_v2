import React, { useContext, useEffect, useState } from 'react'
import { Card, Grid, Tooltip } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import SearchInput from '../../../search/SearchInput'
import CemeteryTable from '../CemeteryTable_v5'
import Chips from '../../../accessories/Chips'
import { GlobalContextCemetery } from '../Block'

const CemeteryRecordsTables = () => {
    const { dataChip } = useContext(GlobalContextCemetery)

    const [chipData, setIsChipData] = useState(dataChip)

    return (
        <>
            {/* דיב חיפוש ופילטרים ופעולות מרוכזות */}
            <Grid container style={{ marginBottom: '16px' }}>
                {/* חיפוש */}
                <Grid item xs={3}><SearchInput /></Grid>
                {/* פעולות שונות */}
                <Grid item xs={3}>
                    <Grid container>
                        <Tooltip title="פעולות מרוכזות" arrow>
                            <Card style={{
                                maxWidth: '60px',
                                marginLeft: '15px'
                            }}>
                                <button style={{
                                    margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none',
                                    backgroundColor: '#fff'
                                }}><BoltIcon sx={{ fontSize: 30, color: '#1B4C53', backgroundColor: 'none' }} /></button>
                            </Card>
                        </Tooltip>
                        <Card style={{
                            maxWidth: '60px',
                            borderRadius: '0 15px 15px 0',
                        }}>
                            <button style={{
                                margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none',
                                backgroundColor: '#fff'
                            }}><BoltIcon style={{ fontSize: 30, color: '#1B4C53', backgroundColor: 'none' }} /></button>
                        </Card>
                        <Card style={{
                            maxWidth: '60px',
                            borderRadius: '0',
                        }}>
                            <button style={{
                                margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none',
                                backgroundColor: '#fff'
                            }}><BoltIcon sx={{ fontSize: 30, color: '#1B4C53', backgroundColor: 'none' }} /></button>
                        </Card>
                        <Card style={{
                            maxWidth: '60px',
                            borderRadius: '15px 0 0 15px',
                        }}>
                            <button style={{
                                margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none',
                                backgroundColor: '#fff'
                            }}><BoltIcon sx={{ fontSize: 30, color: '#1B4C53', backgroundColor: 'none' }} /></button>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            {/* דיב סננים בטבלה */}
            <Chips data={chipData} 
            setData={setIsChipData}
             />
            {/* דיב טבלה */}
            <CemeteryTable />
        </>
    );
}

export default CemeteryRecordsTables;
