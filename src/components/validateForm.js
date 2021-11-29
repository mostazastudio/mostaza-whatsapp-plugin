export default function validateForm(name,value){
    let error =""
    if (name === "nombre"){
        if (value.length < 2){
            error= "Por favor ingresa tu nombre"
        }
    }
    if (name === "celular"){
        if (value.length != 10){
            error = "Por favor ingresa un celular valido"
        } else if (isNaN(value)) {
            error = "Por favor ingresa un celular valido"
        }
    }
    if (name === "motivo"){
        if (!value){
            error = "por favor selecciona tipo de ayuda"
        }
    }
    return error
}