import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
    return (
        <Link to={props.to} className="navbar-item">
            {props.children}
        </Link>
    );
}
export default NavLink;
