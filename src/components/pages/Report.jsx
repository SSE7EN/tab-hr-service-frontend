import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from "axios";
import {getAuthHeader} from '../../storedData';


export default function Report() {
    const navigate = useNavigate();

    useEffect(() => {
        Axios({
            url: "http://localhost:8080/reports",
            method: 'GET',
            headers: getAuthHeader(),
            responseType: 'blob', // important
          }).then((response) => {
            console.log(response)
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'file.pdf'); //or any other extension
             document.body.appendChild(link);
             link.click();
             navigate(-1);
          });
        
    }, []);
}