import React from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { Outlet } from 'react-router-dom';
import TemplateTable from '../../../../../../libraries/Tables_v4/TemplateTable'
import useFormComponent from '../../../../../../libraries/forms_v4/useFormComponent'
import useQueries from '../../../../../../database/useQueries'
import { useNavigate } from 'react-router-dom';

const ChildrenCemetery = ({
  data = [], columns = [], category = [],
  setDataDetail = () => {}
}) => {

  const navigate = useNavigate()

  
  const { removeCemetery } = useQueries()
  const { openFormComponent } = useFormComponent()

    const removeItemRow = (id) => {
      removeCemetery(id)
    }

    const onClickRows = (event) => {
      if (event.length === 1) {
        
        setDataDetail(event)
        navigate(event[0]?.id.toString())
      }
    }

    return (
      <>
        <Grid item xs={12}>
          <Card>
            <Grid container justifyContent="center" alignItems="center" style={{ margin: '20px' }}>
              <Grid item xs={12} >
                <Typography variant="h3">
                    גושים
                </Typography>
              </Grid>
              <Grid item xs={12} >
                {/* <ChildrenTable data={data} columns={columns} category={category}
                  setDataDetail={setDataDetail}
                /> */}
                <TemplateTable
                  onClickRows={onClickRows}
                  data={data}
                  items={[
                    {name: 'פתח רשומת בית עלמין', value: (event,row) => openFormComponent(row)},
                    {name: 'מחק רשומת בית עלמין', value: (event,row) => removeItemRow(row.id)},
                  ]}
                  columns={columns}                              // עמודות
                  pageSize={25}                                             // כמות מוצגת לדף
                  checkboxSelection={category[0].setting.checkbox}  // כפתור בחירת שורה
                  //  disableSelectionOnClick                               // ביטול שורה לחיצה
                  menuOptions={category[0].setting.menu}            // תפריט בכפתור שמאלי על כל שורה
                ></TemplateTable>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Outlet />
      </>
    );
}

export default ChildrenCemetery;
