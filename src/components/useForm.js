import { useState, useEffect, useContext } from "react";
import { LoginContext } from '../context/loginContext';


const useForm = (validate) =>{
    const [values, setValues] = useState({
        nombre: "",
        celular:"",
        motivo: ""
    })

    const [formErrors, setFormErrors] = useState({})
    const [whatsappErrors, setWhatsappErrors] = useState("")
    const [whatsappDatasended, setWhatsappDatasended] = useState(false)

    const {token, fetchToken} = useContext(LoginContext)

    const sendWhatsappData = async () => {
        console.log("empezando la funcion de sendWhatsappData")
        const pedir_token = await fetchToken()
        const tokenSession = sessionStorage.getItem("whatsappWidgetToken")
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + tokenSession },
            body: JSON.stringify({"nombre":values.nombre,"celular":values.celular,"tipo_contacto":values.motivo,...utms})
        }
        console.log(requestOptions)
        console.log("voy a hacer la peticion de sendWhatsappData")
        const response = await fetch("http://127.0.0.1:8000/prospectos", requestOptions)
        console.log("ya hice la peticion de sendWhatsappData")
        const data = await response.json()

        if(!response.ok){
            setWhatsappErrors(data.detail);
        }else{
            setWhatsappDatasended(true)
        }

    }

    const validateForm = async (values) =>{
        let errors = {}
        if (values.nombre.length < 2){
            errors.nombre = "Por favor ingresa tu nombre"
        }

        if (values.celular.length < 10){
            errors.celular = "Por favor ingresa un celular valido"
        } else if (!isNaN(values.celular)) {
            errors.celular = "Por favor ingresa un celular valido"
        }

        return errors
    }

    const handleChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleSubmit = async (e) =>{
        console.log("empezando la funcion de handleSubmit")
        e.preventDefault()
        setFormErrors(validate(values));
        sendWhatsappData()
        window.open(`https://api.whatsapp.com/send?phone=57${whatsappNumber}&text=${values.motivo}`, '_blank').focus()
    }

    return {handleChange, values, handleSubmit, formErrors};
}

export default useForm;