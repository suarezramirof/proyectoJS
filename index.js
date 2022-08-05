//Función que calcula el monto final a partir de las variables de los inputs.
function calcular () {
    let montoInicial = parseInt(document.getElementById("montoInicial").value);
    let cantidadAnios = parseInt(document.getElementById("cantidadAnios").value);
    let rendimientoAnual = parseFloat(document.getElementById("interesAnual").value);
    let periodo = parseInt(document.getElementById("periodo").value);
    console.log(montoInicial+cantidadAnios+rendimientoAnual+periodo);
    if (!(montoInicial+cantidadAnios+rendimientoAnual+periodo)) {
        resultadoIndividual.innerText = "Ingrese valores válidos en todas las variables";
        return;
    }
    const semanasAnio = 52.14;
    //Cantidad de períodos totales para el tiempo en años dado, truncado.
    const cantidadPeriodos = Math.floor (cantidadAnios * semanasAnio / periodo);
    //Se calcula el rendimiento en el período y se lo transforma en "fracción"
    const rendimientoPeriodo = rendimientoAnual / semanasAnio * periodo / 100;
    let montoFinal = montoInicial;
    // El monto debe aumentar a [monto * (1 + rendPeriodo)] tras cada periodo.
    for (let i = 0; i < cantidadPeriodos; i++) {
        montoFinal = montoFinal * (rendimientoPeriodo + 1);
    }
    montoFinal = montoFinal.toFixed(2);
    //El resultado calculado se muestra como texto.
    resultadoIndividual.innerText = `El resultado final será de ${montoFinal} pesos`;
    return acumular(montoInicial,cantidadAnios,rendimientoAnual,periodo,montoFinal);
}
//Array donde se van a guardar las variables que se vayan ingresando y los resultados.
const resultados = [];
function acumular(montoInicial,cantidadAnios,rendimientoAnual,periodo,montoFinal) {
    let resultado = [montoInicial,cantidadAnios,rendimientoAnual,periodo,montoFinal];
    resultados.push(resultado);
}
// A partir del array resultados, se genera la estructura HTML de una tabla con los datos
function tablaResultados(){
    let tablaResultados = "";
    for (let i = 0; i < resultados.length; i++) {
        tablaResultados += `<tr><td>Caso ${i+1}</td><td>${resultados[i][0]}</td><td>${resultados[i][1]}</td><td>${resultados[i][2]}%</td><td>${resultados[i][3]}</td><td>${resultados[i][4]}</td></tr>`
    }
    return tablaResultados;
}

function mostrarResultados() {
    let datos = tablaResultados();
    document.getElementById("resultadoGeneral").innerHTML = 
    `<tr><td></td><td>Monto inicial ($)</td><td>Años de inversión</td><td>Rendimiento anual</td><td>Período de interés compuesto (semanas)</td><td>Monto final ($)</td></tr>${datos}`;
}

let resultadoIndividual = document.getElementById("resultadoIndividual");
//Al hacer click en el botón con id calculo, se ejecuta la función calcular
let calculo = document.getElementById("calculo");
calculo.addEventListener("click", calcular);
//Al hacer click en el botón con id botonResultados, se ejecuta la función calcular
let botonResultados = document.getElementById("botonResultados");
botonResultados.addEventListener("click", mostrarResultados);

//De presionar "Enter" estando posicionado en cualquiera de los inputs, se ejecutará un "click" en el botón calculo
let input1 = document.getElementById("montoInicial");
let input2 = document.getElementById("cantidadAnios");
let input3 = document.getElementById("interesAnual");
let input4 = document.getElementById("periodo");
input1.addEventListener("keypress",function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        calculo.click();
    }
});
input2.addEventListener("keypress",function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        calculo.click();
    }
});
input3.addEventListener("keypress",function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        calculo.click();
    }
});
input4.addEventListener("keypress",function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        calculo.click();
    }
});