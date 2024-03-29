const x = "X";
const o = "O";

const img1 = './IMG-TIC/cup-face.png'
const img2 = './IMG-TIC/cup-face2.png'


let estadoJuego = "playerOne";
// encuentra los elementos 
const cuadrados = Array.from(document.querySelectorAll(".element"));

const modal = document.querySelector("dialog");

const text = modal.querySelector("h2");

// recorre los elementos junto a su indice y pone el evento de que cada que se cliquea 
cuadrados.forEach((cuadrado, i ) =>{
    // cuando se ejecute el evento click 
    cuadrado.addEventListener("click", ()=>{

        // Crear un elemento de imagen
        var imagen = document.createElement("img");

        // si alguien gana ya no se puede hacer click y se puede pausar el juego
        if (estadoJuego === "PAUSA") return;

        // no se puede cambiar el simbolo 
        if (cuadrado.textContent !== "") return;


        // console.log("CUADRADO", i);
        

        // agrega las x si es el turno del jugador uno o las o si es el turno del jugador dos
        cuadrado.innerText = estadoJuego === "playerOne" ? x : o;

        // Asignar la imagen según el estado del juego
        if (estadoJuego === "playerOne") {
            imagen.src = img1;
        } else if (estadoJuego === "playerTwo") {
            imagen.src = img2;
        }
        imagen.classList.add("icon__img");
        // Agregar la imagen al cuadrado
        cuadrado.appendChild(imagen);

        

        const posicionGanadora = winReview();

        // si devuelve Object, significa que alguien gano si no es empate pero si no signfica que alguien gano
        if (typeof posicionGanadora === "object") {
            win(posicionGanadora);
            return 
        }
        if (posicionGanadora === "empate") {
            viewModal("Empate");
        }

        // cambia de jugador, una evz que realiza el turno
        estadoJuego = estadoJuego === "playerOne" ? "playerTwo" : "playerOne";

    })
})



// comprueba si hay ganador 
function winReview() {
    // guarda en tablero el arreglo creado por map 

    // cuadrados era una coleccion de html, ahora pasa a ser un arreglo y lo clonamos con map 
    const tablero = cuadrados.map(element => element.textContent);


    // revisar horizontales
    for (let i = 0; i <= 9; i += 3) {
        // si tablero[i] esta completo 
        // si el contenido es igual a lo que hay en 1 y a lo que hay en 2 
        if( tablero[i] &&
            tablero[i] === tablero[i+1] &&
            tablero[i] === tablero[i+2]){
            return [i, i+1, i+2];
        }

    }
    // revisar verticales 
    for (let i = 0; i <= 3; i ++) {
        // si tablero[i] esta completo 
        // si el contenido es igual a lo que hay en 1 y a lo que hay en 2 
        if( tablero[i] &&
            tablero[i] === tablero[i+3] &&
            tablero[i] === tablero[i+6]){
            return [i, i+3, i+6];
        }
    }
    // revisar laterales 
    if( tablero[0] &&
        tablero[0] === tablero[4] &&
        tablero[0] === tablero[8]){
        return win([0, 4, 8]);
    }
    if( tablero[2] &&
        tablero[2] === tablero[4] &&
        tablero[2] === tablero[6]){
        return [2, 4, 6];
    }

    // empate si no hay elementos vacios, marca empate y si no hay ganador o se sigue jugando 
    if (tablero.includes("")) return false;
    return "empate";

    }

    function win(posicionWin) {
        // asignacion de los colores ganadores a las posiciones 

        // pausa el juego luego de que alguien gane 

        posicionWin.forEach(posicion => {
            cuadrados[posicion].classList.toggle("win", true);
        });

        viewModal("Ganador: "+estadoJuego);

        estadoJuego ="PAUSA";
    }

// mostrar mensaje 
function viewModal(texto) {
    text.innerText = texto;
    modal.showModal();

    modal.querySelector("button").addEventListener("click", () => {
        // vaciamos los cuadrados 
        cuadrados.forEach(cuadrado => {
            cuadrado.textContent = "";
            // quita el fondo 
            cuadrado.classList.toggle("win",false);
            // cierra el modal 
            modal.close();

            estadoJuego = "playerOne";
        });
    })
}