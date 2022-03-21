import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC34r3ou4TkxJLeRhOwHDeloDra6YeR20w",
  authDomain: "whatsapp-2-94dcd.firebaseapp.com",
  projectId: "whatsapp-2-94dcd",
  storageBucket: "whatsapp-2-94dcd.appspot.com",
  messagingSenderId: "82386874462",
  appId: "1:82386874462:web:7c4a382861f56e840304cf"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider}