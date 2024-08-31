import React from 'react';
import { Typography, Box, CardContent, IconButton, Button as MuiButton } from '@mui/material';
import FormField from './FormField';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Container,
  ContainerLocal,
  CardStyled,
  FieldsContainer,
  FieldWrapper,
  FieldLabel,
  Header,
  HeaderMin,
  CardLabel,
} from './components/newFormTemplateStyles';

const FormTemplateLocal = ({ title, titleMin, btn = false, fields, columns, formValues, handleChange, handleSubmit, errors, options, del,
  local = false, noCard = false, noClearable = false
}) => {

  const getFieldMinWidth = (name) => {
    const column = columns.find(col => col.name === name);
    return column ? column.width : '100%';
  };

  const renderFields = (noCard, noClearable) => {
    let fieldGroups = [];
    let currentGroup = [];
    let currentCardLabel = '';

    fields?.filter(field => field.show).forEach((field, index) => {
      if (field.input === 'card') {
        if (currentGroup.length > 0) {
          fieldGroups.push({ label: currentCardLabel, fields: currentGroup, input: currentGroup[0].input });
          currentGroup = [];
        }
        currentCardLabel = field.label || '';
      }
      currentGroup.push(field);
    });

    if (currentGroup.length > 0) {
      fieldGroups.push({ label: currentCardLabel, fields: currentGroup, input: currentGroup[0].input });
    }

    return fieldGroups.map((group, index) => {
      const content = (
        <CardContent key={index}>
          <Typography variant="h6" component="div" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {titleMin && <HeaderMin variant="h5">{titleMin}</HeaderMin>}
            </div>
            {del &&
              <div>
                <IconButton onClick={del}><DeleteIcon /></IconButton>
              </div>
            }
          </Typography>
          {group.label && (
            <CardLabel variant="h6">
              {group.label}
            </CardLabel>
          )}
          <FieldsContainer>
            {group.fields.map((field, index) => (
              <FieldWrapper
                key={index}
                style={{
                  minWidth: getFieldMinWidth(field?.name),
                  flex: `1 1 calc(${getFieldMinWidth(field?.name)}px + 25px)`,
                  marginRight: '12.5px',
                  marginLeft: '12.5px',
                }}
              >
                {field.input !== 'card' && field.input !== 'tiles' && field.input !== 'floors' && (
                  <>
                    <FieldLabel variant="subtitle1">
                      {field.label}
                    </FieldLabel>
                    <FormField
                      field={{
                        ...field,
                        disabled: field.disabled,
                      }}
                      value={formValues[field?.name] || ''}
                      handleChange={handleChange}
                      options={options}
                      errors={errors}
                      noClearable={noClearable}
                    />
                  </>
                )}
                {field.input === 'floors' && (
                  <>
                    <FormField
                      field={{
                        ...field,
                        disabled: field.disabled,
                      }}
                      del={del}
                      value={formValues[field.name] || ''}
                      handleChange={handleChange}
                      options={options}
                      errors={errors}
                    />
                  </>
                )}
              </FieldWrapper>
            ))}
          </FieldsContainer>
        </CardContent>
      );

      if (noCard) {
        return content;
      } else {
        return (
          <CardStyled key={index}>
            {content}
          </CardStyled>
        );
      }
    });
  };

  return (
    <>
      <Container className={local && ContainerLocal}>
        {title && <Header variant="h3">{title}</Header>}
        {renderFields(noCard, noClearable)}
        {
          btn &&
          <MuiButton type="submit" variant="contained" color="primary" size="large">
            {btn}
          </MuiButton>
        }
      </Container>
    </>
  );
};

export default FormTemplateLocal;
