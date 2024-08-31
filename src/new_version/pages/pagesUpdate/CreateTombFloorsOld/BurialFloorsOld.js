// import React, { useState, useEffect, useRef } from 'react';
// import BurialFloorCard from './BurialFloorCard';
// import useStyles from './useStyles';
// import { Divider, Typography } from '@mui/material';
// import useQueries from '../../../../../database/useQueries';

// const BurialFloors = ({ onFloorsChange = (e) => { console.log(e) }, formValues }) => {
//   const classes = useStyles();
//   const { getEntitiesByAttr, getEntityByAttr } = useQueries();
//   const localGraves = JSON.parse(localStorage.getItem('dataGraves')) || [];
//   const localAreaGraves = JSON.parse(localStorage.getItem('dataAreaGraves')) || [];

//   const [burialFloors, setBurialFloors] = useState([]);
//   const [savedFloors, setSavedFloors] = useState([]); // שמירת הקומות שנשמרו
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     console.log(localGraves);
//     console.log(localAreaGraves);
    
//     const data = getEntityByAttr(localAreaGraves, 'id', formValues?.id)
//     const graves = getEntitiesByAttr(localGraves, 'areaGraveId', data?.gravesList)
//               .map(item => {return {...item, type: item?.plotType, saved: true}})
//     setBurialFloors(graves)
//   }, []);

//   const prevBurialFloorsRef = useRef();

//   useEffect(() => {
//     prevBurialFloorsRef.current = savedFloors;
//   });

//   const prevBurialFloors = prevBurialFloorsRef.current;

//   useEffect(() => {
//     if (prevBurialFloors !== savedFloors) {
//       onFloorsChange(savedFloors);
//     }
//   }, [savedFloors, onFloorsChange, prevBurialFloors]);

//   const addBurialFloor = () => {
//     if (isSaving) return;
//     const newFloor = {
//       id: Date.now(), // Using a timestamp for unique ID
//       name: String.fromCharCode(1488 + burialFloors.length), // Generate name based on the length of the array
//       type: '',
//       saved: false,
//     };
//     setBurialFloors([...burialFloors, newFloor]);
//   };

//   const handleSave = (id) => {
//     setIsSaving(true);
//     setBurialFloors(burialFloors.map(floor => floor.id === id ? { ...floor, saved: true } : floor));
//     setSavedFloors([...savedFloors, burialFloors.find(floor => floor.id === id)]); // הוספת הקומה השמורה לרשימת הקומות שנשמרו
//     setIsSaving(false);
//   };

//   const handleTypeChange = (id, value) => {
//     setBurialFloors(burialFloors.map(floor => floor.id === id ? { ...floor, type: value } : floor));
//   };

//   const handleDelete = (id) => {
//     setBurialFloors(burialFloors.filter(floor => floor.id !== id));
//     setSavedFloors(savedFloors.filter(floor => floor.id !== id)); // הסרת הקומה שנשמרה מהרשימה אם נמחקה
//   };

//   return (
//     <>
//       {burialFloors.map((floor, index) => (
//         <BurialFloorCard
//           key={floor.id}
//           floor={{ ...floor, name: String.fromCharCode(1488 + index) }} // Generate name dynamically based on index
//           onTypeChange={handleTypeChange}
//           onSave={handleSave}
//           onDelete={handleDelete}
//           isLast={index === burialFloors.length - 1}
//         />
//       ))}
//       <Divider className={classes.divider} />
//       <Typography
//         onClick={addBurialFloor}
//         disabled={isSaving || burialFloors.some(floor => !floor.saved)}
//       >
//         + הוספת קומת קבורה
//       </Typography>
//     </>
//   )
// };

// export default BurialFloors;
