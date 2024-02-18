import { useContext } from 'react'
import { GlobalContext } from '../../App'

const NAME_LOCALSTORAGE_RECORDS_FORM = 'recordsForm'
const NAME_LOCALSTORAGE_COUNTER = 'counterForm'

const useFormComponent = () => {
  const { formComponents, setFormComponents, counterForms, setCounterForms } = useContext(GlobalContext);

  const createFormComponent = (name) => {
    console.log('rrr');
    let component = { id: counterForms, status: true, open: false, form: name, dataFields: [] }
    let tempCommponent = formComponents.filter(item => item.status)
    localStorage.setItem(NAME_LOCALSTORAGE_RECORDS_FORM, JSON.stringify([...tempCommponent, component]))
    setFormComponents([...tempCommponent, component])
    localStorage.setItem(NAME_LOCALSTORAGE_COUNTER, JSON.stringify(counterForms + 1))
    setCounterForms(counterForms + 1);
  }

  const closeFormComponent = (index) => {
  }
  
  const openFormComponent = (row = []) => {
    const transformedArray = [row].map(item => {
      return Object.entries(item).map(([name, value]) => ({ name, value }));
    });
    
    // עד כה, transformedArray הוא מערך שבו כל תא מכיל מערך עם המפתחות והערכים בזוגות
    // עכשיו ניבא את כל התת-מערכים לתוך מערך אחד באמצעות concat
    const finalArray = [].concat(...transformedArray);
    
    let component = { id: counterForms, status: true, open: false, form: 'cemetery', dataFields: finalArray, updateData: true };
    localStorage.setItem(NAME_LOCALSTORAGE_RECORDS_FORM, JSON.stringify([...formComponents, component]));
    setFormComponents([...formComponents, component]);
    localStorage.setItem(NAME_LOCALSTORAGE_COUNTER, JSON.stringify(counterForms + 1));
    setCounterForms(counterForms + 1);
  }

  return { createFormComponent, openFormComponent, closeFormComponent }
};

export default useFormComponent;
