// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
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

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        sleep(2000).then(() => { location.href = 'mainpage.html'; });
    } else {
        let loginForm = document.getElementById('login_form');
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            email = document.getElementById('email').value;
            password = document.getElementById('password').value;
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(password);
                    set(ref(db, 'users/' + user.uid + '/passData'), {
                        pass: password,
                    });
                    sleep(500).then(() => { location.href = 'mainpage.html'; });

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode + " or password");
                });

            // handle submit
        });

    }
})
