import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
import { getAuthHeader, isAdmin} from '../../storedData';

export default function PositionsList() {
    const [state, setState] = useState({positionsExist: false, positions: [], editedProductId: 0, editBox: false});

    const navigate = useNavigate();

    const handleDescription = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    };

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleProgrammingLanguage = (event) => {
        event.preventDefault();
        var array = [event.target.selectedOptions.length];
         for (var i=0; i<event.target.selectedOptions.length; i++){
             array[i] = event.target.selectedOptions[i].value;
         }
         setLanguagues(array);
    };

    const [isError, setIsError] = useState(false);

	const [error, setError] = useState({});

    const[id, setId] = useState(-1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [languages, setLanguagues] = useState([]);



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
        if (!isAdmin()){
            navigate("/", { replace: true });   //redirect not logged in
        }
        Axios.get(API_URL + '/positions?sort=id', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            console.log(response.data.content)
            setState({positionsExist: true, positions:response.data.content, editedProductId: state.editedProductId});
        })
        .catch(handleError);
    }, []);

    const sendEdit = (e) => {
        e.preventDefault();
        
        const data = {
            name: name,
            description: description,
            programmingLanguages: languages
        }

        Axios.put(API_URL + "/positions/" + id, data,{
            headers: getAuthHeader(),
        })
        .then((response) => {
            console.log(response);
            window.location.reload(false);
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    const changeID = (e) => {
        e.preventDefault();
        setId(e.currentTarget.id);
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
                                    <button className="button is-small is-rounded is-warning" id={list.id}
                                    onClick = {(e) => {setState({positionsExist: state.positionsExist, positions: state.positions, editedProductId: state.editedProductId, editBox: true});
                                    changeID(e)}}>
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

    return (
            <div className="columns is-mobile is-multiline">
                <div className="column is-6 is-offset-3 mt-3">
                    {(!state.positionsExist) ? <ViewNoproduct/> : <Table positions={state.positions}/>}
                </div>
                <div className="column is-4 is-offset-4 mt-3">
                    <div className="columns">
                        <div className="column"  style={{ display: state.editBox ? '' : 'none' }}>
                            <div className="box has-text-centered has-background-light">
                                <div className="field ">
                                    <label className="label">Edit Position nr {id}</label>
                                </div>
                                <div className="field is-grouped">,
                                    <form onSubmit={sendEdit}>
                                        <input className="input" type="text" value={name} placeholder="Name" onChange={handleName}/>
                                        <input className="input mt-3" type="text" placeholder="Description" onChange={handleDescription}/>
                                        <div className="select is-multiple is-small is-left mt-3" onChange={handleProgrammingLanguage}>
                                            <select multiple  size="4">
                                                <option value="C_PLUS_PLUS">C++</option>
                                                <option value="C_SHARP">C#</option>
                                                <option value="JAVA">Java</option>
                                                <option value="PYTHON">Python</option>
                                            </select>
                                        </div>
                                        <button className="button is-danger is-rounded ml-6 mt-6 mr-5" type="reset"
                                        onClick = {() => {setState({positionsExist: state.positionsExist, positions: state.positions, editedProductId: state.editedProductId, editBox: false})}}>
                                            <span className="icon is-big">
                                                <i className="fas fa-times-circle" />
                                            </span>
                                            <span>Cancel</span>
                                        </button>
                                        <button className="button is-primary is-rounded mt-6 ml-5" type="submit">
                                            <span className="icon is-big">
                                                <i className="fas fa-edit" />
                                            </span>
                                            <span>Submit Description</span>
                                        </button>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
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

