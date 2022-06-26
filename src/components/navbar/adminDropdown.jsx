import React from 'react';
import NavLink from './navbarElements';

export default function adminDropdown({ user }) {
    return (
        <div className="navbar-brand">
            <div className="navbar-item has-dropdown is-hoverable ">
                <div className="navbar-link has-background-primary-light px-8">
                <span className="icon is-small is-left mx-3">
                    <i className="fas fa-user" />
                </span>
                <span>
                    {user.firstName || "null"} {user.lastName || "null"}
                </span>
                </div>
                <div className="navbar-dropdown is-boxed has-background-primary-light">
                    <div className="navbar-item is-size-7 my-0 py-0">
                        Your ID is <strong className="ml-1">{user.id}</strong>
                    </div>
                    <div className="navbar-item is-size-7 my-0 py-0">
                        Your E-mail is <strong className="ml-1">{user.email || "missing"}</strong>
                    </div>
                    <hr className="navbar-divider has-background-dark mt-1 mb-0"/>
                    <NavLink to="/register_user"> Register User</NavLink>
                    <NavLink to="/apllicationslist">Applications List</NavLink>
                    <NavLink to="/employeeslist">Users List</NavLink>
                    <NavLink to="/positionlist">Positions List</NavLink>
                    <NavLink to="/position">Create Position</NavLink>
                    <NavLink to="/meetings">Meetings List</NavLink>
                    <NavLink to="/report">Report</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </div>
            </div>
        </div>
    );
}
