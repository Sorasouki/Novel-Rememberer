// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

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

insertData();

var data
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
                    + '<td class="table-data" id="titles">' + data[i][1]["title"]
                    + '<td class="table-data" id="titles">' + data[i][1]["title2"]
                    + '<td class="table-data" id="titles">' + data[i][1]["author"]
                    + '<td class="table-data">' + data[i][1]["type"]
                    + '<td class="table-data">' + data[i][1]["language"]
                    + '<td class="table-data">' + data[i][1]["year"]
                    + '<td class="table-data">' + data[i][1]["status"]
                    + '<td class="table-data">' + data[i][1]["chapter"]
                    + '<td class="table-data">' + data[i][1]["chapter2"];
            }
            console.log('successful!');

        })
        let addForm = document.getElementById('add_form');
        addForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            date = (new Date()).getTime();
            set(ref(db, 'users/' + user.uid + '/' + date + '/'), {
                title: document.getElementById('title').value,
                title2: document.getElementById('title2').value,
                author: document.getElementById('author').value,
                type: document.getElementById('type').value,
                language: document.getElementById('language').value,
                year: document.getElementById('year').value,
                status: document.getElementById('status').value,
                chapter: document.getElementById('read-chapter').value,
                chapter2: document.getElementById('latest-chapter').value,
            });
            console.log('Data succesfully send');
            document.getElementById('title').value = "";
            document.getElementById('title2').value = "";
            document.getElementById('author').value = "";
            document.getElementById('type').value = "";
            document.getElementById('language').value = "";
            document.getElementById('year').value = "";
            document.getElementById('status').value = "";
            document.getElementById('read-chapter').value = "";
            document.getElementById('latest-chapter').value = "";
        });
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

function insertData() {
    document.getElementById("type").innerHTML = '<option value="Light Novel">' + 'Light Novel' +
        '<option value="Published Novel">' + 'Published Novel' +
        '<option value="Web Novel">' + 'Web Novel' +
        '<option value="Book">' + 'Book';

    document.getElementById("language").innerHTML = '<option value="Chinese">' + 'Chinese' +
        '<option value="Filipino">' + 'Filipino' +
        '<option value="Indonesian">' + 'Indonesian' +
        '<option value="Japanese">' + 'Japanese' +
        '<option value="Khmer">' + 'Khmer' +
        '<option value="Korean">' + 'Korean' +
        '<option value="Malaysian">' + 'Malaysian' +
        '<option value="Thai">' + 'Thai' +
        '<option value="Vietnamese">' + 'Vietnamese';

    document.getElementById("status").innerHTML = '<option value="Completed">' + 'Completed' +
        '<option value="Ongoing">' + 'Ongoing' +
        '<option value="Hiatus">' + 'Hiatus';

    document.getElementById("head-entries").innerHTML = '<tr class="box-data">' + '<th class = "table-head table-title">' + "Title" +
        '<th class = "table-head">' + "Alternative title" +
        '<th class = "table-head">' + "Author" +
        '<th class = "table-head">' + "Type" +
        '<th class = "table-head">' + "Language" +
        '<th class = "table-head">' + "Year" +
        '<th class = "table-head">' + "Status" +
        '<th class = "table-head">' + "Read Chapter" +
        '<th class = "table-head">' + "Latest Chapter";
}