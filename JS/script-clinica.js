// - - - Formularios Valores - - -

// Obtenemos el id formMain para tener toda la coleccion html o al formulario

// - - - Formulario Principal - - -
const formOne = document.getElementById("formMain");

// - - - Formulario De Busqueda - - -
const formTwo = document.getElementById("formTwo");

// --- ARREGLO DE USUARIOS --- 
const usersArray = [];

// - - - Evento Del Envio Del Formulario - - -

// cuando formOne tenga o escuche el evento submit, haga esto...
formOne.addEventListener("submit", (event)=>{

    // no se recarga la pagina cuando envie el formulario, asi preservamos los datos
    event.preventDefault();

    // obtener datos
    // va a obtener los valores de cada uno de los input 

    // guardamos los valores dentro de una variable
    const nombre = document.getElementById("name").value;

    const especialidad = document.getElementById("especialidad").value;

    const telefono = document.getElementById("telefono").value;

    const fecha = document.getElementById("fecha").value;

    // validacion de la fecha no puede ser menor al dia actual 
    if (!validationDate(fecha)) {
        // Detiene el proceso de guardado si la fecha no es válida
        return; 
    }

    // creamos un objeto 
    // const user = new User(nombre,especialidad,telefono,fecha);
    // -- OBJETO USUARIO -- 
    // metodo constructor 
    const user = {
        userName : nombre,
        specialty : especialidad,
        cellphone : telefono,
        date : fecha
    };
    // console.log(user);

    // agregamos el objeto al arreglo 
    usersArray.push(user);

    // console.log(usersArray);

    // limpia el formulario
    formOne.reset();
});

// - - - VALIDACIONES FECHA- - -
function validationDate(fecha) {
    // obtenemos la fecha actual 
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(fecha);
    // comparamos 
    if(fechaSeleccionada < fechaActual){
        alert("La fecha seleccionada no puede ser anterior a la fecha actual.");
        return false;
    }
    return true;
}

// - - - Evento De Busqueda De Usuario - - -

// hay un error al escuchar el boton, osea debo hacer dos veces click para poder
//  ver la seccion pero en consola si se ejecuta al primer click que hago. Esto es muy raro :(

// cuando se pulse el boton formTwo, haga esto...
formTwo.addEventListener("submit",(event2)=>{

    event2.preventDefault();

    // obtenemos el valor a buscar 
    const telefonoVal = document.getElementById("telefonoVal").value;

    // buscamos que FILTRE si se encuentra el objeto dentro del arreglo comparando el atributo 
    const userSearch = usersArray.filter(user => user.cellphone === telefonoVal);

    if(userSearch.length > 0){

        const error = document.getElementById("error");
        error.classList.add("error");
        // console.log(userSearch);

        // enviamos el arreglo 
        console.log("Antes");
        showData(userSearch);
        
    }else{
        // - - - RESULTADO NO ENCONTRADO - - -
        const error  = document.getElementById("error");
        error.classList.remove("error");
    }

});

//  - - - MOSTRAR DATOS - - - 
// tomamos al arreglo y lo imprimimos
function showData(users) {

    // da la orden de abrir la seccion 
    showSection();

    console.log("Despues");

    const mostrarDatos = document.getElementById("mostrarDatos");

    // concatenamos 
    let formato = '';

    users.forEach(user => {

        // fecha formateada 
        const fechaFormateada = formatFecha(user.date); 

        formato += `    
        <section class="user">
            <p>Nombre: ${user.userName}</p>
            <p>Cita Por: ${user.specialty}</p>
            <p>Teléfono: ${user.cellphone}</p>
            <p>Fecha: ${fechaFormateada}</p>
        </section>
        `;
        mostrarDatos.innerHTML = formato;
    }); 
}

// - - MOSTRAR SECCION OCULTA - - -
function showSection() {
    console.log("Ojito");
     const btn__remember = document.getElementById("btn__remember");
     const remember = document.getElementById("remember");
     
     // Cuando haga click quita la clase con el display none
     btn__remember.addEventListener("click", ()=>{
     remember.classList.remove("date--block");

    } );
    close();
}
// opcion de cerrar la seccion 
// - - - CERRAR RESULTADOS - - - 
function close() {
    const btn__close = document.getElementById("btn__close");
    const remember = document.getElementById("remember");

    // Quitar Seccion Oculta
    btn__close.addEventListener("click", ()=>{
        remember.classList.add("date--block");
     })
}

// - - - - Formateo de fecha - - -
function formatFecha(fecha) {
    // objeto 
    const date = new Date(fecha);

    // formateo 
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        hourCycle: 'h12',
        timeZone: 'UTC',
    };
    const formatter = new Intl.DateTimeFormat('es-ES', options);
    return formatter.format(date);
}