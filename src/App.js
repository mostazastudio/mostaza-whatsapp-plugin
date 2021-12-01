import React, { Fragment, useContext, useEffect } from 'react';
import InitialButton from './components/InitialButton';
import WhatsappForm from './components/WhatsaappForm';
import "./whatsappForm.css"
import { WidgetContext } from './context/widgetContext';
import { LoginContext } from './context/loginContext';

const App = (props) => {

    const { processUtms, fetchWhatsappNumber, whatsappNumber, whatsappOpen } = useContext(WidgetContext)
    const { fetchPassword, password } = useContext(LoginContext)

    useEffect(() => {

        if (sessionStorage.getItem("utmsConcatenated")) {
            let utmsConcat = sessionStorage.getItem('utmsConcatenated')
            processUtms(utmsConcat)

        } else {
            let queryString = window.location.search;
            sessionStorage.setItem("utmsConcatenated", queryString)
            processUtms(queryString)
        }
    }, [])

    useEffect(() => {
        fetchPassword(props.password)
    }, [password])

    useEffect(() => {
        fetchWhatsappNumber(props.whatsapp)
    }, [whatsappNumber])

    return (
        <div id="mostaza-sheloh-wp-widget">
            <WhatsappForm seleccion={props.selector}></WhatsappForm>
            <InitialButton></InitialButton>
            <div id="mostaza-sheloh-wp-widget__overlay" className={whatsappOpen ? " active" : ""}></div>
        </div>
    );
};

export default App;