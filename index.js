// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries Your web app's
// Firebase configuration For Firebase JS SDK v7.20.0 and later, measurementId
// is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlfk_bn_pLBzg27pjl3XtGOrrbUOBavYs",
    authDomain: "book-read-df025.firebaseapp.com",
    databaseURL: "https://book-read-df025-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "book-read-df025",
    storageBucket: "book-read-df025.appspot.com",
    messagingSenderId: "206092252656",
    appId: "1:206092252656:web:e3dcef27ffdcd700929935",
    measurementId: "G-02BD1X5GF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

var email = "";
var password = "";

let loginBtn = document.querySelector('.loginBtn')
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        location.href = 'mainpage.html';
    } else {
        loginBtn.onclick = function () {
            email = document.getElementById('email').value;
            password = document.getElementById('password').value;
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    location.href = 'mainpage.html';
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode + errorMessage);
                });
        }

    }
})

