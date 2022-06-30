import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import { getAuthHeader, isAdmin } from '../../storedData';
import { useNavigate } from 'react-router';
import API_URL from '../../config'
import Axios from "axios";
import {getCurrentUserId} from '../../storedData'

export default function Application() {
    const { id } = useParams();

	const[positionId, setPositionID] = useState(-1);
	const[positionName, setPositionName] = useState('');
	const[positionDescription, setPositionDescription] = useState('');
	const[positionLanguages, setPositionLanguages] = useState([]);

    const[applicationStatus, setApplicationStatus] = useState('');
    const[candidadateID, setCandidateId] = useState(0);
    const[candidateEmail, setCandidateEmail] = useState('');
    const[candidateName, setCandidateName] = useState('');
    const[applicationDescription, setapplicationDescription] = useState('');

    const[documents,setDocuments] = useState([])

    const [error, setError] = useState();

	const navigate = useNavigate();

	useEffect(() => {
        if (isNaN(getCurrentUserId())){
            navigate("/", { replace: true });
        }
        Axios.get(API_URL + "/applications/" + id, {
            headers: getAuthHeader()
        })
        .then((response) => {
            console.log(response);
            setPositionID(response.data.position.id);
            setPositionName(response.data.position.name);
            setPositionDescription(response.data.position.description);
            setPositionLanguages(response.data.position.programmingLanguages);

            setApplicationStatus(response.data.status);
            setCandidateId(response.data.candidate.user.id);
            setCandidateEmail(response.data.candidate.user.email);
            setCandidateName(response.data.candidate.user.firstName + " " + response.data.candidate.user.lastName);
            setapplicationDescription(response.data.description);

            setDocuments(response.data.documents)
        })
        .catch(error => {
            console.log(error);
        })
        
    }, []);

    const showDocument = (_id) =>{
        console.log(_id)
        Axios.get(API_URL + "/documents/" + _id, {
            headers: getAuthHeader()
        })
        .then((response) => {
            //console.log(response);
            Axios({
                url: API_URL + "/images/" + response.data.url,
                method: 'GET',
                headers: getAuthHeader(),
                responseType: 'blob', // important
              }).then((response) => {
                console.log(response)
                 const url = window.URL.createObjectURL(new Blob([response.data]));
                 const link = document.createElement('a');
                 link.href = url;
                 link.setAttribute('target','_blank');
                // link.setAttribute('download', 'file.pdf'); //or any other extension
                 document.body.appendChild(link);
                 link.click();
              });
        })
        .catch(error => {
            console.log(error);
        })
    }

    const sendEdit = (e) => {
        e.preventDefault();
        const data = {
            positionId: positionId,
            description: document.getElementById("descriptionText").value
        };
        
        Axios.put(API_URL + "/applications/" + id, data,{
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
                <div className="is-size-6 has-text-justified">Submitted documents: No available documents</div>
            )
        }else if (documentList.documentList.length == 1){
            return(
                <div className="is-size-6 has-text-justified">
                    Submitted documents:
                    <button class="button is-small is-rounded is-link mx-5"
                    onClick = {()=>{showDocument(documentList.documentList[0].id)}}>
                        {documentList.documentList[0].documentType}
                        </button>
                </div>
            )
        }
        else{
            return(
                <div className="has-text-justified">
                    Submitted documents:
                    <button class="button is-small is-rounded is-link mx-5"
                    onClick = {()=>{showDocument(documentList.documentList[0].id)}}>
                        {documentList.documentList[0].documentType}
                    </button>
                    <button class="button is-small is-rounded is-link mx-5"
                    onClick = {()=>{showDocument(documentList.documentList[1].id)}}>
                        {documentList.documentList[1].documentType}
                    </button>
               </div>
            ) 
        }
    }

    function ShowStatus(){
        console.log(applicationStatus)
        if (applicationStatus == 'IN_PROGRESS'){
            return(
                <div className="has-text-warning-dark">In Progress</div>
               
            )
        }else if (applicationStatus == 'ACCEPTED'){
            return( 
                <div className="has-text-success">Accepted</div>
            )
        }else if (applicationStatus == 'REJECTED'){
            return(
                <div className="has-text-danger">Rejected</div>
            )
        }else{
            return(
                <div class="has-text-warning-dark">In Progress</div>
            )
        }
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
                        <div className="is-size-6 has-text-justified my-2">
                                Email: {candidateEmail}
                        </div>
                        <div className="is-size-6 has-text-justified my-2">
                                Name: {candidateName}
                        </div>
                        <div className="is-size-6 has-text-justified my-2">
                                Application Description: {applicationDescription}
                        </div>
                        <div className="is-size-6 has-text-justified my-2">
                                {<ShowDocuments documentList={documents}/>}
                        </div>
                        <div className="is-size-6 has-text-centered mb-5">
                            <label className="label">Application Status: {(<ShowStatus/>)}</label>
                        </div>
                        
                        <div className="columns is-size-6 has-text-justified mt-3" style={{ display: (applicationStatus=="IN_PROGRESS" || applicationStatus==null) ? '' : 'none' }}>
                            <div className = "column has-text-centered" style={{ display: isAdmin() ? '' : 'none' }}>
                                <button
                                    className="button is-big is-success is-rounded"
                                    onClick={() => {navigate("/meeting",{state: {candidateID: candidadateID, candidateName: candidateName}}); }}>
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
        </div>
	);
}