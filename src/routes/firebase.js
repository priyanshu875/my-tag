// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpsEa555ggUmnZtOtq-kNBe3Nl-DEMoG8",
  authDomain: "lostproject-56ce8.firebaseapp.com",
  projectId: "lostproject-56ce8",
  storageBucket: "lostproject-56ce8.appspot.com",
  messagingSenderId: "805626446425",
  appId: "1:805626446425:web:c0337c6da0ec4ea943a748"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);