import React from 'react';
import CemeteryFormFloating from './CemeteryFormFloating';
import BlockFormFloating from './BlockFormFloating';

const EntityFormsFloating = ({form = [], setForm = () => {}}) => {

    const entityForm = () => {
      switch (form?.form) {
        case 'cemetery':
          return <CemeteryFormFloating form={form} setForm={setForm} />
        case 'block':
          return <BlockFormFloating form={form} setForm={setForm} />
        default:
          return <>test</>
      }
    }

    return entityForm()
}

export default EntityFormsFloating