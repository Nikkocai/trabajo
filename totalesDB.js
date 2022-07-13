const IDBRequest = indexedDB.open("totales", 1);

IDBRequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBRequest.result;
    db.createObjectStore("totales",{
        autoIncrement: true
    });
});

IDBRequest.addEventListener("success", ()=>{
    console.log('Base de Datos de totales abierta correctamente');
});

IDBRequest.addEventListener("error", ()=>{
    console.log("ocurrió un error al abrir/crear la base de datos");
});

const addObjeto = objeto =>{
    const IDBData = getIDBData("readwrite", "objeto agregado correctamente");
    IDBData.add(objeto);
}

const eliminarObjeto = key =>{
    const IDBData = getIDBData("readwrite", "objeto eliminado correctamente");
    IDBData.delete(key);
}

const getObjeto = key =>{
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction("totales", "readonly");
    const objectStore = IDBTransaction.objectStore("totales");
    const cursor = objectStore.openCursor();
    cursor.addEventListener("success", ()=>{
        if (cursor.result) {
            if (cursor.result.key == key) return cursor.result.value;
        } else {
            cursor.result.continue();
        }
    })
}

const editarObjeto = (key, objeto) =>{
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction("totales", "readwrite");
    const objectStore = IDBTransaction.objectStore("totales");
    objectStore.put(objeto, key);
}

const dbCargar = (day, pizzas, empanadas)=>{
    let oldData;
    
    if (getObjeto(day)){
        oldData = getObjeto(day);
        console.log('oldData: ', oldData);
    } else {
        oldData = {"Pizzas" : 0, "Empanadas" : 0};
    }

    let newPizzas = parseInt(oldData.Pizzas) + parseInt(pizzas);
    let newEmpanadas = parseInt(oldData.Empanadas) + parseInt(empanadas);
 
    let newData = { "Pizzas" : newPizzas, "Empanadas" : newEmpanadas};
 
    editarObjeto(day, JSON.stringify(newData));
 }

 const cargarDataEnTabla = tabla =>{
    let fragment = document.createDocumentFragment();
    const db =  IDBRequest.result;
    const IDBTransaction = db.transaction("totales", "readonly");
    const objectStore = IDBTransaction.objectStore("totales");
    const cursor = objectStore.openCursor();
    cursor.addEventListener("success", ()=>{
        if (cursor.result) {
            let key = cursor.result.key;
            let data = JSON.parse(cursor.result.value);

            let fila = document.createElement("TR");
            let celdaFecha = document.createElement("TD");
            let celdaPizzas = document.createElement("TD");
            let celdaEmpanadas = document.createElement("TD");

            celdaFecha.textContent = key;
            celdaPizzas.textContent = data.Pizzas;
            celdaEmpanadas.textContent = data.Empanadas;

            fila.appendChild(celdaFecha);
            fila.appendChild(celdaPizzas);
            fila.appendChild(celdaEmpanadas);

            fragment.appendChild(fila);

            cursor.result.continue();
        } else {
            tabla.appendChild(fragment);
        }
    })
}
 
 export {dbCargar, cargarDataEnTabla}