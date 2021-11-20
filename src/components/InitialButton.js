import React, { useContext } from 'react';
import "../App.css"
import { WidgetContext } from '../context/widgetContext';

const InitialButton = () => {

    const { whatsappOpen, openWhatsapp } = useContext(WidgetContext)

    const toggleWhatsapp = (estado) =>{
        var clase = ""
        if(estado){
            clase = "boton close"
        }else{
            clase = "boton"
        }
        return clase
    }

    return (
        <div className={toggleWhatsapp(whatsappOpen)} id="initial-button">
            <button id="boton-inicial" onClick={() => openWhatsapp()}>Chatea con nosotrossss</button>
        </div>
    );
};

export default InitialButton;