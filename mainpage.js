// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getDatabase, ref, onValue, set, remove } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut, deleteUser, EmailAuthProvider, updatePassword, reauthenticateWithCredential, updateEmail } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { insertData, sorts, firebaseConfig, dashboardItem } from "./function.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

insertData();
sorts();
dashboardItem();

let dashboard = document.querySelector('.dashboard');
let dashboardBtn = document.querySelector('.dashboardBtn')
dashboardBtn.onclick = function () {
    dashboard.classList.toggle('active');
}

window.changeEmail = function changeEmail() {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    )
    reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated.
        const response = confirm("Are you sure you want to delete your account?");
        if (response) {
            var newEmail = getASecureRandomEmail();
            updateEmail(auth.currentUser, newEmail).then(() => {
                // Email updated!
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
        } else {
            // add code if the user pressed the Cancel button
            console.log("Cancel was pressed");
        }
    }).catch((error) => {
        // An error ocurred
        // ...
    });
}

window.changePassword = function changePassword() {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    )
    reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated.
        const response = confirm("Are you sure you want to delete your account?");
        if (response) {
            var newPassword = getASecureRandomPassword();
            updatePassword(user, newPassword).then(() => {
                // Update successful.
            }).catch((error) => {
                // An error ocurred
                // ...
            });
        } else {
            // add code if the user pressed the Cancel button
            console.log("Cancel was pressed");
        }
    }).catch((error) => {
        // An error ocurred
        // ...
    });
}

window.deleteThisUser = function deleteThisUser() {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    )
    reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated.
        const response = confirm("Are you sure you want to delete your account?");
        if (response) {
            deleteUser(user).then(() => {
                // User deleted.
                alert('Successfully deleted user');
            }).catch((error) => {
                console.log(error);
                alert('ERROR: ', error);
                // An error ocurred
                // ...
            });
        } else {
            // add code if the user pressed the Cancel button
            console.log("Cancel was pressed");
        }
    }).catch((error) => {
        // An error ocurred
        // ...
    });
}

window.deleteTable = function deleteTable(o) {
    var timespan = o.childNodes[1].value;
    remove((ref(db, 'users/' + uid + '/' + timespan)));
}

window.logout = function logout() {
    signOut(auth)
        .then(() => {
            location.href = 'index.html';
        })
        .catch((error) => {
            console.log(error);
        });
}

window.changeTable = function changeTable(o) {
    const titles = o.parentNode.childNodes[0].innerHTML;
    const titles2 = o.parentNode.childNodes[1].innerHTML;
    const authors = o.parentNode.childNodes[2].innerHTML;
    const types = o.parentNode.childNodes[3].innerHTML;
    const languages = o.parentNode.childNodes[4].innerHTML;
    const years = o.parentNode.childNodes[5].innerHTML;
    const statuss = o.parentNode.childNodes[6].innerHTML;
    const chapters = o.parentNode.childNodes[7].innerHTML;
    const chapters2 = o.parentNode.childNodes[8].innerHTML;
    window.changeBtn = function changeBtn(o) {
        var timespan = o.parentNode.childNodes[10].childNodes[1].value;
        if (o.parentNode.childNodes[0].innerHTML === titles &&
            o.parentNode.childNodes[1].innerHTML === titles2 &&
            o.parentNode.childNodes[2].innerHTML === authors &&
            o.parentNode.childNodes[3].innerHTML === types &&
            o.parentNode.childNodes[4].innerHTML === languages &&
            o.parentNode.childNodes[5].innerHTML === years &&
            o.parentNode.childNodes[6].innerHTML === statuss &&
            o.parentNode.childNodes[7].innerHTML === chapters &&
            o.parentNode.childNodes[8].innerHTML === chapters2) {
            alert("Change The Data in The Table First!");
        } else {
            set(ref(db, 'users/' + uid + '/' + timespan + '/'), {
                title: o.parentNode.childNodes[0].innerHTML,
                title2: o.parentNode.childNodes[1].innerHTML,
                author: o.parentNode.childNodes[2].innerHTML,
                type: o.parentNode.childNodes[3].innerHTML,
                language: o.parentNode.childNodes[4].innerHTML,
                year: o.parentNode.childNodes[5].innerHTML,
                status: o.parentNode.childNodes[6].innerHTML,
                chapter: o.parentNode.childNodes[7].innerHTML,
                chapter2: o.parentNode.childNodes[8].innerHTML,
            });
            o.contentEditable = "false";
            o.setAttribute("contenteditable", "false");
        }
    }
}

const addForm = document.getElementById('add_form');
addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    var date = (new Date()).getTime();
    set(ref(db, 'users/' + uid + '/' + date + '/'), {
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
    document.getElementById('title').value = "";
    document.getElementById('title2').value = "";
    document.getElementById('author').value = "";
    document.getElementById('year').value = "";
    document.getElementById('read-chapter').value = "";
    document.getElementById('latest-chapter').value = "";
});

var data;
var uid;
var password;
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
        const usersRef = ref(db, 'users/' + user.uid);
        onValue(usersRef, (snapshot) => {
            var table_body = document.getElementById('entries');
            if (snapshot.val() != null || snapshot.val() != undefined) {
                data = Object.entries(snapshot.val());
                password = data[data.length - 1][1]['pass'];
                table_body.innerHTML = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i][0] == 'passData') {
                        document.getElementById("entries").innerHTML += '';
                    } else {
                        document.getElementById("entries").innerHTML += `<tr></input>`
                            + '<td id="title" contenteditable="true" onclick="changeTable(this)">' + data[i][1]["title"]
                            + '<td id="title2" contenteditable="true" onclick="changeTable(this)">' + data[i][1]["title2"]
                            + '<td id="author" contenteditable="true" onclick="changeTable(this)">' + data[i][1]["author"]
                            + '<td id="type" contenteditable="true" onclick="changeTable(this)">' + data[i][1]["type"]
                            + '<td id="language" contenteditable="true" onclick="changeTable(this)">' + data[i][1]["language"]
                            + '<td id="year" contenteditable="true" onclick="changeTable(this)">' + data[i][1]["year"]
                            + '<td id="status" contenteditable="true" onclick="changeTable(this)">' + data[i][1]["status"]
                            + '<td id="chapter" contenteditable="true" onclick="changeTable(this)">' + data[i][1]["chapter"]
                            + '<td id="chapter2" contenteditable="true" onclick="changeTable(this)">' + data[i][1]["chapter2"]
                            + `<td class="delete-button" onclick="changeBtn(this)">` + 'CHANGE'
                            + `<td class="delete-button" onclick="deleteTable(this)">` + 'DELETE'
                            + `<input type="hidden" name="timespan" value=${data[i][0]}>`;
                    }
                }
            }
            else {
                table_body.innerHTML = "";
            }

            const elements = document.querySelector("#entries")
            elements.querySelectorAll('td').forEach((element) => {
                element.classList.add('table-data');
            });
        })
    } else {
        location.href = 'index.html'
    }
});


/* let logoutBtn = document.querySelector('.logoutBtn');
logoutBtn.onclick = function () {
    signOut(auth)
        .then(() => {
            location.href = 'index.html';
        })
        .catch((error) => {
            console.log(error);
        });

}
*/
