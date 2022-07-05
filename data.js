let tabla = document.querySelector(".tabla");

const cargarTabla = ()=>{
    let fragment = document.createDocumentFragment();
    let keys = {...localStorage};
    for (let key in keys){
        if (key != "Empanadas" && key != "Pizzas"){
            let data = JSON.parse(localStorage.getItem(key));

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
        }
    }
    tabla.appendChild(fragment);
}

cargarTabla();