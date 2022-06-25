import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
import { getAuthHeader, getCurrentUserId } from '../../storedData';

export default function PositionsList() {
    const [state, setState] = useState({positionsExist: false, positions: [], searchInput: '', editedProductId: 0});
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
        Axios.get(API_URL + '/positions', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            console.log(response.data.content)
            setState({positionsExist: true, positions:response.data.content, searchInput: state.searchInput, editedProductId: state.editedProductId});
        })
        .catch(handleError);
    }, []);

    return (
        <div className="columns is-mobile is-multiline is-centered">
            <div className="column is-7 has-background-light mt-5">
                <div className="box has-text-centered has-background-light">
                    <div className="columns is-centered is-multiline ">
                        <div className="column is-6 ">
                           <div className="columns is-multiline">
                                <div className="column is-6-fullhd is-12">   
                                    <label className="label has-text-success-dark"> Search </label> 
                                    <div className="field has-addons">
                                        <div className="control">
                                            <input id="searchinput" className="input is-rounded" type="text" placeholder="Search"></input>   
                                        </div>
                                            <button className="button is-primary">
                                            <span className="icon">
                                                <i className="fas fa-search"></i>
                                            </span></button> 
                                    </div>  
                                </div>                       
                                <div className="column is-6">       
                                    <label className="label has-text-success-dark" htmlFor="Sorting"> Sort by </label>    
                                    <div className="select is-rounded is-primary"> 
                                        <select defaultValue="NameAZ" name="sort by" id="Sorting">                                          
                                            <option value="NameAZ">Name Ascending</option>
                                            <option value="NameZA">Name Descending</option>
                                            <option value="NameAZ">Postion Ascending</option>
                                            <option value="NameZA">Postion Descending</option>
                                        </select> 
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="columns is-multiline">
                                <div className="column">
                                    <label className="label has-text-success-dark">Page 1/1</label>
                                    <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled>Previous Page</button>
                                    <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled>Next Page</button>
                                </div>
                                <div className="column is-narrow-fullhd is-12">
                                    <label className="label has-text-success-dark" htmlFor="Number">Results</label>
                                    <div className="select is-rounded is-primary">
                                        <select defaultValue="10" style={{width:'100%'}} name="Number" id="Number">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                        </select> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-6 mt-3">
                {(!state.positionsExist) ? <ViewNoproduct/> : <Table positions={state.positions}/>}
            </div>
        </div>
    );

}

function RequiredLanguage(programmingLanguages){
    let languages = "";
    var i =0;
    for (i=0; i< programmingLanguages.length; i++){
        if (programmingLanguages[i] == "JAVA"){
            languages += ", Java";
        }
        if (programmingLanguages[i].toString() == "PYTHON"){
            languages += ", Python";
        }
        if (programmingLanguages[i] == "C_SHARP"){
            languages += ", C#";
        }
        if (programmingLanguages[i] == "C_PLUS_PLUS"){
            languages += ", C++";
        }
    }
    languages = languages.slice(2);
    return languages
}

function ViewNoproduct() {
    return (
        <div className="is-size-4">
            No Positions
        </div>
    );
}

function Table({positions}) {
    const navigate = useNavigate();
    return (
        <table className="table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered" >
            <thead>
                <tr className="is-uppercase has-background-light">
                    <th  className="is-vcentered">ID</th>
                    <th  className="is-vcentered">Name</th>
                    <th  className="is-vcentered">Description</th>
                    <th  className="is-vcentered">Languagues</th>
                    <th  className="is-vcentered">Actions</th>
                </tr>
            </thead>
            <tbody>
                {positions.map((list,index) =>{ 
                    return(
                        <tr key={index}>
                            <td  className="is-vcentered">{list.id}</td>
                            <td  className="is-vcentered">{list.name}</td>
                            <td  className="is-vcentered">{list.description}</td>
                            <td  className="is-vcentered">{RequiredLanguage(list.programmingLanguages)}</td>
                            <td  className="is-vcentered">
                                <button className="button is-small is-danger">
                                    <span className="icon is-small">
                                        <i className="fas fa-trash"/>
                                    </span>
                                    <span>Delete</span>
                                </button>
                                <button className="button is-small is-warning">
                                    <span className="icon is-small">
                                        <i className="fas fa-cogs"/>
                                    </span>
                                    <span>Edit</span>
                                </button>

                            </td>
                        </tr>
                    )
                    })}
            </tbody>
        </table>
    );
}