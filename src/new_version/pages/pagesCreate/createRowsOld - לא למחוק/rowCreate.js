// import React, { useContext, useState, useEffect } from 'react'
// import useQueries from '../../../../../database/useQueries'
// import { GlobalContext } from '../../../../../App'
// import FormTemplate from '../../plagins/components/FormTemplate'
// import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
// import LoadingOverlay from '../../../../../libraries/loading/test3/LoadingOverlay'

// const RowCreate = ({ items, setItems, plotId }) => {
//   const { addOrUpdateDataRow } = useQueries()
//   const [loading, setLoading] = useState(false)
//   const { getCemeteryById, getBlockById, getEntitiesByAttr, getPlotById } = useQueries();
//   const { dataCemeteries, dataBlocks, dataPlots, dataRows } = useContext(GlobalContext)

//   const [rows, setRows] = useState([])
//   const [plots, setPlots] = useState(dataPlots)
//   const [blocks, setBlocks] = useState(dataBlocks)
//   const [errors, setErrors] = useState({});
//   const [formValues, setFormValues] = useState({})
//   const [isNewRecord, setIsNewRecord] = useState(true);

//   const columns = useSelector((state) => state.columnsFormRows.data);

//   const setDataPlotAuto = (id) => {
//     if (id !== -1) {
//       setIsNewRecord(false)
//       const plot = getPlotById(id)
//       const block = getBlockById(plot?.blockId)
//       setFormValues({ ...formValues, plotId: plot?.id, blockId: block?.id, cemeteryId: block?.cemeteryId })

//       let rows = getEntitiesByAttr(dataRows, 'plotId', plot?.id)
//       let plots = getEntitiesByAttr(dataPlots, 'blockId', block?.id)
//       let blocks = getEntitiesByAttr(dataBlocks, 'cemeteryId', block?.cemeteryId)
//       setRows(rows)
//       setItems(rows.sort((a, b) => a.serialNumber - b.serialNumber))
//       setPlots(plots)
//       setBlocks(blocks)

//     }
//   }

//   useEffect(() => {
//     console.log('step 1', plotId)
//     setPlots(dataPlots)
//     setBlocks(dataBlocks)
//     setDataPlotAuto(plotId)
//   }, [plotId, dataPlots, dataBlocks, dataCemeteries])

//   const fieldChangeCemeteryId = (event, newFormValues) => {
//     delete newFormValues?.blockId
//     delete newFormValues?.plotId

//     let blocks = getEntitiesByAttr(dataBlocks, event.target.name, event.target.value);
//     let plots = [];
//     blocks.forEach(block => {
//       let tempPlots = getEntitiesByAttr(dataPlots, 'blockId', block?.id);
//       plots = plots.concat(tempPlots); // איחוד המערכים במקום הוספת מערך בתוך מערך
//     });
//     let rows = []

//     return {
//       blocks,
//       plots,
//       rows,
//     }
//   }
//   const fieldChangeBlockId = (event, newFormValues) => {
//     delete newFormValues?.plotId

//     const block = getBlockById(parseInt(event.target.value))
//     const cemeteryId = getCemeteryById(parseInt(block?.cemeteryId))?.id

//     newFormValues = { ...newFormValues, cemeteryId }

//     let plots = getEntitiesByAttr(dataPlots, event.target.name, event.target.value)
//     let blocks = getEntitiesByAttr(dataBlocks, 'cemeteryId', block?.cemeteryId)
//     let rows = []

//     return {
//       newFormValues,
//       blocks,
//       plots,
//       rows,
//     }
//   }
//   const fieldChangePlotId = (event, newFormValues) => {
//     const plot = getPlotById(parseInt(event.target.value))
//     const block = getBlockById(parseInt(plot?.blockId))
//     const cemeteryId = getCemeteryById(parseInt(block?.cemeteryId))?.id

//     newFormValues = { ...newFormValues, cemeteryId, blockId: block?.id }

//     let rows = getEntitiesByAttr(dataRows, event.target.name, event.target.value)
//     let plots = getEntitiesByAttr(dataPlots, 'blockId', plot?.blockId)
//     let blocks = getEntitiesByAttr(dataBlocks, 'cemeteryId', block?.cemeteryId)

