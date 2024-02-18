import React, { useContext, useEffect, useState } from 'react';
import useQueries from '../../../../../../database/useQueries';
import CustemForm from '../../../../../forms/testForm/CustemForm';
import BlockHeader from './BlockHeader';
import { GlobalContext } from '../../../../../../App';

const initialFormState = {
    blockNameHe: '',
    blockNameEn: '',
    blockLocation: '',
    nationalInsuranceCode: '',
    blockCode: '',
    coordinates: '',
    comments: '',
    cemeteryId: '',
    }

const formSections = [
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



const BlockForm = () => {
    const { nameCemeteries } = useContext(GlobalContext)
    const [dataForm, setDataForm] = useState(formSections);
    useEffect(() => {
        // עדכון האופציות לפי השינויים ב-nameCemeteries
        console.log(nameCemeteries);
        setDataForm(prevSections => {
            
            // let a = prevSections.map(section => {
            return prevSections.map(section => {
                return section.map(field => {
                    if (field.name === 'cemeteryId') {
                        return { 
                            ...field, 
                            options: nameCemeteries 
                        };
                    }
                    return field;
                });
            })
            // return a
        });
    }, [nameCemeteries])

    const { addOrUpdateDataBlock } = useQueries()

    const heandleSubmit = (e) => {
        addOrUpdateDataBlock(e)
    }

    return (
        <>
          <BlockHeader />
          <CustemForm initialFormState={initialFormState} formSections={dataForm} repeat={repeat} onSubmit={heandleSubmit} />  
        </>
    );
}

export default BlockForm;
