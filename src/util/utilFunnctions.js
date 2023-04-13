const passRegex = new RegExp(/^[a-zA-Z0-9]*[\W_]+[a-zA-Z0-9]*$/);
const checkStringHasDigits = /\d+/
const characterChecker = /^[0-9]{10}$/

export function checkPasswordHasSpecialCharacters(password) {
    return passRegex.test(password)
}

export function checkStringHasNumbers(str) {
    return checkStringHasDigits.test(str)
}

export function checkMobileNumberHasAnyCharacter(str) {
    return characterChecker.test(str);
}