import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuthHeader } from '../../storedData';
import { useNavigate } from 'react-router';
import API_URL from '../../config'
import Axios from "axios";

export default function ResetPassword(){

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const [error, setError] = useState({});
    
    const navigate = useNavigate();

    const handleOldPassword = (e) => {
		setOldPassword(e.target.value);
	};

	const handleNewPassword = (e) => {
		setNewPassword(e.target.value);
	};

    

    const handleError = (error) => {
        console.log(error);
        if(error.status === 401) {
            navigate("/", { replace: true });
        } else {
        	setError({'message': {'type':'error', 'text':error.message}});
			setIsError(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
		console.log(oldPassword, newPassword);
		if (oldPassword == '' || newPassword == '') {
			console.log("Fill all inputs");
		} else if(oldPassword == newPassword) {
            console.log("New password cannot be the same as old one");
        }
        else {
		Axios.patch(API_URL + "/users/current/password", {
				headers: getAuthHeader(),
				oldPassword: oldPassword,
				newPassword: newPassword,
			})
				.then((response) => {
					console.log(response)
					setIsSubmitted(true);
				})
				.catch(handleError)
        }
    };

    const successfullPasswordChange = () => {
		return (
			<div className="notification is-success">
				<label className="label">Password Changed Succesfully</label>
			</div>
		);
	};

	const failedPasswordChange = () => {
		return (
			<div className="notification is-danger">
				<label className="label">Something Went Wrong</label>
			</div>
		);
	};

    return (
		<div className="columns is-centered">
			<div className="column is-half-tablet is-one-third-widescreen mt-6">
				<div className="box has-text-centered has-background-light">
					<div className="field">
						<label className="label">Change Password Form</label>
					</div>
                    <div className="field">
                        {isSubmitted && successfullPasswordChange()}
						{isError && failedPasswordChange()}
                    </div>
					<form onSubmit={handleSubmit}>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleOldPassword} value={oldPassword} type="password" placeholder="E-mail" />
								<span className="icon is-small is-left">
									<i className="fas fa-lock" />
								</span>
							</p>
						</div>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleNewPassword} value={newPassword} type="password" placeholder="Password" />
								<span className="icon is-small is-left">
									<i className="fas fa-lock" />
								</span>
							</p>
						</div>
						<button className="button is-primary">Change Password</button>
					</form>
				</div>
			</div>
		</div>
	);
}