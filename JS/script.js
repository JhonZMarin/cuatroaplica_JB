function imprimirPiramideBocaAbajo(filas) {
    for (let i = 1; i <= filas; i++) {
        let linea = '';
        // Espacios en blanco antes de los números
        for (let j = 1; j < i; j++) {
            linea += ' ';
        }

        // Números en orden descendente (excepto el 1)
        for (let k = filas; k >= i; k--) {
            linea += k;
        }

        // Números en orden ascendente
        for (let l = i + 1; l <= filas; l++) {
            linea += l;
        }

        console.log(linea); // Imprimir la línea
    }
}

imprimirPiramideBocaAbajo(10);
