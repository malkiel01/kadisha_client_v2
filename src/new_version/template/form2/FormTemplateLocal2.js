import React from 'react';
import { Button, Typography, Box, Card, CardContent, FormHelperText, Divider, IconButton } from '@mui/material';
import FormField from './FormField';
import useStyles from './components/useStylesOld';
import DeleteIcon from '@mui/icons-material/Delete';

const FormTemplateLocal = ({ title, titleMin, btn = false, fields, columns, formValues, handleChange, handleSubmit, errors, options, del,
  local = false, noCard = false, noClearable = false
}) => {
  const classes = useStyles();


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
              {titleMin && <Typography variant="h5" className={classes.headerMin}>{titleMin}</Typography>}
            </div>
            {del &&
              <div>
                <IconButton onClick={del}><DeleteIcon /></IconButton>
              </div>
            }
          </Typography>
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
                {field.input !== 'card' && field.input !== 'tiles' && field.input !== 'floors' && (
                  <>
                    <Typography variant="subtitle1" className={classes.fieldLabel}>
                      {field.label}
                    </Typography>
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
              </Box>
            ))}
          </Box>
        </CardContent>
      );
  
      if (noCard) {
        return content;
      } else {
        return (
          <Card key={index} className={classes.card}>
            {content}
          </Card>
        );
      }
    });
  };

  return (
    <>
      <Box className={`${classes.container} ${local && classes.containerLocal}`}>
        {title && <Typography variant="h3" className={classes.header}>{title}</Typography>}
        {renderFields(noCard, noClearable)}
        {
          btn &&
          <Button type="submit" variant="contained" color="primary" className={classes.button} size="large">
            {btn}
          </Button>
        }
      </Box>
    </>
  );
};

export default FormTemplateLocal;
