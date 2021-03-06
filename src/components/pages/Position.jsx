import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";
import API_URL from "../../config";
import { getAuthHeader, isAdmin } from "../../storedData";


export default function Position() {
    const [descriptionCan, setDescriptionCan] = useState("");
    const [nameCan, setNameCan] = useState("");
    const [ProgrammingLanguageCan, setProgrammingLanguageCan] = useState([]);

    const [positionCreated, setPositionCreated] = useState(false);

    const navigate = useNavigate();

    const handleDescription = (e) => {
        setDescriptionCan(e.target.value);
    };

    const handleName = (e) => {
        setNameCan(e.target.value);
    };

    useEffect(() => {
        if (!isAdmin()){
            navigate("/", { replace: true });   //redirect not logged in
        }
    }, []);

    const successfullposition = () => {
		return (
			<div className="notification is-success">
				<label className="label">Position Created Succesfully</label>
			</div>
		);
	};


    const handleProgrammingLanguage = (event) => {
        var array = [event.target.selectedOptions.length];
         for (var i=0; i<event.target.selectedOptions.length; i++){
             array[i] = event.target.selectedOptions[i].value;
         }
         setProgrammingLanguageCan(array);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (descriptionCan === '' || nameCan === '' || ProgrammingLanguageCan === [null]) {
			console.log("Fill all inputs");
		} else {
            Axios(API_URL + "/positions?size=20", {
                headers: getAuthHeader(),
                method: "post",
                data: {
                    description: descriptionCan,
                    name: nameCan,
                    programmingLanguages: ProgrammingLanguageCan,
                },
                
            })
            .then((response) => {
                navigate("/position", { replace: true });
                setPositionCreated(true);
            })
            
		}
    };

    return (
        <div>
            <div className="columns is-centered">
                
                <div className="column is-half-tablet is-one-third-widescreen mt-6">
                    <div className="field has-text-centered">
                        {positionCreated && successfullposition()}
                    </div>
                    <div className="box has-text-centered has-background-light">
                        <div className="has-text-centered is-6 mb-4">Position Form</div>
                        <form onSubmit={handleSubmit}>

                            <div className="control has-icons-left">
								<input className="input" onChange={handleName} value={nameCan} type="text" placeholder="Name" />
								<span className="icon is-small is-left">
									<i className="fas fa-id-card-alt" />
								</span>
							</div>

                            <textarea
                                placeholder="Description"
                                name="description"
                                className="textarea is-small my-2"
                                defaultValue={descriptionCan}
                                onChange={handleDescription}
                            />

                            <div className="select is-multiple is-small is-left" onChange={handleProgrammingLanguage}>
                                <select multiple size="4">
                                    <option value="JAVA">Java</option>
                                    <option value="PYTHON">Python</option>
                                    <option value="C_SHARP">C#</option>
                                    <option value="C_PLUS_PLUS">C++</option>
                                </select>
                            </div>
                            <br/>

                            
                            <button className="button is-rounded is-primary my-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}