let server = "http://localhost:3000/users";
let serverDataMap = ["id", "name", "email", "age"];
let maxId = 0;
document.querySelector("#getUsersButton").addEventListener("click", getUsers);

function getUsers() {
    let fetchOption = {
        method: "GET",
        headers: new Headers(),
        node: "cors",
        cache: "default"
    };
    const fetchData = fetch(server, fetchOption);
    fetchData.then(
        data => data.json(),
        err => console.error(err)
    ).then(
        users => usersFill(users)
    );
}

function addNewUser(data) {
    let fetchOption = {
        method: "POST",
        node: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(server, fetchOption)
        .then(
            resp => resp.json(),
            err => console.error(err)
        )
        .then(
            dataJson => console.log(dataJson)
        );
}

function delUser(id) {
    let fetchOption = {
        method: "DELETE",
        node: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(server + "/" + id, fetchOption)
        .then(
            resp => resp.json(),
            err => console.error(err)
        )
        .then(
            dataJson => console.log(dataJson)
        );
}

function refUser(data) {
    let id = parseInt(data.id);

    let fetchOption = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(server + `/${id}`, fetchOption)
        .then(
            resp => resp.json(),
            err => console.error(err)
        )
        .then(
            dataJson => console.log(dataJson)
        );
}

function addNewUserEvet(event) {
    let btnParent = event.parentElement.parentElement;
    console.log("addNewUserEvet", btnParent);
    let dt = { id: maxId + 1, name: "Mókus Misi", email: "mogyi@makk.hu", age: 51 };
    addNewUser(dt);
}

function delUserEvent(event) {
    let id = event.parentElement.parentElement.parentElement.firstChild.firstChild.getAttribute("id");
    console.log(parseInt(id));
    delUser(parseInt(id));
}

function refUserEvent(event) {
    let refTr = event.parentElement.parentElement.parentElement;
    let refBtn = refTr.querySelector("[name='refButton']");

    for (let k of refTr.cells) {
        if (k.firstChild.name == "name" ||
            k.firstChild.name == "email" ||
            k.firstChild.name == "age") {
            k.firstChild.disabled = false;
        }
    }

    refBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i>';
    refBtn.removeEventListener("click", refUserEvent);
    refBtn.setAttribute("onclick", "refUserUpload(this)");

    refTr.cells[1].firstChild.focus();
}

function refUserUpload(event) {
    let refTr = event.parentElement.parentElement.parentElement;
    let refBtn = refTr.querySelector("[name='refButton']");

    for (let k of refTr.cells) {
        if (k.firstChild.name == "name" ||
            k.firstChild.name == "email" ||
            k.firstChild.name == "age") {
            k.firstChild.disabled = true;
        }
    }

    refBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
    refBtn.removeEventListener("click", refUserUpload);
    refBtn.setAttribute("onclick", "refUserEvent(this)");

     let data = {
        id: refTr.cells[0].firstChild.value,
        name: refTr.cells[1].firstChild.value,
        email: refTr.cells[2].firstChild.value,
        age: refTr.cells[3].firstChild.value
    }
    refUser(data);

}

//Get User Button click EVENT !!!
function usersFill(users) {
    let usersTable = document.querySelector("tbody#usersTable");
    usersTable.innerHTML = "";

    usersTable.appendChild(addInputElements());

    for (let row of users) {
        let userstr = document.createElement("tr");

        for (let k of serverDataMap) {
            let userstd = document.createElement("td");
            if (k == "id") {
                userstd.appendChild(createAnyElement("input", {
                    class: "form-control",
                    disabled: "true",
                    value: row[k],
                    id: row[k]
                }));

                if (parseInt(row[k]) > maxId) {
                    maxId = parseInt(row[k]);
                }
            } else {
                userstd.appendChild(createAnyElement("input", {
                    class: "form-control",
                    disabled: "true",
                    name: k,
                    value: row[k]
                }));
            }
            userstr.appendChild(userstd);
        }

        userstr.appendChild(addButtons());
        usersTable.appendChild(userstr);
    }
}

function addButtons() {
    let td = createAnyElement("td");
    let div = createAnyElement("div", { class: "btn-group" });

    let delBtn = createAnyElement("button", {
        type: "button",
        class: "btn btn-danger",
        name: "delButton",
        onclick: "delUserEvent(this)"
    });
    delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    let refBtn = createAnyElement("button", {
        type: "button",
        class: "btn btn-primary",
        name: "refButton",
        onclick: "refUserEvent(this)"
    });
    refBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';

    div.appendChild(delBtn);
    div.appendChild(refBtn);

    td.appendChild(div);

    return td;
}

function addInputElements() {
    let tr = createAnyElement("tr");
    for (let k of serverDataMap) {
        let td = createAnyElement("td");
        td.appendChild(createAnyElement("input", { class: "form-control", id: k }));
        tr.appendChild(td);
    }
    let td = createAnyElement("td");
    let newBtn = createAnyElement("button", {
        type: "button",
        class: "btn btn-success",
        id: "createUserBtn",
        onclick: "addNewUserEvet(this)"
    });
    newBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';

    td.appendChild(newBtn);
    tr.appendChild(td);
    return tr;
}

function createAnyElement(name, attribute) {
    let element = document.createElement(name);
    for (let k in attribute) {
        element.setAttribute(k, attribute[k]);
    }
    return element;
}