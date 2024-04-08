
let historial=document.getElementById("historial");


function calcular (v){
    para = document.createElement('p');
    datos = v + "=" + eval(v)
    para.innerText = datos;
    historial.appendChild(para);
    return eval(v);

}

function borrar (b){
    return b.slice (0, b.length -1);
}
