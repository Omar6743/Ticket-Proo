document.addEventListener("DOMContentLoaded", function () {
    const cineSelect = document.getElementById("cineSelect");
    const servicioSelect = document.getElementById("servicio");
    const cantidadBoletos = document.getElementById("cantidadBoletos");
    const metodoPago = document.getElementById("metodoPago");
    const numeroTarjeta = document.getElementById("numeroTarjeta");
    const nombreTitular = document.getElementById("nombreTitular");
    const comprarBtn = document.getElementById("comprarBtn");
    const resumenCompra = document.getElementById("resumenCompra");

    const precios = {
        "Tradicional": 10,
        "VIP": 20,
        "4DX": 25,
        "IMAX": 30
    };

    comprarBtn.addEventListener("click", function () {
        const cine = cineSelect.value;
        const servicio = servicioSelect.value;
        const cantidad = parseInt(cantidadBoletos.value);
        const metodo = metodoPago.value;
        const tarjeta = numeroTarjeta.value;
        const nombre = nombreTitular.value;

        if (cantidad < 1 || cantidad > 10) {
            alert("La cantidad de boletos debe estar entre 1 y 10.");
            return;
        }

        if (!precios[servicio]) {
            alert("El servicio seleccionado no está disponible.");
            return;
        }

        if (metodo !== "paypal" && (tarjeta.length < 16 || isNaN(tarjeta))) {
            alert("Número de tarjeta inválido.");
            return;
        }

        if (nombre.trim() === "") {
            alert("Ingrese el nombre del titular.");
            return;
        }

        const total = precios[servicio] * cantidad;

        resumenCompra.innerHTML = `
            <h3>Resumen de Compra</h3>
            <p><strong>Cine:</strong> ${cine}</p>
            <p><strong>Tipo de Servicio:</strong> ${servicio}</p>
            <p><strong>Cantidad de Boletos:</strong> ${cantidad}</p>
            <p><strong>Método de Pago:</strong> ${metodo.toUpperCase()}</p>
            <p><strong>Monto Total:</strong> $${total.toFixed(2)}</p>
        `;
    });
});
