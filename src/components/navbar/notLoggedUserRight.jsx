import React from 'react';
import NavLink from './navbarElements';

export default function NotLoggedUserItems() {
    return (
        <div className="navbar-brand ">
            <NavLink to="/register"> Register </NavLink>
            <NavLink to="/login"> Login </NavLink>
        </div>
    );
}
