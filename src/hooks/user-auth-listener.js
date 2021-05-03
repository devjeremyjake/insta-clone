import { useState, useEffect, useContext } from 'react';
import FirebaseContent from '../context/firebase';

export default function UserAuthListener() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('authUser'))
	);
	const { firebase } = useContext(FirebaseContent);

	useEffect(() => {
		const listener = firebase.auth().onAuthStateChanged((authUser) => {
			// Store user in localstorage
			if (authUser) {
				localStorage.setItem('authUser', JSON.stringify(authUser));
				setUser(authUser);
			} else {
				localStorage.removeItem('authUser');
				setUser(null);
			}
		});
		return () => listener();
	}, [firebase]);

	return { user };
}
