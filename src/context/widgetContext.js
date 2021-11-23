import React, { createContext, useState } from "react";
import CryptoJS from 'crypto-js';

const WidgetContext = createContext();

const WidgetProvider = ({children}) =>{

    const [whatsappOpen, setWhatsappOpen]           = useState(false)
    const [utms, setUtms]                           = useState({})
    const [whatsappNumber, setWhatsappNumber]       = useState("")
    const [opcionesSelector, setOpcionesSelector]   = useState([{"opcion":"pendiente"}])


    const fetchWhatsappNumber = (numero) => {
        console.log("numero cifrado"+numero)
        var bytes = CryptoJS.AES.decrypt(numero, "greenbaypackers")
        var originalText = bytes.toString(CryptoJS.enc.Utf8)
        setWhatsappNumber(originalText)
        console.log("numero descifrado: "+originalText)
    }

    const fetchOpcionesSelector = (lista_opciones) =>{
        var bytes = CryptoJS.AES.decrypt(lista_opciones, 'greenbaypackers');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        var dss = JSON.parse(decryptedData)
        console.log(typeof dss)
        setOpcionesSelector(dss)
    }

    const openWhatsapp = () => {
        setWhatsappOpen(!whatsappOpen)
    }

    const processUtms = (data) =>{
        let urlParams   = new URLSearchParams(data);
        let utmsDict = {
            "source":urlParams.get("utm_source"),
            "medium":urlParams.get("utm_medium"),
            "campaign":urlParams.get("utm_campaign"),
            "content":urlParams.get("utm_content"),
            "segment":urlParams.get("utm_segment")
        }
        setUtms(utmsDict)
    }

    const data = { whatsappOpen, openWhatsapp, utms, processUtms, fetchWhatsappNumber, whatsappNumber, fetchOpcionesSelector, opcionesSelector }   
    
    return (
        <WidgetContext.Provider value={data}>
            {children}
        </WidgetContext.Provider>
    )

}

export {WidgetContext}
export default WidgetProvider;