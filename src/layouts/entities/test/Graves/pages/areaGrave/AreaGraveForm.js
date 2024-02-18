import React, { useContext, useEffect, useState } from 'react';
import useQueries from '../../../../../../database/useQueries';
import CustemForm from '../../../../../forms/testForm/CustemForm';
import AreaGraveHeader from './AreaGraveHeader';
import { GlobalContext } from '../../../../../../App';

const initialFormState = {
  areaLocation: '',
  coordinates: '',
  gravesList: '',
  lineId: '',
  plotId: '',
  comments: '',
  documentsList: '',
  isActive: true,
}

const formSections = [
  [
    { name: 'plotId', label: 'חלקה', gridSizes: { xs: 12, sm: 12, md: 6, xl: 4 }, type: 'select', options: [] }   
  ],
  [
    { name: 'areaLocation', label: 'מיקום אזור', gridSizes: { xs: 12, sm: 12, md: 6 }, type: 'input' },
    { name: 'coordinates', label: 'קואורדינטות', gridSizes: { xs: 12, sm: 12, md: 6 }, type: 'input' },
    { name: 'gravesList', label: 'רשימת קבורות', gridSizes: { xs: 12, sm: 12, md: 6 }, type: 'input' },
    { name: 'lineId', label: 'מספר שורה', gridSizes: { xs: 12, sm: 6, md: 3 }, type: 'input' },
    { name: 'isActive', label: 'פעיל', gridSizes: { xs: 12, sm: 6, md: 3 }, type: 'checkbox' },
    { name: 'comments', label: 'הערות', gridSizes: { xs: 12, sm: 12, md: 6 }, type: 'input' },
    { name: 'documentsList', label: 'רשימת מסמכים', gridSizes: { xs: 12, sm: 12, md: 6 }, type: 'input' },
    // ניתן להוסיף כאן פרטים נוספים כפי שנדרש
  ],
  [
     { name: 'submitButton', label: 'עדכן', gridSizes: { xs: 12 }, type: 'submit' },
  ],
]

const repeat = {
'plotNameHe' : ['test1','test2','test3','test4']
}



const AreaGraveForm = () => {

    const { addOrUpdateDataAreaGrave } = useQueries()
    const { namePlots } = useContext(GlobalContext)
    const [dataForm, setDataForm] = useState(formSections);
    useEffect(() => {
        // עדכון האופציות לפי השינויים ב-nameCemeteries
        console.log(namePlots);
        setDataForm(prevSections => {
            
            return prevSections.map(section => {
                return section.map(field => {
                    if (field.name === 'plotId') {
                        return { 
                            ...field, 
                            options: namePlots 
                        };
                    }
                    return field;
                });
            })
        });
    }, [namePlots])

    const heandleSubmit = (e) => {
      addOrUpdateDataAreaGrave(e)
    }

    return (
        <>
          <AreaGraveHeader />
          <CustemForm initialFormState={initialFormState} formSections={dataForm} repeat={repeat} onSubmit={heandleSubmit} />  
        </>
    );
}

export default AreaGraveForm;
