import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
import pubsub from '../../pubsub';

const handleError = (error) => {
    console.log(error);
};

function saveToken(token){
    localStorage.setItem('myToken', token);
}

export default function Login(){
    const navigate = useNavigate();

    const getToken = (e) => {
        e.preventDefault();
        var login = document.getElementById("flogin");
        var password = document.getElementById("fpassword");
        Axios(API_URL +'/oauth/token', {
            method: 'post',
            headers: {'Authorization': 'Basic aW9wcm9qZWN0LWNsaWVudDppb3Byb2plY3Qtc2VjcmV0'},
            params: {
                grant_type: 'password',
                username: login.value,
                password: password.value
            },
        })
        .then((response) => {
            console.log(response);
            var responseToken = 'Bearer ' + response.data.access_token;
            saveToken(responseToken)
            pubsub.publish('login_change', true);
            navigate("/", { replace: true });
        })
        .catch(handleError)
    }

    return (
        <div>
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-widescreen mt-6">
                    <div className="box has-text-centered has-background-light">
                        <form onSubmit={getToken}>
                            <input type="text" id="flogin" placeholder="Login" className="input"/>
                            <input type="password" id="fpassword" placeholder="Password" className="input my-4"/>
                            <button className="button is-primary">Login!</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}