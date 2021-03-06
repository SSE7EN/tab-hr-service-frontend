import React, { useState, useEffect } from 'react';
import { getAuthHeader } from '../../storedData';
import { useNavigate } from 'react-router';
import API_URL from '../../config'
import Axios from "axios";
import {isAdmin} from '../../storedData';

export default function RegisterUser() {
	const [emailReg, setEailReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');
	const [firstNameReg, setFirstNameReg] = useState('');
	const [lastNameReg, setLastNameReg] = useState('');

	const [registered, setRegistered] = useState(false);
	const [isError, setIsError] = useState(false);

	const [error, setError] = useState({});

	const navigate = useNavigate();

	const handleEmail = (e) => {
		setEailReg(e.target.value);
	};

	const handlePassword = (e) => {
		setPasswordReg(e.target.value);
	};

	const handleFirstName = (e) => {
		setFirstNameReg(e.target.value);
	};

	const handleLastName = (e) => {
		setLastNameReg(e.target.value);
	};

	useEffect(() => {
        if (!isAdmin()){
            navigate("/", { replace: true });   //redirect not logged in
        }
    }, []);

	const handleError = (error) => {
        console.log(error);
        if(error.status === 401) {
            navigate("/", { replace: true });
        } else {
        	setError({'message': {'type':'error', 'text':error.message}});
			setIsError(true);
			setRegistered(false);
        }
    };

	const successfullRegister = () => {
		return (
			<div className="notification is-success">
				<label className="label">User Registered Succesfully</label>
			</div>
		);
	};

	const failedRegister = () => {
		return (
			<div className="notification is-danger">
				<label className="label">Error Occured During Registration</label>
			</div>
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(emailReg, passwordReg, firstNameReg, lastNameReg);
		if (emailReg == '' || passwordReg == '' || firstNameReg == '' || lastNameReg == '') {
			console.log("Fill all inputs");
		} else {
		Axios(API_URL + "/users/admins", {
				headers: getAuthHeader(),
				method: "post",
				data: 
				{
					email: emailReg,
					password: passwordReg,
					firstName: firstNameReg,
					lastName: lastNameReg,
				}
			})
				.then((response) => {
					console.log(response)
					setRegistered(true);
					setIsError(false);
				})
				.catch(handleError)
		}
	};

	return (
		<div className="columns is-centered">
			<div className="column is-half-tablet is-one-third-widescreen mt-6">
				<div className="box has-text-centered has-background-light">
					<div className="field">
						<label className="label">Employee Registration Form</label>
					</div>
					<div className="field">
						{registered && successfullRegister()}
						{isError && failedRegister()}
					</div>
					<form onSubmit={handleSubmit}>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleEmail} value={emailReg} type="email" placeholder="E-mail" />
								<span className="icon is-small is-left">
									<i className="fas fa-envelope" />
								</span>
							</p>
						</div>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handlePassword} value={passwordReg} type="password" placeholder="Password" />
								<span className="icon is-small is-left">
									<i className="fas fa-lock" />
								</span>
							</p>
						</div>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleFirstName} value={firstNameReg} type="text" placeholder="First Name" />
								<span className="icon is-small is-left">
									<i className="fas fa-id-card-alt" />
								</span>
							</p>
						</div>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleLastName} value={lastNameReg} type="text" placeholder="Last Name" />
								<span className="icon is-small is-left">
									<i className="fas fa-id-card-alt" />
								</span>
							</p>
						</div>
						<button className="button is-primary is-rounded">Sign Up</button>
					</form>
				</div>
			</div>
		</div>
	);


}