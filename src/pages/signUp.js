import { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContent from '../context/firebase';
import { doesUsernameExists } from '../services/firebase';
import * as ROUTES from '../constants/routes';

const SignUp = () => {
	const history = useHistory();
	const { firebase } = useContext(FirebaseContent);
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [fullname, setFullname] = useState('');
	const [error, setError] = useState('');
	const isInvalid =
		password === '' ||
		emailAddress === '' ||
		username === '' ||
		fullname === '';

	// Handle login
	const handleSignup = async (event) => {
		event.preventDefault();
		const usernameExists = await doesUsernameExists(username);
		if (!usernameExists.length) {
			try {
				const createUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);
				// authentication
				await createUserResult.user.updateProfile({
					displayName: username,
				});
				// store in firestore colllection
				await firebase.firestore().collection('users').add({
					userId: createUserResult.user.uid,
					username: username.toLowerCase(),
					fullname,
					emailAddress: emailAddress.toLowerCase(),
					following: [],
					dateCreated: Date.now(),
				});
				// Redirect to dashboard
				history.push(ROUTES.DASHBOARD);
			} catch (error) {
				setFullname('');
				setEmailAddress('');
				setPassword('');
				setUsername('');
				setError(error.message);
			}
		} else {
			setError('That username is already taken, please try another');
		}
	};

	useEffect(() => {
		document.title = 'Sign Up Page';
	}, []);

	return (
		<div className="container flex mx-auto max-w-screen-md items-center h-screen">
			<div className="flex w-3/5">
				<img src="/images/iphone-with-profile.jpg" alt="iPhone with profile" />
			</div>
			<div className="flex flex-col w-2/5">
				<div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
					<h1 className="flex justify-center w-full">
						<img
							src="/images/logo.png"
							alt="Instagram"
							className="mt-2 w-6/12 mb-4"
						/>
					</h1>
					{/* Error */}
					{error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
					{/* Form */}
					<form onSubmit={handleSignup} method="POST">
						<input
							aria-label="Enter your UserName"
							type="text"
							placeholder="UserName"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => setUsername(target.value)}
							value={username}
						/>
						<input
							aria-label="Enter your Fullname"
							type="text"
							placeholder="Fullname"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => setFullname(target.value)}
							value={fullname}
						/>
						<input
							aria-label="Enter your email address"
							type="text"
							placeholder="Email Address"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => setEmailAddress(target.value)}
							value={emailAddress}
						/>
						<input
							aria-label="Enter your password"
							type="password"
							placeholder="password"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => setPassword(target.value)}
							value={password}
						/>
						<button
							disabled={isInvalid}
							type="submit"
							className={`bg-blue-medium text-white w-full rounded h-10 font-bold
              ${isInvalid && 'opacity-50'}`}
						>
							Sign Up
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
					<p className="text-sm">
						Dont't have an account ? {''}
						<Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
