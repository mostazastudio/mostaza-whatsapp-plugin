export default function validateForm(values){
    let errors = {}

    if (values.nombre.length < 2){
        errors.nombre = "Por favor ingresa tu nombre"
    }
    if (values.celular.length < 10){
        errors.celular = "Por favor ingresa un celular valido"
    } else if (isNaN(values.celular)) {
        errors.celular = "Por favor ingresa un celular valido"
    }

    if (!values.motivo){
        errors.motivo = "por favor selecciona tipo de ayuda"
    }

    return errors
}