import { useState } from 'react';
import propType from 'prop-types';
import { Link } from 'react-router-dom';
import {
	updateLoggedInuserFollowing,
	updateSuggestedUserProfile,
} from '../services/firebase';

const SuggestedProfile = ({
	suggestProfDocId,
	username,
	profileId,
	userId,
	loggedInUserDocId,
}) => {
	const [followed, setFollowed] = useState(false);

	// Handle follow Action Function
	async function handleFollowUser() {
		setFollowed(true);
		// Update the logged in user Profile
		await updateLoggedInuserFollowing(loggedInUserDocId, profileId, false);
		// Update the Profile of the user in Suggestion
		await updateSuggestedUserProfile(suggestProfDocId, userId, false);
	}

	return !followed ? (
		<div className="flex flex-row items-center align-items justify-between">
			<div className="flex items-center justify-between">
				<img
					src={`/images/avatars/${username}.jpg`}
					alt="profile"
					className="rounded-full w-8 flex mr-3"
				/>
				<Link to={`/p/${username}`}>
					<p className="font-bold text-sm">{username}</p>
				</Link>
			</div>
			<button
				className="text-xs font-bold text-blue-medium"
				type="button"
				onClick={handleFollowUser}
			>
				Follow
			</button>
		</div>
	) : null;
};

export default SuggestedProfile;

SuggestedProfile.propTypes = {
	suggestProfDocId: propType.string.isRequired,
	username: propType.string.isRequired,
	profileId: propType.string.isRequired,
	userId: propType.string.isRequired,
	loggedInUserDocId: propType.string.isRequired,
};
