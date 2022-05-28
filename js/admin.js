let server = "http://localhost:3000/users";
let count = ["name", "email", "age"];

document.querySelector("#getUsersButton").addEventListener("click", getUsers);

function getUsers() {
    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        node: "cors",
        cache: "default"
    };
    const fetchData = fetch(server, fetchInit);
    fetchData.then(
        data => data.json(),
        err => console.error(err)
    ).then(
        users => usersFill(users)
    );
}

function createUser(data) {
    let fetchInit = {
        method: "POST",
        node: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(server, fetchInit)
        .then(
            resp => resp.json(),
            err => console.error(err)
        )
        .then(
            dataJson => console.log(dataJson)
        );
}

function refUser(data) {

}
//Button click EVENT !!!
function usersFill(users) {
    let usersTable = document.querySelector("tbody#usersTable");

    usersTable.appendChild(addInputElements());

    for (let row of users) {
        let userstr = document.createElement("tr");

        for (let k of count) {
            let userstd = document.createElement("td");
            userstd.appendChild(createAnyElement("input", { class: "form-control", disabled: "true", value: row[k] }));
            userstr.appendChild(userstd);
        }

        userstr.appendChild(addButtons());
        usersTable.appendChild(userstr);
    }
}

function addButtons() {
    let div = createAnyElement("div", { class: "btn-group" });
    let delBtn = createAnyElement("button", { type: "button", class: "btn btn-danger" });
    let refBtn = createAnyElement("button", { type: "button", class: "btn btn-success" });
    div.appendChild(delBtn);
    div.appendChild(refBtn);

    return div;

}

function addInputElements() {
    let tr = createAnyElement("tr");
    for (let k of count) {
        let td = createAnyElement("td");
        td.appendChild(createAnyElement("input", { class: "form-control", id: k }));
        tr.appendChild(td);
    }
    let td = createAnyElement("td");
    td.appendChild(createAnyElement("button", {
        type: "button", class: "btn btn-success",
        id: "createUserBtn",
        onclick: "addNewUser(this)"
    }));
    tr.appendChild(td);
    return tr;
}

function addNewUser(event) {
    let btnParent = event.parentElement.parentElement;
    console.log("addNewUser", btnParent);
    let dt = {name: "Kaló Endre", email: "kaloe@kalo.hu", age: 1};
    createUser(dt);
}

function createAnyElement(name, attribute) {
    let element = document.createElement(name);
    for (let k in attribute) {
        element.setAttribute(k, attribute[k]);
    }
    return element;
}