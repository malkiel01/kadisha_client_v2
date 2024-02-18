import React, { useRef, useState } from 'react';
import { Card, Grid } from '@material-ui/core';
import MultipleSelectChip from '../inputs/select/MultiSelect';
import SelectPersonal from '../inputs/select/Select';
import CustomInput from '../inputs/input/CustomInput';
import CustemButton from '../inputs/CustemButton/CustemButton'

const CustemForm = (
  {initialFormState = {}, formSections = [], repeat = {}, onSubmit = () => {}}
  ) => {
  const [formData, setFormData] = useState(initialFormState)
  const [formErrors, setFormErrors] = useState({})
  const fieldRefs = useRef({})


  const handleFieldError = (fieldName, hasError) => {
    setFormErrors({ ...formErrors, [fieldName]: hasError })
  };

  const handleInputChange = (label, newValue) => {
    setFormData({ ...formData, [label]: newValue })
  }

  const handleClick = async (e) => {
    console.log(e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let isFormValid = true

    Object.keys(fieldRefs.current).forEach((fieldName) => {
      if (fieldRefs.current[fieldName] && fieldRefs.current[fieldName].validate) {
        const fieldValid = fieldRefs.current[fieldName].validate();
        if (!fieldValid) {
          isFormValid = false;
        }
      }
    });

    if (!isFormValid) {
      alert('ישנן שגיאות בטופס...');
      return;
    }

    console.log('ממשיך לשליחה...')
    onSubmit(formData)
  }

  return (
    <Card style={{ maxWidth: '1700px', width: '100%', margin: 'auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} >
      {formSections.map((section, index) => (
        <Grid container spacing={2} key={index}>
            {section.map((field) => (
              !field.hidden &&
              <Grid item {...field.gridSizes} key={field.name}>
                {field.type === 'input' && (    
                  <CustomInput
                    ref={(el) => fieldRefs.current[field.name] = el}
                    name={field.name}
                    title={field.label}
                    handleFieldError={handleFieldError}
                    errors={field.errors}
                    repeat={repeat[field.name]}
                    hidden={field.hidden}
                    data={formData[field.name]}
                    setData={(newValue) => handleInputChange(field.name, newValue)}
                  />
                )}
                {field.type === 'select' && (
                  <SelectPersonal
                    name={field.name}
                    title={field.label}
                    value={formData[field.name]}
                    data={field?.options}
                    setValue={(newValue) => handleInputChange(field.name, newValue)}
                    // יש להוסיף כאן את הנתונים הספציפיים לכל סלקט
                  />
                )}
                {field.type === 'multiSelect' && (
                  <MultipleSelectChip
                    name={field.name}
                    title={field.label}
                    value={formData[field.name]}
                    data={field.options}
                    setValue={(newValue) => handleInputChange(field.name, newValue)}
                    // יש להוסיף כאן את הנתונים הספציפיים לכל מולטי סלקט
                  />
                )}
                {(field.type === 'button') && (
                  <Grid item {...field.gridSizes}>
                    <CustemButton name={field.label} type={field.type} onClick={handleClick} />
                  </Grid>
                )}
                {(field.type === 'submit') && (
                  <Grid item {...field.gridSizes}>
                    <CustemButton name={field.label} type={field.type} onClick={handleSubmit} />
                  </Grid>
                )}
              </Grid>
            ))}
        </Grid>
      ))}
      </form>
    </Card>
  );
};

export default CustemForm;
