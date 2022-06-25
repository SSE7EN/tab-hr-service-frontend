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
    const [state, setState] = useState({selectedCVFile: null, selectedMLFile: null});

	const[CV_ID,setCV_ID] = useState(-1);
	const[ML_ID,setML_ID] = useState(-1);
	const[applicationID, setApplicationID] = useState(0);
	const[positionId, setPositionID] = useState(-1);
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

	const handleML = (e) =>{
		if(e.target.files.length == 0) {
            console.log("no letter added");
        }
        else {
            for(var i = 0; i < e.target.files.length; i++) {
                console.log(e.target.files[i].name);
            }
			setState({selectedCVFile: state.selectedCVFile, selectedMLFile: e.target.files[0]});

			const data = new FormData();
			data.append("file", e.target.files[0]);


			Axios.post(API_URL + "/documents", data,{
				headers: {
					...getAuthHeader(),
					"Content-Type":'multipart/form-data'},
			})
			
				.then((response) => {
					console.log("Send letter")
					console.log(response.data.id)
					setML_ID(response.data.id);
				})
				.catch(handleError)
        }
	}

    const handleCV = (e) => {
        if(e.target.files.length == 0) {
            console.log("no CV added");
        }
        else {
            for(var i = 0; i < e.target.files.length; i++) {
                console.log(e.target.files[i].name);
            }
			setState({selectedCVFile: e.target.files[0], selectedMLFile: state.selectedMLFile});

			const data = new FormData();
			data.append("file", e.target.files[0]);

			Axios.post(API_URL + "/documents", data,{
				headers: {
					...getAuthHeader(),
					"Content-Type":'multipart/form-data'},
			})
			
				.then((response) => {
					console.log("Send CV")
					console.log(response.data.id)
					setCV_ID(response.data.id);
				})
				.catch(handleError)
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
			navigate("/applicationsent",
			{
				state: {
					errror: true,
					applicationID: -1,
					CV_ID: -1,
					ML_ID: -1
				}
			});
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(emailCan, firstNameCan, lastNameCan, positionId);
		if (emailCan === '' || firstNameCan === '' || lastNameCan === '') {
			console.log("Fill all inputs");
		} else {
			
			//send position
			Axios(API_URL + "/applications", {
				method: 'post',
				headers: getAuthHeader(),
				data: {
					id: 0,
					positionId: 1,
					description: "string"
				}
			})
			
				.then((response) => {
					console.log("Send position")
					console.log(response)
					navigate("/applicationsent",
					{
						state: {
							errror: false,
							applicationID: response.data.id,
							CV_ID: CV_ID,
							ML_ID: ML_ID
						}
					});
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
								<label className="file-label mx-4">
									<input className="file-input" onChange={handleCV} type="file" multiple/>
									<span className="file-cta">
										<span className="file-icon">
											<i className="fas fa-upload" />
										</span>
										<span className="file-label">
											Upload CV
										</span>
									</span>
								</label>
							</div>
							<div className="file is-boxed">
								<label className="file-label mx-4">
									<input className="file-input" onChange={handleML} type="file" multiple/>
									<span className="file-cta">
										<span className="file-icon">
											<i className="fas fa-upload" />
										</span>
										<span className="file-label">
											Upload Motivational Letter
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