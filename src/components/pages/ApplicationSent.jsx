import React, { useEffect, useState } from 'react';
import {getAuthHeader} from '../../storedData';
import { useNavigate, useLocation } from 'react-router';
import API_URL from '../../config'
import Axios from "axios";
import {getCurrentUserId} from '../../storedData'


export default function ApplicationSent(){
    const { state } = useLocation();
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
        if (isNaN(getCurrentUserId())){
            navigate("/", { replace: true });
        }
        console.log("applicationID " + state.applicationID)
        console.log("CVID " + state.CV_ID)
        console.log("MLID " + state.ML_ID)

		//put on CV
		if (state.CV_ID != -1){
			Axios(API_URL + "/documents/" + state.CV_ID, {
				method: 'put',
				headers: getAuthHeader(),
				data: {
					documentType: "CV",
					  applicationId: state.applicationID
				}
			})
			
				.then((response) => {
					console.log("Put CV")
					console.log(response)
				})
				.catch(handleError)
		}

		//put on letter
		if (state.ML_ID != -1){
			Axios(API_URL + "/documents/" + state.ML_ID, {
				method: 'put',
				headers: getAuthHeader(),
				data: {
					documentType: "MOTIVATION_LETTER",
					  applicationId: state.applicationID
				}
			})
			
				.then((response) => {
					console.log("Put Letter")
					console.log(response)
				})
				.catch(handleError)
		}
        console.log(isError)
    }, []);

    return (
        <div>
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-widescreen mt-6">
                    <div className= {(isError || state.error) ? "box has-text-centered has-background-danger" : "box has-text-centered has-background-primary"}>
                        <div className="field">
                            <label className="label">{(isError || state.error) ? "Error has occured while sending the application" : "Application sent successfully"}</label>
                        </div>
                        <div className="field">
                            <button className="button is-rounded is-light"
                                onClick={() => {navigate("/", { replace: true }); }}>
                                <span className="icon">
                                    <i className="fas fa-home"></i>
                                </span>
                                <span>Return to home page</span>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );




}