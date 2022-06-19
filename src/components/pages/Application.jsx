import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getAuthHeader, getAdminHeader } from '../../storedData';
import { useNavigate } from 'react-router';
import API_URL from '../../config'
import Axios from "axios";

export default function Application() {
	const { id } = useParams();
	const [emailCan, setEmailCan] = useState('');
	const [firstNameCan, setFirstNameCan] = useState('');
	const [lastNameCan, setLastNameCan] = useState('');
    const [appliedPosition, setAppliedPosition] = useState(0);
    const [state, setState] = useState({selectedFile: null, filePreviev: ''});

	const[positionId, setPositionID] = useState(0);
	const[positionName, setPositionName] = useState('');
	const[positionDescription, setPositionDescription] = useState('');
	const[positionLanguages, setPositionLanguages] = useState([]);

	const [registered, setRegistered] = useState(false);

	const [error, setError] = useState();

	const navigate = useNavigate();


	const handleEmail = (e) => {
		setEmailCan(e.target.value);
	};

	const handleFirstName = (e) => {
		setFirstNameCan(e.target.value);
	};

	const handleLastName = (e) => {
		setLastNameCan(e.target.value);
	};

    const handleAppliedPosition = (e) => {
        setAppliedPosition(e.target.value);
    };

    const handleImages = (e) => {
        if(e.target.files.length == 0) {
            console.log("no files added");
        }
        else {
			console.log("O",e.target.files);
            console.log(e.target.files.length);
            for(var i = 0; i < e.target.files.length; i++) {
                console.log(e.target.files[i].name);
            }
			setState({selectedFile:e.target.files[0],filePreviev:URL.createObjectURL(e.target.files[0])});
        }
    };

	const successfullRegister = () => {
		return (
			<div className="notification is-success">
				<label className="label">User Registered Succesfully</label>
			</div>
		);
	};

	const handleError = (error) => {
        console.log(error);
        if(error.status === 401) {
            navigate("/", { replace: true });
        } else {
        	setError({'message': {'type':'error', 'text':error.message}});
        }
    };

	useEffect(() => {
		Axios.get(API_URL + "/positions/" + id, {
            headers: getAuthHeader()
        })
        .then((response) => {
            setError(false);

            // setting those here to fill inputs for update with default values
            setPositionID(response.data.id);
            setPositionName(response.data.name);
            setPositionDescription(response.data.description);
            setPositionLanguages(response.data.programmingLanguages);
			setAppliedPosition(response.data.id);

        })
        .catch(error => {
            console.log(error);
            setError(true);
        })

		Axios.get(API_URL + "/users/current", {
            headers: getAuthHeader()
        })
        .then((response) => {
            setError(false);

            // setting those here to fill inputs for update with default values
            setEmailCan(response.data.email);
            setFirstNameCan(response.data.firstName);
            setLastNameCan(response.data.lastName);

        })
        .catch(error => {
            console.log(error);
            setError(true);
        })
        //hides that warning in console that makes me angry
        // eslint-disable-next-line
    }, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(emailCan, firstNameCan, lastNameCan, appliedPosition);
		if (emailCan === '' || firstNameCan === '' || lastNameCan === '') {
			console.log("Fill all inputs");
		} else {
			let file = state.selectedFile;
			console.log("r",file);

			// const obj = {
			// 	documentType: "CV",
			// 	applicationId: 0
			// }

			// const json = JSON.stringify(obj);



			// const data = new FormData();
            // data.append('file', file); 
			// data.append('dto', ('{"documentType": "CV", "applicationId": 0}', {contentType: 'application/json'}));

			// data.append('dto',JSON.stringify({
			// 	"id": 0,
			// 	"documentType": "CV"                
			// }));

			// data.append('dto', new Blob([JSON.stringify({
			// 	"id": 0,
			// 	"documentType": "CV"                
			// })]));
			

			Axios.post(API_URL + "/applications", {
				headers: getAuthHeader(),
				data: {
					id: 0,
					positionId: positionId,
					description: "string"
				}
				//formData: data
			})
			
				.then((response) => {
					console.log(response)
				})
				.catch(handleError)
		}
	};

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

	return (
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
					<div>
						<label className="label">Canditate Application Form</label>
					</div>
					<div className="field">
						{registered && successfullRegister()}
					</div>
					<form onSubmit={handleSubmit}>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleEmail} value={emailCan} type="email" placeholder="E-mail" />
								<span className="icon is-small is-left">
									<i className="fas fa-envelope" />
								</span>
							</p>
						</div>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleFirstName} value={firstNameCan} type="text" placeholder="First Name" />
								<span className="icon is-small is-left">
									<i className="fas fa-id-card-alt" />
								</span>
							</p>
						</div>
						<div className="field">
							<p className="control has-icons-left">
								<input className="input" onChange={handleLastName} value={lastNameCan} type="text" placeholder="Last Name" />
								<span className="icon is-small is-left">
									<i className="fas fa-id-card-alt" />
								</span>
							</p>
						</div>
                        <div className="field is-grouped is-grouped-centered mt-4">
							<div className="file is-boxed">
								<label className="file-label">
									<input className="file-input" onChange={handleImages} type="file" multiple/>
									<span className="file-cta">
										<span className="file-icon">
											<i className="fas fa-upload" />
										</span>
										<span className="file-label">
											Upload Files
										</span>
									</span>
								</label>
							</div>
						</div>
						<button className="button is-primary">Apply</button>
					</form>
				</div>
			</div>
		</div>
	);


}