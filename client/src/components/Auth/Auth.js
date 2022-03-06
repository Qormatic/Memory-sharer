import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

// we use the state showPassword below in the password input line
// handleShowPassword is an arrow function that toggles password state
// we create one variable called isSignUp - based on it being true or false we change component to Sign Up or Sign In
//...we add or delete some fields, change the label of the button
// to make isSignup switchable we need to make a new state field "const [showPassword, setShowPassword] = useState(false)"
//...now we will have access to that setIsSignup which we can use in switchmode function; works same as for handleShowPassword
// <GoogleLogin /> below is a component; most of the time if something in brackets has capital letter it's a component
const Auth = () => {
	const [formData, setForm] = useState(initialState);
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);

	
	const switchMode = () => {
		setForm(initialState);
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	  };

	// the type="submit" button means the button calls the onSubmit function which equals handleSubmit
	// we add "e.preventDefault()" to the form submit because we want to prevent page reloads which wipes the answers in the form
	// "e" means event
	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignup) {
			dispatch(signup(formData, history));
		  } else {
			dispatch(signin(formData, history));
		  }
	}

	// "?." is for optional chaining operator. It means an error won't be thrown if we don't have access to "res" object.
	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
	
		try {
		  dispatch({ type: AUTH, data: { result, token } });
	
		  history.push('/');
		} catch (error) {
		  console.log(error);
		}
	  };
	
	  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

	// setForm below will update each specific input name in the initialState (e.g: "firstName") and update with what has been
	//...input with the value in the form for that name
	// this line means we dont have to hardcode map all the different names line by line, this dynamically does it for us
	const handleChange = (e) => setForm({ ...formData, [e.target.name]: e.target.value });

	// "{ isSignup && ()}" means only if it is signup then do whats in the brackets ()
	// "autoFocus" is the first element we will focus on
	// when you have a lot of components very similar as below with inputs it's good practise 
	//...to have a separate custom componenet to generalise the logic so you don't have to
	//...write out everything for each one so we create the Input.js file for this
	//...Each textfield below would need wrapping in a grid, each with common properties like "variant", "fullWidth"
	// "half" below gets sent to "Input" as a prop
	return (
	<Container component="main" maxWidth="xs">
		<Paper className={classes.paper} elevation={3}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography variant="h5">{isSignup ? 'Sign In' : 'Sign In'}</Typography>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					{ isSignup && (
					<>
						<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
						<Input name="lastName" label="Last Name" handleChange={handleChange} half />
            		</>
            		)}
            			<Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            			<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            			{ isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
				</Grid>
				<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            		{ isSignup ? 'Sign Up' : 'Sign In' }
          		</Button>
				<GoogleLogin 
					clientId="620217797205-0nukfvc1e2p20oeb634m456epvpsserb.apps.googleusercontent.com"
					render={(renderProps) => (
					<Button 
					className={classes.googleButton} 
					color="primary" 
					fullWidth 
					onClick={renderProps.onClick} 
					disabled={renderProps.disabled} 
					startIcon={<Icon />} 
					variant="contained">
					Google Sign In
				  </Button>
					)}
					onSuccess={googleSuccess}
					onFailure={googleError}
					cookiePolicy="single_host_origin"
				/>
				<Grid container justify="flex-end">
            		  <Grid item>
              			<Button onClick={switchMode}>
                		{ isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              			</Button>
            		  </Grid>
                </Grid>
			</form>
		</Paper>
	</Container>
	)
}

export default Auth
