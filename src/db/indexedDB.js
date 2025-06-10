const DB_NAME = 'DuiktClickerDB';
const STORE_NAME = 'gameState';

let dbInstance = null;

export function initializeDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) return resolve(dbInstance);
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };
    request.onerror = (e) => reject(e);
  });
}

export function saveGame(state) {
  return initializeDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(state, 'state');
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e);
    });
  });
}

export function loadGame() {
  return initializeDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get('state');
      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = (e) => reject(e);
    });
  });
}