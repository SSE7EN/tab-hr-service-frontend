import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router";
import Axios from "axios";
import API_URL from '../../config';
import { getAuthHeader, getCurrentUserId } from '../../storedData';
import {useLocation} from 'react-router-dom';
export default function Meeting() {
    const location = useLocation();
    const [state, setState] = useState({employee: []});

    const [MainInterviewerIdCan, setMainInterviewerIdCan] = useState(1);
    const [CandidateIdCan, setCandidateIdCan] = useState(1);
    const [InterviewerIdsCan, setInterviewerIdsCan] = useState([]);
    const [MeetingTypeCan, setMeetingTypeCan] = useState('Introduction');
    const [DateTimeCan, setDateTimeCan] = useState('');

    const [DateCan, setDateCan] = useState();
    const [TimeCan, setTimeCan] = useState();

    const navigate = useNavigate();

    const handleMainInterviewerId = (e) => {
        setMainInterviewerIdCan(e.target.value);
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
        setDateTimeCan(DateCan+"T"+TimeCan);
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
			console.log("Fill all inputs");
		} else {
            console.log(MainInterviewerIdCan,CandidateIdCan,InterviewerIdsCan,MeetingTypeCan,DateTimeCan)
            Axios(API_URL + "/meetings", {
                headers: getAuthHeader(),
                method: "post",
                data: {
                    mainInterviewerId: MainInterviewerIdCan,
                    candidateId: CandidateIdCan,
                    interviewerIds: InterviewerIdsCan,
                    meetingType: MeetingTypeCan,
                    dateTime: DateTimeCan,
                },
            })
            .then((response) => {
                console.log(response);
            })
            
		}
    };

    useEffect(() => {
        setCandidateIdCan(location.state.candidateID)
        console.log(location.state.candidateID);
        Axios.get(API_URL + '/users', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            console.log(response.data.content)
            setState({employee:response.data.content});
        })
        .catch(handleError);
    }, []);

    function getCandidate(_id){

    }


    return (
        <div>
            {console.log(state.employee)}
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-widescreen mt-6">
                    <div className="box has-text-centered has-background-light">
                        <div className="has-text-centered is-size-3 mb-4">Position Form</div>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-2">
                                Main Interviewer:<br/ >
                                <div className="select is-small is-left" onChange={handleMainInterviewerId}>
                                <select size="1">
                                {
                                state.employee.filter(employee => employee.role == 'ADMIN').map(filteredEmployee =>( 
                                    <option value={state.employee.id}>
                                    {filteredEmployee.firstName + " " + filteredEmployee.lastName}
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
                                    state.employee.filter(employee => employee.role == 'ADMIN').map(filteredEmployee =>( 
                                            <option id={filteredEmployee.id} value={state.employee.id}>
                                            {filteredEmployee.firstName + " " + filteredEmployee.lastName}
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
                                <button className="button is-primary my-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
