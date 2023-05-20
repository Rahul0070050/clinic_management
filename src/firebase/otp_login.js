import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

// import { auth } from "./config";

const otplogin = () => {
    return new Promise((resolve, reject) => {
        try {
            
            // const appVerifier = new RecaptchaVerifier('recaptcha-container');
            // signInWithPhoneNumber(auth, "+917994233642", appVerifier)
            // .then((confirmationResult) => {
            //     resolve(confirmationResult);
            // }).catch((error) => {
            //     reject(error)
            // });
        } catch (error) {
            console.log(error);
        }
    })
}

export { otplogin }
