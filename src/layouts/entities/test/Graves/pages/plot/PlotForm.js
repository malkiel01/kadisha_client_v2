import React, { useContext, useEffect, useState } from 'react';
import useQueries from '../../../../../../database/useQueries';
import CustemForm from '../../../../../forms/testForm/CustemForm';
import PlotHeader from './PlotHeader';
import { GlobalContext } from '../../../../../../App';

const initialFormState = {
    blockId: '',
    plotNameHe: '',
    plotNameEn: '',
    plotLocation: '',
    plotType: '1', // הוסף ערך ברירת מחדל כראוי
    nationalInsuranceCode: '',
    plotCode: '',
    comments: '',
    coordinates: '',
    documentsList: '',
}

const formSections = [
    [
      { name: 'blockId', label: 'גוש', gridSizes: { xs: 12, sm: 6, md: 4, xl: 2 }, type: 'select', options: [] }, // הוסף אפשרויות כראוי
    ],
    [
      { name: 'plotNameHe', label: 'שם החלקה (עברית)', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
      { name: 'plotNameEn', label: 'שם החלקה (אנגלית)', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
      { name: 'plotLocation', label: 'מיקום החלקה', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
      { name: 'plotType', label: 'סוג החלקה', gridSizes: { xs: 12, sm: 6, md: 4, xl: 2 }, type: 'select', options: [
        {'key' : '1', 'value' : 'פטורה'},{'key' : '2', 'value' : 'סגורה'},{'key' : '3', 'value' : 'חריגה'},
      ] },
      { name: 'nationalInsuranceCode', label: 'קוד ביטוח לאומי', gridSizes: { xs: 12, sm: 6, md: 4, xl: 2 }, type: 'input' },
      { name: 'plotCode', label: 'קוד החלקה', gridSizes: { xs: 12, sm: 6, md: 4, xl: 2 }, type: 'input' },
      { name: 'comments', label: 'הערות', gridSizes: { xs: 12, sm: 12, md: 6, xl: 3 }, type: 'input' },
      { name: 'coordinates', label: 'קואורדינטות', gridSizes: { xs: 12, sm: 12, md: 8, xl: 4 }, type: 'input' },
      { name: 'documentsList', label: 'רשימת מסמכים', gridSizes: { xs: 12, sm: 12, md: 8, xl: 4 }, type: 'input' }, // או type: 'file' אם זה קובץ
      ],
    [
       { name: 'submitButton', label: 'עדכן', gridSizes: { xs: 1 }, type: 'submit' },
    ],
]

const repeat = {
'plotNameHe' : ['test1','test2','test3','test4']
}

const PlotForm = () => {

    const { addOrUpdateDataPlot } = useQueries()

    const { nameBlocks } = useContext(GlobalContext)
    const [dataForm, setDataForm] = useState(formSections);
    useEffect(() => {
        // עדכון האופציות לפי השינויים ב-nameCemeteries
        console.log(nameBlocks);
        setDataForm(prevSections => {
            
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
    }, [nameBlocks])

    const heandleSubmit = (e) => {
      addOrUpdateDataPlot(e)
    }

    return (
        <>
          <PlotHeader />
          <CustemForm initialFormState={initialFormState} formSections={dataForm} repeat={repeat} onSubmit={heandleSubmit} />  
        </>
    );
}

export default PlotForm;
