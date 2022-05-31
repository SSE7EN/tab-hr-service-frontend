import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Application() {
	const [emailCan, setEailCan] = useState('');
	const [firstNameCan, setFirstNameCan] = useState('');
	const [lastNameCan, setLastNameCan] = useState('');
    const [appliedPosition, setAppliedPosition] = useState('');
    const [fles, setFiles] = useState('');

	const [registered, setRegistered] = useState(false);

	const handleEmail = (e) => {
		setEailCan(e.target.value);
	};

	const handleFirstName = (e) => {
		setFirstNameCan(e.target.value);
	};

	const handleLastName = (e) => {
		setLastNameCan(e.target.value);
	};

    const handleAppliedPosition = (e) => {
        setAppliedPosition(e.target.value);
    };

    const handleImages = (e) => {
        if(e.target.files.length == 0) {
            console.log("no files added");
        }
        else {
            console.log(e.target.files.length);
            for(var i = 0; i < e.target.files.length; i++) {
                console.log(e.target.files[i].name);
            }
        }
    };

	const successfullRegister = () => {
		return (
			<div className="notification is-success">
				<label className="label">User Registered Succesfully</label>
			</div>
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(emailCan, firstNameCan, lastNameCan, appliedPosition);
		if (emailCan === '' || firstNameCan === '' || lastNameCan === '' || appliedPosition === '') {
			console.log("Fill all inputs");
		} else {
			
		}
	};

	return (
		<div className="columns is-centered">
			<div className="column is-half-tablet is-one-third-widescreen mt-6">
				<div className="box has-text-centered has-background-light">
					<div>
						<label className="label">Canditate Application Form</label>
					</div>
					<div className="field">
						{registered && successfullRegister()}
					</div>
					<form onSubmit={handleSubmit}>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleEmail} value={emailCan} type="email" placeholder="E-mail" />
								<span className="icon is-small is-left">
									<i className="fas fa-envelope" />
								</span>
							</p>
						</div>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleFirstName} value={firstNameCan} type="text" placeholder="First Name" />
								<span className="icon is-small is-left">
									<i className="fas fa-id-card-alt" />
								</span>
							</p>
						</div>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleLastName} value={lastNameCan} type="text" placeholder="Last Name" />
								<span className="icon is-small is-left">
									<i className="fas fa-id-card-alt" />
								</span>
							</p>
						</div>
                        <div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleAppliedPosition} value={appliedPosition} type="text" placeholder="Applied Position" />
								<span className="icon is-small is-left">
									<i className="fas fa-id-card-alt" />
								</span>
							</p>
						</div>
                        <div className="field is-grouped is-grouped-centered mt-4">
                                <div className="file is-boxed">
                                    <label className="file-label">
                                        <input className="file-input" onChange={handleImages} type="file" multiple/>
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload" />
                                            </span>
                                            <span className="file-label">
                                                Upload Files
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
						<button className="button is-primary">Apply</button>
					</form>
				</div>
			</div>
		</div>
	);


}