// // דף המיועד להעביר הגדרות אישיות לעמוד של בתי עלמין

// import React, { useContext } from 'react'
// import TemplatePage from '../../../libraries/gridPage_v1/TemplatePage'
// import HeaderLayouts from '../../plaginLayouts/HeaderLayouts'
// import CemeteryTable from './CemeteryTable'
// import useFormComponent from '../../../libraries/forms_v3/useFormComponent'
// import { GlobalContext } from '../../../App'
// import Loading from '../../pages/Loading'
// import BlockTable from '../Block/BlockTable'



// const CemeteriesLayouts = ({nameEntity}) => {

//     var nameHeader = null
//     var componentTable = null
//     if (nameEntity === 'cemetery') {
//         nameHeader = process.env.REACT_APP_NAME_HEADER_CEMETERY_HEB   
//         componentTable = CemeteryTable({data: <></>})
//     }
//     if (nameEntity === 'block') {
//         nameHeader = process.env.REACT_APP_NAME_HEADER_BLOCK_HEB  
//         componentTable = BlockTable({data: <></>})
//     }

//     const { loading } = useContext(GlobalContext)

//     const { createFormComponent } = useFormComponent()
//     const CLICK_BTN_ADD = () => {createFormComponent(nameEntity)}

//     const criteria = {title : nameHeader, clickBtnAdd : CLICK_BTN_ADD}
    
//     const data = [
//         // כותרת לעמוד
//         {id: 0, spacing: 0, xs: 12, md: 12, data: HeaderLayouts(criteria)},
//         // טבלב לעמוד
//         {id: 2, spacing: 0, xs: 12, md: 12, data: componentTable},
//     ]

//     return loading ? 
//     <>
//         <Loading />
//         <TemplatePage data={data}/> 
//     </>
//      : <TemplatePage data={data}/> 


    
// }

// export default CemeteriesLayouts
