import React, { useEffect,useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getAuthHeader, getAdminHeader } from '../../storedData';
import { useNavigate } from 'react-router';
import API_URL from '../../config'
import Axios from "axios";



export default function ShowDocument() {
    const { id } = useParams();

    const [state, setState] = useState({Pages: 1, Page: 1})

    const [documentType, setDocumentType] = useState('');
    const [documentURL, setDocumentURL] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        Axios.get(API_URL + "/documents/" + id, {
            headers: getAuthHeader()
        })
        .then((response) => {
            //console.log(response);
            setDocumentURL(response.data.url);
            setDocumentType(response.data.documentType);
        })
        .catch(error => {
            console.log(error);
        })

        
    }, []);

    const onDocumentLoadSuccess= ({ numPages }) => {
        setState({Pages: numPages, Page: pageNumber});
        setNumPages(numPages);
        setPageNumber(1)
    }

    const previousPage = () =>{
        setState({Pages: state.Pages, Page: state.Page-1});
    }

    const NextPage = () =>{
        setState({Pages: state.Pages, Page: state.Page+1});
    }

    return (
        
        <div className="columns is-mobile is-multiline">
            <div className = "column is-8 is-offset-2 has-text-centered">
                <div className="box">
                    {documentType}
                    <Document file={API_URL + "/" + documentURL} onLoadSuccess={onDocumentLoadSuccess} >
                        <Page pageNumber={state.Page} />
                    </Document>
                    Page {state.Page} of {state.Pages}
                    <div className="column">
                        <label className="label has-text-success-dark"> {state.Pagetext}</label>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled style={{ display: state.Page > 1 ? 'none' : '' }} onClick={previousPage}>Previous Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" style={{ display: state.Page > 1 ? '' : 'none' }} onClick={previousPage}>Previous Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled style={{ display: state.Page < state.Pages ? 'none' : '' }} onClick={NextPage}>Next Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" style={{ display: state.Page < state.Pages ? '' : 'none' }} onClick={NextPage}>Next Page</button>
                    </div>
                </div>
            </div>
        </div>
    )

}