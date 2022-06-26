import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router";
import Axios from "axios";
import API_URL from '../../config';
import { getAuthHeader, getCurrentUserId } from '../../storedData';
import {useLocation} from 'react-router-dom';
export default function Meeting() {
    const location = useLocation();
    const [state, setState] = useState({allUsers: []});

    const [MainInterviewerIdCan, setMainInterviewerIdCan] = useState(1);
    const [CandidateIdCan, setCandidateIdCan] = useState(1);
    const [InterviewerIdsCan, setInterviewerIdsCan] = useState([]);
    const [MeetingTypeCan, setMeetingTypeCan] = useState('INTRODUCTION');
    const [DateTimeCan, setDateTimeCan] = useState('');

    const [fillInputs, setfillInputs] = useState(false);
    const [meetingCreated, setMeetingCreated] = useState(false);
    const [DateCan, setDateCan] = useState();
    const [TimeCan, setTimeCan] = useState();

    const navigate = useNavigate();

    const handleMainInterviewerId = (e) => {
        setMainInterviewerIdCan(parseInt(e.target.selectedOptions[0].id));
    };

    const handleInterviewerIds = (event) => {
        var array = [event.target.selectedOptions.length];
         for (var i=0; i<event.target.selectedOptions.length; i++){
             array[i] = parseInt(event.target.selectedOptions[i].id);
         }
        setInterviewerIdsCan(array);
    };

    const handleMeetingType = (e) => {
        setMeetingTypeCan(e.target.value);
    };

    const handleDateTime = (e) => {
        setDateTimeCan(DateCan+"T"+TimeCan+":50.913664+02:00");
    };

    const handleDate = (e) => {
        setDateCan(e.target.value);
    };
    const handleTime = (e) => {
        setTimeCan(e.target.value);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (MainInterviewerIdCan === '' || MeetingTypeCan === '' || DateTimeCan === '') {
			setfillInputs(true);
		} else {
            setfillInputs(false);
            Axios(API_URL + "/meetings", {
                headers: getAuthHeader(),
                method: "post",
                data: {
                    mainInterviewerId: MainInterviewerIdCan,
                    candidateId: CandidateIdCan,
                    interviewersIds: InterviewerIdsCan,
                    meetingType: MeetingTypeCan,
                    dateTime: DateTimeCan,
                },
            })
            .then((response) => {
                console.log(response);
                setMeetingCreated(true);
            })
            
		}
    };

    useEffect(() => {
        console.log(location.state.candidateID);
        Axios.get(API_URL + '/users?sort=id', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            console.log(response.data.content)
            setState({allUsers:response.data.content});
        })
        .catch(handleError);

        Axios.get(API_URL + '/candidates?sort=id', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            console.log(response.data.content)
            getCandidate(response.data.content,location.state.candidateID);
        })
        .catch(handleError);
    }, []);

    const successfullmeeting = () => {
		return (
			<div className="notification is-success">
				<label className="label">Meeting Created Succesfully</label>
			</div>
		);
	};

    const fillAllInputs = () => {
		return (
			<div className="notification is-warning">
				<label className="label">Fill all Inputs</label>
			</div>
		);
	};

    const getCandidate = (candidats, _id) =>{
        candidats.filter(candidats => candidats.user.id == _id).map(filteredCandidated =>{
            setCandidateIdCan(filteredCandidated.id);
        })
    }

    return (
        <div>
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-widescreen mt-6">
                    <div className="field has-text-centered">
                        {fillInputs && fillAllInputs()}
                        {meetingCreated && successfullmeeting()}
                    </div>
                    <div className="box has-text-centered has-background-light">
                        <div className="has-text-centered is-size-3 mb-4">Position Form</div>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-2">
                                Main Interviewer:<br/ >
                                <div className="select is-small is-left" onChange={handleMainInterviewerId}>
                                <select size="1">
                                {
                                state.allUsers.filter(allUsers => allUsers.role == 'ADMIN').map(filteredAllUsers =>( 
                                    <option id ={filteredAllUsers.id} value={state.allUsers.id}>
                                    {filteredAllUsers.firstName + " " + filteredAllUsers.lastName}
                                    </option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            <div className="mt-2">
                                Candidate: {location.state.candidateName}
                            </div>
                            <div className="mt-2">
                                Interviewers<br />
                                <div className="select is-multiple is-small is-left" onChange={handleInterviewerIds}>
                                    <select multiple size="3">
                                    {
                                    state.allUsers.filter(allUsers => allUsers.role == 'ADMIN').map(filteredAllUsers =>( 
                                            <option id={filteredAllUsers.id} value={state.allUsers.id}>
                                            {filteredAllUsers.firstName + " " + filteredAllUsers.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-2">
                                Meeting Type <br />
                                <div className="select is-small is-left" onChange={handleMeetingType}>
                                    <select size="1">
                                        <option value="INTRODUCTION">Introduction</option>
                                        <option value="HR">HR</option>
                                        <option value="TECHNICAL">Technical</option>
                                        <option value="FINAL">Final</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-2">
                                Date and Time <br />
                                <div className=" is-small is-left"  onChange={handleDateTime}>
                                    <label htmlFor="dateInput">Date:</label>
                                    <input type="date" id="dateInput" name="dateInput" value={DateCan} onChange={handleDate} />
                                    <label htmlFor="timeInput">Time:</label>
                                    <input type="time" id="timeInput" name="timeInput" value={TimeCan} onChange={handleTime}/>
                                </div>
                            </div>
                            <div className="mt-2">
                                <button className="button is-rounded is-primary my-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
