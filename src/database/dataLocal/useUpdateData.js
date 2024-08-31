export const useUpdateData = (db, storeName) => {
  const updateData = (data) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => {
        resolve(data);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  return updateData;
};