//     return {
//       newFormValues,
//       blocks,
//       plots,
//       rows,
//     }
//   }

//   const handleChange = (event) => {
//     let newFormValues = formValues
//     if (event?.target?.name === 'cemeteryId') {
//       let res = fieldChangeCemeteryId(event, newFormValues)
//       setBlocks(res?.blocks)
//       setPlots(res?.plots)
//       setRows(res?.rows)
//     }
//     if (event?.target?.name === 'blockId') {
//       let res = fieldChangeBlockId(event, newFormValues)
//       setBlocks(res?.blocks)
//       setPlots(res?.plots)
//       setRows(res?.rows)
//       newFormValues = res?.newFormValues
//     }
//     if (event?.target?.name === 'plotId') {
//       let res = fieldChangePlotId(event, newFormValues)
//       setBlocks(res?.blocks)
//       setPlots(res?.plots)
//       setRows(res?.rows)
//       newFormValues = res?.newFormValues
//     }
//     setFormValues({ ...newFormValues, [event.target.name]: event.target.value })
//   }

//   const validateForm = () => {
//     let tempErrors = {};
//     let formIsValid = true;

//     columns.forEach((field) => {
//       if (field.required && !formValues[field.name]) {
//         tempErrors[field.name] = 'שדה חובה';
//         formIsValid = false;
//       }
//       if (field.notRepeat && formValues[field.name]) {
//         if (items.some((item) => item?.lineNameHe === formValues[field.name])) {
//           tempErrors[field.name] = `הערך ${formValues[field.name]} כבר קיים`;
//           formIsValid = false;
//         }
//       }
//     });

//     setErrors(tempErrors)
//     return formIsValid;
//   };

//   const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

//   const handleAddItem = async () => {
//     setLoading(true)
//     const newId = generateUniqueId()
//     const newNum = items.length ? items[items.length - 1].serialNumber + 1 : 1
//     const newFormValues = { id: newId, serialNumber: newNum, ...formValues }
//     delete newFormValues.cemeteryId
//     delete newFormValues.blockId

//     const updatedItems = [...items, newFormValues]
//     setItems(updatedItems.sort((a, b) => a.serialNumber - b.serialNumber))

//     let tempFormValues = { ...formValues }
//     delete tempFormValues.lineNameHe
//     delete tempFormValues.lineNameEn
//     setFormValues({ ...tempFormValues })
//     setLoading(true)

//     // מציאת כל האייטמים שלא קיימים ב-dataRows
//     const itemsNotInDataRows = updatedItems.filter(item =>
//       !dataRows.some(dataRow => dataRow.id === item.id)
//     )

//     // הסרת האטריביוט id מהאובייקטים במערך itemsNotInDataRows
//     const itemsWithoutId = itemsNotInDataRows.map(({ id, ...rest }) => rest)

//     console.log(itemsWithoutId) // תוכל להדפיס את התוצאה לבדיקה

//     let res = await addOrUpdateDataRow(itemsWithoutId)
//     if (res !== false) {
//       setLoading(false)
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault()

//     if (validateForm()) {
//       handleAddItem()
//     }
//   }

//   const fieldsWithDynamicDisabled = columns.map(field => ({
//     ...field,
//     disabled: field.disabled && !isNewRecord ? true : false
//   }));

//   return (
//     <>
//       <FormTemplate
//         // title="הוספת שורה"
//         btn="הוספת שורה"
//         fields={fieldsWithDynamicDisabled}
//         columns={columns}
//         formValues={formValues}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         errors={errors}
//         options={{
//           cemeteryId: dataCemeteries.map(item => ({ value: item.id, label: item.cemeteryNameHe })),
//           blockId: blocks.map(item => ({ value: item.id, label: item.blockNameHe })),
//           plotId: plots.map(item => ({ value: item.id, label: item.plotNameHe })),
//         }}
//       />
//       {loading && <LoadingOverlay />}
//     </>
//   );
// };

// RowCreate.propTypes = {
//   items: PropTypes.array.isRequired,
//   setItems: PropTypes.func.isRequired,
// }

// export default RowCreate