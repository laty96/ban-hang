import firebase from "firebase";
export const f = firebase.firestore;
// export const storageRef = firebase.storage().ref();
var config = {
	apiKey: "AIzaSyA8bHknVwSCSa6rQrOTVA9E_tC08hQqn_Y",
    authDomain: "test-93c66.firebaseapp.com",
    databaseURL: "https://test-93c66.firebaseio.com",
    projectId: "test-93c66",
    storageBucket: "test-93c66.appspot.com",
    messagingSenderId: "615923476965"
};
const firebaseApp = firebase.initializeApp(config);
const settings = { /* your settings... */ timestampsInSnapshots: true };
f().settings(settings);
export default firebaseApp.firestore();
