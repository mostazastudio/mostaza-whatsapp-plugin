import { useState, useEffect, useContext, useCallback } from "react";
import { LoginContext } from '../context/loginContext';
import { WidgetContext } from "../context/widgetContext";



const useForm = (validate) =>{
    const [values, setValues] = useState({
        nombre: "",
        celular:"",
        motivo: ""
    })

    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [whatsappErrors, setWhatsappErrors] = useState("")
    const [whatsappDatasended, setWhatsappDatasended] = useState(false)

    const {token, fetchToken} = useContext(LoginContext)
    const {utms, whatsappNumber} = useContext(WidgetContext)

    const sendWhatsappData = async () => {
        console.log("empezando la funcion de sendWhatsappData")
        const pedir_token = await fetchToken()
        const tokenSession = sessionStorage.getItem("whatsappWidgetToken")
        const urlPath = window.location.pathname
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + tokenSession },
            body: JSON.stringify({"nombre":values.nombre,"celular":values.celular,"tipo_contacto":values.motivo,"urlPath":urlPath,...utms})
        }
        const response = await fetch("https://sheloh-api-feca4.ondigitalocean.app/prospectos", requestOptions)
        const data = await response.json()

        if(!response.ok){
            setWhatsappErrors(data.detail);
        }else{
            setWhatsappDatasended(true)
        }

    }

    const handleChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
        setFormErrors({...formErrors, [name]:validate(name,value)});
        
    }

    const handleSubmit = async (e) =>{
        console.log("empezando la funcion de handleSubmit")
        e.preventDefault()
        setIsSubmitting(true);
        console.log(formErrors)
        if(Object.values(formErrors).every(x => (x === null || x === ''))){
            sendWhatsappData()
            window.open(`https://wa.me/${whatsappNumber}?text=${values.motivo}`, '_blank').focus()
        }

    }

    return {handleChange, values, handleSubmit, formErrors};
}

export default useForm;