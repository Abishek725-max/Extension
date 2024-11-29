const dbName = "MyExtensionDB";
const storeName = "MyStore";

let dbInstance = null;

export function initializeDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // Create the object store only if it doesn't already exist
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
        console.log(`Object store "${storeName}" created.`);
      }
    };

    request.onsuccess = (event) => {
      console.log("Database opened successfully.");
      dbInstance = event.target.result; // Cache the instance
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error("Database error:", event.target.error);
      reject(event.target.error);
    };
  });
}

export async function addData(data) {
  const db = await initializeDB();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.put(data); // Adds or updates data based on "id"
    request.onsuccess = () => {
      console.log("Data added/updated:", data);
      resolve(data);
    };
    request.onerror = (event) => {
      console.error("Error adding/updating data:", event.target.error);
      reject(event.target.error);
    };
  });
}

export async function getData(id) {
  const db = await initializeDB();
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.get(id); // Retrieve data by id
    request.onsuccess = () => {
      console.log("Data retrieved:", request.result);
      resolve(request.result);
    };
    request.onerror = (event) => {
      console.error("Error fetching data:", event.target.error);
      reject(event.target.error);
    };
  });
}

export async function getDataWithId(id) {
  try {
    const data = await getData(id);

    console.log("dataFEcthed", data);

    if (data === undefined) {
      console.warn(`No data found for ID: "${id}"`);
    } else {
      console.log("Fetched Data:", data);
    }
    return data?.value; // Return undefined if not found
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow for the caller to handle
  }
}

export async function addDataWithId(id, setValue) {
  try {
    const data = { id, value: setValue }; // Ensure the data has an "id" field for uniqueness
    const result = await addData(data); // Use the addData function to insert or update the record
    console.log("Data added/updated:", result);
    return result; // Return the result if needed
  } catch (error) {
    console.error("Error adding/updating data:", error);
  }
}
