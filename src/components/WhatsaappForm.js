import React, { useContext, useState } from 'react';
import useForm from './useForm';
import validate from './validateForm';
import '../whatsappForm.css';
import { WidgetContext } from '../context/widgetContext';
import CryptoJS from 'crypto-js';
import logo from "./whatsapp-logo.svg"
import countryCode from './countryCode';


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
        <div className={`mostaza-sheloh-wp-widget__wModal${whatsappOpen ? " active" : ""}`} id="mostaza-sheloh-wp-widget__modal">
        <div className="mostaza-sheloh-wp-widget__wModal-header">
          <img src={logo} alt="WhatsApp logo" />
          <span className="mostaza-sheloh-wp-widget__wModal-header-title">Whatsapp</span>
          <span data-close-button className="close-button-wModal" onClick={() => openWhatsapp()}>×</span>
        </div>
        <div className="mostaza-sheloh-wp-widget__wModal-footer">
          <div className="mostaza-sheloh-wp-widget__wModal-footer-intro">
            <span>👋  Hola!</span>
            <p>Completa tus datos para conectarte con un asesor.</p>
          </div>
          <form action="#" className="mostaza-sheloh-wp-widget__wModal-form" onSubmit={handleSubmit}>
            <div className="mostaza-sheloh-wp-widget__wModal-form-row">
              <label htmlFor="name">Nombre</label>
              <input type="text" placeholder="Escribe tu nombre" name="nombre" value={values.nombre} required onChange={handleChange} />
              {formErrors.nombre && <p className="error">{formErrors.nombre}</p>}
            </div>
            <div className="mostaza-sheloh-wp-widget__wModal-form-row">
              <label htmlFor="Pais">Pais</label>
              <select name="countryCode" id="Pais">
                <option data-countrycode="US" value={1}>USA (+1)</option>
                <option data-countrycode="AR" value={54}>Argentina (+54)</option>
                <option data-countrycode="AW" value={297}>Aruba (+297)</option>
                <option data-countrycode="BS" value={1242}>Bahamas (+1242)</option>
                <option data-countrycode="BB" value={1246}>Barbados (+1246)</option>
                <option data-countrycode="BZ" value={501}>Belize (+501)</option>
                <option data-countrycode="BO" value={591}>Bolivia (+591)</option>
                <option data-countrycode="BR" value={55}>Brazil (+55)</option>
                <option data-countrycode="CA" value={1}>Canada (+1)</option>
                <option data-countrycode="CL" value={56}>Chile (+56)</option>
                <option data-countrycode="CO" value={57}>Colombia (+57)</option>
                <option data-countrycode="CR" value={506}>Costa Rica (+506)</option>
                <option data-countrycode="DO" value={1809}>Dominican Republic (+1809)</option>
                <option data-countrycode="EC" value={593}>Ecuador (+593)</option>
                <option data-countrycode="SV" value={503}>El Salvador (+503)</option>
                <option data-countrycode="GT" value={502}>Guatemala (+502)</option>
                <option data-countrycode="HT" value={509}>Haiti (+509)</option>
                <option data-countrycode="HN" value={504}>Honduras (+504)</option>
                <option data-countrycode="JM" value={1876}>Jamaica (+1876)</option>
                <option data-countrycode="MX" value={52}>Mexico (+52)</option>
                <option data-countrycode="NI" value={505}>Nicaragua (+505)</option>
                <option data-countrycode="PA" value={507}>Panama (+507)</option>
                <option data-countrycode="PY" value={595}>Paraguay (+595)</option>
                <option data-countrycode="PE" value={51}>Peru (+51)</option>
                <option data-countrycode="PR" value={1787}>Puerto Rico (+1787)</option>
                <option data-countrycode="ES" value={34}>Spain (+34)</option>
                <option data-countrycode="UY" value={598}>Uruguay (+598)</option>
              </select>
              {formErrors.celular && <p className="error">{formErrors.celular}</p>}
            </div>
            <div className="mostaza-sheloh-wp-widget__wModal-form-row">
              <label htmlFor="phone">Teléfono</label>
              <input type="tel" name="celular" value={values.celular} placeholder="Escribe tu número de teléfono" required onChange={handleChange} />
              {formErrors.celular && <p className="error">{formErrors.celular}</p>}
            </div>
            <div className="mostaza-sheloh-wp-widget__wModal-form-row">
              <label htmlFor="help">Tipo de ayuda</label>
              <select name="help" placeholder="motivo" required onChange={handleChange}>
                <option value disabled selected>--</option>
                {fetchOpcionesSelector(props.seleccion).map(e => <option>{e.opcion}</option>)}
              </select>
              {formErrors.motivo && <p className="error">{formErrors.motivo}</p>}
            </div>
            <input type="submit" value="Chatear con un asesor" />
          </form>
        </div>
      </div>
    );
};

export default WhatsappForm;