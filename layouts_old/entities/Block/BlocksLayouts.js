// import React, { useContext } from 'react';
// import TemplatePage from '../../../libraries/gridPage_v1/TemplatePage'
// import Loading from '../../pages/Loading'
// import HeaderLayouts from '../../plaginLayouts/HeaderLayouts'

// import useFormComponent from '../../../libraries/forms_v3/useFormComponent'
// import BlockTable from './BlockTable';
// import { GlobalContext } from '../../../App';


// const NAME_HEADER = process.env.REACT_APP_NAME_HEADER_BLOCK_HEB

// const BlocksLayouts = () => {

    
//     const { loading } = useContext(GlobalContext)
//     const { createFormComponent } = useFormComponent()
//     const CLICK_BTN_ADD = () => {createFormComponent('block')}

//     const criteria = {title : NAME_HEADER, clickBtnAdd : CLICK_BTN_ADD}

       
//     const data = [
//         // כותרת לעמוד
//         {id: 0, spacing: 0, xs: 12, md: 12, data: HeaderLayouts(criteria)},
//         // טבלב לעמוד
//         {id: 2, spacing: 0, xs: 12, md: 12, data: BlockTable({data: <></>})},
//     ]
    
//     return loading ? 
//     <>
//         <Loading />
//         <TemplatePage data={data}/> 
//     </>
//      : <TemplatePage data={data}/> 
// }

// export default BlocksLayouts;
