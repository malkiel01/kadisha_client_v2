import React from 'react';
import { styled } from '@mui/system';
import { Button, Typography, Box, Card, CardContent, FormHelperText, Divider, IconButton } from '@mui/material';
import FormField from './FormField';
import useStyles from './components/useStyles';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  backgroundColor: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
}));

const ContainerLocal = styled(Container)(({ theme }) => ({
  padding: 0,
  margin: 0,
  backgroundColor: '#fff',
}));

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  textAlign: 'left',
  width: '100%',
}));

const HeaderMin = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  textAlign: 'right',
  width: '100%',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  marginBottom: theme.spacing(2.5),
  boxShadow: theme.shadows[1],
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const FieldsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  justifyContent: 'flex-start',
}));

const FieldWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  fontSize: '1.1rem',
  fontWeight: 'bold',
}));

const CardLabel = styled(Typography)(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
}));

const FormTemplate = ({ title, titleMin, btn = false, fields, columns, formValues, handleChange, handleSubmit, errors, options, del,
  local = false, noCard = false, noClearable = false
}) => {
  const classes = useStyles();
  const ContainerComponent = local ? ContainerLocal : Container;

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
      <StyledCard key={index}>
        <StyledCardContent>
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
                {field.input !== 'card' && field.input !== 'tiles' &&
                  field.input !== 'floors' && field.input !== 'button' && (
                    <>
                      <FieldLabel variant="subtitle1">
                        {field.label}
                      </FieldLabel>
                      <FormField
                        style={{ border: '1px solid blue' }}
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
              </FieldWrapper>
            ))}
          </FieldsContainer>
        </StyledCardContent>
      </StyledCard>
    ));
  }
  const renderFieldsMini2 = (noCard, noClearable) => {
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
  const renderFieldsMini = (noCard, noClearable) => {
    let fieldGroups = [];
    let currentGroup = [];
    let currentCardLabel = '';
  
    fields?.filter((field) => field.show).forEach((field, index) => {
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
        <StyledCardContent key={index}>
          <Typography variant="h6" component="div" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {titleMin && <HeaderMin variant="h5">{titleMin}</HeaderMin>}
            </div>
            {del && (
              <div>
                <IconButton onClick={del}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
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
              </FieldWrapper>
            ))}
          </FieldsContainer>
        </StyledCardContent>
      );
  
      if (noCard) {
        return content;
      } else {
        return (
          <StyledCard key={index}>
            {content}
          </StyledCard>
        );
      }
    });
  };

  return (
    <ContainerComponent>
      {title && <Header variant="h3">{title}</Header>}
      <Form onSubmit={handleSubmit} dir="rtl">
      {
      !local ?
      renderFields() :
      renderFieldsMini(noCard, noClearable)}
        {btn && (
          <Button type="submit" variant="contained" color="primary" size="large">
            {btn}
          </Button>
        )}
      </Form>
    </ContainerComponent>
  );
};

export default FormTemplate;
