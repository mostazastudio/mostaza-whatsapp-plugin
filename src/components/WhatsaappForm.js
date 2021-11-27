import React, { useContext, useState } from 'react';
import useForm from './useForm';
import validate from './validateForm';
import "../App.css"
import { WidgetContext } from '../context/widgetContext';
import CryptoJS from 'crypto-js';


const WhatsappForm = (props) => {

    const {handleChange, values, handleSubmit, formErrors} = useForm(validate);
    const { whatsappOpen, openWhatsapp, utms, whatsappNumber} = useContext(WidgetContext)

    const toggleWhatsapp = (estado) => {
        var clase = ""
        if (estado) {
            clase = "formulario open"
        } else {
            clase = "formulario"
        }
        return clase
    }

    const fetchOpcionesSelector = (lista_opciones) =>{
        var bytes = CryptoJS.AES.decrypt(lista_opciones, 'greenbaypackers');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        console.log(decryptedData)
        console.log(typeof decryptedData)
        return decryptedData
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
                <input type="text" id="text_field" name="nombre" value={values.nombre}  onChange={handleChange} />
                {formErrors.nombre && <p>{formErrors.nombre}</p>}
                <label htmlFor="number_field">Tu Celular</label>
                <input type="text" id="number_field" name="celular" value={values.celular}  onChange={handleChange} />
                <label htmlFor="select_field">Quieres ayuda de un asesor para:</label>
                <select id="select_field" name="motivo" value={values.motivo}  onChange={handleChange}>
                    <option disabled selected>Seleccionar:</option>
                    {fetchOpcionesSelector(props.seleccion).map(e => <option>{e.opcion}</option>)}
                </select>
                <button>Contactar un asesor</button>
            </div>
        </form>
    );
};

export default WhatsappForm;