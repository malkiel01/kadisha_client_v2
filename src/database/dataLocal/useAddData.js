export const useAddData = (db, storeName) => {
  const addData = (data) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => {
        resolve(data);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  return addData;
};
