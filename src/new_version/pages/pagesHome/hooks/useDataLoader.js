import React, { useLayoutEffect } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useIndexedDBSync } from '../../../../database/dataLocal/indexedDBHooks';
import useQueries from '../../../../database/useQueries';

export const useDataLoader = (dataKeysAsync = [], dataKeys = []) => {
  const {
    AllDataCemeteries,
    AllDataBlocks,
    AllDataPlots,
    AllDataAreaGraves,
    AllDataGraves,
    AllDataRows,
    AllDataCustomers,
    AllDataPurchases,
    AllDataBurials,
    AllDataPayments,
    AllDataCities,
    AllDataCountries,
  } = useQueries();

  const fetchFunctions = {
    dataCemeteries: AllDataCemeteries,
    dataBlocks: AllDataBlocks,
    dataPlots: AllDataPlots,
    dataAreaGraves: AllDataAreaGraves,
    dataGraves: AllDataGraves,
    dataRows: AllDataRows,
    dataCustomers: AllDataCustomers,
    dataPurchases: AllDataPurchases,
    dataBurials: AllDataBurials,
    dataPayments: AllDataPayments,
    dataCities: AllDataCities,
    dataCountries: AllDataCountries,
  };

  const dataCemeteries = useIndexedDBSync('myStore', 'dataCemeteries');
  const dataBlocks = useIndexedDBSync('myStore', 'dataBlocks');
  const dataPlots = useIndexedDBSync('myStore', 'dataPlots');
  const dataRows = useIndexedDBSync('myStore', 'dataRows');
  const dataAreaGraves = useIndexedDBSync('myStore', 'dataAreaGraves');
  const dataGraves = useIndexedDBSync('myStore', 'dataGraves');
  const dataCustomers = useIndexedDBSync('myStore', 'dataCustomers');
  const dataPurchases = useIndexedDBSync('myStore', 'dataPurchases');
  const dataBurials = useIndexedDBSync('myStore', 'dataBurials');
  const dataPayments = useIndexedDBSync('myStore', 'dataPayments');
  const dataCities = useIndexedDBSync('myStore', 'dataCities');
  const dataCountries = useIndexedDBSync('myStore', 'dataCountries');


  // // קבלת נתוני דאטה בייס
  // const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  // const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  // const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  // const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  // const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  // const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  // const { data: localCustomers, loading: loadingCustomers } = useIndexedDBSyncV2('myStore', 'dataCustomers');
  // const { data: localPurchases, loading: loadingPurchases } = useIndexedDBSyncV2('myStore', 'dataPurchases');
  // const { data: localBurials, loading: loadingBurials } = useIndexedDBSyncV2('myStore', 'dataBurials');

  // // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  // const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingAreaGraves || loadingGraves || loadingRows
  //   || loadingCustomers || loadingPurchases || loadingBurials;

  const hasCheckedRef = useRef(false);

  const dataLocal = {
    dataCemeteries,
    dataBlocks,
    dataPlots,
    dataAreaGraves,
    dataGraves,
    dataRows,
    dataCustomers,
    dataPurchases,
    dataBurials,
    dataPayments,
    dataCities,
    dataCountries,
  };

  const fetchedDataKeys = useRef(new Set());
  const loadingState = useRef({});
  const [loading, setLoading] = useState(false);

  const isDataLocalLoaded = (nameData = []) => {
    if (!Array.isArray(nameData) || nameData.length === 0) {
      return false;
    }
    
    const res = nameData.every(key => {
      const data = dataLocal[key];
      return data && data.length !== 0;
    });

    return res;
  };
  const hasPendingFetches = () => {
    return dataKeysAsync.some(key => loadingState.current[key] === undefined || loadingState.current[key] === true);
  };

  useLayoutEffect(() => {
    
    if (!hasCheckedRef.current) {
      hasCheckedRef.current = true;

      const fetchData = async () => {
        // Fetch asynchronous data keys
        const asyncFetches = dataKeysAsync.map(async (key) => {
          if (!loadingState.current[key]) {          
            const fetchFunction = fetchFunctions[key];
            if (dataLocal[key]?.length === 0 && !fetchedDataKeys.current.has(key)) {
              setLoading(!isDataLocalLoaded(dataKeysAsync))
              loadingState.current[key] = true; // Start loading
              await fetchFunction();
              fetchedDataKeys.current.add(key);
              loadingState.current[key] = false; // End loading
            }
          }
        });

        // Fetch synchronous data keys
        if (dataKeys.some(data => data === 'all')) {
          Object.keys(dataLocal).forEach(async key => {
            const fetchFunction = fetchFunctions[key];
            if (!fetchedDataKeys.current.has(key)) {
              await fetchFunction();
              fetchedDataKeys.current.add(key);
            }
          });
        } else {
          for (const key of dataKeys) {
            const fetchFunction = fetchFunctions[key];
            if (!fetchedDataKeys.current.has(key)) {
              await fetchFunction();
              fetchedDataKeys.current.add(key);
            }
          }
        }
        await Promise.all(asyncFetches);
        setLoading(false);
      };

      const temp = async () => {
        fetchData();
      }
      temp()
    }
    else {
      // setLoading(!isDataLocalLoaded(dataKeysAsync))
      if (hasPendingFetches()) {
        setLoading(!isDataLocalLoaded(dataKeysAsync));
      } else {
        setLoading(false);
      }
    }
  }, [dataKeysAsync, isDataLocalLoaded]);

  return loading;
};

