import React from 'react';

export default function EmployeesList() {
    return (
        <div className="columns is-mobile is-multiline is-centered">
            <div className="column is-8 mt-2">
                <table className="table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered">
                <thead>
                    <tr className="is-uppercase has-background-light">
                        <th className="is-vcentered">Name</th>
                        <th className="is-vcentered">position</th>
                        <th className="is-vcentered">E-mail</th>
                        <th className="is-vcentered" colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Grzegorz Brzęczyszczykiewicz</td>
                        <td>Admin</td>
                        <td>gbrzeczyszczykiewicz420@gmail.com</td>
                        <td>
                            
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>Jan Nowak</td>
                        <td>Recruiter</td>
                        <td>jnowak365@gmail.com</td>
                        <td>
                            <button className="button is-small is-info">Change Role</button>
                        </td>
                        <td>
                            <button className="button is-small is-danger">Block</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Kamil Nowak</td>
                        <td>Manager</td>
                        <td>knowak777@gmail.com</td>
                        <td>
                            <button className="button is-small is-info">Change Role</button>
                        </td>
                        <td>
                            <button className="button is-small is-danger">Block</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Mateusz Nowak</td>
                        <td>
                            <div className="has-text-danger">BLOCKED</div>
                        </td>
                        <td>mnowak777@gmail.com</td>
                        <td>
                            
                        </td>
                        <td>
                            <button className="button is-small is-success">Unblock</button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    );

}