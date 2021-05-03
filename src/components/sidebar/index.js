import useUser from '../../hooks/use-user';
import User from './User';
import Suggestions from './Suggestions';

function Sidebar() {
	const {
		user: { fullname, username, userId, following, docId },
	} = useUser();

	return (
		<div className="p-4">
			<User username={username} fullname={fullname} />
			<Suggestions userId={userId} following={following} userDocId={docId} />
		</div>
	);
}

export default Sidebar;
