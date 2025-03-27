// Alternar la visibilidad de la contraseña
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('contrasena');
    const toggleButton = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleButton.textContent = 'Ocultar';
    } else {
      passwordInput.type = 'password';
      toggleButton.textContent = 'Mostrar';
    }
}

// Función para validar el usuario (CURP según el patrón especificado)
function validarUsuario(usuario) {
    let errores = "";
    let usuarioValido = true;

    // Verifica que el usuario tenga exactamente 20 caracteres
    if (usuario.length !== 20) {
        errores += "El usuario debe tener exactamente 20 caracteres.\n";
        usuarioValido = false;
    }

    // 1. Las primeras 4 letras (deben ser mayúsculas)
    if (!/^[A-Z]{4}/.test(usuario.substring(0, 4))) {
        errores += "Las primeras 4 letras deben ser mayúsculas.\n";
        usuarioValido = false;
    }

    // 2. 6 números para la fecha de nacimiento
    if (!/^\d{6}/.test(usuario.substring(4, 10))) {
        errores += "Los siguientes 6 caracteres deben ser números (fecha de nacimiento).\n";
        usuarioValido = false;
    }

    // 3. 1 letra (sexo)
    if (!/^[A-Z]{1}/.test(usuario.substring(10, 11))) {
        errores += "El siguiente carácter debe ser una letra (M o H para el sexo).\n";
        usuarioValido = false;
    }

    // 4. 2 letras del estado (ubicadas en las posiciones 11 y 12)
    if (!/^[A-Z]{2}/.test(usuario.substring(11, 13))) {
        errores += "Las siguientes 2 letras deben ser del estado (mayúsculas).\n";
        usuarioValido = false;
    }

    // 5. 4 caracteres alfanuméricos
    if (!/^[A-Z0-9]{4}/.test(usuario.substring(13, 17))) {
        errores += "Los siguientes 4 caracteres deben ser alfanuméricos.\n";
        usuarioValido = false;
    }

    // 6. 2 letras del estado (ubicadas en las posiciones 17 y 18)
    if (!/^[A-Z]{2}/.test(usuario.substring(17, 19))) {
        errores += "Las últimas 2 letras deben ser del estado (mayúsculas).\n";
        usuarioValido = false;
    }

    // 7. El último carácter puede ser una letra o un número
    let digito = usuario.substring(19, 20);
    if (!/[A-Z0-9]/.test(digito)) {
        errores += "El último carácter debe ser una letra o un número.\n";
        usuarioValido = false;
    }

    // ** Validación de las letras del estado seleccionadas **
    let estadoSeleccionado = document.getElementById("estadoSelect").value;
    let estadoUsuario = usuario.substring(17, 19); // Las 2 letras del estado del CURP

    // Definir los estados con sus respectivas letras
    const estadosPermitidos = {
        "AS": "AGUASCALIENTES",
        "BC": "BAJA CALIFORNIA",
        "BS": "BAJA CALIFORNIA SUR",
        "CC": "CAMPECHE",
        "CL": "COAHUILA",
        "CM": "COLIMA",
        "CS": "CHIAPAS",
        "CH": "CHIHUAHUA",
        "DF": "CIUDAD DE MÉXICO",
        "DG": "DURANGO",
        "GT": "GUANAJUATO",
        "GR": "GUERRERO",
        "HG": "HIDALGO",
        "JC": "JALISCO",
        "MC": "ESTADO DE MÉXICO",
        "MN": "MICHOACÁN",
        "MS": "MORELOS",
        "NT": "NAYARIT",
        "NL": "NUEVO LEÓN",
        "OC": "OAXACA",
        "PL": "PUEBLA",
        "QT": "QUERÉTARO",
        "QR": "QUINTANA ROO",
        "SP": "SAN LUIS POTOSÍ",
        "SL": "SINALOA",
        "SR": "SONORA",
        "TC": "TABASCO",
        "TS": "TAMAULIPAS",
        "TL": "TLAXCALA",
        "VZ": "VERACRUZ",
        "YN": "YUCATÁN",
        "ZS": "ZACATECAS"
    };

    // Validar que las letras del estado coincidan con el estado seleccionado
    if (estadoUsuario !== estadoSeleccionado) {
        errores += `Las letras del estado en el CURP no coinciden con el estado seleccionado (${estadoSeleccionado}).\n`;
        usuarioValido = false;
    }

    if (!usuarioValido) {
        alert(errores);
        return false;
    }

    return true; // El usuario cumple con todos los requisitos
}

// Función para validar la contraseña
function validarContrasena(contrasena) {
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!regexContrasena.test(contrasena)) {
        alert("La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.");
        return false;
    }
    return true;
}

// Función para iniciar sesión y llamar al backend
function login() {
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    const estado = document.getElementById('estadoSelect').value;

    // Validar que todos los campos estén llenos
    if (!usuario || !contrasena || !estado) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (!validarUsuario(usuario)) return;
    if (!validarContrasena(contrasena)) return;

    // Llamada al backend para autenticar
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: usuario, contrasena: contrasena })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            sessionStorage.setItem("usuario", usuario);
            sessionStorage.setItem("usuarioLogueado", usuario);
            alert("¡Bienvenida/o! Has iniciado sesión correctamente.");
            window.location.replace('menu.html');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error al conectar con el servidor.");
    });
}

// Función para registrar un usuario y conectarse al backend
function register() {
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    const estado = document.getElementById('estadoSelect').value;

    if (!usuario || !contrasena || !estado) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (!validarUsuario(usuario)) return;
    if (!validarContrasena(contrasena)) return;

    // Llamada al backend para registrar el usuario
    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: usuario, contrasena: contrasena })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert("Usuario registrado exitosamente.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error al conectar con el servidor para registro.");
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem("sesionCerrada") === "true") {
        alert("Tu sesión ha sido cerrada. Por favor, inicia sesión.");
    }
    if (sessionStorage.getItem("usuarioLogueado")) {
        window.location.replace('menu.html');
    }

    const btnIniciar = document.getElementById('iniciarSesionBtn');
    if (btnIniciar) {
        btnIniciar.addEventListener('click', login);
    }
    
    const btnRegistrarse = document.getElementById('registrarseBtn');
    if (btnRegistrarse) {
        btnRegistrarse.addEventListener('click', register);
    }
});