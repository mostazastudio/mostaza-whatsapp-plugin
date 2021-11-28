import React, { useContext, useState } from 'react';
import useForm from './useForm';
import validate from './validateForm';
import '../whatsappForm.css';
import { WidgetContext } from '../context/widgetContext';
import CryptoJS from 'crypto-js';
import logoFull from "./whatsapp-logo-complete.svg"


const WhatsappForm = (props) => {

    const {handleChange, values, handleSubmit, formErrors} = useForm(validate);
    const { whatsappOpen, openWhatsapp } = useContext(WidgetContext)

    const fetchOpcionesSelector = (lista_opciones) =>{
        var bytes = CryptoJS.AES.decrypt(lista_opciones, 'greenbaypackers');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        var dss = JSON.parse(decryptedData)
        return dss
    }
    
    return (
        <div className={`modal${whatsappOpen ? " active" : ""}`} id="modal">
        <div className="modal-header">
          <img src={logoFull} alt="WhatsApp logo" />
          <span data-close-button className="close-button" onClick={() => openWhatsapp()}>×</span>
        </div>
        <div className="modal-footer">
          <div className="modal-intro">
            <span>👋 Hola!</span>
            <p>Completa tus datos para contactar un asesor.</p>
          </div>
          <form action="#" className="modal-form" onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="name">Nombre</label>
              <input type="text" placeholder="Escribe tu nombre" name="nombre" value={values.nombre} required onChange={handleChange} />
              {formErrors.nombre && <p>{formErrors.nombre}</p>}
            </div>
            <div className="row">
              <label htmlFor="phone">Teléfono</label>
              <input type="tel" name="celular" value={values.celular} placeholder="Escribe tu número de teléfono" required onChange={handleChange} />
              {formErrors.celular && <p>{formErrors.celular}</p>}
            </div>
            <div className="row">
              <label htmlFor="help">Tipo de ayuda</label>
              <select name="help" name="motivo" required onChange={handleChange}>
                <option value disabled selected>--</option>
                {fetchOpcionesSelector(props.seleccion).map(e => <option>{e.opcion}</option>)}
              </select>
              {formErrors.motivo && <p>{formErrors.motivo}</p>}
            </div>
            <input type="submit" defaultValue="Enviar y contactar un asesor" />
          </form>
        </div>
      </div>
    );
};

export default WhatsappForm;