import React, { useState } from "react";
//import { useNavigate } from "react-router";
import Axios from "axios";
import API_URL, { PHOTOS_URL } from "../../config";
import { getAuthHeader } from "../../storedData";
export default function Position() {
    const [descriptionCan, setDescriptionCan] = useState("");
    const [nameCan, setNameCan] = useState("");
    const [ProgrammingLanguageCan, setProgrammingLanguageCan] = useState("JAVA");

    //const navigate = useNavigate();

    const handleDescription = (e) => {
        setDescriptionCan(e.target.value);
    };

    const handleName = (e) => {
        setNameCan(e.target.value);
    };

    const handleProgrammingLanguage = (event) => {
        setProgrammingLanguageCan(event.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (descriptionCan === '' || nameCan === '' || ProgrammingLanguageCan === '') {
			console.log("Fill all inputs");
		} else {
            Axios(API_URL + "/positions", {
                headers: getAuthHeader(),
                method: "post",
                data: {
                    description: descriptionCan,
                    name: nameCan,
                    ProgrammingLanguage: ProgrammingLanguageCan,
                },
            })
            // .then((response) => {
            //     navigate("/position", { replace: true });
            // })
            ;
		}
    };

    return (
        <div>
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-widescreen mt-6">
                    <div className="box has-text-centered has-background-light">
                        <h3 className="text-center">Position Form</h3>
                        <form onSubmit={handleSubmit}>


                            <p className="control has-icons-left">
								<input className="input" onChange={handleName} value={nameCan} type="text" placeholder="Name" />
								<span className="icon is-small is-left">
									<i className="fas fa-id-card-alt" />
								</span>
							</p>

                            <textarea
                                placeholder="Description"
                                name="description"
                                className="textarea is-small my-2"
                                defaultValue={descriptionCan}
                                onChange={handleDescription}
                            />

                            <select value={ProgrammingLanguageCan} onChange={handleProgrammingLanguage} className="select is-small is-left">
                                <option value="JAVA">JAVA</option>
                                <option value="PYTHON">PYTHON</option>
                                <option value="C_SHARP">C_SHARP</option>
                                <option value="C_PLUS_PLUS">C_PLUS_PLUS</option>
                            </select>
                            <br/>

                            
                            <button className="button is-primary my-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}