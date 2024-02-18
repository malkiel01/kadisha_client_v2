import { useSelector } from 'react-redux'
import TemplateTable from '../../../../../../libraries/Tables_v4/TemplateTable'
import useFormComponent from '../../../../../../libraries/forms_v4/useFormComponent'
import useQueries from '../../../../../../database/useQueries'

const PlotTable = ({ data = [] , onClickRow = () => {} }) => {
  
  const { removeCemetery } = useQueries()
  const { openFormComponent } = useFormComponent()

    const columns = useSelector((state) => state.columnsPlots.data)
    const category = useSelector((state) => state.categoryPlots.data)


    const removeItemRow = (id) => {
      removeCemetery(id)
    }

    const onClickRows = (event) => {
      if (event.length === 1) {
        onClickRow(event)
      }
    }

    return (
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
    );
  }
  
  export default PlotTable
  