import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import UserProfile from '../components/profile';
import * as Routes from '../constants/routes';

function Profile() {
	const history = useHistory();
	const { username } = useParams();
	const [userExist, setUserExist] = useState(false);
	const [userProfile, setUserProfile] = useState(null);

	useEffect(() => {
		async function checkUserExists() {
			const user = await getUserByUsername(username);
			if (user.length > 0) {
				setUserExist(true);
			}

			if (user.length <= 0) {
				setUserExist(false);
				history.push(Routes.NOT_FOUND);
			}
		}

		checkUserExists();
	}, [username, history]);

	return userExist ? (
		<div className="bg-gray-background">
			<div className="mx-auto max-w-screen-lg">
				<UserProfile username={username} />
			</div>
		</div>
	) : null;
}

export default Profile;
