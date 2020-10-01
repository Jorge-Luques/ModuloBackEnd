
let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let misDocs = [];

function agregar() {
    console.log("Funcion Agregar");
    let titulo = document.querySelector('#titulo').value;
    let autor = document.querySelector('#autor').value;
    let contenido = document.querySelector('#contenido').value;
    let fechaCreacion = document.querySelector('#fechaCreacion').value;

    let renglon = {
        "titulo": titulo,
        "autor": autor,
        "contenido": contenido,
        "fechaCreacion": fechaCreacion
    }
    misDocs.push(renglon);
    // borro los valores cargados
    document.querySelector('#titulo').value = '';
    document.querySelector('#autor').value = '';
    document.querySelector('#contenido').value = '';
    document.querySelector('#fechaCreacion').value = '';
    mostrarTablaDocs();
}

function mostrarTablaDocs() {
    html = "";
    for (let r of misDocs) {
        html += `
    <tr>
        <td>${r.titulo}</td>
        <td>${r.autor}</td>
        <td>${r.contenido}</td>
        <td>${r.fechaCreacion}</td>
    </tr>
    `;
    }
    document.querySelector("#tblDocs").innerHTML = html;
}

let opt = document.querySelector('.seleccionDeAnalisis');
opt.addEventListener('change', function() {
    limpiarPantalla();
      if(this.value == "autor"){
          autorMasDocs();
      }
      else
        if(this.value == "titulo"){
            tituloModerno();
        }
        else{
            temaMasTratado();
        }
}, false);

function autorMasDocs(){
    console.log("Autor con mas documentos");
    let autorMay = "";
    let cantDocsAut = 0;
    let otroAut = "";
    let cantOtro;
    for (let r of misDocs) {
        otroAut = r.autor;
        cantOtro = 0;
        for (let r of misDocs) {
            if (r.autor == otroAut){
                cantOtro++;
            }
        }
        if (cantOtro > cantDocsAut){
            autorMay = otroAut;
            cantDocsAut = cantOtro;
        }
    }
    console.log(autorMay);
    mostrarResultados(autorMay);
    document.querySelector('#temaDocs').value="";
}

function tituloModerno(){
    console.log("Título más moderno");
    let titModerno = "";
    let moderno = new Date("1 jan 1000");
    let actual;
    for (let r of misDocs) {
        actual = new Date(r.fechaCreacion);
        if (actual > moderno){
            titModerno = r.titulo;
        }
    }
    console.log(titModerno);
    mostrarResultados(titModerno);
}

function temaMasTratado(){
    console.log("Tema más tratado");
    let temaMasTrat = "";
    let cantDocsTema = 0;
    let otroTema = "";
    let cantOtro;
    for (let r of misDocs) {
        otroTema = r.contenido;
        cantOtro = 0;
        for (let r of misDocs) {
            if (r.contenido == otroTema){
                cantOtro++;
            }
        }
        if (cantOtro > cantDocsTema){
            temaMasTrat = otroTema;
            cantDocsTema = cantOtro;
        }
    }
    console.log(temaMasTrat);
    mostrarResultados(temaMasTrat);
}

function limpiarPantalla(){
    document.querySelector("#tblDocs").innerHTML = "";
    document.querySelector("#total").innerHTML = "";
    document.querySelector(".temaOculto").style.display = "none";
}

function mostrarResultados(palabra){
    html = "El resultado es: ";
    let result = document.createElement("p");
    result.innerHTML = html+palabra;
    document.querySelector("#total").appendChild(result);    
}

async function load() {
    let container = document.querySelector("#tblDocs");
    container.innerHTML = "<h2>Loading...</h2>";
    try {
        let response = await fetch("http://localhost:3000/mock.json");
        if (response.ok) {
            let t = await response.json();
            console.log(t.misDocs); //los datos precargados estan en el arreglo de json
            misDocs = t.misDocs;//los copio a mi arreglo global de datos
            mostrarProductos(misDocs);
        }
        else
            container.innerHTML = "<h3>Error - Failed URL!</h3>";
    }
    catch (response) {
        container.innerHTML = `<h2>${response}</h2>`;
    }; 
}

load();

async function mostrarProductos(t){
    console.log("mostrar productos")
    let productos = document.querySelector("#tblDocs");
    let elem = document.createElement("tbody");
    await t;
    // console.log(t);
    html = "";
    for (let r of t) {
        html += `
    <tr>
        <td>${r.titulo}</td>
        <td>${r.autor}</td>
        <td>${r.contenido}</td>
        <td>${r.fechaCreacion}</td>
    </tr>
    `;
    }
    // console.log(html);
    elem.innerHTML = html;
    productos.appendChild(elem);
}