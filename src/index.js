import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import WidgetProvider from "./context/widgetContext";
import LoginProvider from "./context/loginContext";

const Widget = (contraseña) =>{

    ReactDOM.render(
      <React.StrictMode>
        <LoginProvider password={contraseña}>
        <WidgetProvider>
          <App />
        </WidgetProvider>
        </LoginProvider>
      </React.StrictMode>,
      document.getElementById('mostaza-whatsapp-plugin')
    );
}

export default Widget
 


