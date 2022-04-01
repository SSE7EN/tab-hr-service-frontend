import React from 'react';
import NavLink from './navbarElements';
const navbar= () =>{

  return (
    <nav className="navbar has-shadow">
        <div className="navbar-brand">
            <NavLink to="/">
                <div className="is-size-5" title="Roksana's index page">
                    <span className="icon mr-2 is-size-3"><i className="fas fa-tree" /></span>
                    Home
                </div>
            </NavLink>
            <NavLink to="/firstpage">1</NavLink>
            <NavLink to="/secondpage">2</NavLink>
        </div>
        {/* <div className="navbar-menu">
            <div className="navbar-start">
                <NavLink to="/firstpage">1</NavLink>
              <NavLink to="/secondpage">2</NavLink>
            </div>
        </div> */}
    </nav>
);
}
export default navbar;