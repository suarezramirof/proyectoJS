let periodo;
// Array en el que se van a cargar los resultados (y las variables)
const resultados = [];
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
    // Se define un objeto con propiedades que corresponden al input que se pidió al usuario, y asignando a las mismas los valores que fueron introducidos. A la última propiedad, casos, se le asigna un array vacío para luego cargar en el mismo los resultados de los cálculos.
    let variables = {"Monto inicial": montoInicial, "Años de inversión": cantidadAnios, "Rendimiento anual": rendimientoAnual, "Casos": []};
    // El periodo se pide dentro de otro bucle, para que se pueda modificar sin necesidad de cargar nuevamente las otras variables.
    while (periodo != "q" && periodo != "exit") {
        //Mismo mecanismo que en los anteriores, pero la condición para repetir el bucle es que la conversión a entero no se pueda realizar Y que sea diferente de [q] o [exit]
        do {
            //No se aplica parseInt inicialmente porque se eliminaría [q] o [exit]
            periodo = (prompt("Ingrese el período de interés compuesto en semanas. Para modificar las variables ingrese [q], para salir ingrese [exit]"));
            if (!parseInt(periodo) && periodo != "q" && periodo != "exit") {
                alert("Ingrese un número válido");
            } else if (periodo == "exit") {
                // La línea inferior obedece a que la función se ejecuta dentro del bucle, el "push" que está por fuera se ejecuta posteriormente
                resultados.push(variables);
                // Se muestran los resultados en la consola. 
                console.log(mostrarResultados(resultados));
                alert("Gracias por utilizar la app");
            }
        } while (!parseInt(periodo) && periodo != "q" && periodo != "exit");
        if (periodo != "q" && periodo != "exit") {
            periodo = parseInt(periodo);
            let montoFinal = interesCompuesto(montoInicial,cantidadAnios,rendimientoAnual,periodo);
            alert("El monto final será de: " + montoFinal);
            variables["Casos"].push({periodo: periodo, montoFinal: montoFinal});
        }
    }
    resultados.push(variables);
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
//Función que devuelve una cadena de texto formateada, a partir de las variables introducidas y los resultados calculados
function mostrarResultados(resultados) {
    let informe = "";
    // El largo del array "resultados" es igual a la cantidad de veces que se carguen variables de inicio.
    for (let i = 0; i < resultados.length; i++) {
        // Título para cada caso
        informe = informe + "\nCaso " + (i+1) + "\n";
        for (propiedad of Object.keys(resultados[i])) {
            if (propiedad == "Casos") {
                // La propiedad "Casos" de un objeto dado en el array "Resultados", tiene como valor un array cuyo largo es igual a la cantidad de períodos diferentes que se hayan ingresado.
                for (let j = 0; j < resultados[i][propiedad].length; j++) {
                    informe = informe + "\n- Período de interés compuesto = " + resultados[i][propiedad][j]["periodo"] + " semanas\n";
                    informe = informe + "- Monto final = " + resultados[i][propiedad][j]["montoFinal"] + "\n";
                }
            // Las otras propiedades se pasan a la cadena con su nombre sin modificar, al igual que los valores. En el caso de la propiedad "Rendimiento anual", se agrega un % al final de la cadena.
            } else if (propiedad == "Rendimiento anual") {
                informe = informe + `${propiedad} = ${resultados[i][propiedad]}` + "%\n";
            } else {
                informe = informe + `${propiedad} = ${resultados[i][propiedad]}` + "\n";
            }
        }
    }
    return informe;
}
 
