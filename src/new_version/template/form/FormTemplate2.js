import React from 'react';
import { Button, Typography, Box, CardContent, FormHelperText, Divider } from '@mui/material';
import FormField from './FormField';
import BurialFloors from '../../pages/pagesCreate/CreateTombFloors/BurialFloors';
import {
  Container,
  ContainerLocal,
  Form,
  FieldsContainer,
  ButtonStyled,
  FieldWrapper,
  FieldLabel,
  TextFieldContainer,
  CardStyled,
  CardLabel,
  DividerStyled,
  Header,
  HeaderMin,
} from './components/newFormTemplateStyles';

const FormTemplate = ({
  title,
  titleMin,
  btn = false,
  fields,
  columns,
  formValues,
  handleChange,
  handleSubmit,
  errors,
  options,
  del,
  local = false,
}) => {
  const getFieldMinWidth = (name) => {
    const column = columns.find((col) => col.name === name);
    return column ? column.width : '100%';
  };

  const renderFields = () => {
    let fieldGroups = [];
    let currentGroup = [];
    let currentCardLabel = '';

    fields
      ?.filter((field) => field.show)
      .forEach((field, index) => {
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

    return fieldGroups.map((group, index) => (
      <CardStyled key={index}>
        <CardContent>
          {group.label && (
            <Typography variant="h6" component="div" className={CardLabel}>
              {group.label}
            </Typography>
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
                {field.input !== 'card' &&
                  field.input !== 'tiles' &&
                  field.input !== 'floors' &&
                  field.input !== 'button' && (
                    <>
                      <Typography variant="subtitle1" component="div" className={FieldLabel}>
                        {field.label}
                      </Typography>
                      <FormField
                        field={{
                          ...field,
                          disabled: field.disabled,
                        }}
                        del={del}
                        value={formValues[field?.name] || ''}
                        handleChange={handleChange}
                        options={options}
                        errors={errors}
                      />
                    </>
                  )}
                {field.input === 'floors' && (
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
                )}
                {field.input === 'button' && (
                  <FormField
                    field={{
                      ...field,
                      disabled: field.disabled,
                    }}
                    handleChange={handleChange}
                    options={options}
                    errors={errors}
                  />
                )}
              </FieldWrapper>
            ))}
          </FieldsContainer>
        </CardContent>
      </CardStyled>
    ));
  };

  const renderTilesField = () => {
    const tilesField = fields?.find((field) => field?.input === 'tiles');
    if (!tilesField) return null;
    return (
      <CardStyled>
        <CardContent>
          {tilesField.label && (
            <>
              <Typography variant="h6" className={CardLabel}>
                {tilesField.label}
              </Typography>
              <Divider className={DividerStyled} />
            </>
          )}
          <TextFieldContainer>
            {errors[tilesField.name] && (
              <FormHelperText sx={{ color: 'red' }}>
                {errors[tilesField.name]}
              </FormHelperText>
            )}
            <BurialFloors onFloorsChange={handleChange} formValues={formValues} />
          </TextFieldContainer>
        </CardContent>
      </CardStyled>
    );
  };

  return (
    <Box className={`${Container} ${local && ContainerLocal}`}>
      {title && <Typography variant="h3" className={Header}>{title}</Typography>}
      {titleMin && <Typography variant="h5" className={HeaderMin}>{titleMin}</Typography>}
      <Form onSubmit={handleSubmit} dir="rtl">
        {renderFields()}
        {renderTilesField()}
        {btn && (
          <ButtonStyled type="submit" variant="contained" color="primary" size="large">
            {btn}
          </ButtonStyled>
        )}
      </Form>
    </Box>
  );
};

export default FormTemplate;
