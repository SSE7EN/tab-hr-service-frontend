import React from 'react';


export default function CandidateList() {
    return (
        <div className="columns is-mobile is-multiline is-centered">
            <div className="column is-6 mt-3">
                <table className="table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered">
                <thead>
                    <tr className="is-uppercase has-background-light">
                        <td className="is-vcentered">Name</td>
                        <td className="is-vcentered">position</td>
                        <td className="is-vcentered">CV</td>
                        <td className="is-vcentered">Cover Letter</td>
                        <td className="is-vcentered">Diplomas</td>
                        <td className="is-vcentered">Certificates</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jan Kowalski</td>
                        <td>Intern</td>
                        <td>Link</td>
                        <td>Not submitted</td>
                        <td>Not submitted</td>
                        <td>Link</td>
                    </tr>
                    <tr>
                        <td>Mariusz Kowalski</td>
                        <td>Intern</td>
                        <td>Link</td>
                        <td>Not submitted</td>
                        <td>Not submitted</td>
                        <td>Not submitted</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    );

}