let temp = 32;
let dayTemp = [-10,0,10,20,30,35,12];
let offer = [
    "forró csoki", // < 0° 
    "meleg tea", // 0° - 15°
    "finom süti", // 15° - 20°
    "fagyi", // 20° - 25°
    "limonádé" // >= 25°
];

document.querySelector("#temp").innerHTML = `${temp}°`

function widget(){
    let day = document.querySelector("#daySelect").selectedIndex;
    let selectedDayTemp = document.querySelector("#selectedDayTemp");
    let offerDiv = document.querySelector("#offer");
    let offerText = "";

    selectedDayTemp.innerHTML = `${dayTemp[day]}°`;
    
    if(dayTemp[day] < 0){
        offerText = offer[0]; 
    }else if(dayTemp[day] >= 0 && dayTemp[day] < 15){
        offerText = offer[1];
    }else if(dayTemp[day] >= 15 && dayTemp[day] < 20){
        offerText = offer[2];
    }else if(dayTemp[day] >= 20 && dayTemp[day] < 25){
        offerText = offer[3];
    }else if(dayTemp[day] >=25){
        offerText = offer[4];
    }

    offerDiv.innerHTML = offerText;
}