const passRegex = new RegExp(/^[a-zA-Z0-9]*[\W_]+[a-zA-Z0-9]*$/);
const checkStringHasDigits = /\d+/
const characterChecker = /^[0-9]{10}$/
const EMAILREGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d._%+-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$/

export function checkPasswordHasSpecialCharacters(password) {
    return passRegex.test(password)
}

export function checkStringHasNumbers(str) {
    return checkStringHasDigits.test(str)
}

export function checkMobileNumberHasAnyCharacter(str) {
    return characterChecker.test(str);
}

export function checkEmail(email) {
    return EMAILREGEX.test(email)
}

export function isLogedIn() {
    return localStorage.getItem(logedIn) ? true : false;
}