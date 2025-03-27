// Mostrar Teatro
function mostrarTeatro() {
    document.getElementById('teatro').style.display = 'block';
    document.getElementById('cine').style.display = 'none';
    document.getElementById('museo').style.display = 'none';
}

// Mostrar Cine
function mostrarCine() {
    document.getElementById('teatro').style.display = 'none';
    document.getElementById('cine').style.display = 'block';
    document.getElementById('museo').style.display = 'none';
}

// Mostrar Museo
function mostrarMuseo() {
    document.getElementById('teatro').style.display = 'none';
    document.getElementById('cine').style.display = 'none';
    document.getElementById('museo').style.display = 'block';
}

// Cerrar sesión
function cerrarSesion() {
    // Limpiar por completo el sessionStorage para cerrar la sesión
    sessionStorage.clear();
    // Redirige al usuario al login sin posibilidad de regresar al menú
    window.location.replace('login.html');
}

document.addEventListener('DOMContentLoaded', function () {
    // Si la sesión fue cerrada, redirige al login
    if (sessionStorage.getItem("sesionCerrada") === "true") {
        alert("Tu sesión ha sido cerrada. Por favor, inicia sesión.");
        window.location.replace('login.html');
        return;
    } else {
        // Mostrar mensaje de bienvenida si existe el elemento y se encuentra el usuario en sessionStorage
        const bienvenida = document.getElementById('bienvenida');
        const usuario = sessionStorage.getItem("usuario");
        if (bienvenida && usuario) {
            bienvenida.textContent = `¡Bienvenido, ${usuario}!`;
        }
    }

    // Asignar el event listener al botón de "Cerrar sesión"
    const cerrarBtn = document.getElementById('cerrarSesionBtn');
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', cerrarSesion);
    }
});