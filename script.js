let actualTotales = document.querySelector(".totales-actuales");
let pizzasForm = document.querySelector(".pizzas-form");
let inputPizza = document.getElementById("input-pizzas");
let inputEmpanada = document.getElementById("input-empanadas");
let empanadasForm = document.querySelector(".empanadas-form");

let totalPizzas = document.querySelector(".total-pizzas");
let totalEmpanadas = document.querySelector(".total-empanadas");

let dbBtn = document.querySelector(".db-btn");

let totalActualPizzas = 0;
let totalActualEmpanadas = 0;

let inputCounter;

pizzasForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(inputPizza.value && inputPizza.value != 0) {
        let cantidad = parseInt(inputPizza.value);
        actualizarTotalPizzas(cantidad);
        crearProducto("Pizzas", cantidad);
        inputPizza.value = "";
    }
})

empanadasForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(inputEmpanada.value && inputEmpanada.value != 0) {
        let cantidad = parseInt(inputEmpanada.value);
        actualizarTotalEmpanadas(cantidad);
        crearProducto("Empanadas", cantidad);
        inputEmpanada.value = "";
    }
})

const actualizarTotalPizzas = (newPizzas)=>{
    totalActualPizzas += newPizzas;
    localStorage.setItem("Pizzas", totalActualPizzas);
    totalPizzas.innerHTML = `Pizzas: <b>${totalActualPizzas}</b>`;
}

const actualizarTotalEmpanadas = (newEmpanadas) =>{
    totalActualEmpanadas += newEmpanadas;
    localStorage.setItem("Empanadas", totalActualEmpanadas);
    totalEmpanadas.innerHTML = `Empanadas: <b>${totalActualEmpanadas}</b>`;
}

const crearProducto = (tipo, cantidad)=>{
    inputCounter++;
    console.log(inputCounter);
    let nuevoInput = crearProductoDeLista(tipo, cantidad, inputCounter);
    let producto = {
        index : inputCounter,
        tipo,
        cantidad
    }
    localStorage.setItem("Input Counter", inputCounter);
    localStorage.setItem(`input${inputCounter}`, JSON.stringify(producto));
    actualTotales.appendChild(nuevoInput);
}

const crearProductoDeLista = (tipo, cantidad, index)=>{
    console.log(index);
    let nuevoInput = document.createElement("LI");
    nuevoInput.textContent = `${tipo}: ${cantidad}`
    let borrarBtn = crearBotonBorrar(tipo, index);
    nuevoInput.appendChild(borrarBtn);
    return nuevoInput;
}

const crearBotonBorrar = (tipo, index) =>{
    console.log(index);
    let borrarBtn = document.createElement("BUTTON");
    borrarBtn.classList.add("borrar-btn");
    console.log(`Item en index: ${index}, es: ${localStorage.getItem(`input${index}`)}`);
    borrarBtn.addEventListener("click", ()=>{
        let valor = borrarBtn.parentElement.textContent;
        let matches = valor.match(/(\d+)/);
        let cantidad = matches[0];
        if (tipo == "Pizzas") {
            actualizarTotalPizzas((-1) * cantidad);
        } else if (tipo == "Empanadas") {
            actualizarTotalEmpanadas((-1) * cantidad);
        }
        localStorage.removeItem(index);
        borrarBtn.parentElement.remove();
    });
    return borrarBtn;
}

const borrarInput = (borrarBtn)=>{
    let valor = borrarBtn.parentElement.textContent;
    let matches = valor.match(/(\d+)/);
    let cantidad = matches[0];
    if (tipo == "Pizzas") {
        actualizarTotalPizzas((-1) * cantidad);
    } else if (tipo == "Empanadas") {
        actualizarTotalEmpanadas((-1) * cantidad);
    }
    borrarBtn.parentElement.remove();
}

const borrarInputs = ()=>{
    for (let i = 0; i < actualTotales.childNodes.length; i++){
        borrarInput(actualTotales.childNodes[i].firstChild);
        localStorage.removeItem(parseInt(i + 1));
    }
}

const cargarProductos = ()=>{
    totalActualPizzas = parseInt(localStorage.getItem("Pizzas")) || 0;
    totalPizzas.innerHTML = `Pizzas: <b>${totalActualPizzas}</b>`;
    totalActualEmpanadas = parseInt(localStorage.getItem("Empanadas")) || 0;
    totalEmpanadas.innerHTML = `Empanadas: <b>${totalActualEmpanadas}</b>`;
    inputCounter = parseInt(localStorage.getItem("Input Counter")) || 0;

    for (let i = 0; i < inputCounter; i++) {
        let producto = JSON.parse(localStorage.getItem(i+1));
        let nuevoInput = crearProductoDeLista(producto.tipo, producto.cantidad);
        actualTotales.appendChild(nuevoInput);
        //actualTotales.appendChild(producto.HTML);
    }
}

dbBtn.addEventListener("click", ()=>{
    borrarInputs();
})

cargarProductos();