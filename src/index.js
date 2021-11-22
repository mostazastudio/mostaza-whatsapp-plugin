import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import WidgetProvider from "./context/widgetContext";
import LoginProvider from "./context/loginContext";

const Widget = (contraseña, numero, lista_selector) =>{
    ReactDOM.render(
        <LoginProvider >
        <WidgetProvider>
          <App password={contraseña} whatsapp={numero} selector={lista_selector} />
        </WidgetProvider>
        </LoginProvider>,
      document.getElementById('mostaza-whatsapp-plugin')
    );
}

export default Widget
 


