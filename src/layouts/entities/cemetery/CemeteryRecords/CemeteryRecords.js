import React, { useState } from 'react'
import { Card, Grid, Tooltip } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import SearchInput from '../../../search/SearchInput'
import CemeteryTable from '../CemeteryTable_v4'
import Chips from '../../../accessories/Chips'
import FullWidthTabs from '../../../tabs/Tabs'
import CemeteryRecordsTables from './CemeteryRecordsTables'
import CemeteryRecordsDocuments from './CemeteryRecordsDocuments'
import CemeteryRecordsDefinitions from './CemeteryRecordsDefinitions'



const tabChip = [
    { id: 0, name: 'רשומות בתי העלמין', data: <CemeteryRecordsTables  /> },
    { id: 1, name: 'מסמכים', data: <CemeteryRecordsDocuments /> },
    { id: 2, name: 'הגדרות בתי העלמין', data: <CemeteryRecordsDefinitions /> },
]

const CemeteryRecords = () => {

    return (
        <FullWidthTabs data={tabChip} />
    )
}

export default CemeteryRecords;
