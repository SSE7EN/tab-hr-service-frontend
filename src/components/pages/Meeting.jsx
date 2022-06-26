import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router";
import Axios from "axios";
import API_URL from '../../config';
import { getAuthHeader, getCurrentUserId } from '../../storedData';
export default function Meeting() {
    const [state, setState] = useState({employee: [], searchInput: '', editedProductId: 0});

    const [MainInterviewerIdCan, setMainInterviewerIdCan] = useState();
    const [CandidateIdCan, setCandidateIdCan] = useState();
    const [InterviewerIdsCan, setInterviewerIdsCan] = useState([]);
    const [MeetingTypeCan, setMeetingTypeCan] = useState();
    const [DateTimeCan, setDateTimeCan] = useState();

    const [DateCan, setDateCan] = useState();
    const [TimeCan, setTimeCan] = useState();

    const navigate = useNavigate();


    const handleMainInterviewerId = (e) => {
        setMainInterviewerIdCan(e.target.value);
    };

    const handleCandidateId = (e) => {
        setCandidateIdCan(e.target.value);
    };

    const handleInterviewerIds = (event) => {
        var array = [event.target.selectedOptions.length];
         for (var i=0; i<event.target.selectedOptions.length; i++){
             array[i] = event.target.selectedOptions[i].value;
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
        if (MainInterviewerIdCan === '' || CandidateIdCan === '' || InterviewerIdsCan === [null] || MeetingTypeCan === '' || DateTimeCan === '') {
			console.log("Fill all inputs");
		} else {
            Axios(API_URL + "/positions", {
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
                navigate("/position", { replace: true });
            })
            
		}
    };

    useEffect(() => {
        Axios.get(API_URL + '/users', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            console.log(response.data.content)
            setState({employee:response.data.content, searchInput: state.searchInput, editedProductId: state.editedProductId});
        })
        .catch(handleError);
    }, []);


    return (
        <div>
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-widescreen mt-6">
                    <div className="box has-text-centered has-background-light">
                        <div className="has-text-centered is-6 mb-4">Position Form</div>
                        <form onSubmit={handleSubmit}>

                            <p>Main Interviewer Id</p>
                            <div className="select is-small is-left" onChange={handleMainInterviewerId}>
                                <select size="1">
                                {
                                state.employee.map((list,index) =>( 
                                    <option key={index} value={list.id}>
                                    {list.firstName + " " + list.lastName}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <br/>
                            <p>Candidate Id</p>
                            <div className="select is-small is-left" onChange={handleCandidateId}>
                                <select size="1">
                                {
                                state.employee.map((list,index) =>( 
                                    <option key={index} value={list.id}>
                                    {list.firstName + " " + list.lastName}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <br/>
                            <p>Interciewers Ids</p>
                            <div className="select is-multiple is-small is-left" onChange={handleInterviewerIds}>
                                <select multiple size="3">
                                {
                                state.employee.map((list,index) =>( 
                                    <option key={index} value={list.id}>
                                    {list.firstName + " " + list.lastName}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <br/>
                            <p>Meeting Type</p>
                            <div className="select is-small is-left" onChange={handleMeetingType}>
                                <select size="1">
                                    <option value="INTRODUCTION">Introduction</option>
                                    <option value="HR">HR</option>
                                    <option value="TECHNICAL">Technical</option>
                                    <option value="FINAL">Final</option>
                                </select>
                            </div>
                            <br/>
                            <p>Date and Time</p>
                            <div className=" is-small is-left"  onChange={handleDateTime}>
                                <label for="dateInput">Date:</label>
                                <input type="date" id="dateInput" name="dateInput" value={DateCan} onChange={handleDate} />
                                <label for="timeInput">Time:</label>
                                <input type="time" id="timeInput" name="timeInput" value={TimeCan} onChange={handleTime}/>
                            </div>
                            <br/>

                            
                            <button className="button is-primary my-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
