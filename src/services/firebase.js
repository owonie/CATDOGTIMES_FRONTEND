// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA3QeFEGwl5pzt1NnSZbDty2xB7Yqw1Yz8',
  authDomain: 'catdogtimes-f2c95.firebaseapp.com',
  databaseURL: 'https://catdogtimes-f2c95-default-rtdb.firebaseio.com',
  projectId: 'catdogtimes-f2c95',
  storageBucket: 'catdogtimes-f2c95.appspot.com',
  messagingSenderId: '460332797342',
  appId: '1:460332797342:web:45558f73537baa8211da8f',
  measurementId: 'G-EJK50CGGEZ',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
