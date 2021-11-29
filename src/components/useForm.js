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
        console.log(urlPath)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + tokenSession },
            body: JSON.stringify({"nombre":values.nombre,"celular":values.celular,"tipo_contacto":values.motivo,"urlPath":urlPath,...utms})
        }
        console.log(requestOptions)
        console.log("voy a hacer la peticion de sendWhatsappData")
        const response = await fetch("https://sheloh-api-feca4.ondigitalocean.app/prospectos", requestOptions)
        console.log("ya hice la peticion de sendWhatsappData")
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
        setFormErrors(validate(name,value));
        
    }

    const handleSubmit = async (e) =>{
        console.log("empezando la funcion de handleSubmit")
        e.preventDefault()
        setIsSubmitting(true);
        console.log(formErrors)
        console.log(Object.keys(formErrors).length)
        if(Object.keys(formErrors).length === 0 && isSubmitting){
            console.log("antes de Sendwhatsapp data")
            sendWhatsappData()
            window.open(`https://wa.me/57${whatsappNumber}?text=${values.motivo}`, '_blank').focus()
        }

    }

    /*useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmitting){
            sendWhatsappData()
            console.log(`https://wa.me/57${whatsappNumber}?text=${values.motivo}`)
            window.open(`https://wa.me/57${whatsappNumber}?text=${values.motivo}`, '_blank').focus()
        }
    },[formErrors])*/

    return {handleChange, values, handleSubmit, formErrors};
}

export default useForm;