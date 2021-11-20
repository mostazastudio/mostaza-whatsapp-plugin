import React, { useContext, useState } from 'react';
import "../App.css"
import { LoginContext } from '../context/loginContext';
import { WidgetContext } from '../context/widgetContext';

const WhatsappForm = () => {

    const { whatsappOpen, openWhatsapp, utms } = useContext(WidgetContext)
    const {token, fetchToken} = useContext(LoginContext)

    const [nombre, setNombre] = useState("")
    const [celular, setCelular]  = useState("")
    const [motivo, setMotivo] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [whatsappDatasended, setWhatsappDatasended] = useState(false)

    const sendWhatsappData = async () => {
        console.log("empezando la funcion de sendWhatsappData")
        const pedir_token = await fetchToken()
        const tokenSession = sessionStorage.getItem("whatsappWidgetToken")
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + tokenSession },
            body: JSON.stringify({"nombre":nombre,"celular":celular,"tipo_contacto":motivo,...utms})
        }
        console.log("voy a hacer la peticion de sendWhatsappData")
        const response = await fetch("http://127.0.0.1:8000/prospectos", requestOptions)
        console.log("ya hice la peticion de sendWhatsappData")
        const data = await response.json()

        if(!response.ok){
            setErrorMessage(data.detail);
        }else{
            setWhatsappDatasended(true)
        }

    }

    const handleSubmit = async (e) =>{
        console.log("empezando la funcion de handleSubmit")
        e.preventDefault()
        sendWhatsappData()
        window.open("https://api.whatsapp.com/send?phone=3102430382&text="+motivo, '_blank').focus()
    }

    const toggleWhatsapp = (estado) => {
        var clase = ""
        if (estado) {
            clase = "formulario open"
        } else {
            clase = "formulario"
        }
        return clase
    }

    return (
        <form className="form-whatsapp" onSubmit={handleSubmit}>
            <div className={toggleWhatsapp(whatsappOpen)} id="form-global">
                <div className="row">
                    <h3>¿Quieres contactar un asesor?</h3>
                    <span id="boton-close" onClick={() => openWhatsapp()}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg></span>
                </div>
                <p>Completa tus datos y te contactaremos un un experto</p>
                <label htmlFor="text_field">Tu Nombre</label>
                <input type="text" id="text_field" onChange={(e) => setNombre(e.target.value)} />
                <label htmlFor="number_field">Tu Celular</label>
                <input type="text" id="number_field" onChange={(e) => setCelular(e.target.value)} />
                <label htmlFor="select_field">Quieres ayuda de un asesor para:</label>
                <select id="select_field" onChange={(e) => setMotivo(e.target.value)}>
                    <option>Para hacer mi compra</option>
                    <option>Informacion sobre un peddio realizado</option>
                </select>
                <button>Contactar un asesor</button>
            </div>
        </form>
    );
};

export default WhatsappForm;