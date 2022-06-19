import React from 'react';
import NavLink from './navbarElements';

export default function LoggedUserDropdown({ user }) {
    return (
        <>
            <div className="navbar-item has-dropdown is-hoverable ">
                <div className="navbar-link has-background-primary-light">
                    {user.firstName || "Grzegorz"} {user.lastName || "Brzęczyszczykiewicz"}
                </div>
                <div className="navbar-dropdown is-boxed has-background-primary-light">
                    <div className="navbar-item is-size-7 my-0 py-0">
                        Your ID is <strong className="ml-1">{user.id}</strong>
                    </div>
                    <div className="navbar-item is-size-7 my-0 py-0">
                        Your E-mail is <strong className="ml-1">{user.email || "missing"}</strong>
                    </div>
                    <hr className="navbar-divider has-background-dark mt-1 mb-0"/>
                    <NavLink to="/apllicationslist">Applications List</NavLink>
                    <NavLink to="/employeeslist">Employees List</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </div>
            </div>
        </>
    );
}
