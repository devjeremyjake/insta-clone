import { useState, useEffect, useContext } from 'react';
import userContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';

export default function Usephotos() {
	const [photos, setPhotos] = useState(null);
	const {
		user: { uid: userId = '' },
	} = useContext(userContext);

	useEffect(() => {
		async function getTimelinePhotos() {
			const [{ following }] = await getUserByUserId(userId);
			let folllowedUserPhotos = [];

			//does the user actually follow people ?
			if (following.length > 0) {
				folllowedUserPhotos = await getPhotos(userId, following);

				// Rearrange array to display photos b date created
				folllowedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
				setPhotos(folllowedUserPhotos);
			}
		}
		getTimelinePhotos();
	}, [userId]);

	return { photos };
}
