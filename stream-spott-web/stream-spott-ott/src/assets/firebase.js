
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);

export { db, storage, storageRef };
