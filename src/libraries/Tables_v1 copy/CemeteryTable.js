// import { useSelector } from 'react-redux'
// import { useState, useEffect, useContext } from 'react'
// import { makeStyles } from '@material-ui/styles'
// import TemplateTable from './TemplateTable';
// import { getCemeteries } from '../../database/queriesTest/cemeteriesQueries';
// import { GlobalContext } from '../../App'

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
//   });

// function DraggableBox() {
//     const [isDragging, setIsDragging] = useState(false);
//     const [initialX, setInitialX] = useState(null);
//     const [offsetX, setOffsetX] = useState(0);
//     const classes = useStyles()
  
//     const handleMouseDown = (e) => {
//       setIsDragging(true);
//       setInitialX(e.clientX);
//     };
  
//     const handleMouseUp = () => {
//       setIsDragging(false);
//       setInitialX(null);
//     };
  
//     const handleMouseMove = (e) => {
//       if (isDragging) {
//         const currentX = e.clientX;
//         const deltaX = currentX - initialX;
//         setOffsetX(deltaX);
//       }
//     };
  
//     return (
//       <div
//         className={`${classes.draggableBox} ${isDragging ? classes.dragging : ''}`}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//       >
//         <div className="inner-box" style={{ transform: `translateX(${offsetX}px)` }}>
//           Drag me left or right
//         </div>
//       </div>
//     );
//   }

// const CemeteryTable = ({ outgoingData = () => {} }) => {
//   const { token } = useContext(GlobalContext)
//   const [data, setData] = useState([])

//     const cemeteriesData = useSelector((state) => state.dataCemeteries.data)
//     const cemeteriesColumns = useSelector((state) => state.columnsCemeteries.data)
//     const categoryColumns = useSelector((state) => state.categoryCemeteries.data)

//   //   useEffect(() => {
//   //     getCemeteries(token)
//   //         .then(responseData => {
//   //           setData(responseData)
//   //         })
//   //         .catch(error => console.error(error));
//   // }, []);

//   //   const [data, setFormData] = useState([{
//   //     id: '0',
//   //     cemeteryNameHe: 'ww',
//   //     cemeteryNameEn: '',
//   //     cemeteryCode: '',
//   //     coordinates: '',
//   //     address: '',
//   //     contactName: '',
//   //     contactPhoneName: '',
//   //     isActive: false,
//   //     documents: '',
//   //     createDate: '',
//   //     inactiveDate: '',
//   //   },{
//   //     id: '2',
//   //     cemeteryNameHe: 'ww',
//   //     cemeteryNameEn: '',
//   //     cemeteryCode: '',
//   //     coordinates: '',
//   //     address: '',
//   //     contactName: '',
//   //     contactPhoneName: '',
//   //     isActive: false,
//   //     documents: '',
//   //     createDate: '',
//   //     inactiveDate: '',
//   //   },
//   //   {id: '1', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '3', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '4', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '5', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '6', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '7', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '8', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '9', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '10', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '11', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '12', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '13', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '14', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '15', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '16', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '17', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '18', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '19', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '20', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '21', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '22', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '23', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '20', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '21', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '22', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''},
//   //   {id: '23', cemeteryNameHe: 'weew', cemeteryNameEn: '', cemeteryCode: '', coordinates: '',address: '',contactName: '',
//   //   contactPhoneName: '',isActive: false,documents: '',createDate: '',inactiveDate: ''}
//   // ])
  
    

//     const styleHeader = {
//         // fontSize: '25px'
//     }
//     const styleFooter = {
//         // fontSize: '25px'
//     }

//     const styleBody = {
//         // fontSize: '25px'
//     }

//     return (
//         <TemplateTable
//            data={data}                                    // נתונים
//            columns={cemeteriesColumns}                              // עמודות
//            pageSize={10}                                             // כמות מוצגת לדף
//            checkboxSelection={categoryColumns[0].setting.checkbox}  // כפתור בחירת שורה
//            // disableSelectionOnClick                               // ביטול שורה לחיצה
//            menuOptions={categoryColumns[0].setting.menu}            // תפריט בכפתור שמאלי על כל שורה
//            outgoingData={outgoingData}          
//         ></TemplateTable>
//     );
//   }
  
//   export default CemeteryTable;
  