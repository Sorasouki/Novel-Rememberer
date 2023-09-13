// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

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
var date = new Date();
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

var data
let addBtn = document.querySelector('.addBtn')
onAuthStateChanged(auth, (user) => {
    if (user) {
        const usersRef = ref(db, 'users/' + user.uid);
        onValue(usersRef, (snapshot) => {
            console.log('waiting...')
            data = Object.entries(snapshot.val());
            var table_body = document.getElementById('entries');
            table_body.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                document.getElementById("entries").innerHTML += `<tr id="data-row">`
                    + '<td class="table-data">' + data[i][1]["title"]
                    + '<td class="table-data">' + data[i][1]["title2"]
                    + '<td class="table-data">' + data[i][1]["author"]
                    + '<td class="table-data">' + data[i][1]["type"]
                    + '<td class="table-data">' + data[i][1]["language"]
                    + '<td class="table-data">' + data[i][1]["year"]
                    + '<td class="table-data">' + data[i][1]["status"]
                    + '<td class="table-data">' + data[i][1]["chapter"];
            }
            console.log('successful!');

        })
        addBtn.onclick = async function () {
            date = (new Date()).getTime();
            set(ref(db, 'users/' + user.uid + '/' + date + '/'), {
                title: document.getElementById('title').value,
                title2: document.getElementById('title2').value,
                author: document.getElementById('author').value,
                type: document.getElementById('type').value,
                language: document.getElementById('language').value,
                year: document.getElementById('year').value,
                status: document.getElementById('status').value,
                chapter: document.getElementById('chapter').value
            });
            console.log('Data succesfully send');
            document.getElementById('title').value = "";
            document.getElementById('title2').value = "";
            document.getElementById('author').value = "";
            document.getElementById('type').value = "";
            document.getElementById('language').value = "";
            document.getElementById('year').value = "";
            document.getElementById('status').value = "";
            document.getElementById('chapter').value = "";
        }
    } else {
        location.href = 'index.html'
    }
})



let logoutBtn = document.querySelector('.logoutBtn');
logoutBtn.onclick = function () {
    signOut(auth)
        .then(() => {
            location.href = 'index.html';
        })
        .catch((error) => {
            console.log(error);
        });

}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}