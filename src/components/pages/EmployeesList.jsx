import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
import {getAuthHeader} from '../../storedData';

export default function EmployeesList() {
    const [state, setState] = useState({employee: [], searchInput: '', editedProductId: 0});
    const navigate = useNavigate();

    const [isError, setIsError] = useState(false);

	const [error, setError] = useState({});

    const handleError = (error) => {
        console.log(error);
        if(error.status === 401) {
            navigate("/", { replace: true });
        } else {
        	setError({'message': {'type':'error', 'text':error.message}});
			setIsError(true);
        }
    };

    useEffect(() => {
        Axios.get(API_URL + '/users?sort=id', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            console.log(response.data.content)
            setState({employee:response.data.content, searchInput: state.searchInput, editedProductId: state.editedProductId});
        })
        .catch(handleError);
    }, []);

    const displayTime = (time) =>{
        if (time != null){
            return time.substring(0,10) + " " + time.substring(11,16);
        }
    }

    const Table = ({employee})=>  {
        return (
            <table className="table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered" >
                <thead>
                    <tr className="is-uppercase has-background-light">
                        <th  className="is-vcentered">ID</th>
                        <th  className="is-vcentered">Name</th>
                        <th  className="is-vcentered">Created</th>
                        <th  className="is-vcentered">Role</th>
                        {/*<th  className="is-vcentered">Actions</th>*/}
                    </tr>
                </thead>
                <tbody>
                    {employee.map((list,index) =>{ 
                        return(
                            <tr key={index}>
                                <td  className="is-vcentered">{list.id}</td>
                                <td  className="is-vcentered">{list.firstName + " " + list.lastName}</td>
                                <td  className="is-vcentered">{displayTime(list.createdOn)}</td>
                                <td  className="is-vcentered">{list.role}</td>
                                {/*<td  className="is-vcentered">
                                    <button className="button is-rounded is-small is-danger">
                                        <span className="icon is-small">
                                            <i className="fas fa-trash"/>
                                        </span>
                                        <span>Block</span>
                                    </button>

                                </td>*/}
                            </tr>
                        )
                        })}
                </tbody>
            </table>
        );
    }

    return (
        <div className="columns is-mobile is-multiline is-centered">
            <div className="column is-6 mt-3">
                {<Table employee={state.employee}/>}
            </div>
        </div>
    )



}