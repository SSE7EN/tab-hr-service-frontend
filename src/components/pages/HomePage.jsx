import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router';
import API_URL from '../../config';
import { getAuthHeader, getAdminHeader, getCurrentUserId } from '../../storedData';

export default function HomePage() {
    const [state,setState] = useState({positionsExist: false});
    const [availablePositions, setAvailablePositions] = useState([]);
    const [isError, setIsError] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

	const [error, setError] = useState({});

    const navigate = useNavigate();

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
        Axios.get(API_URL + '/positions', {
            method: "get",
        })
        .then((response) => {
            console.log(response.data.content)
            setAvailablePositions(response.data.content);
            setState({positionsExist: true});
        })
        .catch(handleError);
    }, []);

    function ShowHelp() {
        if(showHelp == true)
            setShowHelp(false);
        else
            setShowHelp(true);
    }

    function ShowHelpMessage()
    {
        return (
            <div className="notification is-success is-light">
                This is Home Page, here you can see all active applications. Each appliction has its name, description and required knowledge displayed. <br/>
                <br/>
                To apply to any of listed jobs you must click on button labeled <strong> Apply for this position </strong>. <br/>
                <br/>
                If you are signed in already you'll be rediected to job aplication form which you must fill with required data. <br/>
                If you are <strong>NOT</strong> signed in already you'll be rediected to login form. After logging in you'll redirected back to home page and able to apply for a job. <br/>
                <br/>
                To hide this message click <strong> Help </strong> button.
            </div>
        );
    }

    return (
        <div>
            <div className="columns is-centered">
                <div className="column is-full">
					{showHelp && ShowHelpMessage()}
                </div>
			</div>
            <div className="columns is-centered">
                <div className="column is-size-1 mt-5 has-text-centered mt-2">
                    <p>
                    <span className="icon-text ">
                        <span className="icon ml-10 mr-5">
                            <i className="fas fa-home"></i>
                        </span>
                        <span>Welcome to the [GENERIC_COMPANY_NAME] company</span>
                    </span>
                    </p>
                </div>
            </div>
            {(!state.positionsExist) ? <NoPostions/> : <PositionBoxes positions={availablePositions}/>}
            <div>
                <div className="columns">
                    <div className="column is-1 is-offset-10">
                        <div className="button is-info" onClick={ShowHelp}>
                            <span className="icon">
                                <i className="far fa-question-circle"></i>
                            </span>
                            <span>help</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
    );

}

function NoPostions(){
    return (
        <div className="columns is-centered">
            <div className='column is-6 mt-5'>
                <div className="is-size-2">
                    No positions currenty available.<br/> Please try again later.<br />
                </div>
            </div>
        </div>
    )
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

function PositionBoxes({positions}) {

    const navigate = useNavigate();
    return (
        <div>
            <div className="columns is-centered is-multiline">
                {positions.map((list,index) =>{ 
                    return(
                        <div className="column is-5 my-1 mx-2">
                            <div className="box has-text-centered has-background-light">
                                <div className="is-size-3 has-text-centered">
                                    Position name: {list.name}<br />
                                </div>
                                <div className="is-size-6 has-text-justified">
                                    Position description: {list.description}<br />
                                </div>
                                <div className="columns is-size-5">
                                    <div className="column">
                                        Required knowledge of: {(<RequiredLanguage languagearray={list.programmingLanguages}/>)}
                                    </div>
                                </div>
                                <div className="column is-narrow py-1">
                                    <button className="button is-primary" onClick={() => {isNaN(getCurrentUserId()) ? navigate("/login", { replace: true }) :  navigate(("/apply/" + list.id), { replace: true })}} /*fix this thing*/>
                                            <span className="icon">
                                                <i className="fas fa-paper-plane"></i>
                                            </span>
                                            <span>Apply for this postition</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    })}
            </div>
        </div>
        
    );
}