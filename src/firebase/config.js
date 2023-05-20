// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBIHwylTpsgiWASsQlatiZ6JukaLdQz_jg",
    authDomain: "whatsapp-clone-ef0ff.firebaseapp.com",
    projectId: "whatsapp-clone-ef0ff",
    storageBucket: "whatsapp-clone-ef0ff.appspot.com",
    messagingSenderId: "22433403033",
    appId: "1:22433403033:web:aae771946e2b5d8e986808",
    measurementId: "G-0ET3S7LR78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
// auth.languageCode = 'en';

export { auth }
