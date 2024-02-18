// // דף המיועד להעביר הגדרות אישיות של בית עלמין - לתבנית טבלה

// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect, useContext } from 'react'
// import TemplateTable from '../../../libraries/Tables_v2/TemplateTable'
// import useFormComponent from '../../../libraries/forms_v3/useFormComponent'
// import useQueries from '../../../database/useQueries'
// import { dataCemeteriesActions } from '../../../store/cemeteries'
// import { GlobalContext } from '../../../App'

// const CemeteryTable = () => {
//   const { dataCemeteries } = useContext(GlobalContext)
//   const { removeCemetery, AllDataCemeteries } = useQueries()
  
//   useEffect(() => {
//     AllDataCemeteries()
//   }, []);

//     const cemeteriesColumns = useSelector((state) => state.columnsCemeteries.data)
//     const categoryColumns = useSelector((state) => state.categoryCemeteries.data)

//     const { openFormComponent } = useFormComponent()
//     const dispatch = useDispatch()

//     const removeItemRow = (id) => {
//       removeCemetery(id)
//     }


//     return (
//         <TemplateTable
//            data={dataCemeteries}
//            items={[
//             {name: 'פתח רשומת בית עלמין', value: (event,row) => openFormComponent(row)},
//             {name: 'מחק רשומת בית עלמין', value: (event,row) => removeItemRow(row.id)},
//            ]}
//            columns={cemeteriesColumns}                              // עמודות
//            pageSize={10}                                             // כמות מוצגת לדף
//            checkboxSelection={categoryColumns[0].setting.checkbox}  // כפתור בחירת שורה
//           //  disableSelectionOnClick                               // ביטול שורה לחיצה
//            menuOptions={categoryColumns[0].setting.menu}            // תפריט בכפתור שמאלי על כל שורה
//         ></TemplateTable>
//     );
//   }
  
//   export default CemeteryTable;
  