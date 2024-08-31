import React from 'react';
import TextFieldComponent from './components/fields/TextFieldComponent';
import SelectComponent from './components/fields2/SelectComponent';
import SelectedFreeComponent from './components/fields2/SelectedFreeComponent';
import DateFieldComponent from './components/fields/DateFieldComponent';
import TimeFieldComponent from './components/fields2/TimeFieldComponent';
import ViewportChecklist from './components/fields2/ViewportChecklist';
import TextFieldButton from './components/fields/TextFieldButton';
import TextFieldFloor from './components/fields2/TextFieldFloor';
import MultiSelectComponent from './components/fields2/MultiSelectComponent';

const FormField = ({ field, value, handleChange, errors, options, del, noClearable }) => {
  const error = errors[field.name];

  const renderInputField = (field) => {
    switch (field.input) {
      case 'text':
        return <TextFieldComponent field={field} value={value} handleChange={handleChange} error={error} />;
      case 'button':
        return <TextFieldButton field={field} value={value} handleChange={handleChange} error={error} />;
      case 'floors':
        return <TextFieldFloor field={field} value={value} handleChange={handleChange} error={error} del={del} />;
      case 'selected':
        return <SelectComponent field={field} value={value} handleChange={handleChange} error={error} options={options} />;
      case 'selectedFree':
        return <SelectedFreeComponent field={field} value={value} handleChange={handleChange} error={error} options={options} noClearable={noClearable} />;
      case 'date':
        return <DateFieldComponent field={field} value={value} handleChange={handleChange} error={error} />;
      case 'time':
        return <TimeFieldComponent field={field} value={value} handleChange={handleChange} error={error} />;
      case 'viewportChecklist':
        return <ViewportChecklist field={field} value={value} handleChange={handleChange} error={error} options={options[field.name]} />;
      case 'multiSelect':
        return <MultiSelectComponent field={field} value={value} handleChange={handleChange} error={error} options={options[field.name]} />;
      default:
        return null;
    }
  };

  return renderInputField(field);
};

export default FormField;
