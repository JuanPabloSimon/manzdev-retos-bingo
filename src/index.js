
/** Variables */
let numbers = [];
for (let i = 1; i <= 90; i++) numbers.push(i);
let numerosAgregados = [];
let cartoonPlayer = [];
let cartoonBot = [];
/** Elementos DOM */

let playerNums = document.getElementById("playerNums");
let botNums = document.getElementById("botNums");
let button = document.getElementById("sacarNum");
let containerNumbers = document.getElementById("nSacados");

/** Mezcla  cartones */

function mezclarCartones(carton, element) { 
    for(let i= 1; i <= 15; i++) {
        let numberToAdd = numbers[Math.floor(Math.random() * 90)]
        while(carton.includes(numberToAdd)) {
            numberToAdd = numbers[Math.floor(Math.random() * 90)]
        }
        carton.push(numberToAdd);    
        let number = document.createElement("div");
        number.className += "numbers ";
        number.className += numberToAdd;
        number.innerHTML = `<p class="number">${numberToAdd}</p>`
        element.appendChild(number)
    }
}
mezclarCartones(cartoonBot,botNums);
mezclarCartones(cartoonPlayer, playerNums);

/** Chequeo de cartones */
function checkCartoon(num, cartoon) {
    if(cartoon.includes(num)) {
        console.log("MATCH: " + num)
        // let element = document.getElementById(num)
        let el = document.getElementsByClassName(num);
        if (el.length > 1) {
            let element = document.getElementsByClassName(num)[1];
            element.className += " numberMatch";
        }
        let element = document.getElementsByClassName(num)[0];
        console.log(el);
        element.className += " numberMatch";
    }
}

/* Plasmar numeros agregados */

function printNumSacado(numero) {
    let numeroDom = document.createElement("div");;
    numeroDom.className += "numbers ";
    numeroDom.innerHTML = `<p class="number">${numero}</p>`
    containerNumbers.appendChild(numeroDom)
}

/*Controlar posible gandador */

function checkGanador(cartonP, cartonB) {
    if (cartonP.every((el) => numerosAgregados.includes(el)) && cartonB.every((el) => numerosAgregados.includes(el))) {
        let bombo = document.getElementById("bombo");
        bombo.innerHTML = `<h4>There is TIE!</h4>`
    } else if (cartonP.every((el) => numerosAgregados.includes(el))) {
        let bombo = document.getElementById("bombo");
        bombo.innerHTML = `<h4>Ganador Player!</h4>`
    } else if (cartonB.every((el) => numerosAgregados.includes(el))) {
        let bombo = document.getElementById("bombo");
        bombo.innerHTML = `<h4>Ganador Bot!</h4>`
    } 
}

/** Evento Principal */
button.addEventListener("click", () => {
    /* Saca un numero */
    let numPorAgregar = numbers[Math.floor(Math.random() * 90)];
    /* Si el numero ya esta agregado saca otro hasta encontrar uno nuevo */
    while(numerosAgregados.includes(numPorAgregar)) {
        numPorAgregar = numbers[Math.floor(Math.random() * 90)]
    };
    /* Chequea presencia en ambos cartones para tachar */
    checkCartoon(numPorAgregar, cartoonPlayer);
    checkCartoon(numPorAgregar, cartoonBot);
    /*Lo agrega a los numeros sacados, luego lo envia al DOM*/
    numerosAgregados.push(numPorAgregar);
    printNumSacado(numPorAgregar);

    /*Chequeo ganadores */
    checkGanador(cartoonPlayer, cartoonBot)
})
