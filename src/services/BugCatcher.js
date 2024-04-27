export function formatErrors(errors) {
    let newErrorsLog = []
    console.log("Errores del bug catcher: ", errors)
    if(errors.message){
        if(errors.message == "Internal server error") {
            newErrorsLog.push("Algo salio mal 😞. Intenta más tarde.")
        }
    }
}