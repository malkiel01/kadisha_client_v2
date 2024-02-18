import React from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import CustomInput from '../../../../../forms/inputs/input/CustomInput';

const HomepageCemetery = ({dataDetail = {}, formSectionsCemetery = {}}) => {

    return (
        <Grid item xs={12}>
          <Card>
            <Grid container justifyContent="center" alignItems="center" style={{ margin: '20px' }}>
              <Grid item xs={12} sx={{ padding: 20 }} >
                <Typography variant="h2">
                  {dataDetail?.[0]?.['cemeteryNameHe']}
                </Typography>
              </Grid>
              <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '2px' }}>
                <Grid item xs={10}>
                  {formSectionsCemetery.map((section, index) => (
                    <Grid container spacing={2} key={index}>
                      {section.map((field) => (
                        !field.hidden &&
                        <Grid item {...field.gridSizes} key={field.name}>
                          {field.type === 'input' && (
                            <CustomInput
                              name={field.name}
                              title={field.label}
                              update
                              data={dataDetail?.[0]?.[field.name]}
                            />
                          )}
                          {field.type === 'select' && (
                            <></>
                            // <SelectPersonal
                            //   name={field.name}
                            //   title={field.label}
                            //   value={formData[field.name]}
                            //   data={field?.options}
                            //   setValue={(newValue) => handleInputChange(field.name, newValue)}
                            // // יש להוסיף כאן את הנתונים הספציפיים לכל סלקט
                            // />
                          )}
                          {field.type === 'multiSelect' && (
                            <></>
                            // <MultipleSelectChip
                            //   name={field.name}
                            //   title={field.label}
                            //   value={formData[field.name]}
                            //   data={field.options}
                            //   setValue={(newValue) => handleInputChange(field.name, newValue)}
                            // // יש להוסיף כאן את הנתונים הספציפיים לכל מולטי סלקט
                            // />
                          )}
                          {(field.type === 'button') && (
                            <></>
                            // <Grid item {...field.gridSizes}>
                            //   <CustemButton name={field.label} type={field.type} onClick={handleClick} />
                            // </Grid>
                          )}
                          {(field.type === 'submit') && (
                            <></>
                            // <Grid item {...field.gridSizes}>
                            //   <CustemButton name={field.label} type={field.type} onClick={handleSubmit} />
                            // </Grid>
                          )}
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Grid>

            </Grid>
          </Card>
        </Grid>
    );
}

export default HomepageCemetery;
