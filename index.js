let periodo;
while (periodo != "exit") {
    periodo = 0;
    let montoInicial, cantidadAnios, rendimientoAnual;
    // El bucle se repite si el input del usuario no puede convertirse a un entero (o float para rendimientoAnual)
    do {
        montoInicial = parseInt(prompt("Ingrese el monto inicial (número entero)"));
        //Alerta que aparece antes de que se repita el bucle si no pudo convertirse
        if (!montoInicial) {
            alert("Ingrese un número válido");
        }
    } while (!montoInicial);
    do {
        cantidadAnios = parseInt(prompt("Ingrese el tiempo en años"));
        if (!cantidadAnios) {
            alert("Ingrese un número válido");
        }
    } while (!cantidadAnios);
    do {
        rendimientoAnual = parseFloat(prompt("Ingrese el rendimiento anual en porcentaje"));
        if (!rendimientoAnual) {
            alert("Ingrese un número válido");
        }
    } while (!rendimientoAnual);
    // El periodo se pide dentro de otro bucle, para que se pueda modificar sin necesidad de cargar nuevamente las otras variables.
    while (periodo != "q" && periodo != "exit") {
        //Mismo mecanismo que en los anteriores, pero la condición para repetir el bucle es que la conversión a entero no se pueda realizar Y que sea diferente de [q] o [exit]
        do {
            //No se aplica parseInt inicialmente porque se eliminaría [q] o [exit]
            periodo = (prompt("Ingrese el período de interés compuesto en semanas. Para modificar las variables ingrese [q], para salir ingrese [exit]"));
            if (!parseInt(periodo) && periodo != "q" && periodo != "exit") {
                alert("Ingrese un número válido");
            } else if (periodo == "exit") {
                alert("Gracias por utilizar la app");
            }
        } while (!parseInt(periodo) && periodo != "q" && periodo != "exit");
        if (periodo != "q" && periodo != "exit") {
            periodo = parseInt(periodo);
            alert("El monto final será de: " + interesCompuesto(montoInicial,cantidadAnios,rendimientoAnual,periodo));
        }
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