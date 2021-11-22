import React, { createContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const LoginContext = createContext();


const LoginProvider = ({children}) => {

    const [token, setToken] = useState(sessionStorage.getItem("whatsappWidgetToken"));
    const [errorMessage, setErrorMessage] = useState("")
    const [password, setPassword] = useState("");


    const fetchPassword = (clave) => {
        console.log("contrasena cifrada"+clave)
        var bytes = CryptoJS.AES.decrypt(clave, "greenbaypackers")
        var originalText = bytes.toString(CryptoJS.enc.Utf8)
        setPassword(originalText)
        console.log("contrasena descifrada: "+originalText)
    }
    
    const fetchToken = async () => {
        console.log("empezando la funcion fetchToken")
        const username = window.location.hostname
        console.log(username)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`)
        };
        console.log("voy a hacer la peticion de fetchToken")
        const response = await fetch("http://127.0.0.1:8000/marcas/token", requestOptions);
        const data = await response.json();
        console.log("ya hice la peticion de fetchToken y hubo una respuesta")

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