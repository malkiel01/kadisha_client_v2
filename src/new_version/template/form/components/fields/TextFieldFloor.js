import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFieldOptions } from '../../../../pages/plagins/data/commponentOptions';
import FormTemplate from '../../FormTemplate';

const TextFieldFloor = ({ field, value, handleChange, error, del = () => { } }) => {
  const optionsFields = useSelector((state) => state.dataOptionsFieldsHe.data)
  const columns = useSelector((state) => state.columnsFormGraves.data);
  const [isEdit, setIsEdit] = useState(false)


  const [formValues, setFormValues] = useState(value)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (value?.id) {
      setIsEdit(true)
      const initialFormValues = columns.reduce((acc, field) => ({
        ...acc,
        [field.name]: value[field.name] || '',
      }), { id: value.id });
      setFormValues(initialFormValues);
    }
  }, [value])

  const handleChangeLocal = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });

    handleChange(
      {
        target: {
          name: field['name'],
          value: { ...formValues, [event.target.name]: event.target.value },
        }
      }
    )
  };

  return (
    <>
      <FormTemplate
        titleMin={`קומת קבר`}
        local={true}
        fields={columns}
        columns={columns}
        formValues={formValues}
        handleChange={handleChangeLocal}
        del={() => del(field)}
        options={{
          plotType: getFieldOptions('plotType', optionsFields),
        }}
        errors={errors}
      />
    </>
  );
};

export default TextFieldFloor;