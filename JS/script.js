
// NO SIRVE PERO ESTA INTERESANTE PARA ESTUDIARLO 

// --- ARREGLO DE USUARIOS --- 
const usersArray = [];

// obtenemos el id formMain para tener toda la coleccion html
const formOne = document.getElementById("formMain");
// console.log(form);

// obtener datos
// cuando formOne tenga o escuche el evento submit, haga esto... 
formOne.addEventListener("submit", (event)=>{

    // no se recarga la pagina cuando envie el formulario, asi preservamos los datos
    event.preventDefault();

    // va a obtener los valores de cada uno de los input 

    // guardamos los valores dentro de una variable
    const nombre = document.getElementById("name").value;
    // console.log(nombre);
    const especialidad = document.getElementById("especialidad").value;
    // console.log(especialidad);
    const telefono = document.getElementById("telefono").value;
    // console.log(telefono);
    const fecha = document.getElementById("fecha").value;
    // console.log(fecha);

    // validacion de la fecha no puede ser menor al dia actual 
    validationDate(fecha);

    // cremos un objeto llamado usuario para luego meterlo en un arreglo de usuarios

    // -- OBJETO USUARIO -- 
    // metodo constructor 
    const user = {
        userName : nombre,
        specialty : especialidad,
        cellphone : telefono,
        date : fecha
    };

    // agregamos los objetos al arreglo 
    usersArray.push(user);

    // limpia el formulario
    document.getElementById("formMain").reset();
});

 // - - - VALIDACIONES - - -
function validationDate(fecha) {
    // obtenemos la fecha actual 
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(fecha);
    // comparamos 
    if(fechaSeleccionada < fechaActual){
        alert("La fecha seleccionada no puede ser anterior a la fecha actual.");
        return; 
    }
}

// FORMULARIO DOS VALIDACION, COMPARACION Y MUESTRA DE DATOS
const formTwo = document.getElementById("formTwo");

formTwo.addEventListener("submit",(event2)=>{

    event2.preventDefault();

    // obtenemos el valor 
    const telefonoVal = document.getElementById("telefonoVal").value;

    // buscamos dentro del arreglo al objeto usuario 
    // y luego al atributo de telefono y lo comparamos 

    // Recorremos el arreglo para buscar el objeto y su atributo
    let searchUser = usersArray.find(user => user.cellphone === telefonoVal);
    
    // searchUser, guarda un valor boleano 
    if (searchUser) {
        console.log("Usuario Encontrado",searchUser);  
        
        // showSection(user);

         // Mostrar Seccion Oculta
        const btn__remember = document.getElementById("btn__remember");
        const remember = document.getElementById("remember");
    
        // Cuando haga click quita la clase con el display none
        btn__remember.addEventListener("click", ()=>{

            remember.classList.remove("date--block");

            // imprimimos los datos
            printData(user);
            close();
        } );
        
    }else{
        console.log("Usuario No Encontrar",telefonoVal);
    }

});

// - - - VER RESULTADOS - - -
// function showSection(user) {
//      // Mostrar Seccion Oculta
//      const btn__remember = document.getElementById("btn__remember");
//      const remember = document.getElementById("remember");
 
//      // Cuando haga click quita la clase con el display none
//      btn__remember.addEventListener("click", ()=>{

//          remember.classList.remove("date--block");

//         // imprimimos los datos
//         printData(user);
//         close();
//      } );
// }

// - - - IMPRIMIR LOS DATOS - - -
// function printData(user) {
//     // crear una etiqueta p para mostrar los datos 
//    const data = document.createElement("p");
//    // impresion 
//    data.textContent = `Nombre: ${user.userName}, Especialidad: ${user.specialty}, Telefono: ${user.cellphone}, Fecha: ${user.date}`;
//    // agregar el párrafo al div de datos mostrar datos
//    document.getElementById("mostrarDatos").appendChild(data);

//    console.log(data);
// }

// // - - - CERRAR RESULTADOS - - - 
// function close() {
//     const btn__close = document.getElementById("btn__close");
//     const remember = document.getElementById("remember");

//     // Quitar Seccion Oculta
//     btn__close.addEventListener("click", ()=>{
//         remember.classList.add("date--block");
//      })
// }

