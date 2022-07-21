let periodo;
while (periodo != "exit") {
    const montoInicial = parseInt(prompt("Ingrese el monto inicial (número entero)"));
    if (montoInicial
    const cantidadAnios = parseInt(prompt("Ingrese el tiempo en años"));
    const rendimientoAnual = parseFloat(prompt("Ingrese el rendimiento anual en porcentaje"));
    // El periodo se pide dentro de otro bucle, para que se pueda modificar sin necesidad de cargar nuevamente las otras variables.
    while (periodo != "q" && periodo != "exit") {
        periodo = prompt("Ingrese el período de interés compuesto en semanas. Para modificar las variables ingrese [q], para salir ingrese [exit]");
        alert("El monto final será de: " + interesCompuesto(montoInicial,cantidadAnios,rendimientoAnual,periodo));
    }
}
//Función que devuelve el monto final a partir de: un monto inicial, un tiempo en años, un rendimiento anual y un período de interés compuesto.
function interesCompuesto(montoInicial,cantidadAnios,rendimientoAnual,periodo) {
    //Cantidad de semanas en un año
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
    return montoFinal;
}