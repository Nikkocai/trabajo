import { cargarDataEnTabla } from "/totalesDB.js"

let tabla = document.querySelector(".tabla");

const cargarTabla = tabla => cargarDataEnTabla(tabla)

setTimeout(()=>{
    cargarTabla(tabla)
}, 100)