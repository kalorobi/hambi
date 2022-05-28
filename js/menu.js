let count = ["name", "top", "price"];
let server = "http://localhost:3000/menu";
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
    menu => menuFill(menu)
);


function menuFill(menu){
    let menuTable = document.querySelector("tbody#menuTable");
    
    for (let row of menu){
        let menutr = document.createElement("tr");

        for(let k of count){
            let menutd = document.createElement("td");
            menutd.innerHTML = row[k];
            menutr.appendChild(menutd);
        }
        menuTable.appendChild(menutr);
    }
}