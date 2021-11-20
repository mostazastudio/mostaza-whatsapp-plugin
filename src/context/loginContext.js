import React, { createContext, useEffect, useState } from 'react';

const LoginContext = createContext();


const LoginProvider = ({children}, props) => {

    const [token, setToken] = useState(sessionStorage.getItem("whatsappWidgetToken"));
    const [errorMessage, setErrorMessage] = useState("")
    
    
    const fetchToken = async (password) => {
        console.log("empezando la funcion fetchToken")
        const username = window.location.hostname
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(`grant_type=&username=${username}&password=${props.password}&scope=&client_id=&client_secret=`)
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

    const data = {token, setToken, fetchToken}

    return (
        <LoginContext.Provider value={data}>
            {children}
        </LoginContext.Provider>
    );
};


export {LoginContext}
export default LoginProvider;