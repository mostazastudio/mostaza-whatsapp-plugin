import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import WidgetProvider from "./context/widgetContext";
import LoginProvider from "./context/loginContext";

const Widget = (contraseña) =>{

    console.log(contraseña)

    ReactDOM.render(
        <LoginProvider >
        <WidgetProvider>
          <App password={contraseña} />
        </WidgetProvider>
        </LoginProvider>,
      document.getElementById('mostaza-whatsapp-plugin')
    );
}

export default Widget
 


