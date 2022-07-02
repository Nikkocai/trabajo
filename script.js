let actualTotales = document.querySelector(".totales-actuales");
let pizzasForm = document.querySelector(".pizzas-form");
let inputPizza = document.getElementById("input-pizzas");
let inputEmpanada = document.getElementById("input-empanadas");
let empanadasForm = document.querySelector(".empanadas-form");

let totalPizzas = document.querySelector(".total-pizzas");
let totalEmpanadas = document.querySelector(".total-empanadas");

let totalActualPizzas = 0;
let totalActualEmpanadas = 0;

console.log(actualTotales)

pizzasForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(inputPizza.value) {
        let newPizzas = parseInt(inputPizza.value);
        actualizarTotalPizzas(newPizzas);
        let nuevoInput = document.createElement("LI");
        nuevoInput.textContent = `Pizzas: ${newPizzas}`;
        let borrarBtn = crearBotonBorrar(totalActualPizzas);
        nuevoInput.appendChild(borrarBtn);
        actualTotales.appendChild(nuevoInput);
        inputPizza.value = "";
    }
})

empanadasForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(inputEmpanada.value) {
        let newEmpanadas = parseInt(inputEmpanada.value)
        actualizarTotalEmpanadas(newEmpanadas)
        let nuevoInput = document.createElement("LI");
        nuevoInput.textContent = `Empanadas: ${newEmpanadas}`;
        let borrarBtn = crearBotonBorrar(totalActualEmpanadas);
        nuevoInput.appendChild(borrarBtn);
        actualTotales.appendChild(nuevoInput);
        inputEmpanada.value = "";
    }
})

const actualizarTotalPizzas = (newPizzas)=>{
    totalActualPizzas += newPizzas;
    totalPizzas.innerHTML = `Pizzas: <b>${totalActualPizzas}</b>`;
}

const actualizarTotalEmpanadas = (newEmpanadas) =>{
    totalActualEmpanadas += newEmpanadas;
    totalEmpanadas.innerHTML = `Empanadas: <b>${totalActualEmpanadas}</b>`;
}

const crearBotonBorrar = (total) =>{
    let borrarBtn = document.createElement("BUTTON");
    borrarBtn.classList.add("borrar-btn");
    borrarBtn.addEventListener("click", ()=>{
        let valor = borrarBtn.parentElement.textContent;
        let matches = valor.match(/(\d+)/);
        let cantidad = matches[0];
        total -= cantidad;
    })
    return borrarBtn;
}