import { useReducer, useEffect } from 'react';
import PropType from 'prop-types';
import Header from './header';
import {
	getUserByUsername,
	getUserPhotosByUsername,
} from '../../services/firebase';
import Photos from './Photos';

function UserProfile({ username }) {
	const reducer = (state, newState) => ({ ...state, ...newState });
	const initialState = {
		profile: {},
		photosCollection: [],
		followerCount: 0,
	};
	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function getProfileInfoAndPhoto() {
			const [user] = await getUserByUsername(username);
			const photos = await getUserPhotosByUsername(username);
			dispatch({
				profile: user,
				photosCollection: photos,
				followerCount: user.following.length,
			});
		}

		if (username) {
			getProfileInfoAndPhoto();
		}
	}, [username]);

	return (
		<>
			<Header
				profile={profile}
				photosCount={photosCollection ? photosCollection.length : 0}
				followerCount={followerCount}
				setFollowerCount={dispatch}
			/>
			<Photos photos={photosCollection} />
		</>
	);
}

UserProfile.propType = {
	username: PropType.string.isRequired,
};

export default UserProfile;