export const useDataLoaderIndexedDBSync = (dataKeys = [], dataKeysAsync = []) => {
  const [loading, setLoading] = useState(false);
  const {
    AllDataCemeteries,
    AllDataBlocks,
    AllDataPlots,
    AllDataAreaGraves,
    AllDataGraves,
    AllDataRows,
    AllDataCustomers,
    AllDataPurchases,
    AllDataBurials,
    AllDataPayments,
    AllDataCities,
    AllDataCountries,
  } = useQueries();

  const fetchFunctions = {
    dataCemeteries: AllDataCemeteries,
    dataBlocks: AllDataBlocks,
    dataPlots: AllDataPlots,
    dataAreaGraves: AllDataAreaGraves,
    dataGraves: AllDataGraves,
    dataRows: AllDataRows,
    dataCustomers: AllDataCustomers,
    dataPurchases: AllDataPurchases,
    dataBurials: AllDataBurials,
    dataPayments: AllDataPayments,
    dataCities: AllDataCities,
    dataCountries: AllDataCountries,
  };

  const dataCemeteries = useIndexedDBSync('myStore', 'dataCemeteries');
  const dataBlocks = useIndexedDBSync('myStore', 'dataBlocks');
  const dataPlots = useIndexedDBSync('myStore', 'dataPlots');
  const dataAreaGraves = useIndexedDBSync('myStore', 'dataAreaGraves');
  const dataGraves = useIndexedDBSync('myStore', 'dataGraves');

  const dataLocal = {
    dataCemeteries,
    dataBlocks,
    dataPlots,
    dataAreaGraves,
    dataGraves
  };

  const fetchedDataKeys = useRef(new Set());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      console.log(dataLocal['dataCemeteries']);

      // Fetch asynchronous data keys
      const asyncFetches = dataKeysAsync.map(async (key) => {
        const fetchFunction = fetchFunctions[key];

        if (dataLocal[key] === 0 && !fetchedDataKeys.current.has(key)) {
          console.log('step loading');
          setLoading(true);
          await fetchFunction();
          fetchedDataKeys.current.add(key);
        }
      });

      // Fetch synchronous data keys
      for (let i = 0; i < dataKeys.length; i++) {
        const key = dataKeys[i];
        const fetchFunction = fetchFunctions[key];

        if (dataLocal[key] === 0 && !fetchedDataKeys.current.has(key)) {
          await fetchFunction();
          fetchedDataKeys.current.add(key);
        }
      }

      await Promise.all(asyncFetches);

      setLoading(false);
    };

    fetchData();
  }, [dataKeys, dataKeysAsync, fetchFunctions]);

  return loading;
};

export default useDataLoader;
