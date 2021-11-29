export default function validateForm(objeto){
    let errors = {}

    if (objeto.nombre?.length < 2){
        errors.nombre = "Por favor ingresa tu nombre"
    }
    if (objeto.celular.length != 10){
        errors.celular = "Por favor ingresa un celular valido"
    } else if (isNaN(values.celular)) {
        errors.celular = "Por favor ingresa un celular valido"
    }

    if (!objeto.motivo?.length<1){
        errors.motivo = "por favor selecciona tipo de ayuda"
    }

    return errors
}