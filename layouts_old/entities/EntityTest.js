// import React, { useContext } from 'react'
// import { 
//     AddItem, 
//     AddCemeteries, 
//     getCemeteryById, 
//     AddBlocks
//   } from '../../database/queriesTest/CRUD_Queries'
// import { GlobalContext } from '../../App'
// import Logout from '../../libraries/navbar_v1/plaginNavbar/logout'
// import { NavLink } from 'react-router-dom'
// import useQueries from '../../database/useQueries'

// const CemeteriesEntityTest = () => {
//     const { token } = useContext(GlobalContext)

//     const { setUpdateCemetery, removeCemetery, setAddCemetery } = useQueries()

//     return (
//         <div>
//             <button onClick={(e) => setAddCemetery(e,{ token })}>AddCemetery</button>
//             <br/>
//             <button onClick={(e) => AddCemeteries(e,{token})}>AddCemeteries</button>
//             <br/>
//             <button onClick={(e) => AddBlocks(e,{token})}>AddBlocks</button>
//             <br/>
//             <button onClick={(e) => getCemeteryById(e,{token})}>getCemeteryById</button>
//             <br/>
//             <button onClick={(e) => setUpdateCemetery(
//                 {
//                     cemeteryNameHe: 'test' + Math.random(),
//                     cemeteryNameEn: 'test.cemeteryNameEn', 
//                     nationalInsuranceCode: 'test.nationalInsuranceCode', 
//                     cemeteryCode: 'test.cemeteryCode', 
//                     coordinates: 'test.coordinates', 
//                     address: 'test.address', 
//                     contactName: 'test.contactName', 
//                     contactPhoneName: 'test.contactPhoneName',
//                     id: 1221,
//                     token: token,
//                 }
//             )}>updateCemetery</button>
//             <br/>
//             <button onClick={(e) => removeCemetery(1177)}>removeCemetery</button>
//             <br/>
//             <Logout/>
//         </div>
//     );
// }

// export default CemeteriesEntityTest


