import React, { useState } from 'react';
import { Document, Page } from 'react-pdf'

import sampleCV from '../pdf/testCV.pdf';
import sampleletter from '../pdf/motivational_letter.pdf';


export default function Candidate() {
    //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    const url_pdf = "ttp://africau.edu/images/default/sample.pdf";

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

    return (
        <div className="columns is-mobile is-multiline">
            <div className="column is-4 is-offset-4 has-text-centered is-size-1 has-text-weight-semibold">
                    Jan Kowalski
            </div>
            <div className="column is-2 is-offset-4 has-text-centered is-size-3 has-text-weight-semibold">
                    position:
            </div>
            <div className="column is-2 has-text-centered is-size-3 has-text-weight-semibold">
                    Intern
            </div>
            <div className = "column is-6 is-offset-3">
                <div className="box">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum mauris a venenatis blandit. Duis consectetur, nisl ac vehicula consectetur, mauris nulla consectetur ex, et blandit mauris eros sed dolor. Quisque convallis vulputate nulla, vitae venenatis metus molestie sit amet. Nullam tempor arcu posuere blandit venenatis. Aenean ullamcorper mattis leo a dignissim. In vitae commodo nibh. Ut facilisis elit sit amet nunc lacinia posuere sit amet eget urna. Nam tristique, sem in ullamcorper euismod, lacus neque auctor leo, vitae laoreet diam lacus ut mauris. Nunc quis ipsum sed ex fermentum hendrerit nec vel nibh. Praesent ipsum dolor, vulputate vitae sollicitudin vel, tincidunt at nisi. Maecenas dignissim, urna id efficitur dignissim, metus ligula placerat tellus, ac egestas mi ante quis nisi. Nam fermentum condimentum lacus, a egestas mi fringilla non. Praesent ut arcu orci. Nam aliquet erat ut accumsan auctor. Fusce nec velit a risus consectetur mollis eget eu lectus. Sed sed purus vulputate, consectetur metus vitae, auctor odio.

                    Curabitur consectetur interdum lacus a vestibulum. Vivamus risus tellus, tincidunt a molestie varius, scelerisque eu lacus. Nullam quis lacus quis felis bibendum ullamcorper. Nam facilisis et enim sed tristique. Quisque tempor efficitur diam, sit amet fringilla felis ultricies ac. Nunc fringilla ipsum ac tristique eleifend. Maecenas a neque id neque pellentesque lacinia. In consequat lacus a nisl hendrerit, sit amet sodales ante imperdiet. Donec vulputate ipsum odio, ut tristique orci pulvinar sed. Pellentesque viverra malesuada lacus. Duis convallis risus eu leo interdum, laoreet ullamcorper risus sagittis. In accumsan nunc sed ligula tempus, in hendrerit turpis viverra. In sodales dui commodo, rutrum ex sed, pellentesque tellus.

                    Duis id quam convallis, ornare lacus quis, aliquam arcu. Donec sed ipsum sed purus feugiat pharetra. Nam condimentum leo in turpis commodo ultrices at quis ipsum. Suspendisse sed pretium est, porta vulputate augue. Ut varius ullamcorper dolor, a euismod lorem vulputate ac. In vulputate libero ac rhoncus imperdiet. Vivamus eget rutrum ipsum. Nam facilisis dui ac risus maximus, vitae congue nibh posuere.

                    Cras blandit magna eget magna faucibus, non faucibus risus ornare. Phasellus euismod in urna in iaculis. Cras vel eros ac urna interdum vehicula sed vel turpis. Aliquam laoreet vitae augue ut suscipit. Nunc nunc ante, rhoncus sed ex sit amet, mollis tincidunt purus. Pellentesque nec scelerisque lectus, at commodo eros. In quam turpis, pulvinar in viverra vel, lacinia ut turpis. Curabitur luctus est eget nisl pretium, et dignissim diam convallis.

                    Ut commodo eu tortor et maximus. Proin cursus auctor mi, sed luctus nisl sodales ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis hendrerit nisl id pretium dapibus. In in malesuada massa, dignissim egestas erat. Mauris ut mauris id velit hendrerit rutrum in sed ex. Proin eu quam tincidunt, tristique sapien non, molestie libero. Duis tempus, ante vel sollicitudin blandit, nisi dui ultrices elit, fringilla dictum ligula orci ut eros. Etiam sit amet dui ac dui aliquam sagittis ac commodo arcu. 
                </div>
            </div>
            <div className = "column is-4 is-offset-2 has-text-centered">
                <div className="box">
                    CV:
                    <Document file={sampleCV} onLoadSuccess={onDocumentLoadSuccessCV} >
                        <Page pageNumber={state.CVPage} />
                    </Document>
                    Page {state.CVPage} of {state.CVPages}
                    <div className="column">
                        <label className="label has-text-success-dark"> {state.Pagetext}</label>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled style={{ display: state.CVPage > 1 ? 'none' : '' }} onClick={previousPageCV}>Previous Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" style={{ display: state.CVPage > 1 ? '' : 'none' }} onClick={previousPageCV}>Previous Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled style={{ display: state.CVPage < state.CVPages ? 'none' : '' }} onClick={NextPageCV}>Next Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" style={{ display: state.CVPage < state.CVPages ? '' : 'none' }} onClick={NextPageCV}>Next Page</button>
                    </div>
                </div>
            </div>
            <div className = "column is-4 has-text-centered">
                <div className="box">
                    Motivational letter:
                    <Document file={sampleletter} onLoadSuccess={onDocumentLoadSuccessML} >
                        <Page pageNumber={state.MLPage} />
                    </Document>
                    Page {state.MLPage} of {state.MLPages}
                    <div className="column">
                        <label className="label has-text-success-dark"> {state.Pagetext}</label>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled style={{ display: state.MLPage > 1 ? 'none' : '' }} onClick={previousPageML}>Previous Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" style={{ display: state.MLPage > 1 ? '' : 'none' }} onClick={previousPageML}>Previous Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" disabled style={{ display: state.MLPage < state.MLPages ? 'none' : '' }} onClick={NextPageML}>Next Page</button>
                        <button className="button is-rounded is-primary is-outlined has-background-white has-text-black" style={{ display: state.MLPage < state.MLPages ? '' : 'none' }} onClick={NextPageML}>Next Page</button>
                    </div>
                </div>
            </div>
            <div className = "column is-2 is-offset-4 has-text-centered">
                <button
                    className="button is-big is-danger is-rounded">
                        <span className="icon is-big">
                            <i className="fas fa-times-circle" />
                        </span>
                        <span>Reject application</span>
                    </button>
            </div>
            <div className = "column is-2 has-text-centered">
                <button
                    className="button is-big is-success is-rounded">
                        <span className="icon is-big">
                            <i className="fas fa-check-circle" />
                        </span>
                        <span>Continue</span>
                    </button>
            </div>
        </div>
    )
}