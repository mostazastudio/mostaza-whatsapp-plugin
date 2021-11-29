import React, { createContext, useState } from "react";
import CryptoJS from 'crypto-js';

const WidgetContext = createContext();

const WidgetProvider = ({children}) =>{

    const [whatsappOpen, setWhatsappOpen]           = useState(false)
    const [utms, setUtms]                           = useState({})
    const [whatsappNumber, setWhatsappNumber]       = useState("")

    const fetchWhatsappNumber = (numero) => {
        var bytes = CryptoJS.AES.decrypt(numero, "greenbaypackers")
        var originalText = bytes.toString(CryptoJS.enc.Utf8)
        setWhatsappNumber(originalText)
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
            "segment":urlParams.get("utm_segment"),
            "campaign_id":urlParams.get("utm_campaign_id"),
            "adset_id":urlParams.get("utm_adset_id"),
            "ad_id":urlParams.get("utm_ad_id")
        }
        setUtms(utmsDict)
    }

    const data = { whatsappOpen, openWhatsapp, utms, processUtms, fetchWhatsappNumber, whatsappNumber  }   
    
    return (
        <WidgetContext.Provider value={data}>
            {children}
        </WidgetContext.Provider>
    )

}

export {WidgetContext}
export default WidgetProvider;