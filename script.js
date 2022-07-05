let actualTotales = document.querySelector(".totales-actuales");
let pizzasForm = document.querySelector(".pizzas-form");
let empanadasForm = document.querySelector(".empanadas-form");
let inputPizza = document.getElementById("input-pizzas");
let inputEmpanada = document.getElementById("input-empanadas");

let totalPizzas = document.querySelector(".total-pizzas");
let totalEmpanadas = document.querySelector(".total-empanadas");

let dbBtn = document.querySelector(".db-btn");

let totalActualPizzas = 0;
let totalActualEmpanadas = 0;

const IDBRequest = indexedDB.open("productos", 1);

IDBRequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBRequest.result;
    db.createObjectStore("productos",{
        autoIncrement: true
    });
});

IDBRequest.addEventListener("success", ()=>{
    cargarProductos();
});

IDBRequest.addEventListener("error", ()=>{
    console.log("ocurrió un error al abrir/crear la base de datos");
});

const getIDBData = (mode, msg) =>{
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction("productos", mode);
    const objectStore = IDBTransaction.objectStore("productos");
    IDBTransaction.addEventListener("complete",()=>{
        console.log(msg);
    });

    return objectStore;
}

const cargarProductos = ()=>{
    const IDBData = getIDBData("readonly");
    const cursor = IDBData.openCursor();
    const fragment = document.createDocumentFragment();
    actualTotales.innerHTML = '';
    cursor.addEventListener("success", ()=>{
        if (cursor.result) {
            let elemento = cargarProducto(cursor.result.key, cursor.result.value);
            fragment.appendChild(elemento);
            cursor.result.continue(); //LOOP
        } else actualTotales.appendChild(fragment);
    });
}

const cargarProducto = (key, value)=>{
    let nuevoInput = document.createElement("LI");
    nuevoInput.textContent = `${value.tipo}: ${value.cantidad}`
    let borrarBtn = crearBotonBorrar(key, value);
    nuevoInput.appendChild(borrarBtn);
    return nuevoInput;
}

const crearBotonBorrar = (key, value) =>{
    let borrarBtn = document.createElement("BUTTON");
    borrarBtn.classList.add("borrar-btn");
    borrarBtn.addEventListener("click", ()=>{
        let cantidad = value.cantidad;
        if (value.tipo == "Pizzas") {
            actualizarTotalPizzas((-1) * cantidad);
        } else if (value.tipo == "Empanadas") {
            actualizarTotalEmpanadas((-1) * cantidad);
        }
        borrarBtn.parentElement.remove();
        eliminarObjeto(key);
    });
    return borrarBtn;
}

const addObjeto = objeto =>{
    const IDBData = getIDBData("readwrite", "objeto agregado correctamente");
    IDBData.add(objeto);
}

const eliminarObjeto = key =>{
    const IDBData = getIDBData("readwrite", "objeto eliminado correctamente");
    IDBData.delete(key);
}

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
    let producto = {
        tipo,
        cantidad
    }

    addObjeto(producto);
    cargarProductos();
}

const cargarData = () =>{
    totalActualPizzas = parseInt(localStorage.getItem("Pizzas")) || 0;
    totalPizzas.innerHTML = `Pizzas: <b>${totalActualPizzas}</b>`;
    totalActualEmpanadas = parseInt(localStorage.getItem("Empanadas")) || 0;
    totalEmpanadas.innerHTML = `Empanadas: <b>${totalActualEmpanadas}</b>`;
}

dbBtn.addEventListener("click", ()=>{
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let today = `${day}/${month}/${year}`;

    if(!localStorage.getItem(today)) {
        borrarTodosLosProductos();
        cargarABaseDeDatos(today);
        actualizarTotales();
    } else {
        if (confirm("Deseas sobreescribir la información ya existente en la base de datos?")){
            borrarTodosLosProductos();
            cargarABaseDeDatos(today);
            actualizarTotales();
        }
    }
});

const borrarTodosLosProductos = ()=>{
    const IDBData = getIDBData("readwrite");
    const cursor = IDBData.openCursor();
    
    cursor.addEventListener("success", ()=>{
        if (cursor.result){
            eliminarObjeto(cursor.result.key);
            cursor.result.continue();
        }
        else actualTotales.innerHTML = '';
    });
}

const cargarABaseDeDatos = (today)=>{
    let data = {
        "Pizzas" : totalActualPizzas,
        "Empanadas" : totalActualEmpanadas
    }

    localStorage.setItem(today, JSON.stringify(data));
}

const actualizarTotales = ()=>{
    localStorage.setItem("Pizzas", 0);
    localStorage.setItem("Empanadas", 0);
    cargarData();
}

cargarData();