import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAuthHeader, getAdminHeader } from '../../storedData';
import { useNavigate } from 'react-router';
import API_URL from '../../config'
import Axios from "axios";

import sampleCV from '../pdf/testCV.pdf';
import sampleletter from '../pdf/motivational_letter.pdf';

export default function Application() {
    const { id } = useParams();

    const [editBox, setEditBox] = useState(false);

	const[positionId, setPositionID] = useState(-1);
	const[positionName, setPositionName] = useState('');
	const[positionDescription, setPositionDescription] = useState('');
	const[positionLanguages, setPositionLanguages] = useState([]);

    const[candidateEmail, setCandidateEmail] = useState('');
    const[candidateName, setCandidateName] = useState('');
    const[applicationDescription, setapplicationDescription] = useState('');

    const[documents,setDocuments] = useState([])

    const [error, setError] = useState();

	const navigate = useNavigate();

	useEffect(() => {
        Axios.get(API_URL + "/applications/" + id, {
            headers: getAuthHeader()
        })
        .then((response) => {
            console.log(response);
            setPositionID(response.data.position.id);
            setPositionName(response.data.position.name);
            setPositionDescription(response.data.position.description);
            setPositionLanguages(response.data.position.programmingLanguages);

            setCandidateEmail(response.data.candidate.user.email);
            setCandidateName(response.data.candidate.user.firstName + " " + response.data.candidate.user.lastName);
            setapplicationDescription(response.data.description);

            setDocuments(response.data.documents)
        })
        .catch(error => {
            console.log(error);
        })
        
    }, []);

    const sendEdit = (e) => {
        e.preventDefault();
        Axios.put(API_URL + "/applications/" + id, {
            headers: getAuthHeader(),
            data: {
                positionId: positionId,
                description: document.getElementById("descriptionText").value
            }
        })
        .then((response) => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
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

    function ShowDocuments(documentList){
        console.log(documentList.documentList)
        if (documentList.documentList.length == 0){
            return(
                <div>"No available documents"</div>
            )
        }else if (documentList.documentList.length == 1){
            return(
                <div>
                    <NavLink to={"/document/" + documentList.documentList[0].id} >{documentList.documentList[0].documentType}</NavLink>
                </div>
            )
        }
        else{
            return(
                <div>
                    <NavLink to={"/document/" + documentList.documentList[0].id} >{documentList.documentList[0].documentType}</NavLink>
                    <NavLink to={"/document/" + documentList.documentList[1].id} >{documentList.documentList[1].documentType}</NavLink>
                </div>
            ) 
        }
    }

    function EditBox(){
        return(
            <div className="column is-half-tablet is-one-third-widescreen is-offset-6">
                <div className="box has-text-centered has-background-light ml-6 mt-6">
                    <div className="field ">
                        <label className="label">Edit Application Description</label>
                    </div>
                    <div className="field is-grouped">,
                        <form onSubmit={sendEdit}>
                            <input className="input" type="text" id="descriptionText" placeholder="Description"/>
                            <button className="button is-danger is-rounded mt-5 mr-5"
                            onClick = {() => {setEditBox(false)}}>
                                <span className="icon is-big">
                                    <i className="fas fa-times-circle" />
                                </span>
                                <span>Cancel</span>
                            </button>
                            <button className="button is-info is-rounded mt-5 ml-5" type="submit">
                                <span className="icon is-big">
                                    <i className="fas fa-edit" />
                                </span>
                                <span>Submit Description</span>
                            </button>
                            </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-widescreen mr-6 mt-6">
                    <div className="box has-text-centered has-background-light">
                            <div className="is-size-3 has-text-centered">
                                Position name: {positionName}<br /><br />
                            </div>
                            <div className="is-size-6 has-text-justified">
                                Position description: {positionDescription}<br /><br /><br />
                            </div>
                            <div className="columns is-size-5">
                                <div className="column">
                                    Required knowledge of: {(<RequiredLanguage languagearray={positionLanguages}/>)}
                                </div>
                            </div>
                    </div>
                </div>
                <div className="column is-half-tablet is-one-third-widescreen ml-6 mt-6">
                    <div className="box has-text-centered has-background-light">
                        <div className="is-size-6 has-text-centered mb-5">
                            <label className="label">Canditate Info</label>
                        </div>
                        <div className="is-size-6 has-text-justified">
                                Email: {candidateEmail}<br /><br /><br />
                        </div>
                        <div className="is-size-6 has-text-justified">
                                Name: {candidateName}<br /><br /><br />
                        </div>
                        <div className="is-size-6 has-text-justified">
                                Application Description: {applicationDescription}<br /><br /><br />
                        </div>
                        <div className="is-size-6 has-text-justified">
                                Submitted documents: {<ShowDocuments documentList={documents}/>}<br /><br /><br />
                        </div>
                        <div className="columns is-size-6 has-text-justified">
                            <div className = "column is-6 has-text-centered">
                                <button
                                    className="button is-big is-warning is-rounded"
                                    onClick = {() => {setEditBox(true)}}>
                                        <span className="icon is-big">
                                            <i className="fas fa-wrench" />
                                        </span>
                                        <span>Edit application decription</span>
                                    </button>
                            </div>
                            <div className = "column is-6 has-text-centered">
                                <button
                                    className="button is-big is-success is-rounded">
                                        <span className="icon is-big">
                                            <i className="fas fa-check-circle" />
                                        </span>
                                        <span>Continue application</span>
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns">
                {editBox ? <EditBox/> : ''}
            </div>
        </div>
	);
}