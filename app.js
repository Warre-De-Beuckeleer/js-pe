// sectie voor het aanspreken en hiden van de error/succes/betaling divs
let error_div = document.querySelector("#error")
let succes_div = document.querySelector("#succes")
let betaling_div= document.querySelector("#betaling")

// sectie voor het controlleren op error's
let errors = []
const registreer_btn = document.querySelector("#registreer")

validateForm = () => {

// sectie controle invullen    
// https://stackoverflow.com/questions/11614607/docment-formsmyformelement-value-command-in-js-form-validation
    checkEmptyField = (veld, melding) => {
        
        melding = "Het veld " + veld + " is vereist."
        controleInvulling = document.forms["myForm"][veld].value
        if (controleInvulling == ""){
           errors.push(melding)
        }
        
    }

    checkEmptyField("voornaam", "")
    checkEmptyField("naam", "")
    checkEmptyField("gebruikersnaam", "")
    checkEmptyField("adres", "")
    checkEmptyField("land", "")
    checkEmptyField("provincie", "")


// sectie controle email
// https://www.codegrepper.com/code-examples/javascript/javascript+validate+email+input+contains+%40
// https://www.w3schools.blog/alphanumeric-validation-javascript-js

email_input = document.forms["myForm"]["email"].value

    validateEmail = (emailadres) => {
        
    

        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/;
        if (emailadres.match(regexEmail)) {
            let fields = emailadres.split("@")
            let user = fields[0]
            let domein = fields[1]
            if (user.length > 0 && domein.length > 0){
                let firstuser = user.charAt(0)
                let firstdomain = domein.charAt(0)
                let regEx = /^[0-9a-zA-Z]+$/;
                if (firstuser.match(regEx) && firstdomain.match(regEx)){
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false 
        }
    }

    validateEmail(email_input)
    if (validateEmail(email_input) == false){
        errors.push("E-mailadres is niet correct.")
    }

// sectie controle betaling
// https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/

    const betaalwijzes = document.querySelectorAll('input[name="betaal_methode"]')

    let selectedBetaalwijze;
            for (const betaalwijze of betaalwijzes) {
                if (betaalwijze.checked) {
                    selectedBetaalwijze = betaalwijze.value;
                    break;
                }
            }

    validatePayment = (veld) => {
        return document.getElementById("betalingswijze").textContent = "Uw gekozen betalingswijze is " + veld
    }
   
    validatePayment(selectedBetaalwijze)

// sectie controle postcode
let postcode = document.forms["myForm"]["postcode"].value

    checkPC = (veld) => {
        switch (true){
            case (veld == ""):
                errors.push("Het veld postcode is vereist.");
                break;
            case (veld < 1000 || veld > 10000):
                errors.push("De waarde van de postcode moet tussen 1000 en 9999 liggen.");
                break;
            default:
                return true;
        }
    }

    checkPC(postcode)

// controle wachtwoord

let wachtwoord_input = document.forms["myForm"]["wachtwoord"].value
let herhaling_input = document.forms["myForm"]["herhaling"].value


validateWactwoord = (wachtwoord, herhaling) =>{
    
    switch (true){
        case (wachtwoord == "" && herhaling == ""):
            errors.push("Een wachtwoord is vereist.");
            errors.push("Het wachtwoord moet herhaald worden.");
            break;
        case (wachtwoord == ""):
            errors.push("Een wachtwoord is vereist.");
            break;
        case (herhaling == ""):
            errors.push("Het wachtwoord moet herhaald worden.");
            break;
        case (wachtwoord.length < 8):
            errors.push("Het wachtwoord moet minstens 7 karakters bevatten.");
            break;
        case (wachtwoord != herhaling):
            errors.push("Het wachtwoord en de herhaling moeten gelijk zijn aan elkaar.");
            break;
        default:
            return true;
    }

}

validateWactwoord(wachtwoord_input, herhaling_input)

// controle algemene voorwaarden
// https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/

    let voorwaarden = document.querySelector("#Voorwaarden")

    validateVoorwaarden = (veld) => {
        if (veld.checked == false){
            errors.push("U moet akkoord gaan met de algemene voorwaarden.")
        }
    }

    validateVoorwaarden(voorwaarden)
}



// toevoegen van errors aan de pagina
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_createelement4

displayErrors = () =>{
    let i = 0 
    
    while (i < errors.length) {
        let para = document.createElement("p")
        para.innerHTML = errors[i]
        document.getElementById("errorList").appendChild(para)
        i++
    }
}

// controle of er errors zijn

registreer = () => {
    if (errors[0] == null){
        succes_div.classList.remove("hidden") 
        betaling_div.classList.remove("hidden")
        console.log("error is leeg")
    } else {
        error_div.classList.remove("hidden")
        displayErrors()
        console.log(errors)
        console.log("errors is niet leeg")
    }
}


registreer_btn.addEventListener("click", validateForm)
registreer_btn.addEventListener("click", registreer)