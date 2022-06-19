import React, {useState, useEffect} from 'react';
import NavLink from './navbarElements';
import Axios from 'axios';
import API_URL from '../../config'
import { getAuthHeader, getAdminHeader } from '../../storedData';
import LoggedUserDropdown from './loggedUserDropdown';
import NotLoggedUserRight from './notLoggedUserRight';
import pubsub from '../../pubsub';

export default function Navbar(){
    const [state, setState] = useState({ user: undefined });

    const getUser = () => {
        Axios.get(API_URL+'/users/current', {
            headers: getAuthHeader()
        })
        .then(function(response) {
            setState({user: response.data});
            if(response.data) {
                saveUserInfo(response.data);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    };

    useEffect(() => {
        getUser();
        pubsub.subscribe('login_change', (data, topic) => {
            if(data === true) {
                getUser();
            } else {
                setState({user:undefined});
            }
        });
    }, []);

    return (
    <nav className="navbar has-background-primary-light">
        <div className="navbar-brand ">
            <NavLink to="/">
                <div className="is-size-5" title="Index page">
                    <span className="icon-text">
                    <span className="icon">
                        <i className="fas fa-home"></i>
                    </span>
                    <span>Home</span>
                    </span>
                </div>
            </NavLink>
        </div>
        <div className="navbar-menu">
            <div className="navbar-end">
                { state.user !== undefined && <LoggedUserDropdown user={state.user}/> }
                { state.user === undefined && <NotLoggedUserRight /> }
            </div>
        </div>
    </nav>
    );
}

function saveUserInfo(user) {
    localStorage.setItem('currentUserId', '' + user.id);
    localStorage.setItem('currentUserRole', user.role);
}