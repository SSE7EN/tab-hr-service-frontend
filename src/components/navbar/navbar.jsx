import React from 'react';
import NavLink from './navbarElements';
const navbar= () =>{

  return (
    <nav className="navbar has-shadow">
        <div className="navbar-brand">
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
            <div className="navbar-start">
                <NavLink to="/apllicationslist">Applications List</NavLink>
                <NavLink to="/employeeslist">Employees List</NavLink>
                <NavLink to="/apply">Apply</NavLink>
                <NavLink to="/position">Position</NavLink>
            </div>
            <div className="navbar-end">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </div>
        </div>
    </nav>
);
}
export default navbar;