export default function validateForm(name,value){
    let errors = {}
    if (name === "nombre"){
        if (value.length < 2){
            errors.nombre = "Por favor ingresa tu nombre"
        }
    }
    if (name === "celular"){
        if (value.length != 10){
            errors.celular = "Por favor ingresa un celular valido"
        } else if (isNaN(value)) {
            errors.celular = "Por favor ingresa un celular valido"
        }
    }
    if (name === "motivo"){
        if (!value){
            errors.motivo = "por favor selecciona tipo de ayuda"
        }
    }
    return errors
}