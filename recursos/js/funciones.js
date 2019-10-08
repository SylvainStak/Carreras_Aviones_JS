const generaTabla = (row, col) => {
    var tabla = '<table id="tablaRecorrido">';

    for (let fila = 0; fila < row; fila++){
        tabla += '<tr>';
        for (let columna = 0; columna < col; columna++)
            tabla += '<td></td>';        
        tabla += '</tr>';
    }

    tabla += '</table>';
    return tabla;
}

const addResultados = (avioneta, airbus, f18) => {
    var contenedor = document.getElementById('resultados');
    contenedor.innerHTML += '<table class="results"><caption>Paso ' + ++pasos + '</caption><tr><td><em>Avioneta</em></br><span>' + avioneta.posicionActual + '</span></td><td><em>Airbus</em></br><span>' + airbus.posicionActual + '</span></td><td><em>F18</em></br><span>' + f18.posicionActual + '</span></td></tr></table>';
}

const nuevaCarrera = () => {
    limpiarCasillas();
    limpiarResultados();
    resetPasos();
    document.getElementById('next').disabled = false;
    document.getElementById('forward').disabled = false;

    listaAviones.forEach(avion => {
        avion.colocarInicio();
        avion.reset();
    });

    listaPodium = [];
    listaPodium.push(avioneta);
    listaPodium.push(airbus);
    listaPodium.push(f18);
}

const nuevoPaso = () => {
    limpiarCasillas();

    var probabilidad = Math.floor(Math.random() * 100) + 1;

    listaAviones.forEach(avion => {
        avion.nuevoMov(probabilidad);
        avion.colocarCasilla();
    });

    if(podium.PRI == '' || podium.SEC == '' || podium.TER == '')
        addResultados(avioneta, airbus, f18);

    listaPodium.forEach((avion, i) => {
        if(avion.posicionActual == 250){
            if(podium.PRI == ''){
                podium.PRI = avion.nombre;
                listaPodium.splice(i,1)
            }else if(podium.SEC == ''){
                podium.SEC = avion.nombre;
                listaPodium.splice(i,1)
            }else if(podium.TER == ''){
                podium.TER = avion.nombre;
                listaPodium.splice(i,1)
            }
        }
    });

    if(carreraHaFinalizado()){
        alert('1º: ' + podium.PRI + '\n2º: ' + podium.SEC + '\n3º: ' + podium.TER);
        podium.PRI = '';
        podium.SEC = '';
        podium.TER = '';

        document.getElementById('next').disabled = true;
        document.getElementById('forward').disabled = true;
    }         
}

const limpiarCasillas = () => {
    var celdas = document.getElementById('tablaRecorrido').getElementsByTagName('td');

    for(let celda of celdas){
        celda.innerHTML = '';
    }
}

const limpiarResultados = () => {
    document.getElementById('resultados').innerHTML = '';
}

const resetPasos = () => pasos = 0;

const carreraHaFinalizado = () => (listaAviones.reduce((acc, valor) => acc + valor.posicionActual, 0) == 750) ? true : false;