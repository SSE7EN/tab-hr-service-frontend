import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuthHeader, getAdminHeader } from '../../storedData';
import { useNavigate } from 'react-router';
import API_URL from '../../config'
import Axios from "axios";
import * as qs from 'qs'

export default function LoginAsAdmin(){
    const [usernameReg, setusernameReg] = useState("test");
	const [passwordReg, setPasswordReg] = useState("test_password");

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const handleLogin = (e) => {
		setusernameReg(e.target.value);
        console.log(usernameReg)
	};

	const handlePassword = (e) => {
		setPasswordReg(e.target.value);
	};

	const handleError = (error) => {
        console.log(error);
        if(error.status === 401) {
            navigate("/", { replace: true });
        } else {
        	setError({'message': {'type':'error', 'text':error.message}});
        }
    };

    Axios.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
      })

	const handleSubmit = (e) => {
        
		e.preventDefault();
		console.log(usernameReg, passwordReg);

		if (usernameReg == '' || passwordReg == '') {
			console.log("Fill all inputs");
		} else {
        Axios.post(API_URL + "/oauth/token", qs.stringify({
            username: usernameReg,
            password: passwordReg,
            grant_type: "password",
        }),{
            //headers: getAuthHeader()
            headers: getAdminHeader()
        })
            .then((response) => {
                console.log(response)
            })
            .catch(handleError)
            

        }
    }

    return (
        <div>
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-widescreen mt-6">
                    <div className="box has-text-centered has-background-light">
                        <div className="field">
						    <label className="label">Login as Admin</label>
					    </div>
                        <div className="field">
                            <form onSubmit={handleSubmit}>
                                <input type="text" id="flogin" placeholder="Login" className="input" onChange={handleLogin} value="test"/>
                                <input type="password" id="fpassword" placeholder="Password" className="input my-4" onChange={handlePassword} value="test_password"/>
                                <button className="button is-primary">Login!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}