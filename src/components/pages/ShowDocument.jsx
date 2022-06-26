import React, { useEffect,useState } from 'react';
import { Document, Page, pdfjs  } from 'react-pdf';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getAuthHeader, getAdminHeader } from '../../storedData';
import { useNavigate } from 'react-router';
import API_URL from '../../config'
import Axios from "axios";


export default function ShowDocument() {
    const { id } = useParams();

    pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    const [state, setState] = useState({CVPages: 1, CVPage: 1, MLPages: 1, MLPage: 1})

    const [numPages, setnumPages] = useState(null);
    const [pageNumber, setpageNumber] = useState(1);

    const onDocumentLoadSuccessCV = ({ numPages }) => {
        setState({CVPages: numPages, CVPage: pageNumber, MLPages: state.MLPages, MLPage: state.MLPage});
        setnumPages(numPages);
        setpageNumber(1)
    }

    const onDocumentLoadSuccessML = ({ numPages }) => {
        setState({CVPages: state.CVPages, CVPage: state.CVPage, MLPages: numPages, MLPage: pageNumber});
        setnumPages(numPages);
        setpageNumber(1)
    }

    const previousPageCV = () =>{
        setState({CVPages: state.CVPages, CVPage: state.CVPage-1, MLPages: state.MLPages, MLPage: state.MLPage});
    }

    const NextPageCV = () =>{
        setState({CVPages: state.CVPages, CVPage: state.CVPage+1, MLPages: state.MLPages, MLPage: state.MLPage});
    }

    const previousPageML = () =>{
        setState({CVPages: state.CVPages, CVPage: state.CVPage, MLPages: state.MLPages, MLPage: state.MLPage-1});
    }

    const NextPageML = () =>{
        setState({CVPages: state.CVPages, CVPage: state.CVPage, MLPages: state.MLPages, MLPage: state.MLPage+1});
    }


    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const [documentType, setDocumentType] = useState('');
    const [documentURL, setDocumentURL] = useState('');

    useEffect(() => {
        Axios.get(API_URL + "/documents/" + id, {
            headers: getAuthHeader()
        })
        .then((response) => {
            //console.log(response);
            setDocumentURL(response.data.url);
            setDocumentType(response.data.documentType);
            Axios({
                url: "http://localhost:8080/images/" + response.data.url,
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
              });
        })
        .catch(error => {
            console.log(error);
        })
        
        console.log('i fire once');

        
        
    }, []);

    const onDocumentLoadSuccess= ({ numPages }) => {
        setPages(numPages);
    }

    const previousPage = () =>{
        setPage(page-1);
    }

    const NextPage = () =>{
        setPage(page+1);
    }

    return (
        
        <div className="columns is-mobile is-multiline">
            <div className = "column is-8 is-offset-2 has-text-centered">
                <div className="box">
                    {documentType}
                    <Document file={{ url: "http://localhost:8080/images/" + documentURL, httpHeaders: {...getAuthHeader()}}} onLoadSuccess={onDocumentLoadSuccess} >
                        <Page pageNumber={page} />
                    </Document>
                    Page {page} of {pages}
                    <div className="column">
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled style={{ display: page > 1 ? 'none' : '' }} onClick={previousPage}>Previous Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" style={{ display: page> 1 ? '' : 'none' }} onClick={previousPage}>Previous Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled style={{ display: page< pages ? 'none' : '' }} onClick={NextPage}>Next Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" style={{ display: page < pages ? '' : 'none' }} onClick={NextPage}>Next Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}