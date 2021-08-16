import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAs-pdCTGeVO4dC6ZNLElh-I3u5poccgiI",
  authDomain: "guestreview-924e6.firebaseapp.com",
  projectId: "guestreview-924e6",
  storageBucket: "guestreview-924e6.appspot.com",
  messagingSenderId: "635452635332",
  appId: "1:635452635332:web:230b8a6ce8e4fd232db191",
  measurementId: "G-CK3P2Z16J8"
};

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore()
export const auth = firebase.auth()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { TimeStamp, GeoPoint } = firebase.firestore;
// export { TimeStamp, GeoPoint };
export const Timestamp = firebase.firestore.Timestamp
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
export const arrayAdd = firebase.firestore.FieldValue
