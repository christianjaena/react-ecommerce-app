import React, { Component } from 'react';
import { auth, createUserProfileDocument } from '../../firebase/FirebaseUtils';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';
import TitleHeader from '../TitleHeader/TitleHeader';

import {SignUpContainer} from './SignUp.styled'
export class SignUp extends Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			createUserProfileDocument(user, { displayName });
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<SignUpContainer>
				<TitleHeader
					title='I do not have an account'
					subtitle='Sign up with your email and password'
				/>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput
						type='text'
						name='displayName'
						value={displayName}
						onChange={this.handleChange}
						label='Display name'
						required
					/>
					<FormInput
						type='email'
						name='email'
						value={email}
						onChange={this.handleChange}
						label='Email'
						required
					/>
					<FormInput
						type='password'
						name='password'
						value={password}
						onChange={this.handleChange}
						label='Password'
						required
					/>
					<FormInput
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={this.handleChange}
						label='Confirm Password'
						required
					/>
					<CustomButton type='submit'>SIGN UP</CustomButton>
				</form>
			</SignUpContainer>
		);
	}
}

export default SignUp;
