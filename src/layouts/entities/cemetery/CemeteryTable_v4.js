import { useSelector } from 'react-redux'
import { useContext } from 'react'
import TemplateTable from '../../../libraries/Tables_v4/TemplateTable'
import useFormComponent from '../../../libraries/forms_v4/useFormComponent'
import useQueries from '../../../database/useQueries'
import { GlobalContext } from '../../../App'
import { useNavigate } from 'react-router-dom';
import { GlobalContextTest } from './Cemetery'

const CemeteryTable = () => {
  const { dataCemeteries, setDataEntity } = useContext(GlobalContext)
  const navigate = useNavigate()
  
  const { removeCemetery } = useQueries()
  const { openFormComponent } = useFormComponent()

    const columns = useSelector((state) => state.columnsCemeteries.data)
    const category = useSelector((state) => state.categoryCemeteries.data)


    const removeItemRow = (id) => {
      removeCemetery(id)
    }

    const onClickRows = (event) => {
      if (event.length === 1) {
        console.log(event)
        
        setDataEntity(event)
        navigate(event[0]?.id.toString())
      }
    }

    return (
        <TemplateTable
          onClickRows={onClickRows}
           data={dataCemeteries}
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
    );
  }
  
  export default CemeteryTable
  