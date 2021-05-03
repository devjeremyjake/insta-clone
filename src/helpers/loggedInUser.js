import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const IsUserLoggedIn = ({ user, loggedInPath, children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (!user) {
					return children;
				}

				if (user) {
					return (
						<Redirect
							to={{
								pathname: loggedInPath,
								state: { from: location },
							}}
						/>
					);
				}
				return null;
			}}
		/>
	);
};

IsUserLoggedIn.propType = {
	user: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	loggedInPath: PropTypes.string.isRequired,
};

export default IsUserLoggedIn;
