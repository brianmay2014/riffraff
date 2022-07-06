import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import HomePage from './components/auth/HomePage';
import RiffFeed from './components/RiffFeed/RiffFeed';
import NewRiffForm from './components/NewRiff/NewRiffForm'
import { authenticate } from './store/session';
import Footer from './components/Footer';
import FooterSpacer from './components/FooterSpacer'
import SingleRiff from './components/SingleRiff/SingleRiff';
import FourOhFour from './components/FourOhFour/FourOhFour';
import UserPage from './components/UserPage/UserPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/login" exact={true}>
					<LoginForm />
					<FooterSpacer />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
					<FooterSpacer />
				</Route>
				<ProtectedRoute path="/riffs" exact={true}>
					<RiffFeed />
					<FooterSpacer />
				</ProtectedRoute>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
					<FooterSpacer />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					{/* <User /> */}
					<UserPage />
					<FooterSpacer />
				</ProtectedRoute>
				<ProtectedRoute path="/riffs/new" exact={true}>
					<NewRiffForm />
					<FooterSpacer />
				</ProtectedRoute>
				{/* <ProtectedRoute path="/riffs/:riffId" exact={true}>
					<SingleRiff />
					<FooterSpacer />
				</ProtectedRoute> */}
				<Route path="/" exact={true}>
					<HomePage />
					<FooterSpacer />
				</Route>
				<Route path=''>
					<FourOhFour />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
  );
}

export default App;
