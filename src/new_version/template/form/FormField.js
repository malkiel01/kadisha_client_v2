import React from 'react';
import TextFieldComponent from './components/fields/TextFieldComponent';
import SelectComponent from './components/fields/SelectComponent';
import SelectedFreeComponent from './components/fields/SelectedFreeComponent';
import DateFieldComponent from './components/fields/DateFieldComponent';
import TimeFieldComponent from './components/fields/TimeFieldComponent';
import ViewportChecklist from './components/fields/ViewportChecklist';
import TextFieldButton from './components/fields/TextFieldButton';
import TextFieldFloor from './components/fields/TextFieldFloor';
import MultiSelectComponent from './components/fields/MultiSelectComponent';

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
