import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBBRoAMRnDgimCLFEPH-WIFhmLHDASBgE0",
  authDomain: "catch-of-the-day-wesbos-8bb3a.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-wesbos-8bb3a.firebaseio.com"
});

// .database returns the databse we just created
const base = Rebase.createClass(firebase.database())

// This is a named export
export { firebaseApp };

// this is a default export
export default base;