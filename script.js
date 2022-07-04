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

let listaDeProductos = [];

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
    let div = document.createElement("DIV");
    div.appendChild(nuevoInput);
    let producto = {
        index : inputCounter,
        tipo,
        cantidad,
        html : div.innerHTML
    }
    listaDeProductos.splice(inputCounter, 0, producto);
    console.log(listaDeProductos);
    localStorage.setItem("Input Counter", inputCounter);
    localStorage.setItem("listaDeProductos", JSON.stringify(listaDeProductos));
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
    console.log(`Item en index: ${index}, es: ${localStorage.getItem(index)}`);
    borrarBtn.addEventListener("click", ()=>{
        let valor = borrarBtn.parentElement.textContent;
        let matches = valor.match(/(\d+)/);
        let cantidad = matches[0];
        if (tipo == "Pizzas") {
            actualizarTotalPizzas((-1) * cantidad);
        } else if (tipo == "Empanadas") {
            actualizarTotalEmpanadas((-1) * cantidad);
        }
        
        listaDeProductos.splice(index - 1, 1);
        localStorage.setItem("listaDeProductos", JSON.stringify(listaDeProductos));
        inputCounter--;
        localStorage.setItem("Input Counter", inputCounter);
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
        listaDeProductos = [];
        localStorage.setItem("listaDeProductos", JSON.stringify(listaDeProductos));
    }
}

const cargarProductos = ()=>{
    totalActualPizzas = parseInt(localStorage.getItem("Pizzas")) || 0;
    totalPizzas.innerHTML = `Pizzas: <b>${totalActualPizzas}</b>`;
    totalActualEmpanadas = parseInt(localStorage.getItem("Empanadas")) || 0;
    totalEmpanadas.innerHTML = `Empanadas: <b>${totalActualEmpanadas}</b>`;
    inputCounter = parseInt(localStorage.getItem("Input Counter")) || 0;

    if (localStorage.getItem("listaDeProductos")) listaDeProductos = JSON.parse(localStorage.getItem("listaDeProductos"));

    for (producto of listaDeProductos) {
            let nuevoInput = crearProductoDeLista(producto.tipo, producto.cantidad, producto.index);
            actualTotales.appendChild(nuevoInput);
    }
}

dbBtn.addEventListener("click", ()=>{
    borrarInputs();
})

cargarProductos();