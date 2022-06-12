import React from 'react';
import NavLink from './navbarElements';

export default function LoggedUserItems() {
    return (
        <>
            <NavLink to="/apllicationslist">Applications List</NavLink>
            <NavLink to="/employeeslist">Employees List</NavLink>
            <NavLink to="/logout">Logout</NavLink>
        </>
    );
}
