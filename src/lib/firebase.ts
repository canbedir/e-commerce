// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYSjC-QgwroeNrYoA_gRmRAgNbN2ddpG0",
  authDomain: "e-commerce-hix.firebaseapp.com",
  projectId: "e-commerce-hix",
  storageBucket: "e-commerce-hix.appspot.com",
  messagingSenderId: "471674518018",
  appId: "1:471674518018:web:7ecdc99044a34961bc051b",
  measurementId: "G-80E6CFF0MZ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { firebaseApp, storage };
