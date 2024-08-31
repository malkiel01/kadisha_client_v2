import React from 'react';
import { Button, Typography, Box, Card, CardContent, FormHelperText, Divider } from '@mui/material';
import FormField from './FormField';
import useStyles from './components/useStyles';
import BurialFloors from '../../pages/pagesCreate/CreateTombFloors/BurialFloors';

const FormTemplate = ({ title, titleMin, btn = false, fields, columns, formValues, handleChange, handleSubmit, errors, options, del,
  local = false
}) => {
  const classes = useStyles();


  const getFieldMinWidth = (name) => {
    const column = columns.find(col => col.name === name);
    return column ? column.width : '100%';
  };

  const renderFields = () => {
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

    return fieldGroups.map((group, index) => (
      <Card key={index} className={classes.card}>
        <CardContent>
          {group.label && (
            <Typography variant="h6" className={classes.cardLabel}>
              {group.label}
            </Typography>
          )}
          <Box className={classes.fieldsContainer}>
            {group.fields.map((field, index) => (
              <Box
                key={index}
                className={classes.fieldWrapper}
                style={{
                  minWidth: getFieldMinWidth(field?.name),
                  flex: `1 1 calc(${getFieldMinWidth(field?.name)}px + 25px)`,
                  marginRight: '12.5px',
                  marginLeft: '12.5px',
                }}
              >
                {field.input !== 'card' && field.input !== 'tiles' &&
                  field.input !== 'floors' && field.input !== 'button' &&
                  (
                    <>
                      <Typography variant="subtitle1" className={classes.fieldLabel}>
                        {field.label}
                      </Typography>
                      <FormField
                        style={{border: '1px solid blue'}}
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
                  {field.input === 'button' && (
                    <>
                    <FormField
                      field={{
                        ...field,
                        disabled: field.disabled,
                      }}
                      handleChange={handleChange}
                      options={options}
                      errors={errors}
                    />
                  </>
                  )}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    ));
  };

  const renderTilesField = () => {
    const tilesField = fields?.find(field => field?.input === 'tiles');
    if (!tilesField) return null;
    return (
      <Card className={classes.card}>
        <CardContent>
          {tilesField.label && (
            <>
              <Typography variant="h6" className={classes.cardLabel}>
                {tilesField.label}
              </Typography>
              <Divider className={classes.divider} />
            </>
          )}
          <Box className={classes.textFieldContainer}>
            {errors[tilesField.name] && <FormHelperText className={classes.error}>{errors[tilesField.name]}</FormHelperText>}
            <BurialFloors onFloorsChange={handleChange} formValues={formValues} />
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box className={`${classes.container} ${local && classes.containerLocal}`}>
      {title && <Typography variant="h3" className={classes.header}>{title}</Typography>}
      {titleMin && <Typography variant="h5" className={classes.headerMin}>{titleMin}</Typography>}
      <form onSubmit={handleSubmit} dir="rtl" className={classes.form}>
        {renderFields()}
        {renderTilesField()}
        {
          btn &&
          <Button type="submit" variant="contained" color="primary" className={classes.button} size="large">
            {btn}
          </Button>
        }
      </form>
    </Box>
  );
};

export default FormTemplate;
