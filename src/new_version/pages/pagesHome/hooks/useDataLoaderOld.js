// import { useState, useEffect, useRef } from 'react';
// import useQueries from '../../../../../../database/useQueries';

// const useDataLoader = (dataKeys) => {

//   const localCemeteries = JSON.parse(localStorage.getItem('dataCemeteries')) || []
//   const localBlocks = JSON.parse(localStorage.getItem('dataBlocks')) || []
//   const localPlots = JSON.parse(localStorage.getItem('dataPlots')) || []
//   const localAreaGraves = JSON.parse(localStorage.getItem('dataAreaGraves')) || []
//   const localGraves = JSON.parse(localStorage.getItem('dataGraves')) || []
//   const localRows = JSON.parse(localStorage.getItem('dataRows')) || []
//   const localCustomers = JSON.parse(localStorage.getItem('dataCustomers')) || []
//   const localPurchases = JSON.parse(localStorage.getItem('dataPurchases')) || []
//   const localBurials = JSON.parse(localStorage.getItem('dataBurials')) || []
//   const localPayments = JSON.parse(localStorage.getItem('dataPayments')) || []
//   const localCities = JSON.parse(localStorage.getItem('dataCities')) || []
//   const localCountries = JSON.parse(localStorage.getItem('dataCountries')) || []

//   const [loading, setLoading] = useState(false);
//   const { 
//     AllDataCemeteries,
//     AllDataBlocks,
//     AllDataPlots,
//     AllDataAreaGraves,
//     AllDataGraves, 
//     AllDataRows,
//     AllDataCustomers,
//     AllDataPurchases,
//     AllDataBurials,
//     AllDataPayments,
//     AllDataCities,
//     AllDataCountries,
//    } = useQueries();

//   const fetchFunctions = {
//     dataCemeteries: AllDataCemeteries,
//     dataBlocks: AllDataBlocks,
//     dataPlots: AllDataPlots,
//     dataAreaGraves: AllDataAreaGraves,
//     dataGraves: AllDataGraves,
//     dataRows: AllDataRows,
//     dataCustomers: AllDataCustomers,
//     dataPurchases: AllDataPurchases,
//     dataBurials: AllDataBurials,
//     dataPayments: AllDataPayments,
//     dataCities: AllDataCities,
//     dataCountries: AllDataCountries,
//   };

//   const fetchedDataKeys = useRef(new Set());

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       for (let i = 0; i < dataKeys.length; i++) {
//         const key = dataKeys[i];
//         const fetchFunction = fetchFunctions[key];

//         const localData = JSON.parse(localStorage.getItem(key)) || [];
//         if (localData.length === 0 && !fetchedDataKeys.current.has(key)) {
//           await fetchFunction();
//           fetchedDataKeys.current.add(key);
//         }
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [dataKeys]);

//   return loading;
// };

// export default useDataLoader;
