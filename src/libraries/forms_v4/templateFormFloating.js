// דף המיועד להציג טופס מרחף

import React, { createContext, useContext, useEffect, useState } from 'react'
import TemplateFormMini from './templateFormMini'
import TemplateFormBig from './templateFormBig'

const GlobalContextForm = createContext()

const TemplateFormFloating = ({
  form = [],
  setForm = () => {},
  criteria = [],
  onSubmit = () => {}
  }) => {

    const [fields, setFields] = useState([])
    const [submit, setSubmit] = useState(false)
    // בודק אם בוצע שינוי בטופס
    const [fieldData, setFieldData] = useState(false) 

    useEffect(() => {
      console.log(fields)
    }, [fields]);

  // ---------------------------------- פונקציות עבור הטופס ------------------------------------------

const filterFields = (form2) => {
  let items = {}
  let valid = {}

  const temp = (data) => {
    if (Array.isArray(data)) {
      data.map(item => {
        if (Array.isArray(item?.container)) {
          temp(item?.container)
        }
        else {
          let myField = form2?.dataFields.filter(item => item?.fieldName === item?.fieldName)[0]
          valid = {...valid, [item?.name] : item?.properties}
          if (item.name === myField?.fieldName) {
            items = {...items, [item?.name] : myField?.value}
          } else {
            items = {...items, [item?.name] : item?.defaultValue}
          }
        }
      })
    }
    else {
      items = {...items, [data?.name] : data?.defaultValue}
      valid = {...valid, [data?.name] : data?.properties}
    }
  }

  temp(criteria?.content)

  return [items,valid]

}


// שולח את נתוני הטופס החוצה
const handleSubmit = (event, form) => {
  event.preventDefault()
  setSubmit(true)

  const hasTrueError = (fields) => {
    if (Array.isArray(fields)) {
      for (const item of fields) {
        if (item.error === true) {
          return false;
        }
      }
    }
    return true;
  }

  const result = hasTrueError(fields);

  if (result) {
    console.log('תסגור טופס', fields)
    const arrayToObject = (array) => {
      const resultObject = {};
    
      if (Array.isArray(array)) {
        for (const item of array) {
          if (item.name && item.value) {
            resultObject[item.name] = item.value;
          }
        }
      }
    
      return resultObject;
    }

    const outputObject = arrayToObject(form?.dataFields)


    onSubmit(outputObject)
    handleClose(event, form)
  }
}
const handleSubmit2 = (event, form2) => {
  event.preventDefault()

  let tempValids = fields[1]

  console.log('tempValids',tempValids)

  // Object.keys(tempValids).forEach(key => {
  //   const value = tempValids[key];
  //   Object.keys(tempValids).forEach(element => {
  //     console.log(`Key: ${key}, Value: ${value}, element: ${element}`);
      
  //   });
  // });





  for (const key in fields[1]) {
    // מקבל אובייקט של הגדרות לשדה key
    const value = fields[1][key]
    // עובר על json הגדרות
    // if (value?.validationRequired) {
    //   if (fields[0][key] === (undefined || null || '')) {
    //     valid = true
    //   }
    // }
    if (value?.validationNotExists) {
      let dataError = value?.validationNotExists || []
      dataError.filter(item => {
        if (item?.id !== fields[0]?.id) {
          if (item?.value === fields[0][key]) {
            setFieldData(true)
          } 

        }
      })
    }
  }

  console.log('valid',fieldData);

  // if (!valid) {
  //   console.log('יציאה');
  //   onSubmit(fields)
  //   handleClose(event, form2)
  // }
}


  // סוגר את הטופס לאחר וידוי שאין נתונית שלא שמורים
  const handleClose = (event, form) => {
    event.preventDefault()
    let temp = {...form, status : !form.status}

    if (Object.keys(form.dataFields).length === 0) {
      setForm(temp)
    } else {
      if(Object.values(form.dataFields).find(v => v !== '') && fieldData) {
            const result = window.confirm('האם אתה בטוח שברצונך לצאת?');
            if (result) {
              setForm(temp)
            }
      } else {
        setForm(temp)
      }
    }
  }   

  // פותח או ממזער את הטופס
  const handleMinimize = (form) => {
    console.log(form)
    let temp = {...form, open : !form.open}
    setForm(temp)
  }

  const varibleGlobalForm = {
    criteria,
    form, 
    fields,
    setFields,
    setForm,
    handleClose,
    handleSubmit,
    handleMinimize,
    submit
  }


  return (
    <GlobalContextForm.Provider  value={varibleGlobalForm}>
      <TemplateFormBig /> 
      {/* { form?.status &&  (!form?.open ? <TemplateFormBig />  : <TemplateFormMini/>) } */}
    </GlobalContextForm.Provider>
  )
}


export default TemplateFormFloating

export {
  GlobalContextForm
}




