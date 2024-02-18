import React from 'react';
import useQueries from '../../../../../../database/useQueries';
import CustemForm from '../../../../../forms/testForm/CustemForm';
import CemeteryHeader from './CemeteryHeader';

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

const formSections = [
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
const repeat = {
    'blockNameHe': ['test1', 'test2', 'test3', 'test4']
}



const CemeteryForm = () => {

    const { addOrUpdateDataCemetery } = useQueries()

    const heandleSubmit = (e) => {
        addOrUpdateDataCemetery(e)
    }

    return (
        <>
          <CemeteryHeader />
          <CustemForm initialFormState={initialFormState} formSections={formSections} repeat={repeat} onSubmit={heandleSubmit} />  
        </>
    );
}

export default CemeteryForm;
