// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { firebaseConfig } from "./function.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries Your web app's
// Firebase configuration For Firebase JS SDK v7.20.0 and later, measurementId
// is optional
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

var email = "";
var password = "";
var cpassword = "";

let registerForm = document.getElementById('register_form');
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    cpassword = document.getElementById('confirm-password').value;
    if (email == '' || password == '' || cpassword =='') {
        alert("email or password should not be empty!");
    }
    else {
        if (password != cpassword) {
            alert('Password is not the same as the confirmation!');
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    set(ref(db, 'users/' + user.uid + '/passData'), {
                        pass: password,
                    });
                    sleep(500).then(() => { location.href = 'mainpage.html'; });
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }

    }
    // handle submit
});




