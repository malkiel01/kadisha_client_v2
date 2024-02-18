import React, { useContext, useLayoutEffect } from 'react'

import { GlobalContext } from '../../../App'

import EntityFormsFloating from './EntityFormsFloating'


const NAME_LOCALSTORAGE_RECORDS_FORM = 'recordsForm'
const NAME_LOCALSTORAGE_CEMETERIES_COUNTER = 'counterForm'
const NAME_LOCALSTORAGE_COMPONENTS_FORMS = 'compomemtsForm'


function FloatingForm() {

    const { formComponents, setFormComponents} = useContext(GlobalContext)
    
    useLayoutEffect(() => { 
        // רכיבי הקומפוננטות הצפים
        localStorage.getItem(NAME_LOCALSTORAGE_COMPONENTS_FORMS) || localStorage.setItem(NAME_LOCALSTORAGE_COMPONENTS_FORMS, JSON.stringify([]))
        // רשומות וערכי הקומפוננטות הצפים
        localStorage.getItem(NAME_LOCALSTORAGE_RECORDS_FORM)       || localStorage.setItem(NAME_LOCALSTORAGE_RECORDS_FORM, JSON.stringify([]))
        // ממספר את האיידי של הרכיבים לקומפוננטות הצפים
        localStorage.getItem(NAME_LOCALSTORAGE_CEMETERIES_COUNTER) || localStorage.setItem(NAME_LOCALSTORAGE_CEMETERIES_COUNTER, JSON.stringify(0))
      uploadFormComponents()
    }, [])

    const uploadFormComponents = () => {
      setFormComponents(JSON.parse(localStorage.getItem(NAME_LOCALSTORAGE_RECORDS_FORM)))
    }

    const setForm = (form) => { 
      let component = formComponents.map((itemForm) => (itemForm.id === form.id) ? form : itemForm)
      localStorage.setItem(NAME_LOCALSTORAGE_RECORDS_FORM, JSON.stringify(component))
      setFormComponents(component)
    }

  return (
    <div style={{
      position: 'absolute',
      zIndex: 700000,
      bottom: 0
    }}>
      {formComponents && formComponents.map((form, index) =>  {
          return <EntityFormsFloating 
            key={index} 
            form={form} 
            setForm={(event) => setForm(event, form)}
            />
      })}
    </div>
    )

}

export default FloatingForm;


