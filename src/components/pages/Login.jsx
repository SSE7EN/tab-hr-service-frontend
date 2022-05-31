import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Login(){

    return (
        <div>
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-widescreen mt-6">
                    <div className="box has-text-centered has-background-light">
                        <div className="field">
						    <label className="label">Employee Login Form</label>
					    </div>
                        <div className="field">
                            <form>
                                <input type="text" id="flogin" placeholder="Login" className="input"/>
                                <input type="password" id="fpassword" placeholder="Password" className="input my-4"/>
                                <button className="button is-primary">Login!</button>
                            </form>
                        </div>
                        <div className="field">
                            <NavLink to="/resetpassword">I Forgot My Password</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}