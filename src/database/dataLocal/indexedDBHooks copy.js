import { useState, useEffect, useCallback, useContext, useLayoutEffect } from 'react';
import { GlobalContext } from '../../App';

export const useIndexedDB = (dbName, dbVersion, storeName) => {
  const [db, setDb] = useState(null);

  useLayoutEffect(() => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      setDb(event.target.result);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.errorCode);
    };
  }, [dbName, dbVersion, storeName]);

  return db;
};

export const useAddData = (db, storeName) => {
  return useCallback(
    (data) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const getRequest = store.get(data.id);

        getRequest.onsuccess = (event) => {
          if (event.target.result) {
            // Key exists, update the data
            const updateRequest = store.put(data);
            updateRequest.onsuccess = () => {
              db.dispatchEvent(new Event('datachange'));
              resolve();
            };
            updateRequest.onerror = (event) => reject(event.target.error);
          } else {
            // Key does not exist, add the data
            const addRequest = store.add(data);
            addRequest.onsuccess = () => {
              db.dispatchEvent(new Event('datachange'));
              resolve();
            };
            addRequest.onerror = (event) => reject(event.target.error);
          }
        };

        getRequest.onerror = (event) => reject(event.target.error);
      }),
    [db, storeName]
  );
};

export const useUpdateData = (db, storeName) => {
  return useCallback(
    (data) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);

        request.onsuccess = () => {
          db.dispatchEvent(new Event('datachange'));
          resolve();
        };
        request.onerror = (event) => reject(event.target.error);
      }),
    [db, storeName]
  );
};

export const useGetData = (db, storeName) => {
  return useCallback(
    (id) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      }),
    [db, storeName]
  );
};

export const useGetDataByName = (db, storeName) => {
  return useCallback(
    (name) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.openCursor();
        const results = [];

        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            if (cursor.value.name === name) {
              results.push(cursor.value);
            }
            cursor.continue();
          } else {
            resolve(results);
          }
        };

        request.onerror = (event) => reject(event.target.error);
      }),
    [db, storeName]
  );
};

export const useIndexedDBSync = (storeName, keyName) => {
  const { db } = useContext(GlobalContext);

  const [data, setData] = useState([]);

  const getDataByName = useGetDataByName(db, storeName);

  useLayoutEffect(async () => {
    if (!db) console.log('step 2 db: ', db);
    if (!db) return;

    let tempData = []

    const loadData = async () => {
      try {
        const result = await getDataByName(keyName);
        setData(result[0]?.value || []);
      } catch (error) {
        console.error('Error loading data from IndexedDB:', error);
      }
    };

    loadData();

    console.log(tempData, keyName);

    const handleDataChange = () => {
      loadData();
    };

    db.addEventListener('datachange', handleDataChange);

    return () => {
      db.removeEventListener('datachange', handleDataChange);
    };
  }, [db, getDataByName, storeName, keyName]);

  return data;
};

export const useIndexedDBSyncV2 = (storeName, keyName) => {
  const { db } = useContext(GlobalContext);
  const [data, setData] = useState([]);

  const getDataByName = useGetDataByName(db, storeName);

  useLayoutEffect(() => {
    const loadData = async () => {
      if (!db) {
        console.log('step 2 db: ', db);
        return;
      }
      
      try {
        const result = await getDataByName(keyName);
        setData(result[0]?.value || []);
      } catch (error) {
        console.error('Error loading data from IndexedDB:', error);
      }
    };
    
    loadData();
    
    const handleDataChange = () => {
      loadData();
    };
    
    if (db) {
      db.addEventListener('datachange', handleDataChange);
    }
    
    return () => {
      if (db) {
        db.removeEventListener('datachange', handleDataChange);
      }
    };
  }, [db, getDataByName, storeName, keyName]);
  
  useEffect(() => {
    console.log('connect db cemetery', data);
  }, [data]);
  return data;
};

export const useIndexedDBSyncNO = (storeName, keyName) => {
  const { db } = useContext(GlobalContext);
  const [data, setData] = useState(null); // שינוי כאן ל־null במקום []
  
  const getDataByName = useGetDataByName(db, storeName);

  useLayoutEffect(() => {
    const loadData = async () => {
      if (!db) {
        console.log('step 2 db: ', db);
        return;
      }

      try {
        const result = await getDataByName(keyName);
        setData(result[0]?.value || null); // שינוי כאן ל־null במקום []
        console.log('Data from IndexedDB:', result[0]?.value || []);
      } catch (error) {
        console.error('Error loading data from IndexedDB:', error);
      }
    };

    loadData();

    const handleDataChange = () => {
      loadData();
    };

    if (db) {
      db.addEventListener('datachange', handleDataChange);
    }

    return () => {
      if (db) {
        db.removeEventListener('datachange', handleDataChange);
      }
    };
  }, [db, getDataByName, storeName, keyName]);

  useEffect(() => {
    // ודאות שהמידע טעון ומוכן לשימוש
    if (data !== null) {
      console.log('Data returned from useIndexedDBSync:', data);
    }
  }, [data]);

  return data;
};


