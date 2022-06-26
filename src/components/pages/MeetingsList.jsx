import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
import { getAuthHeader, getCurrentUserId, isAdmin } from '../../storedData';

export default function MeetingsList() {
    const [state, setState] = useState({meetings: []});
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
        if (isAdmin()){
            Axios(API_URL + '/meetings', {
                headers: getAuthHeader(),
                method: "get",
            })
            .then((response) => {
                console.log(response.data.content);
                setState({meetings:response.data.content});
            })
            .catch(handleError);
        }else{
            Axios(API_URL + '/meetings/current', {
                headers: getAuthHeader(),
                method: "get",
            })
            .then((response) => {
                console.log(response.data.content);
                setState({meetings:response.data.content});
            })
            .catch(handleError);
        }
        
        
    }, []);

    
    const displayTime = (time) =>{
        return time.substring(0,10) + " " + time.substring(11,16);
    }

    return (
        <div className="columns is-mobile is-multiline is-centered">
            <div className="column is-6 mt-3">
                {<Table meetinngList={state.meetings}/>}
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

    function Table({meetinngList}) {
        console.log(meetinngList)
        const navigate = useNavigate();
        if (meetinngList.length == 0){
            return(
                <div className="columns is-centered is-multiline">
                <div className='column has-text-centered is-12 mt-5'>
                    <div className="is-size-4">
                        You don't have any meetings.
                    </div>
                </div>
                <div className='column is-12 has-text-centered mt-5'>
                    <button className="button is-rounded is-info" onClick={() => {navigate("/"); }}>
                            <span className="icon">
                                <i className="fas fa-home"></i>
                            </span>
                            <span>Find postitions</span>
                    </button>
                </div>
            </div>
            )
        }else{
            return (
                <table className="table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered" >
                    <thead>
                        <tr className="is-uppercase has-background-light">
                            <th  className="is-vcentered">ID</th>
                            <th  className="is-vcentered">Meeting type</th>
                            <th  className="is-vcentered">Date</th>
                            <th  className="is-vcentered">Main Interviever</th>
                            <th  className="is-vcentered">Applicant</th>
                            <th  className="is-vcentered">Additional Intervievers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetinngList.map((list,index) =>{ 
                            return(
                                <tr key={index}>
                                    <td  className="is-vcentered">{list.id}</td>
                                    <td  className="is-vcentered">{list.meetingType}</td>
                                    <td  className="is-vcentered">{displayTime(list.dateTime)}</td>
                                    <td  className="is-vcentered">{list.mainInterviewer.firstName + " " +list.mainInterviewer.lastName}</td>
                                    <td  className="is-vcentered">{list.candidate.user.firstName + " " +list.candidate.user.lastName}</td>
                                    <td  className="is-vcentered">
                                    {list.interviewers.map((list2,index) =>{ 
                                        return(
                                            <p>{list2.firstName + " " +list2.lastName}</p>
                                            
                                        ) 
                                        })}
                                    </td> 
                                </tr>
                            )
                            })}
                    </tbody>
                </table>
            );
        }
        
        
    }

}
