import PropType from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import userContext from '../../context/user';

function Header({ profile, photosCount, followerCount, setFollowerCount }) {
	const {
		docId: profileDocId,
		userId: profileUserId,
		fullName,
		following = [],
		followers = [],
		username: profileUsername,
	} = profile;
	console.log(followerCount);
	const { user: loggedInUser } = useContext(userContext);
	const { user } = useUser(loggedInUser?.uid);
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);
	const activeBtnFollow = user?.username && user?.username !== profileUsername;
	//Handle Toggle Follow
	const handleToggleFollow = async () => {
		setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
		setFollowerCount({
			followerCount: isFollowingProfile
				? followers.length - 1
				: followers.length + 1,
		});
		await toggleFollow(
			isFollowingProfile,
			user.docId,
			profileDocId,
			profileUserId,
			user.userId
		);
	};

	useEffect(() => {
		const isLoggedInUserFollowingProfile = async () => {
			const isFollowing = await isUserFollowingProfile(
				user.username,
				profileUserId
			);
			setIsFollowingProfile(!!isFollowing);
		};

		if (user.username && profileUserId) {
			isLoggedInUserFollowingProfile();
		}
	}, [user.username, profileUserId]);

	return (
		<div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
			<div className="container flex justify-center items-center">
				{profileUsername && (
					<img
						className="rounded-full h-40 w-40 flex"
						alt={`${profileUsername} profile`}
						src={`/images/avatars/${profileUsername}.jpg`}
					/>
				)}
			</div>
			<div className="flex items-center justify-center flex-col col-span-2">
				<div className="container flex items-center">
					<p className="text-2xl mr-4">{profileUsername}</p>
					{activeBtnFollow && (
						<button
							className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
							type="button"
							onClick={handleToggleFollow}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									handleToggleFollow();
								}
							}}
						>
							{isFollowingProfile ? 'UnFollow' : 'Follow'}
						</button>
					)}
				</div>
				<div className="container mt-4">
					<p className="font-medium">
						{!fullName ? <Skeleton count={1} height={24} /> : fullName}
					</p>
				</div>
				<div className="container flex mt-4">
					{followers === undefined || following === undefined ? (
						<Skeleton count={1} height={24} />
					) : (
						<>
							<p className="mr-10">
								<span className="font-bold">{photosCount}</span> {` `}{' '}
								{photosCount === 1 ? 'Photo' : 'Photos'}
							</p>
							<p className="mr-10">
								<span className="font-bold">{followers.length}</span>
								{` `} {followers.length === 1 ? 'Follower' : 'Followers'}
							</p>
							<p className="mr-10">
								<span className="font-bold">{followerCount}</span>
								{` `} Following
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

Header.propType = {
	photosCount: PropType.number.isRequired,
	followerCount: PropType.number.isRequired,
	setFollowerCount: PropType.func.isRequired,
	profile: PropType.shape({
		docId: PropType.string,
		userId: PropType.string,
		fullName: PropType.string,
		following: PropType.array,
		followers: PropType.array,
		username: PropType.string,
	}).isRequired,
};

export default Header;
