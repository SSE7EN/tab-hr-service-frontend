import React from 'react';
import NavLink from './navbarElements';

export default function NotLoggedUserItems() {
    return (
        <>
            <NavLink to="/register"> Register </NavLink>
            <NavLink to="/login"> Login </NavLink>
            <NavLink to="/registerCandidate"> Register Candidate</NavLink>
        </>
    );
}
