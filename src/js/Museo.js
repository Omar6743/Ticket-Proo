// Función para mostrar el resumen de compra
function mostrarResumen() {
    const cantidad = document.getElementById('cantidad').value;
    const horario = document.getElementById('horarios').value;
    const metodoPago = document.getElementById('metodoPago').value;
    const museo = "Museo de Louvre"; // Aquí puedes poner el nombre del museo de manera estática o dinámica

    // Calcular el monto total (suponiendo un precio fijo de $15 por boleto)
    const monto = cantidad * 15;

    // Obtener los asientos seleccionados
    let asientosSeleccionados = [];
    for (let i = 0; i < cantidad; i++) {
        const asiento = document.getElementById(`asiento${i + 1}`).value;
        asientosSeleccionados.push(asiento);
    }

    // Obtener los datos de pago
    const nombreTitular = document.getElementById('nombreTitular') ? document.getElementById('nombreTitular').value : '';
    const numeroTarjeta = document.getElementById('numeroTarjeta') ? document.getElementById('numeroTarjeta').value : '';
    const emailPaypal = document.getElementById('emailPaypal') ? document.getElementById('emailPaypal').value : '';

    // Validación de datos de pago (básica)
    if (metodoPago === 'debito' || metodoPago === 'credito') {
        if (nombreTitular === '' || numeroTarjeta === '') {
            alert("Por favor, complete los datos de la tarjeta.");
            return;
        }
    } else if (metodoPago === 'paypal' && emailPaypal === '') {
        alert("Por favor, ingrese su email de PayPal.");
        return;
    }

    // Mostrar los datos en el resumen
    document.getElementById('museoResumen').innerText = museo;
    document.getElementById('horarioResumen').innerText = horario;
    document.getElementById('cantidadResumen').innerText = cantidad;
    document.getElementById('asientosResumen').innerText = asientosSeleccionados.join(', ');
    document.getElementById('montoResumen').innerText = monto;

    // Mostrar solo el tipo de método de pago seleccionado
    document.getElementById('metodoResumen').innerText = metodoPago === 'debito' ? 'Tarjeta de Débito' : 
        metodoPago === 'credito' ? 'Tarjeta de Crédito' : 'PayPal';

    // Mostrar los detalles de la tarjeta (solo si el pago es con tarjeta)
    if (metodoPago === 'debito' || metodoPago === 'credito') {
        document.getElementById('nombreTitularResumen').innerText = nombreTitular;
        document.getElementById('numeroTarjetaResumen').innerText = numeroTarjeta;
    } else {
        document.getElementById('nombreTitularResumen').innerText = '-';
        document.getElementById('numeroTarjetaResumen').innerText = '-';
    }

    // Mostrar el resumen
    document.getElementById('resumen').style.display = 'block';
}

// Función para realizar la compra
function realizarCompra() {
    alert("Compra realizada con éxito.");
    // Aquí podrías agregar más lógica, como almacenar la compra en una base de datos
}

// Función para imprimir el ticket
function imprimirTicket() {
    window.print(); // Esto abre el cuadro de impresión
}
