import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const ProtectedRoutes = ({ user, children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (user) {
					return children;
				}

				if (!user) {
					return (
						<Redirect
							to={{
								pathname: ROUTES.LOGIN,
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

ProtectedRoutes.propType = {
	user: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
};

export default ProtectedRoutes;
