export const firebaseConfig = {
    apiKey: "AIzaSyDlfk_bn_pLBzg27pjl3XtGOrrbUOBavYs",
    authDomain: "book-read-df025.firebaseapp.com",
    databaseURL: "https://book-read-df025-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "book-read-df025",
    storageBucket: "book-read-df025.appspot.com",
    messagingSenderId: "206092252656",
    appId: "1:206092252656:web:e3dcef27ffdcd700929935",
    measurementId: "G-02BD1X5GF6"
};

export function dashboardItem() {
    document.querySelector('.item-board').innerHTML = '<br><br>'
        + '<div> <i class="bx bxs-user-account"></i>'
        + `<p>PERSONAL INFORMATION</div>`
        + '<div onclick="logout()">' + `<i class='bx bxs-user-account'></i>`
        + `<p>LOGOUT ACCOUNT</div>`
        + '<div onclick="changeEmail()">' + `<i class='bx bxs-user-account'></i>`
        + `<p>CHANGE EMAIL</div>`
        + '<div onclick="changePassword()">' + `<i class='bx bxs-user-account'></i>`
        + `<p>CHANGE PASSWORD</div>`
        + '<div onclick="deleteThisUser()">' + `<i class='bx bxs-user-account'></i>`
        + `<p>DELETE ACCOUNT</div>`
        + '<div>' + `<i class='bx bxs-user-account'></i>`
        + `<p>SETTINGS PAGE</div>`;

    document.querySelector('.item-board').querySelectorAll('div').forEach((element) => {
        element.classList.add('board-box')
    });
    document.querySelector('.item-board').querySelectorAll('p').forEach((element) => {
        element.classList.add('board-text')
    });
    document.querySelector('.item-board').querySelector('div').classList.remove('board-box');
    document.querySelector('.item-board').querySelector('div').classList.add('top-box');
}

export function insertData() {
    const header = ["Title", "Alternative Title", "Author", "Type", "Language", "Year", "Status", "Read Chapter", "Latest Chapter"];
    const type = ["Light Novel", "Web Novel", "Published Novel", "Book"];
    const language = ["Chinese", "Filipino", "Indonesian", "Japanese", "Khmer", "Korean", "Malaysian", "Thai", "Vietnamese"];
    const status = ["Completed", "Ongoing", "Hiatus"];
    // OPTION TYPE
    document.getElementById("type").innerHTML =
        `<option value="${type[0]}">${type[0]}` +
        `<option value="${type[1]}">${type[1]}` +
        `<option value="${type[2]}">${type[2]}` +
        `<option value="${type[3]}">${type[3]}`;
    // OPTION LA
    document.getElementById("language").innerHTML =
        `<option value="${language[0]}">${language[0]}` +
        `<option value="${language[1]}">${language[1]}` +
        `<option value="${language[2]}">${language[2]}` +
        `<option value="${language[3]}">${language[3]}` +
        `<option value="${language[4]}">${language[4]}` +
        `<option value="${language[5]}">${language[5]}` +
        `<option value="${language[6]}">${language[6]}` +
        `<option value="${language[7]}">${language[7]}` +
        `<option value="${language[8]}">${language[8]}`;
    // OPTION STATUS
    document.getElementById("status").innerHTML =
        `<option value="${status[0]}">${status[0]}` +
        `<option value="${status[1]}">${status[1]}` +
        `<option value="${status[2]}">${status[2]}`;
    // ADD TABLE HEADER
    document.getElementById("head-entries").innerHTML = '<tr class="box-data">' +
        `<th><div>${header[0]}<i></i></div></td>` +
        `<th><div>${header[1]}<i></i></div></td>` +
        `<th><div>${header[2]}<i></i></div></td>` +
        `<th><div>${header[3]}<i></i></div></td>` +
        `<th><div>${header[4]}<i></i></div></td>` +
        `<th><div>${header[5]}<i></i></div></td>` +
        `<th><div>${header[6]}<i></i></div></td>` +
        `<th><div>${header[7]}<i></i></div></td>` +
        `<th><div>${header[8]}<i></i></div></td>`;
    const elements = document.querySelector("#head-entries")
    elements.querySelectorAll('th').forEach((element) => {
        element.classList.add('table-head');
    });

    elements.querySelectorAll('div').forEach((element) => {
        element.classList.add('div-head');
    });

    elements.querySelectorAll('i').forEach((element) => {
        element.classList.add('bx');
        element.classList.add('bxs-down-arrow');
    });
    document.querySelector('.sec1').querySelectorAll('div').forEach((element) => {
        element.classList.add('sec1-size');
    });
    document.querySelector('.sec1').querySelectorAll('input').forEach((element) => {
        element.classList.add('input-box');
    });
    document.querySelector('.sec2').querySelectorAll('select').forEach((element) => {
        element.classList.add('input-box');
    });

}

export function sorts() {
    const sortTable = document.querySelectorAll('.table-head');
    sortTable.forEach((element) => { // Table headers
        element.addEventListener('click', function () {
            let table = this.closest('table');
            // If the column is sortable
            if (this.querySelector('i')) {
                let order_icon = this.querySelector('i');
                // let order = encodeURI(order_icon.innerHTML).includes('%E2%86%91') ? 'desc' : 'asc';
                let order = order_icon.classList.contains('bxs-up-arrow') ? false : true;
                let separator = '-----'; // Separate the value of it's index, so data keeps intact

                let value_list = {}; // <tr> Object
                let obj_key = []; // Values of selected column

                let string_count = 0;
                let number_count = 0;

                // <tbody> rows
                table.querySelectorAll('tbody tr').forEach((line, index_line) => {
                    // Value of each field
                    let key = line.children[element.cellIndex].textContent.toUpperCase();

                    // Check if value is date, numeric or string
                    if (line.children[element.cellIndex].hasAttribute('data-timestamp')) {
                        // if value is date, we store it's timestamp, so we can sort like a number
                        key = line.children[element.cellIndex].getAttribute('data-timestamp');
                    }
                    else if (key.replace('-', '').match(/^[0-9,.]*$/g)) {
                        number_count++;
                    }
                    else {
                        string_count++;
                    }

                    value_list[key + separator + index_line] = line.outerHTML.replace(/(\t)|(\n)/g, ''); // Adding <tr> to object
                    obj_key.push(key + separator + index_line);
                });
                if (string_count === 0) { // If all values are numeric
                    obj_key.sort(function (a, b) {
                        return a.split(separator)[0] - b.split(separator)[0];
                    });
                }
                else {
                    obj_key.sort();
                }

                if (order === false) {
                    obj_key.reverse();
                    order_icon.classList.remove('bxs-up-arrow');
                    order_icon.classList.add('bxs-down-arrow');
                }
                else {
                    order_icon.classList.remove('bxs-down-arrow');
                    order_icon.classList.add('bxs-up-arrow');;
                }

                let html = '';
                obj_key.forEach(function (chave) {
                    html += value_list[chave];
                });
                table.getElementsByTagName('tbody')[0].innerHTML = html;
            }
        });
    });

}

