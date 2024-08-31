import { useLayoutEffect, useState } from 'react';

export const useIndexedDB = (dbName, version, storeName) => {
  const [db, setDb] = useState(null);

  useLayoutEffect(() => {
    const request = indexedDB.open(dbName, version);

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
  }, [dbName, version, storeName]);

  return db;
};
