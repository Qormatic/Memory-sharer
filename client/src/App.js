import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

// wrapping everything in BrowserRouter allows us to implement our React router with Switch wrapper (Routes in v6) around the routes
// Switch wrapper (Routes in React-Router-Dom v6) means we will either show Home or Auth
// path="/posts/:id" is to show an individual post's details
// if user goes to main page we redirect them to "/posts"

const App = () => {
const user = JSON.parse(localStorage.getItem('profile'));

return(
	<BrowserRouter>
	  <Container maxWidth="xl">
	    <Navbar />
	    <Switch>
		<Route path="/" exact component={() => <Redirect to="/posts" />} />
		<Route path="/posts" exact component={Home} />
		<Route path="/posts/search" exact component={Home} />
		<Route path="/posts/:id" component={PostDetails} />
		<Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
	    </Switch>
	  </Container>
	</BrowserRouter>
	)
};

export default App;