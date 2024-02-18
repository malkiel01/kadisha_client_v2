// // דף המיועד להעביר הגדרות אישיות של בית עלמין - לתבנית טבלה

// import { useDispatch, useSelector } from 'react-redux'
// import { useLayoutEffect, useEffect, useState, useContext } from 'react'
// import { makeStyles } from '@material-ui/styles'
// import TemplateTable from '../../../libraries/Tables_v2/TemplateTable'
// import useFormComponent from '../../../libraries/forms_v3/useFormComponent'
// import { removeCemetery } from '../../../database/queriesTest/CRUD_Queries'
// import useQueries from '../../../database/useQueries'
// import { dataCemeteriesActions } from '../../../store/cemeteries'
// import { dataBlocksActions } from '../../../store/blocks'
// import { GlobalContext } from '../../../App'

// const useStyles = makeStyles({
//     draggableBox: {
//         width: '300px',
//         height: '100px',
//         backgroundColor: '#f0f0f0',
//         border: '1px solid #ccc',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s ease',
//       },
      
//       draggableBox: {
//         backgroundColor: '#ccc',
//       },
//       dragging: {
//         backgroundColor: '#ccc',
//       },
//       innerBox: {
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//   })

// const BlockTable = ({ outgoingData = () => {} }) => {
//   const { dataBlocks } = useContext(GlobalContext)
//   const { removeCemetery, AllDataBlocks } = useQueries()


  
//   useEffect(() => {
//     AllDataBlocks()
//   }, []);

//     const blocksColumns = useSelector((state) => state.columnsBlocks.data)
//     const categoryColumns = useSelector((state) => state.categoryBlocks.data)

//     const styleHeader = {
//         // fontSize: '25px'
//     }
//     const styleFooter = {
//         // fontSize: '25px'
//     }
//     const styleBody = {
//         // fontSize: '25px'
//     }

//     const { openFormComponent } = useFormComponent()
//     const dispatch = useDispatch()

//     const removeItemRow = (id) => {
//       // removeCemetery(id)
//     }


//     return (
//         <TemplateTable
//            data={dataBlocks}
//            items={[
//             {name: 'פתח רשומת בית עלמין', value: (event,row) => openFormComponent(row)},
//             {name: 'מחק רשומת בית עלמין', value: (event,row) => removeItemRow(row.id)},
//            ]}
//            columns={blocksColumns}                              // עמודות
//            pageSize={10}                                             // כמות מוצגת לדף
//            checkboxSelection={categoryColumns[0].setting.checkbox}  // כפתור בחירת שורה
//           //  disableSelectionOnClick                               // ביטול שורה לחיצה
//            menuOptions={categoryColumns[0].setting.menu}            // תפריט בכפתור שמאלי על כל שורה
//            outgoingData={outgoingData}  
                   
//         ></TemplateTable>
//     );
//   }
  
//   export default BlockTable;
  