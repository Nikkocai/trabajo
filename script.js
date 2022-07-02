let actualTotales = document.querySelector(".totales-actuales");
let pizzasForm = document.querySelector(".pizzas-form");
let inputPizza = document.getElementById("input-pizzas");
let inputEmpanada = document.getElementById("input-empanadas");
let empanadasForm = document.querySelector(".empanadas-form");

let totalPizzas = document.querySelector(".total-pizzas");
let totalEmpanadas = document.querySelector(".total-empanadas");

let totalActualPizzas = 0;
let totalActualEmpanadas = 0;

pizzasForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(inputPizza.value) {
        let newPizzas = parseInt(inputPizza.value);
        actualizarTotalPizzas(newPizzas);
        let nuevoInput = document.createElement("LI");
        nuevoInput.textContent = `Pizzas: ${newPizzas}`;
        let borrarBtn = crearBotonBorrar("pizza");
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
        let borrarBtn = crearBotonBorrar("empanada");
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

const crearBotonBorrar = (tipo) =>{
    let borrarBtn = document.createElement("BUTTON");
    borrarBtn.classList.add("borrar-btn");
    borrarBtn.addEventListener("click", ()=>{
        let valor = borrarBtn.parentElement.textContent;
        let matches = valor.match(/(\d+)/);
        let cantidad = matches[0];
        if (tipo == "pizza") {
            actualizarTotalPizzas((-1) * cantidad);
        } else if (tipo == "empanada") {
            actualizarTotalEmpanadas((-1) * cantidad);
        }
        borrarBtn.parentElement.remove();
    })
    return borrarBtn;
}

actualizarTotalPizzas(0);
actualizarTotalEmpanadas(0);