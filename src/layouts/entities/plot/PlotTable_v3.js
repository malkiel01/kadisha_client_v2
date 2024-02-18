import { useSelector } from 'react-redux'
import { useContext } from 'react'
import TemplateTable from '../../../libraries/Tables_v3/TemplateTable'
import useFormComponent from '../../../libraries/forms_v3/useFormComponent'
import useQueries from '../../../database/useQueries'
import { GlobalContext } from '../../../App'

const PlotTable = () => {
  const { dataPlots } = useContext(GlobalContext)
  
  const { removeCemetery } = useQueries()
  const { openFormComponent } = useFormComponent()

  const columns = useSelector((state) => state.columnsPlots.data)
  const category = useSelector((state) => state.categoryPlots.data)


    const removeItemRow = (id) => {
      removeCemetery(id)
    }


    return (
        <TemplateTable
           data={dataPlots}
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
  
  export default PlotTable
  