import useUser from '../../hooks/use-user';
import User from './User';
import Suggestions from './Suggestions';

function Sidebar() {
	const {
		user: { fullName, username, userId, following, docId },
	} = useUser();
	console.log(fullName);

	return (
		<div className="p-4">
			<User username={username} fullname={fullName} />
			<Suggestions userId={userId} following={following} userDocId={docId} />
		</div>
	);
}

export default Sidebar;
