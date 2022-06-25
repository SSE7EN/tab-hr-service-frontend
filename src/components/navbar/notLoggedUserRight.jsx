import React from 'react';
import NavLink from './navbarElements';

export default function NotLoggedUserRight() {
    return (
        <div className="navbar-brand ">
            <NavLink to="/register_candidate"> Register </NavLink>
            <NavLink to="/login"> Login </NavLink>
        </div>
    );
}
