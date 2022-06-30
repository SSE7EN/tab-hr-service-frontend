import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
import { getAuthHeader, isAdmin} from '../../storedData';

export default function ApllicationsList() {
    const [state, setState] = useState({applications: [], editBox: false});
    const navigate = useNavigate();

    const [status, setStatus] = useState("");
    const[id, setId] = useState(-1);
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

    const handleStatus = (e) => {
        e.preventDefault();
        setStatus(e.target.value);
    };

    useEffect(() => {
        if (!isAdmin()){
            navigate("/", { replace: true });
        }
        Axios(API_URL + '/applications?sort=id&size=20', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            //console.log(response);
            setState({applications:response.data.content, editBox: false});
        })
        .catch(handleError);
        
    }, []);

    const sendEdit = (e) => {
        e.preventDefault();

        const data = {
            status: status
        }

        Axios.patch(API_URL + "/applications/status/" + id, data,{
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

    const showDocument = (_id) =>{
        Axios.get(API_URL + "/documents/" + _id, {
            headers: getAuthHeader()
        })
        .then((response) => {
            //console.log(response);
            Axios({
                url: "http://localhost:8080/images/" + response.data.url,
                method: 'GET',
                headers: getAuthHeader(),
                responseType: 'blob', // important
              }).then((response) => {
                console.log(response)
                 const url = window.URL.createObjectURL(new Blob([response.data]));
                 const link = document.createElement('a');
                 link.href = url;
                 link.setAttribute('download', 'file.pdf'); //or any other extension
                 document.body.appendChild(link);
                 link.click();
              });
        })
        .catch(error => {
            console.log(error);
        })
    }

    const changeID = (e) => {
        console.log("id", e.currentTarget.id, state.applications);
        e.preventDefault();
        setId(e.currentTarget.id);
    }

    return (
        <div className="columns is-mobile is-multiline is-centered">
            <div className="column is-8 mt-3">
                {<Table appicationList={state.applications}/>}
            </div>
            <div className="column is-2 is-offset-6"  style={{ display: state.editBox ? '' : 'none' }}>
                            <div className="box has-text-centered has-background-ligh">
                                <div className="field ">
                                    <label className="label">Edit Application nr {id}</label>
                                </div>
                                <div className="field">,
                                    <form onSubmit={sendEdit}>
                                        <div className="select is-primary is-left  mb-3" onChange={handleStatus}>
                                            <select>
                                                <option value="IN_PROGRESS">Status: In Progress</option>
                                                <option value="ACCEPTED">Status: Accepted</option>
                                                <option value="REJECTED">Status: Rejected</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button className="button is-danger is-rounded mt-5 mr-1"
                                            onClick = {() => {setState({applications: state.applications, editBox: false})}}>
                                                <span className="icon is-big">
                                                    <i className="fas fa-times-circle" />
                                                </span>
                                                <span>Cancel</span>
                                            </button>
                                            <button className="button is-primary is-rounded mt-5 ml-1" type="submit">
                                                <span className="icon is-big">
                                                    <i className="fas fa-edit" />
                                                </span>
                                                <span>Save status</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
        </div>
    );

    

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

    function ShowStatus(_status){
        var status = _status._status;
        if (status == 'IN_PROGRESS'){
            return(
                <div className="has-text-warning-dark">In Progress</div>
               
            )
        }else if (status == 'ACCEPTED'){
            return( 
                <div className="has-text-success">Accepted</div>
            )
        }else if (status == 'REJECTED'){
            return(
                <div className="has-text-danger">Rejected</div>
            )
        }else{
            return(
                <div class="has-text-warning-dark">In Progress</div>
            )
        }
    }
    
    
    function ShowDocumentsButtons(documents){
        if (documents.documents.length == 0){
            return(
                "none"
            )
        }else if (documents.documents.length == 1){
            return(
                <div className="is-size-6 has-text-centered">
                    <button className="button is-small is-rounded is-link"
                    onClick = {()=>{showDocument(documents.documents[0].id)}}>
                        {documents.documents[0].documentType}
                    </button>
            </div>
            )
        }else{
            return(
                <div className="has-text-centered">
                    <button className="button is-small is-rounded is-link mr-1"
                    onClick = {()=>{showDocument(documents.documents[0].id)}}>
                        {documents.documents[0].documentType}
                    </button>
                    <button className="button is-small is-rounded is-link ml-1"
                    onClick = {()=>{showDocument(documents.documents[1].id)}}>
                        {documents.documents[1].documentType}
                    </button>
                </div>
            )
        }
        
    }

    function Table({appicationList}) {
        const navigate = useNavigate();
        return (
            <table className="table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered" >
                <thead>
                    <tr className="is-uppercase has-background-light">
                        <th  className="is-vcentered">ID</th>
                        <th  className="is-vcentered">position name</th>
                        <th  className="is-vcentered">position description</th>
                        <th  className="is-vcentered">position languagues</th>
                        <th  className="is-vcentered">Documents</th>
                        <th  className="is-vcentered">Status</th>
                        <th  className="is-vcentered">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appicationList.map((list,index) =>{ 
                        return(
                            <tr key={index}>
                                <td  className="is-vcentered">{list.id}</td>
                                <td  className="is-vcentered">{list.position.name}</td>
                                <td  className="is-vcentered">{list.position.description}</td>
                                <td  className="is-vcentered">{(<RequiredLanguage languagearray={list.position.programmingLanguages}/>)}</td>
                                <td  className="is-vcentered">{(<ShowDocumentsButtons documents={list.documents}/>)}</td>
                                <td  className="is-vcentered">{(<ShowStatus _status={list.status}/>)}</td>
                                <td  className="is-vcentered">
                                    <button className="button is-small is-rounded is-info" type="reset"
                                    onClick={() => {navigate("/Application/" + list.id); }}>
                                        <span className="icon is-small">
                                            <i className="fas fa-info"/>
                                        </span>
                                        <span>Show Details</span>
                                    </button>
                                    <button className="button is-small is-rounded is-warning" id={list.id}
                                    onClick = {(e) => {setState({applications: state.applications, editBox: true});
                                    changeID(e)}}>
                                        <span className="icon is-small">
                                            <i className="fas fa-cogs"/>
                                        </span>
                                        <span>Change Status</span>
                                    </button>
                                </td>
                            </tr>
                        )
                        })}
                </tbody>
            </table>
        );
    }

}
