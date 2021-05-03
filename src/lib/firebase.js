import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyAhM1VR_HDCn2qNPg0i9FDSU1i1QAyI3ns',
	authDomain: 'insta-clone-43b1e.firebaseapp.com',
	projectId: 'insta-clone-43b1e',
	storageBucket: 'insta-clone-43b1e.appspot.com',
	messagingSenderId: '108585143008',
	appId: '1:108585143008:web:f3608b0c17fb512a4fde85',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
