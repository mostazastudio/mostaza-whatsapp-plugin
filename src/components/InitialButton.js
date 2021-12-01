import React, { useContext } from 'react';
import '../whatsappForm.css';
import { WidgetContext } from '../context/widgetContext';
import logo from "./whatsapp-logo.svg"

const InitialButton = () => {

    const { openWhatsapp } = useContext(WidgetContext)

    return (
    <div className="mostaza-sheloh-wp-widget__btnWidgetWp" onClick={() => openWhatsapp()}>
        <img src={logo} alt="WhatsApp logo"/>
        <span className="mostaza-sheloh-wp-widget__btnWidgetWp-label">Chatear con un asesor</span>
    </div>
    );
};

export default InitialButton;