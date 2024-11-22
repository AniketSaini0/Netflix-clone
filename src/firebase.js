import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOaGBXO64yt4x7uhXxN3ltNuS4F-3xy78",
    authDomain: "netflix-clone-63e56.firebaseapp.com",
    projectId: "netflix-clone-63e56",
    storageBucket: "netflix-clone-63e56.firebasestorage.app",
    messagingSenderId: "186134932290",
    appId: "1:186134932290:web:dd6d5225b5cf87e34076db"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {auth}
  export default db;