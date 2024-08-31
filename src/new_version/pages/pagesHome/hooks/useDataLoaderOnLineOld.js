// import { useEffect } from 'react';
// import useQueries from '../../../../../database/useQueries'; // ודא שהנתיב נכון

// const useDataLoaderOnLine = () => {
//   const { dataRefresh } = useQueries();
//   const localGraves = JSON.parse(localStorage.getItem('dataGraves')) || []
//   const localAreaGraves = JSON.parse(localStorage.getItem('dataAreaGraves')) || []
//   const localPlots = JSON.parse(localStorage.getItem('dataPlots')) || []
//   const localBlocks = JSON.parse(localStorage.getItem('dataBlocks')) || []
//   const localCemeteries = JSON.parse(localStorage.getItem('dataCemeteries')) || []

//   const localCustomers = JSON.parse(localStorage.getItem('dataCustomers')) || []
//   const localPurchases = JSON.parse(localStorage.getItem('dataPurchases')) || []
//   const localBurials = JSON.parse(localStorage.getItem('dataBurials')) || []
//   const localPyments = JSON.parse(localStorage.getItem('dataPyments')) || []

//   useEffect(() => {
//     if (!navigator.onLine) {
//       localStorage.setItem('connection', JSON.stringify({ msg: 'אין חיבור לאינטרנט', active: true }));
//     } else {
//       dataRefresh()
//     }
//   }, [navigator.onLine]);
// };

// export default useDataLoaderOnLine;
