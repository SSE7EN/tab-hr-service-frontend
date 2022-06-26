import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
import { getAuthHeader, getCurrentUserId } from '../../storedData';

export default function ApllicationsList() {
    const [state, setState] = useState({applications: [], searchInput: '', editedProductId: 0});
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
        Axios(API_URL + '/applications', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            console.log(response);
            setState({applications:response.data.content, searchInput: state.searchInput, editedProductId: state.editedProductId});
        })
        .catch(handleError);
        
    }, []);

    return (
        <div className="columns is-mobile is-multiline is-centered">
            <div className="column is-6 mt-3">
                {<Table appicationList={state.applications}/>}
            </div>
        </div>
    );

}

function RequiredLanguage(languagearray){
    let languages = "";
    var i =0;
    for (i=0; i< languagearray.languagearray.length; i++){
        if (languagearray.languagearray[i] == "JAVA"){
            languages += ", Java";
        }
        if (languagearray.languagearray[i].toString() == "PYTHON"){
            languages += ", Python";
        }
        if (languagearray.languagearray[i] == "C_SHARP"){
            languages += ", C#";
        }
        if (languagearray.languagearray[i] == "C_PLUS_PLUS"){
            languages += ", C++";
        }
    }
    languages = languages.slice(2);
    return languages
}

function Table({appicationList}) {
    const navigate = useNavigate();
    return (
        <table className="table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered" >
            <thead>
                <tr className="is-uppercase has-background-light">
                    <th  className="is-vcentered">ID</th>
                    <th  className="is-vcentered">description</th>
                    <th  className="is-vcentered">position name</th>
                    <th  className="is-vcentered">position description</th>
                    <th  className="is-vcentered">position languagues</th>
                    <th  className="is-vcentered">Actions</th>
                </tr>
            </thead>
            <tbody>
                {appicationList.map((list,index) =>{ 
                    return(
                        <tr key={index}>
                            <td  className="is-vcentered">{list.id}</td>
                            <td  className="is-vcentered">{list.description}</td>
                            <td  className="is-vcentered">{list.position.name}</td>
                            <td  className="is-vcentered">{list.position.description}</td>
                            <td  className="is-vcentered">{(<RequiredLanguage languagearray={list.position.programmingLanguages}/>)}</td>
                            <td  className="is-vcentered">
                                <button className="button is-small is-rounded is-info"
                                onClick={() => {navigate("/Application/" + list.id); }}>
                                    <span className="icon is-small">
                                        <i className="fas fa-info"/>
                                    </span>
                                    <span>Show Details</span>
                                </button>

                            </td>
                        </tr>
                    )
                    })}
            </tbody>
        </table>
    );
}

