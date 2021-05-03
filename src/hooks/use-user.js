import { useState, useEffect, useContext } from 'react';
import userContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
	const [activeUser, setActiveuser] = useState({});
	const { user } = useContext(userContext);

	useEffect(() => {
		async function getuserObjByUserId() {
			const [response] = await getUserByUserId(user.uid);
			setActiveuser(response);
		}
		if (user?.uid) {
			getuserObjByUserId();
		}
	}, [user]);

	return { user: activeUser };
}
