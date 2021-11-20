import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import WidgetProvider from "./context/widgetContext";
import LoginProvider from "./context/loginContext";

const Widget = (contraseña, numero) =>{

    console.log(contraseña)
    console.log("este es el whatsapp "+numero)

    ReactDOM.render(
        <LoginProvider >
        <WidgetProvider>
          <App password={contraseña} whatsapp={numero} />
        </WidgetProvider>
        </LoginProvider>,
      document.getElementById('mostaza-whatsapp-plugin')
    );
}

export default Widget
 


