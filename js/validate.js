function validateForm() {
    let userName = document.querySelector("input#userName").value;
    let userEmail = document.querySelector("input#userEmail").value;
    let userAddress = document.querySelector("input#userAddress").value;

    let orderQuantity = parseInt(document.querySelector("input#orderQuantity").value);
    let message = validateUser(userName, userEmail, userAddress) + validateQuantity(orderQuantity);

    if (message != "") {
        errorMessage(message);
    } else {
        orderMessage();
    }
}

function validateUser(name, email, addr) {
    let error = "";
    console.log(name + email + addr);
    if(name.length < 5){
        error += "Hibás név! \n";
    }
    if(addr.length < 10){
        error += "Hibás cím!"
    }
    return error;
}

function validateQuantity(quantity) {
    let error = "";

    if (quantity < 1 || quantity > 10) {
        error = "min 1db, max 10db buri rendelhető! Légy szíves javítsd!"
    }

    return error;
}

function errorMessage(error){
    let alert = document.querySelector("div#orderAlert");

    alert.innerHTML = "<div class='alert alert-danger' role='alert'>" + error +"</div>";
}

function orderMessage() {
    let alert = document.querySelector("div#orderAlert");

    alert.innerHTML = "<div class='alert alert-success' role='alert'>Rendelés elküldve!</div>";  
}