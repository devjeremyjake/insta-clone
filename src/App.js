import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as Routes from './constants/routes';
import UserAuthListener from './hooks/user-auth-listener';
import userContext from './context/user';

import ProtectedRoutes from './helpers/protected-routes';
import IsUserLoggedIn from './helpers/loggedInUser';
import Loader from './components/loadingBar';
import Header from './components/Header';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signUp'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
	const { user } = UserAuthListener();
	return (
		<userContext.Provider value={{ user }}>
			<Router>
				<Header />
				<Suspense fallback={<Loader />}>
					<Switch>
						<ProtectedRoutes user={user} path={Routes.DASHBOARD} exact>
							<Dashboard />
						</ProtectedRoutes>
						<IsUserLoggedIn
							path={Routes.LOGIN}
							loggedInPath={Routes.DASHBOARD}
							user={user}
						>
							<Login />
						</IsUserLoggedIn>
						<IsUserLoggedIn
							path={Routes.SIGN_UP}
							loggedInPath={Routes.DASHBOARD}
							user={user}
						>
							<SignUp />
						</IsUserLoggedIn>
						<Route path={Routes.PROFILE} component={Profile} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</userContext.Provider>
	);
}

export default App;
