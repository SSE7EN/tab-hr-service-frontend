import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
import { getAuthHeader, getCurrentUserId } from '../../storedData';

export default function ApllicationsList() {
    const [state, setState] = useState({applications: [], searchInput: '', editedProductId: 0});
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
        Axios(API_URL + '/applications', {
            headers: getAuthHeader(),
            method: "get",
        })
        .then((response) => {
            console.log(response);
            setState({applications:response.data.content, searchInput: state.searchInput, editedProductId: state.editedProductId});
        })
        .catch(handleError);
        
    }, []);

    return (
        <div className="columns is-mobile is-multiline is-centered">
            <div className="column is-6 mt-3">
                {<Table appicationList={state.applications}/>}
            </div>
        </div>
    );

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

function Table({appicationList}) {
    const navigate = useNavigate();
    return (
        <table className="table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered" >
            <thead>
                <tr className="is-uppercase has-background-light">
                    <th  className="is-vcentered">ID</th>
                    <th  className="is-vcentered">description</th>
                    <th  className="is-vcentered">position name</th>
                    <th  className="is-vcentered">position description</th>
                    <th  className="is-vcentered">position languagues</th>
                    <th  className="is-vcentered">Actions</th>
                </tr>
            </thead>
            <tbody>
                {appicationList.map((list,index) =>{ 
                    return(
                        <tr key={index}>
                            <td  className="is-vcentered">{list.id}</td>
                            <td  className="is-vcentered">{list.description}</td>
                            <td  className="is-vcentered">{list.position.name}</td>
                            <td  className="is-vcentered">{list.position.description}</td>
                            <td  className="is-vcentered">{(<RequiredLanguage languagearray={list.position.programmingLanguages}/>)}</td>
                            <td  className="is-vcentered">
                                <button className="button is-small is-rounded is-info"
                                onClick={() => {navigate("/Application/" + list.id); }}>
                                    <span className="icon is-small">
                                        <i className="fas fa-info"/>
                                    </span>
                                    <span>Show Details</span>
                                </button>

                            </td>
                        </tr>
                    )
                    })}
            </tbody>
        </table>
    );
}

//     return (
//         <div className="columns is-mobile is-multiline is-centered">
//             <div className="column is-7 has-background-light mt-5">
//                 <div className="box has-text-centered has-background-light">
//                     <div className="columns is-centered is-multiline ">
//                         <div className="column is-6 ">
//                            <div className="columns is-multiline">
//                                 <div className="column is-6-fullhd is-12">   
//                                     <label className="label has-text-success-dark"> Search </label> 
//                                     <div className="field has-addons">
//                                         <div className="control">
//                                             <input id="searchinput" className="input is-rounded" type="text" placeholder="Search"></input>   
//                                         </div>
//                                             <button className="button is-primary">
//                                             <span className="icon">
//                                                 <i className="fas fa-search"></i>
//                                             </span></button> 
//                                     </div>  
//                                 </div>                       
//                                 <div className="column is-6">       
//                                     <label className="label has-text-success-dark" htmlFor="Sorting"> Sort by </label>    
//                                     <div className="select is-rounded is-primary"> 
//                                         <select defaultValue="NameAZ" name="sort by" id="Sorting">                                          
//                                             <option value="NameAZ">Name Ascending</option>
//                                             <option value="NameZA">Name Descending</option>
//                                             <option value="NameAZ">Postion Ascending</option>
//                                             <option value="NameZA">Postion Descending</option>
//                                         </select> 
//                                     </div> 
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="column is-6">
//                             <div className="columns is-multiline">
//                                 <div className="column">
//                                     <label className="label has-text-success-dark">Page 1/1</label>
//                                     <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled>Previous Page</button>
//                                     <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled>Next Page</button>
//                                 </div>
//                                 <div className="column is-narrow-fullhd is-12">
//                                     <label className="label has-text-success-dark" htmlFor="Number">Results</label>
//                                     <div className="select is-rounded is-primary">
//                                         <select defaultValue="10" style={{width:'100%'}} name="Number" id="Number">
//                                             <option value="5">5</option>
//                                             <option value="10">10</option>
//                                             <option value="15">15</option>
//                                             <option value="20">20</option>
//                                         </select> 
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="column is-6 mt-3">
//                 <table className="table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered">
//                 <thead>
//                     <tr className="is-uppercase has-background-light">
//                         <td className="is-vcentered">Name</td>
//                         <td className="is-vcentered">position</td>
//                         <td className="is-vcentered">CV</td>
//                         <td className="is-vcentered">Cover Letter</td>
//                         <td className="is-vcentered">Diplomas</td>
//                         <td className="is-vcentered">Certificates</td>
//                         <td className="is-vcentered">Actions</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>Jan Kowalski</td>
//                         <td>Intern</td>
//                         <td>Link</td>
//                         <td>Not submitted</td>
//                         <td>Not submitted</td>
//                         <td>Link</td>
//                         <td><button
//                             className="button is-small is-info is-rounded"
//                                 onClick={() => {navigate("/Candidate"); }}>
//                                 <span className="icon is-small">
//                                     <i className="fas fa-info" />
//                                 </span>
//                                 <span>Show Details</span>
//                             </button>
//                             <button
//                             className="button is-small is-danger is-rounded">
//                                 <span className="icon is-small">
//                                     <i className="fas fa-ban" />
//                                 </span>
//                                 <span>Delete application</span>
//                             </button></td></tr>
//                     <tr>
//                         <td>Mariusz Kowalski</td>
//                         <td>Intern</td>
//                         <td>Link</td>
//                         <td>Not submitted</td>
//                         <td>Not submitted</td>
//                         <td>Not submitted</td>
//                         <td><button
//                             className="button is-small is-info is-rounded"
//                                 onClick={() => {navigate("/Candidate"); }}>
//                                 <span className="icon is-small">
//                                     <i className="fas fa-info" />
//                                 </span>
//                                 <span>Show Details</span>
//                             </button>
//                             <button
//                             className="button is-small is-danger is-rounded">
//                                 <span className="icon is-small">
//                                     <i className="fas fa-ban" />
//                                 </span>
//                                 <span>Delete application</span>
//                             </button></td>
//                     </tr>
//                 </tbody>
//                 </table>
//             </div>
//         </div>
//     );

// }

