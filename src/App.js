import React, { useContext, useEffect } from 'react';
import InitialButton from './components/InitialButton';
import WhatsappForm from './components/WhatsaappForm';
import "./App.css"
import { WidgetContext } from './context/widgetContext';
import { LoginContext } from './context/loginContext';

const App = (props) => {

    const { utms, processUtms, fetchWhatsappNumber/*, fetchOpcionesSelector, opcionesSelector*/ } = useContext(WidgetContext)
    const { fetchPassword } = useContext (LoginContext)

    useEffect(()=>{
        if (sessionStorage.getItem("utmsConcatenated")){
            let utmsConcat = sessionStorage.getItem('utmsConcatenated')
            processUtms(utmsConcat)

        }else{
            let queryString = window.location.search;
            sessionStorage.setItem("utmsConcatenated",queryString)
            processUtms(queryString)
        }
    },[])

    useEffect(()=>{
        fetchPassword(props.password)
    }, [])

    useEffect(()=>{
        fetchWhatsappNumber(props.whatsapp)
    },[])

    /*useEffect(()=>{
        fetchOpcionesSelector(props.selector)
    })*/


    return (
        <div className="container">
            <WhatsappForm seleccion={props.selector}></WhatsappForm>
            <InitialButton></InitialButton>
        </div>
    );
};

export default App;