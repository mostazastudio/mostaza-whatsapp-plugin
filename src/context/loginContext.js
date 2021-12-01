import React, { createContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const LoginContext = createContext();


const LoginProvider = ({children}) => {

    const [token, setToken] = useState(sessionStorage.getItem("whatsappWidgetToken"));
    const [errorMessage, setErrorMessage] = useState("")
    const [password, setPassword] = useState("");


    const fetchPassword = (clave) => {
        var decripted = CryptoJS.AES.decrypt(clave, "greenbaypackers")
        var originalText = decripted.toString(CryptoJS.enc.Utf8)
        setPassword(originalText)
    }
    
    const fetchToken = async () => {
        const username = window.location.hostname
        console.log(username)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`)
        };
        const response = await fetch("https://sheloh-api-feca4.ondigitalocean.app/marcas/token", requestOptions);
        const data = await response.json();

        if(!response.ok){
            setErrorMessage(data.detail)
        }else{
            setToken(data.access_token)
            sessionStorage.setItem("whatsappWidgetToken", data.access_token)
        }
    }

    const data = {token, setToken, fetchToken, fetchPassword}

    return (
        <LoginContext.Provider value={data}>
            {children}
        </LoginContext.Provider>
    );
};


export {LoginContext}
export default LoginProvider;