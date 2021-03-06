import React from 'react';
import NavLink from './navbarElements';

export default function LoggedUserDropdown({ user }) {
    return (
        <div className="navbar-brand" >
            <div className="navbar-item has-dropdown is-hoverable " >
                <div className="navbar-link has-background-primary-light">
                    {user.firstName || "null"} {user.lastName || "null"}
                </div>
                <div className="navbar-dropdown is-boxed has-background-primary-light ">
                    <div className="navbar-item is-size-7 my-0 py-0">
                        Your ID is <strong className="ml-1">{user.id}</strong>
                    </div>
                    <div className="navbar-item is-size-7 my-0 py-0">
                        Your E-mail is <strong className="ml-1">{user.email || "missing"}</strong>
                    </div>
                    <hr className="navbar-divider has-background-dark mt-1 mb-0"/>
                    <NavLink to="/meetings">Meetings</NavLink>
                    <NavLink to="/userapplications">Your Applications</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </div>
            </div>
        </div>
    );
}
