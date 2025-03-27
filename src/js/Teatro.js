document.addEventListener("DOMContentLoaded", function () {
    const seccionSelect = document.getElementById("seccionColón");
    const cantidadBoletos = document.getElementById("cantidadColon");
    const metodoPago = document.getElementById("metodoPago");
    const numeroTarjeta = document.getElementById("numeroTarjeta");
    const nombreTitular = document.getElementById("nombreTitular");
    const comprarBtn = document.getElementById("comprarBtn");
    const resumenCompra = document.getElementById("resumenCompra");

    // Precios por sección
    const precios = {
        "palcoColon": 80,
        "lunetaColon": 60,
        "galeriaColon": 40
    };

    // Cambiar de formulario según el método de pago seleccionado
    metodoPago.addEventListener("change", function () {
        const metodo = this.value;
        if (metodo === 'paypal') {
            document.getElementById('tarjetaForm').style.display = 'none';
            document.getElementById('paypalForm').style.display = 'block';
        } else {
            document.getElementById('tarjetaForm').style.display = 'block';
            document.getElementById('paypalForm').style.display = 'none';
        }
    });

    // Función para mostrar el resumen de compra
    comprarBtn.addEventListener("click", function () {
        const seccion = seccionSelect.value;
        const cantidad = parseInt(cantidadBoletos.value);
        const metodo = metodoPago.value;
        const tarjeta = numeroTarjeta.value;
        const nombre = nombreTitular.value;

        // Validaciones
        if (cantidad < 1 || cantidad > 10) {
            alert("La cantidad de boletos debe estar entre 1 y 10.");
            return;
        }

        if (!precios[seccion]) {
            alert("La sección seleccionada no está disponible.");
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

        // Calcular el monto total
        const total = precios[seccion] * cantidad;

        // Mostrar el resumen de la compra
        document.getElementById("seccionResumen").innerText = seccion;
        document.getElementById("cantidadResumen").innerText = cantidad;
        document.getElementById("montoResumen").innerText = total.toFixed(2);

        if (metodo === 'tarjeta') {
            document.getElementById("metodoResumen").innerText = 'Tarjeta Débito/Credito';
            document.getElementById("nombreTarjetaResumen").innerText = nombre;
            document.getElementById("numeroTarjetaResumen").innerText = tarjeta;
        } else {
            const emailPaypal = document.getElementById("emailPaypal").value;
            document.getElementById("metodoResumen").innerText = 'PayPal';
            document.getElementById("nombreTarjetaResumen").innerText = emailPaypal;
            document.getElementById("numeroTarjetaResumen").innerText = 'N/A';
        }

        // Mostrar el resumen
        resumenCompra.style.display = "block";
    });

});
